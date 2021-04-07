import { Action, Module, VuexModule } from "vuex-class-modules";
import store from "@/store";
import { SensorMsg, MeasResult, measResultFromMsg, newMeasErr } from "@/models/sensor";
import {
  ContrStatusMsg,
  ContrResult,
  contrResultFromMsg,
  newContrResultErr,
} from "@/models/controller";
import { ActorMsg, ActorResult, actorResultFromMsg, newActorResultErr } from "@/models/actor";
import { DataPoint } from "@/models/chart";
import { match } from "@/models/result";
import { hasKey } from "@/utils";

export enum NatsClientStatus {
  Connecting = 1,
  Ready = 2,
  Error = 3,
}

const begOfTime = Date.now();

@Module({ generateMutationSetters: true })
export class EventModule extends VuexModule {
  messages: string[] = [];

  public darkMode = true;

  public natsClientStatus = NatsClientStatus.Connecting;

  public dummySensorTimeSeries: DataPoint<number, number>[] = [];

  private activeClients: string[] = [];

  private sensors: {
    mash_temp: MeasResult;
    boil_temp: MeasResult;
  } = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    mash_temp: newMeasErr("No data received.", Date.now()),
    // mash_temp: newMeasOk(54.2, Date.now()),
    // eslint-disable-next-line @typescript-eslint/camelcase
    boil_temp: newMeasErr("No data received.", Date.now()),
  };

  private actors: {
    mash_heater: ActorResult;
    boil_heater: ActorResult;
  } = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    mash_heater: newActorResultErr("No data received.", Date.now()),
    // mash_heater: newActorResultOk(0.7, Date.now()),
    // eslint-disable-next-line @typescript-eslint/camelcase
    boil_heater: newActorResultErr("No data received.", Date.now()),
  };

  private controllers: {
    mash: ContrResult;
    boil: ContrResult;
  } = {
    mash: newContrResultErr("No data received.", Date.now()),
    boil: newContrResultErr("No data received.", Date.now()),
  };

  public async updateActiveClients(clients: string[]): Promise<void> {
    this.activeClients = clients;
  }

  public listActiveClients(): string[] {
    return this.activeClients;
  }

  public async updateSensor(msg: SensorMsg): Promise<void> {
    if (hasKey(this.sensors, msg.id)) {
      const res = measResultFromMsg(msg);
      this.sensors[msg.id] = res;
      // Tmp. show and tell: store sensor data locally in UI.
      match(
        res,
        (ok) => {
          // Epa timestamp to seconds since started.
          const ts = (ok[1] - begOfTime) / 1000;
          const meas = ok[0];
          this.dummySensorTimeSeries = [...this.dummySensorTimeSeries, { x: ts, y: meas }];
        },
        () => {
          // If err, don't add
        }
      );
    } else {
      console.log("Incorrect sensor id", msg.id);
    }
  }

  public sensorVal(sensorId: string): MeasResult {
    let val: MeasResult = newMeasErr("Incorrect id", Date.now());
    if (hasKey(this.sensors, sensorId)) {
      val = this.sensors[sensorId];
    } else {
      console.log("Incorrect actor id", sensorId);
    }
    return val;
  }

  public async updateActor(msg: ActorMsg): Promise<void> {
    if (hasKey(this.actors, msg.signal.id)) {
      this.actors[msg.signal.id] = actorResultFromMsg(msg);
    } else {
      console.log("Incorrect actor id", msg);
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
    // console.log("contr msg: ", msg);
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
