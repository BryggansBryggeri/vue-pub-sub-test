import { Msg, connect, JSONCodec, NatsConnection } from "nats.ws";
import { SensorMsg } from "@/models/sensor";
import { eventStore, NatsClientStatus } from "@/store/events";
import { ActorMsg } from "@/models/actor";
import { propsAndTargetToJson, ControllerProps, ContrStatusMsg, Target } from "@/models/controller";
import {natsSettings} from "@/settings";

const jc = JSONCodec();

export class Eventbus {
  private client: NatsConnection | null = null;

  public async start(): Promise<void> {
    try {
      const nc = await connect({
        // servers: "ws://192.168.1.2:9222",
        servers: natsSettings.servers,
        user: natsSettings.user,
        pass: natsSettings.pass,
      });
      this.client = nc;

      const sensorSub = this.client.subscribe("sensor.*.measurement");
      (async () => {
        for await (const msg of sensorSub) {
          const sensorMsg: SensorMsg = jc.decode(msg.data);
          eventStore.updateSensor(sensorMsg);
        }
      })().then();

      const actorSub = this.client.subscribe("actor.*.current_signal");
      (async () => {
        for await (const msg of actorSub) {
          const actorMsg: ActorMsg = jc.decode(msg.data);
          eventStore.updateActor(actorMsg);
        }
      })().then();

      const contrSub = this.client.subscribe("controller.*.status");
      (async () => {
        for await (const msg of contrSub) {
          const contrMsg: ContrStatusMsg = jc.decode(msg.data);
          eventStore.updateContr(contrMsg);
        }
      })().then();

      this.request("command.list_active_clients", null, 1000)
        .then((msg) => {
          if (msg !== undefined) {
            const clients = jc.decode(msg.data);
            const clientIds: string[] = Object.keys(clients);
            eventStore.updateActiveClients(clientIds);
          }
        })
        .catch((err) => {
          console.log(`problem with request: ${err.message}`);
        });

      eventStore.natsClientStatus = NatsClientStatus.Ready;
      console.log("nats client", this.client);
    } catch (err) {
      eventStore.natsClientStatus = NatsClientStatus.Error;
      console.log("Error connecting to NATS client", err);
    }
  }

  // This should be req-rep.
  public async startController(props: ControllerProps, target: number) {
    const contrData = propsAndTargetToJson(props, target);
    console.log("Starting controller with props:", contrData);
    this.publish("command.start_controller", contrData);
  }
  
  // This should be req-rep.
  public async stopController(props: ControllerProps, target: number) {
    const contrData = propsAndTargetToJson(props, target);
    console.log("Shutting down controller:", contrData);
    this.publish("command.stop_controller", contrData);
  }

  // This should be req-rep.
  public async setTarget(contrId: string, newTarget: Target) {
    // TODO: stupid serialization.
    const parsedTarget = JSON.parse(`${newTarget}`);
    console.log(`Setting target ${parsedTarget} for controller: ${contrId}`);
    this.publish(`controller.${contrId}.set_target`, parsedTarget);
  }

  public async switchController(props: ControllerProps, newTarget: number) {
    const contrData = propsAndTargetToJson(props, newTarget);
    console.log("Switching controller to props:", contrData);
    try {
      const reply = await this.request("command.switch_controller", contrData, 5000);
      console.log("Controller switched: ", reply);
    } catch (err) {
      console.log("Error switching controllers: ", err);
    }
  }

  public async request(
    subject: string,
    data: JSON | null,
    timeout: number
  ): Promise<Msg | undefined> {
    if (data !== null) {
      return this.client?.request(subject, jc.encode(data), { timeout });
    }
    return this.client?.request(subject, undefined, { timeout });
  }

  public async publish(subject: string, data: JSON): Promise<void> {
    this.client?.publish(subject, jc.encode(data));
  }
}

export const eventbus = new Eventbus();
