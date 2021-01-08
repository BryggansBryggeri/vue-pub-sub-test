import { Action, Module, VuexModule } from "vuex-class-modules";
import store from "@/store";
import { SensorMsg, MeasResult, measResultFromMsg, newMeasOk, newMeasErr } from "@/models/sensor";
import {
  ActorMsg,
  ActorResult,
  actorResultFromMsg,
  newActorResultOk,
  newActorResultErr,
} from "@/models/actor";

export const dummyManContr = JSON.parse(
  '{"controller_id": "mash", "actor_id": "boil_heater", "sensor_id": "boil_temp", "type": "manual"}'
);

export const dummyAutoContr = JSON.parse(
  '{"controller_id": "mash", "actor_id": "mash_heater", "sensor_id": "mash_temp", "type": {"hysteresis": {"offset_on": 10.0, "offset_off": 5.0}}}'
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return key in obj;
}

@Module({ generateMutationSetters: true })
export class EventModule extends VuexModule {
  messages: string[] = [];

  public darkMode = true;

  private actors: {
    mash_heater: ActorResult;
    boil_heater: ActorResult;
  } = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    mash_heater: newActorResultOk(0.7, Date.now()),
    // eslint-disable-next-line @typescript-eslint/camelcase
    boil_heater: newActorResultErr(
      "Das ist nicht nur nicht richtig; es ist nicht einmal falsch!",
      Date.now()
    ),
  };

  private sensors: {
    mash_temp: MeasResult;
    boil_temp: MeasResult;
  } = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    mash_temp: newMeasOk(54.2, Date.now()),
    // eslint-disable-next-line @typescript-eslint/camelcase
    boil_temp: newMeasErr(
      "Das ist nicht nur nicht richtig; es ist nicht einmal falsch!",
      Date.now()
    ),
  };

  public async updateSensor(msg: SensorMsg): Promise<void> {
    if (hasKey(this.sensors, msg.id)) {
      this.sensors[msg.id] = measResultFromMsg(msg);
    } else {
      console.log("Incorrect id", msg.id);
    }
  }

  public sensorVal(sensorId: string): MeasResult {
    let val: MeasResult = newMeasErr("Incorrect id", Date.now());
    if (hasKey(this.sensors, sensorId)) {
      val = this.sensors[sensorId]; // works fine!
    } else {
      console.log("Incorrect id", sensorId);
    }
    return val;
  }

  public async updateActor(msg: ActorMsg): Promise<void> {
    if (hasKey(this.actors, msg.id)) {
      this.actors[msg.id] = actorResultFromMsg(msg);
    } else {
      console.log("Incorrect id", msg.id);
    }
  }

  public actorSignal(actorId: string): ActorResult {
    let val: ActorResult = newActorResultErr("Incorrect id", Date.now());
    if (hasKey(this.actors, actorId)) {
      val = this.actors[actorId]; // works fine!
    } else {
      console.log("Incorrect id", actorId);
    }
    return val;
  }

  public async toggleDarkMode() {
    this.darkMode = !this.darkMode;
    console.log("DarkMode Toggled");
  }

  @Action
  public async addMessage(msg: string): Promise<void> {
    this.messages = [...this.messages, msg];
  }
}

export const eventStore = new EventModule({ store, name: "events" });
