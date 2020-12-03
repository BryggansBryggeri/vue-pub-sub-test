// import mqtt from 'mqtt';
import { connect, StringCodec, JSONCodec, NatsConnection, Msg } from "nats.ws";
import { eventStore } from "@/store/events";

const sc = StringCodec();
const jc = JSONCodec();

export class Eventbus {
  private client: NatsConnection | null = null;

  public async start(): Promise<void> {
    const nc = await connect({
      servers: "ws://localhost:9222",
      user: "jackonelli",
      pass: "penna1glas"
    });
    this.client = nc;
    const sensorSub = nc.subscribe("sensor.*.measurement");
    (async () => {
      for await (const msg of sensorSub) {
        const newMeas = parseFloat(sc.decode(msg.data));
        eventStore.updateSensorMeas(newMeas);
      }
    })().then();
    const actorSub = nc.subscribe("actor.*.current_signal");
    (async () => {
      for await (const msg of actorSub) {
        const newSignal = parseFloat(sc.decode(msg.data));
        eventStore.updateActorSignal(newSignal);
      }
    })().then();
  }

  public sensor(msg: string) {
    const newMeas = parseFloat(msg);
    eventStore.updateSensorMeas(newMeas);
  }

  public async publish(topic: string, msg: JSON): Promise<void> {
    this.client?.publish(topic, jc.encode(msg));
  }
}

export const eventbus = new Eventbus();
