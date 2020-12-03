import { Action, Module, VuexModule } from "vuex-class-modules";
import store from "@/store";

@Module({ generateMutationSetters: true })
export class EventModule extends VuexModule {
  messages: string[] = [];

  sensorMeas = 0.0;

  actorSignal = 0.0;

  @Action
  public async addMessage(msg: string): Promise<void> {
    this.messages = [...this.messages, msg];
  }

  public async updateSensorMeas(meas: number): Promise<void> {
    this.sensorMeas = meas;
  }

  public async updateActorSignal(signal: number): Promise<void> {
    this.actorSignal = signal;
  }
}

export const eventStore = new EventModule({ store, name: "events" });
