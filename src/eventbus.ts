import { connect, JSONCodec, NatsConnection } from "nats.ws";
import { SensorMsg } from "@/models/sensor";
import { eventStore } from "@/store/events";
import { ActorMsg } from "@/models/actor";
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

    // TODO tmp start controller.
    // this.publish("command.start_controller", dummyManContrMash);
  }

  public ready(): boolean {
    return this.client !== null;
  }

  public async startController(props: ControllerProps) {
    const tmp = propsToJson(props);
    console.log("Starting controller with props:", tmp);
    console.log("Client at start", this.client);
    this.publish("command.start_controller", tmp);
  }

  public async switchController(props: ControllerProps) {
    const tmp = propsToJson(props);
    console.log("Switching controller to props:", tmp);
    this.publish("command.switch_controller", tmp);
  }

  public async publish(topic: string, msg: JSON): Promise<void> {
    this.client?.publish(topic, jc.encode(msg));
  }
}

export const eventbus = new Eventbus();
