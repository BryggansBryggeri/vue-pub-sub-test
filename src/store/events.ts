import { Action, Module, VuexModule } from "vuex-class-modules";
import store from "@/store";
import Vessel from "@/models/vessel";

export const dummyManContr = JSON.parse(
  '{"controller_id": "mash", "actor_id": "dummy_actor", "sensor_id": "dummy_sensor", "type": "manual"}'
);

export const dummyAutoContr = JSON.parse(
  '{"controller_id": "mash", "actor_id": "dummy_actor", "sensor_id": "dummy_sensor", "type": {"hysteresis": {"offset_on": 10.0, "offset_off": 5.0}}}'
);

@Module({ generateMutationSetters: true })
export class EventModule extends VuexModule {
  messages: string[] = [];

  private sensors: Map<string, number> = new Map([
    ["mash", 0.0],
    ["boil", 0.0],
  ]);

  actorSignal = 0.0;

  brewery = new Vessel("id");

  @Action
  public async addMessage(msg: string): Promise<void> {
    this.messages = [...this.messages, msg];
  }

  public async updateSensorMeas(meas: number, sensorId: string): Promise<void> {
    this.sensors.set(sensorId, meas);
  }

  public sensorVal(sensorId: string): number {
    return this.sensors.get(sensorId) ?? 0.0;
  }

  public async toggleDarkMode() {
    console.log("DarkMode Toggled");
  }

  public async updateActorSignal(signal: number): Promise<void> {
    this.actorSignal = signal;
  }
}

export const eventStore = new EventModule({ store, name: "events" });
