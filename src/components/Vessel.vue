<template>
  <div class="rounded-xl bg-white dark:bg-blue-gray-900 p-4 shadow-lg py-4 flex flex-col">
    <div id="CardHeader" class="flex flex-row justify-between">
      <span class="font-bold text-xl">{{ dispName }}</span>
      <div class="text-green-600">
        <svg
          class="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
    </div>

    <div class="pt-6 w-full mx-auto">
      <div class="flex flex-wrap">
        <div class="w-full">
          <div class="space-y-3">
            <div id="6x6grid" class="mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">
              <SvgIcon name="exclamation" :size="4" />
              <Sensor :sensorId="vesselProp.mainSensor" />

              <content
                id="actorCard"
                class="rounded-lg space-y-4 border-2 dark:bg-blue-gray-800 p-2 min-h-20 flex flex-col"
                :class="{
                  'col-span-full': fullWidth,
                  'col-span-1': !fullwidth,
                  'bg-blue-gray-100 border-transparent': issue === undefined,
                  'bg-blue-gray-100 border-transparent': issue === 1,
                  'bg-yellow-100 border-yellow-400': issue === 2,
                  'bg-red-100 border-red-600': issue === 3,
                }"
              >
                <div class="flex flex-row justify-between w-full">
                  <span class="font-semibold text-sm">{{ vesselProp.mainActor }}</span>
                  <span class="font-semibold text-sm">{{ vesselProp.vesselController }}</span>
                  <div
                    :class="{
                      'text-green-600': issue === undefined,
                      'text-green-600': issue === 1,
                      'text-yellow-600': issue === 2,
                      'text-red-600': issue === 3,
                    }"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <!-- error -->
                      <path
                        v-if="issue === 3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                      <!-- Issue -->
                      <path
                        v-else-if="issue === 2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                      <!-- Ok -->
                      <path
                        v-else
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div id="Main Sensor Value" class="flex flex-row justify-center items-center">
                  <div id="icon" class="pr-2 animate-pulse text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-7 w-7"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                  </div>
                  <div class="flex text-3xl font-bold">
                    <span class="">{{ dispManualPower }}%</span>
                  </div>
                </div>
                <div class="flex flex-row space-x-4 items-center">
                  <span class="text-xs font-semibold">Enable actor:</span>
                  <Toggle :isRight="toggleRight" @toggleRight="setToggleRight($event)" />
                  <ToggleButton v-bind:controllerId="vesselProp.id" />
                </div>
              </content>
            </div>
          </div>
        </div>
      </div>
    </div>

    <header
      id="CardSubHeader"
      class="pt-5 items-center flex flex-row justify-between cursor-pointer"
      @click="showMore = !showMore"
    >
      <span class="font-bold text-sm">Show other sensor readings</span>
      <svg
        class="w-4 h-4 transform transition duration-200 ease-in-out"
        :class="{ 'rotate-90': showMore }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
      <!-- <Toggle :isRight="toggleRight" @toggleRight="setToggleRight($event)" /> -->
    </header>
    <div v-if="showMore" class="flex flex-row">
      <div class="w-full h-full overflow-x-hidden">
        <table class="w-full space-y-2 shadow text-left">
          <thead class="text-xs font-medium">
            <tr class="border-b">
              <th class="w-1/4">Sensor ID</th>
              <th class="w-1/4">Type</th>
              <th class="w-1/4">Reading</th>
              <th class="w-1/4">Status</th>
            </tr>
          </thead>
          <tbody class="text-xs">
            <tr>
              <td class="">Mash Bottom</td>
              <td class="">DS18B20</td>
              <td class="">57&#8451;</td>
              <td class="text-green-400">Ok</td>
            </tr>
            <tr class="bg-gray-100 dark:bg-blue-gray-800">
              <td class="">Mash Bottom</td>
              <td class="">DS18B20</td>
              <td class="">57&#8451;</td>
              <td class="text-green-400">Ok</td>
            </tr>
            <tr>
              <td class="">Mash Bottom</td>
              <td class="">DS18B20</td>
              <td class="">57&#8451;</td>
              <td class="text-green-400">Ok</td>
            </tr>
            <tr class="bg-gray-100 dark:bg-blue-gray-800">
              <td class="">Mash Bottom</td>
              <td class="">DS18B20</td>
              <td class="">57&#8451;</td>
              <td class="text-green-400">Ok</td>
            </tr>
            <tr>
              <td class="">Mash Bottom</td>
              <td class="">DS18B20</td>
              <td class="">57&#8451;</td>
              <td class="text-green-400">Ok</td>
            </tr>
            <tr class="bg-gray-100 dark:bg-blue-gray-800">
              <td class="">Mash Bottom</td>
              <td class="">DS18B20</td>
              <td class="">57&#8451;</td>
              <td class="text-green-400">Ok</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<!-- <script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Emit, Prop } from "vue-property-decorator";
import Sensorcard from "../components/subcomponents/Sensorcard.vue";
import Actorcard from "../components/subcomponents/Actorcard.vue";
import Toggle from "../components/utils/Toggle.vue";

@Options({
  components: {
    Sensorcard,
    Actorcard,
    Toggle,
  },
})
export default class Vessel extends Vue {
  @Prop() fullWidth!: boolean;
  @Prop() issue!: number;

  private toggleRight = false;

  private setToggleRight(isRight: boolean) {
    this.toggleRight = isRight;
  }
}
</script> -->

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { eventStore } from "@/store/events";
import { eventbus } from "@/eventbus";
import VesselProp from "@/models/vesselProps";
import capitalizeFirstLetter from "@/utils";
import ToggleButton from "@/components/ToggleButton.vue";
import Toggle from "@/components/utils/Toggle.vue";
import Sensor from "@/components/Sensor.vue";
import SvgIcon from "@/components/symbols/SvgIcon.vue";

@Component({
  components: {
    ToggleButton,
    Toggle,
    SvgIcon,
    Sensor,
  },
})
export default class Vessel extends Vue {
  private showMore = false;

  private fullWidth = true;

  private manualPower = 0.0;

  private vesselStatus = 1; // Todo

  private error = false;

  private tooltip = false; // Todo

  @Prop() vesselProp!: VesselProp;

  toggleTooltip() {
    this.tooltip = !this.tooltip;
  }

  get dispManualPower(): number {
    return Math.round(this.actorSignal * 100.0);
  }

  get dispName(): string {
    return capitalizeFirstLetter(this.vesselProp.id);
  }

  get powerColor(): string {
    const color = this.actorSignal > 0.0 ? "green" : "gray";
    const classColor = `bg-${color}-500`;
    return classColor;
  }

  get messages(): string[] {
    return eventStore.messages;
  }

  get actorSignal(): number {
    return eventStore.actorSignal;
  }

  addMessage(): void {
    const json = JSON.parse('{"id": "mash", "cmd": "test"}');
    eventbus.publish("ext_comm.ui.test", json);
    console.log(`Current actor signal ${this.actorSignal}`);
  }
}
</script>
