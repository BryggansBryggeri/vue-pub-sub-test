<template>
  <div class="rounded shadow-lg border">
    <div class="mx-auto shadow rounded h-full w-full">
      <div
        class="flex flex-row bg-gray-200 bg-opacity-40 rounded-t justify-between w-full shadow-sm mb-2 px-4 py-2"
      >
        <div class="sm:w-3/5 mb-4 sm:mb-0">
          <h2 class="text-gray-800 text-lg font-bold">{{ vesselProp.name }}</h2>
          <p class="my-0 text-gray-600 text-xs">
            Main sensor: {{ vesselProp.mainSensor }}
          </p>
          <p class="my-0 text-gray-600 text-xs">
            Main actor: {{ vesselProp.mainActor }}
          </p>
        </div>
        <div class="flex text-green-600 rounded-tr">
          <div class="my-auto mx-auto">
            <svg
              class="h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                class="heroicon-ui"
                d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center p-3">
        <div class="flex w-full justify-between mb-8">
          <div class="flex flex-col items-center w-6/12">
            <p class="text-gray-600 text-sm mb-1">Current Temp</p>
            <p class="text-gray-800 text-4xl mb-2">
              {{ sensorMeasDisp }}&deg;C
            </p>
            <p class="text-gray-600 text-sm mb-1">Target Temp</p>
            <p class="text-gray-800 text-xl">{{ 80.0 }}&deg;C</p>
          </div>
          <div
            class="flex flex-col items-center w-6/12 border-l border-gray-200"
          >
            <p class="text-gray-600 text-sm mb-1">Controller</p>
            <p class="text-gray-800 text-4xl mb-2">Auto</p>
            <p class="text-gray-600 text-sm mb-1">Current Status</p>
            <div class="flex" flex-row>
              <p class="text-gray-800 text-xl">{{ dispManualPower }}%</p>
              <div
                class="h-4 w-4 shadow-lg my-auto mx-2 rounded-full animate-pulse"
                :class="powerColor"
              ></div>
            </div>
          </div>
          <hr class="mb-4 lg:mb-4 h-1 rounded bg-gray-200" />
        </div>
        <div>
          <div>
            <ToggleButton />
            <h1>status</h1>
            <h3>Dummy sensor: {{ sensorMeasDisp }}</h3>
            <button @click="addMessage('text')">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { eventStore } from "@/store/events";
import { eventbus } from "@/eventbus";
import VesselProp from "@/models";
import ToggleButton from "@/components/ToggleButton.vue";

@Component({
  components: {
    ToggleButton
  }
})
export default class Vessel extends Vue {
  private manualPower = 0.0;

  @Prop() vesselProp!: VesselProp;

  get dispManualPower(): number {
    return Math.round(this.actorSignal * 100.0);
  }

  get powerColor(): string {
    const color = this.actorSignal > 0.0? "green": "gray";
    const classColor = `bg-${color}-500`;
    return classColor
  }

  get messages(): string[] {
    return eventStore.messages;
  }

  get actorSignal(): number {
    return eventStore.actorSignal;
  }

  get sensorMeasDisp(): string {
    return eventStore.sensorMeas.toFixed(2);
  }

  addMessage(msg: string): void {
    const json = JSON.parse('{"id": "mash", "cmd": "test"}');
    eventbus.publish("ext_comm.ui.test", json);
    console.log(`Current actor signal ${this.actorSignal}`);
  }
}
</script>
