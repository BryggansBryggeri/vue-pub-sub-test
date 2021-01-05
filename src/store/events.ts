import { Action, Module, VuexModule } from "vuex-class-modules";
import store from "@/store";

export const dummyManContr = JSON.parse(
  '{"controller_id": "mash", "actor_id": "dummy_actor", "sensor_id": "dummy_sensor", "type": "manual"}'
);

export const dummyAutoContr = JSON.parse(
  '{"controller_id": "mash", "actor_id": "dummy_actor", "sensor_id": "dummy_sensor", "type": {"hysteresis": {"offset_on": 10.0, "offset_off": 5.0}}}'
);

@Module({ generateMutationSetters: true })
export class EventModule extends VuexModule {
  messages: string[] = [];

  private sensors = {
    mash: 0.0,
    boil: 0.0,
  };

  actorSignal = 0.0;

  @Action
  public async addMessage(msg: string): Promise<void> {
    this.messages = [...this.messages, msg];
  }

  public async updateSensorMeas(meas: number, sensorId: string): Promise<void> {
    switch (sensorId) {
      case "mash":
        this.sensors.mash = meas;
        break;
      case "boil":
        this.sensors.boil = meas;
        break;
      default:
        console.log("Incorrect id");
    }
  }

  public sensorVal(sensorId: string): number {
    switch (sensorId) {
      case "mash":
        return this.sensors.mash;
      case "boil":
        return this.sensors.boil;
      default:
        console.log("Incorrect id");
        return 0.0;
    }
  }

  public async toggleDarkMode() {
    console.log("DarkMode Toggled");
  }

  public async updateActorSignal(signal: number): Promise<void> {
    this.actorSignal = signal;
  }
}

export const eventStore = new EventModule({ store, name: "events" });
