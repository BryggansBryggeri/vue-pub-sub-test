import { Action, Module, VuexModule } from 'vuex-class-modules';
import store from '@/store';

@Module({ generateMutationSetters: true })
export class EventModule extends VuexModule {
  messages: string[] = [];

  @Action
  public async addMessage(msg: string): Promise<void> {
    this.messages = [...this.messages, msg];
  }
}

export const eventStore = new EventModule({ store, name: 'events' });
