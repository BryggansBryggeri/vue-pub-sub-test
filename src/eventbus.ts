import { Msg, connect, JSONCodec, NatsConnection } from "nats.ws";
import { SensorMsg } from "@/models/sensor";
import { eventStore } from "@/store/events";
import { ActorMsg } from "@/models/actor";
import { delay } from "@/utils";
import { propsToJson, ControllerProps, ContrStatusMsg } from "@/models/controller";

const jc = JSONCodec();

export class Eventbus {
  private client: NatsConnection | null = null;

  public async start(): Promise<void> {
    const nc = await connect({
      servers: "ws://localhost:9222",
      user: "jackonelli",
      pass: "penna1glas",
    });
    this.client = nc;

    const sensorSub = nc.subscribe("sensor.*.measurement");
    (async () => {
      for await (const msg of sensorSub) {
        const sensorMsg: SensorMsg = jc.decode(msg.data);
        eventStore.updateSensor(sensorMsg);
      }
    })().then();

    const actorSub = nc.subscribe("actor.*.current_signal");
    (async () => {
      for await (const msg of actorSub) {
        const actorMsg: ActorMsg = jc.decode(msg.data);
        eventStore.updateActor(actorMsg);
      }
    })().then();

    const contrSub = nc.subscribe("controller.*.status");
    (async () => {
      for await (const msg of contrSub) {
        const contrMsg: ContrStatusMsg = jc.decode(msg.data);
        eventStore.updateContr(contrMsg);
      }
    })().then();

    this.request("command.list_active_clients", null, 1000)
      .then((m) => {
        if (m !== undefined) {
          const clients = jc.decode(m.data);
          const clientIds: string[] = Object.keys(clients);
          eventStore.updateActiveClients(clientIds);
        }
      })
      .catch((err) => {
        console.log(`problem with request: ${err.message}`);
      });

    eventStore.natsClientReady = true;
    console.log("nats client", this.client);
  }

  public async startController(props: ControllerProps) {
    const tmp = propsToJson(props);
    console.log("Starting controller with props:", tmp);
    this.publish("command.start_controller", tmp);
  }

  public async switchController(props: ControllerProps) {
    const tmp = propsToJson(props);
    console.log("Switching controller to props:", tmp);
    const reply = await this.request("command.switch_controller", tmp, 5000);
    console.log("Controller switched: ", reply);
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
