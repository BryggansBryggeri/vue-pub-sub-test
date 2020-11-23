// import mqtt from 'mqtt';
import { connect, StringCodec, NatsConnection } from 'nats.ws';
import { eventStore } from '@/store/events';

export class Eventbus {
  private client: NatsConnection | null = null;

  public async start(): Promise<void> {
    const sc = StringCodec();
    const nc = await connect({ servers: 'ws://localhost:9222' });
    this.client = nc;
    const sub = nc.subscribe('help');
    (async () => {
      for await (const m of sub) {
        eventStore.addMessage(sc.decode(m.data));
      }
    })().then();

    // const opts: mqtt.IClientOptions = {
    //   protocol: 'ws',
    //   host: 'localhost',
    //   port: 9001,
    //   path: '/eventbus',
    //   rejectUnauthorized: false,
    // };
    // const client = mqtt.connect(undefined, opts);
    // this.client = client;

    // client.on('error', (e) => {
    //   console.error(`mqtt error: ${e}`);
    // });
    // client.on('connect', () => {
    //   client.subscribe('demo/#');
    // });
    // client.on('message', (topic, body: Buffer) => {
    //   if (body.length === 0) {
    //     return;
    //   }
    //   // const msg = body.toString();
    //   const msg = `${topic}: ${body.toString()}`;
    //   eventStore.addMessage(msg);
    //   // handle message
    // });
  }

  public async publish(topic: string, msg: string): Promise<void> {
    const sc = StringCodec();
    this.client?.publish(topic, sc.encode(msg));
  }
}

// eventStore.addMessage('msg');
export const eventbus = new Eventbus();
