// import mqtt from 'mqtt';
import { connect, StringCodec, NatsConnection } from 'nats.ws';
import { eventStore } from '@/store/events';

const sc = StringCodec();

export class Eventbus {
  private client: NatsConnection | null = null;

  public async start(): Promise<void> {
    const nc = await connect({ servers: 'ws://localhost:9222', user: 'jackonelli', pass: 'penna1glas' });
    this.client = nc;
    const sub = nc.subscribe('sensor.*.measurement');
    (async () => {
      for await (const m of sub) {
        const newMeas = parseFloat(sc.decode(m.data));
        eventStore.updateSensorMeas(newMeas);
      }
    })().then();
  }

  public async publish(topic: string, msg: string): Promise<void> {
    this.client?.publish(topic, sc.encode(msg));
  }
}

export const eventbus = new Eventbus();
