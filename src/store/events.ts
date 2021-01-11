import { Action, Module, VuexModule } from "vuex-class-modules";
import store from "@/store";
import { SensorMsg, MeasResult, measResultFromMsg, newMeasOk, newMeasErr } from "@/models/sensor";
import {
  ContrStatusMsg,
  ContrResult,
  contrResultFromMsg,
  newContrResultOk,
  newContrResultErr,
  Mode,
} from "@/models/controller";
import {
  ActorMsg,
  ActorResult,
  actorResultFromMsg,
  newActorResultOk,
  newActorResultErr,
} from "@/models/actor";
import { hasKey } from "@/utils";

@Module({ generateMutationSetters: true })
export class EventModule extends VuexModule {
  messages: string[] = [];

  public darkMode = true;

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

  private controllers: {
    mash: ContrResult;
    boil: ContrResult;
  } = {
    mash: newContrResultOk({ target: 67.0, mode: Mode.Man, timestamp: Date.now() }),
    boil: newContrResultOk({ target: 75.0, mode: Mode.Auto, timestamp: Date.now() }),
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
      val = this.sensors[sensorId];
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
      val = this.actors[actorId];
    } else {
      console.log("Incorrect id", actorId);
    }
    return val;
  }

  public async updateContr(msg: ContrStatusMsg): Promise<void> {
    console.log("contr msg: ", msg);
    if (hasKey(this.controllers, msg.status.id)) {
      this.controllers[msg.status.id] = contrResultFromMsg(msg);
    } else {
      console.log("Incorrect id", msg.status.id);
    }
  }

  public contrStatus(contrId: string): ContrResult {
    let val: ContrResult = newContrResultErr("Incorrect id", Date.now());
    if (hasKey(this.controllers, contrId)) {
      val = this.controllers[contrId];
    } else {
      console.log("Incorrect id", contrId);
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
