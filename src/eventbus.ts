import { connect, StringCodec, JSONCodec, NatsConnection } from "nats.ws";
import { eventStore, dummyManContr, dummyAutoContr } from "@/store/events";

const sc = StringCodec();
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
        const newMeas = parseFloat(sc.decode(msg.data));
        eventStore.updateSensorMeas(newMeas, "mash");
      }
    })().then();

    const actorSub = nc.subscribe("actor.*.current_signal");
    (async () => {
      for await (const msg of actorSub) {
        const newSignal = parseFloat(sc.decode(msg.data));
        eventStore.updateActorSignal(newSignal);
      }
    })().then();

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
