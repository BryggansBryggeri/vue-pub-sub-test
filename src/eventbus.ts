import { Msg, connect, StringCodec, JSONCodec, NatsConnection } from "nats.ws";
import { SensorMsg } from "@/models/sensor";
import { eventStore, NatsClientStatus } from "@/store/events";
import { ActorMsg } from "@/models/actor";
import { propsAndTargetToJson, ControllerProps, ContrStatusMsg, Target } from "@/models/controller";
import { natsSettings } from "@/settings";

const jc = JSONCodec();
const sc = StringCodec();

export class Eventbus {
  private client: NatsConnection | null = null;

  public async start(): Promise<void> {
    try {
      const nc = await connect({
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

      const actorSub = this.client.subscribe("actor_pub.*.current_signal");
      (async () => {
        for await (const msg of actorSub) {
          const actorMsg: ActorMsg = jc.decode(msg.data);
          eventStore.updateActor(actorMsg);
        }
      })().then();

      this.listActiveClients();

      const contrSub = this.client.subscribe("controller.*.status");
      (async () => {
        for await (const msg of contrSub) {
          const contrMsg: ContrStatusMsg = jc.decode(msg.data);
          eventStore.updateContr(contrMsg);
        }
      })().then();

      eventStore.natsClientStatus = NatsClientStatus.Ready;
      console.log("nats client", this.client);
    } catch (err) {
      eventStore.natsClientStatus = NatsClientStatus.Error;
      console.log("Error connecting to NATS client", err);
    }
  }

  public async listActiveClients() {
    this.request("command.list_active_clients", null, 1000)
      .then((msg) => {
        if (msg !== undefined) {
          const clients = jc.decode(msg.data);
          const clientIds: string[] = Object.keys(clients);
          console.log(clientIds);
          eventStore.updateActiveClients(clientIds);
        }
      })
      .catch((err) => {
        console.log(`problem with request: ${err.message}`);
      });
  }

  public async startController(props: ControllerProps, target: number) {
    const contrData = propsAndTargetToJson(props, target);
    try {
      const reply = await this.request("command.start_controller", contrData, 5000);
      if (reply) {
        console.log(sc.decode(reply.data));
      }
    } catch (err) {
      console.log("Error starting controller: ", err);
    }
  }

  public async stopController(props: ControllerProps) {
    const id = JSON.parse(`"${props.controllerId}"`);
    try {
      const reply = await this.request("command.stop_controller", id, 5000);
      if (reply) {
        console.log(sc.decode(reply.data));
      }
    } catch (err) {
      console.log("Error stopping controller: ", err);
    }
  }

  public async setTarget(contrId: string, newTarget: Target) {
    // TODO: stupid serialization.
    const parsedTarget = JSON.parse(`${newTarget}`);
    try {
      const reply = await this.request(`controller.${contrId}.set_target`, parsedTarget, 5000);
      if (reply) {
        console.log(sc.decode(reply.data));
      }
    } catch (err) {
      console.log("Failed setting target", err);
    }
  }

  public async switchController(props: ControllerProps, newTarget: number) {
    const contrData = propsAndTargetToJson(props, newTarget);
    try {
      const reply = await this.request("command.switch_controller", contrData, 5000);
      if (reply) {
        console.log(sc.decode(reply.data));
      }
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
