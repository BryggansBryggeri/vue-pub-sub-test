import { Action, Module, VuexModule } from "vuex-class-modules";
import store from "@/store";
import { SensorMsg } from "@/models/sensor";
import { Result, newOk, newErr } from "@/models/result";

export const dummyManContr = JSON.parse(
  '{"controller_id": "mash", "actor_id": "dummy_actor", "sensor_id": "dummy_sensor", "type": "manual"}'
);

export const dummyAutoContr = JSON.parse(
  '{"controller_id": "mash", "actor_id": "dummy_actor", "sensor_id": "dummy_sensor", "type": {"hysteresis": {"offset_on": 10.0, "offset_off": 5.0}}}'
);

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}

@Module({ generateMutationSetters: true })
export class EventModule extends VuexModule {
  messages: string[] = [];

  public darkMode = true;

  private sensors: {
    mash_temp: Result<number, string>;
    boil_temp: Result<number, string>;
  } = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    mash_temp: newOk(54.2),
    // eslint-disable-next-line @typescript-eslint/camelcase
    boil_temp: newErr("Das ist nicht nur nicht richtig; es ist nicht einmal falsch!"),
  };

  actorSignal = 70.0;

  @Action
  public async addMessage(msg: string): Promise<void> {
    this.messages = [...this.messages, msg];
  }

  public async updateSensor(msg: SensorMsg): Promise<void> {
    if (hasKey(this.sensors, msg.id)) {
      if (msg.err) {
        this.sensors[msg.id] = newErr(msg.err);
      }
      if (msg.meas) {
        this.sensors[msg.id] = newOk(msg.meas);
      }
    } else {
      console.log("Incorrect id");
    }
  }

  public sensorVal(sensorId: string): Result<number, string> {
    let val: Result<number, string> = newErr("Incorrect id");
    if (hasKey(this.sensors, sensorId)) {
      val = this.sensors[sensorId]; // works fine!
    } else {
      console.log("Incorrect id");
    }
    return val;
  }

  public async toggleDarkMode() {
    this.darkMode = !this.darkMode;
    console.log("DarkMode Toggled");
  }

  public async updateActorSignal(signal: number): Promise<void> {
    this.actorSignal = signal;
  }
}

export const eventStore = new EventModule({ store, name: "events" });
