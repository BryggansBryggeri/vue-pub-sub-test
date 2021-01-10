import { connect, JSONCodec, NatsConnection } from "nats.ws";
import { eventStore, dummyManContr, dummyAutoContr } from "@/store/events";
import { SensorMsg } from "@/models/sensor";
import { ActorMsg } from "@/models/actor";
import { ContrMsg } from "@/models/controller";

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
        console.log("raw", msg);
        const sensorMsg: SensorMsg = jc.decode(msg.data);
        console.log("parsed", sensorMsg);
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

    const contrSub = nc.subscribe("controller.*.new_target");
    (async () => {
      for await (const msg of contrSub) {
        const contrMsg: ContrMsg = jc.decode(msg.data);
        eventStore.updateContr(contrMsg);
      }
    })().then();

    // TODO tmp start controller.
    this.publish("command.start_controller", dummyManContr);
  }

  public async toggleController(auto: boolean) {
    if (auto) {
      this.publish("command.switch_controller", dummyAutoContr);
    } else {
      this.publish("command.switch_controller", dummyManContr);
    }
  }

  public async publish(topic: string, msg: JSON): Promise<void> {
    this.client?.publish(topic, jc.encode(msg));
  }
}

export const eventbus = new Eventbus();
