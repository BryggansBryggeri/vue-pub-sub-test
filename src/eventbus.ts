import mqtt from 'mqtt';

import { eventStore } from '@/store/events';

export class Eventbus {
  private client: mqtt.MqttClient | null = null;

  public async start(): Promise<void> {
    const opts: mqtt.IClientOptions = {
      protocol: 'ws',
      host: 'localhost',
      port: 9001,
      path: '/eventbus',
      rejectUnauthorized: false,
    };
    const client = mqtt.connect(undefined, opts);
    this.client = client;

    client.on('error', (e) => {
      console.error(`mqtt error: ${e}`);
    });
    client.on('connect', () => {
      client.subscribe('demo/#');
    });
    client.on('message', (topic, body: Buffer) => {
      if (body.length === 0) {
        return;
      }
      // const msg = body.toString();
      const msg = `${topic}: ${body.toString()}`;
      eventStore.addMessage(msg);
      // handle message
    });
  }

  public async publish(topic: string, msg: string): Promise<void> {
    this.client?.publish(topic, msg);
  }
}

// eventStore.addMessage('msg');
export const eventbus = new Eventbus();
