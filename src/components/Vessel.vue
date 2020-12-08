<template>
  <div class="rounded shadow-lg border">
    <div class="mx-auto shadow flex flex-col rounded space-y-4 h-full w-full">
      <!-- Header All Ok!-->
      <div
        v-if="vesselStatus == 1"
        class="flex flex-row bg-gray-200 bg-opacity-40 rounded-t justify-between w-full shadow-sm mb-2 px-4 py-2"
      >
        <div class="sm:w-3/5 mb-4 sm:mb-0">
          <h2 class="text-gray-800 text-lg font-bold">{{ dispName }}</h2>
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
      <!-- Header -->
      <!-- Header Issue-->
      <div
        v-else-if="vesselStatus == 2"
        class="flex flex-row bg-yellow-200 bg-opacity-40 rounded-t justify-between w-full shadow-sm mb-2 px-4 py-2"
      >
        <div class="sm:w-3/5 mb-4 sm:mb-0">
          <h2 class="text-gray-800 text-lg font-bold">{{ dispName }}</h2>
          <p class="my-0 text-gray-600 text-xs">
            Main sensor: {{ vesselProp.mainSensor }}
          </p>
          <p class="my-0 text-gray-600 text-xs">
            Main actor: {{ vesselProp.mainActor }}
          </p>
        </div>
        <div class="flex text-yellow-600 rounded-tr">
          <div class="my-auto mx-auto">
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <!-- Header -->
      <!-- Header Error-->
      <div
        v-else-if="vesselStatus == 3"
        class="flex flex-row bg-red-200 bg-opacity-40 rounded-t justify-between w-full shadow-sm mb-2 px-4 py-2"
      >
        <div class="sm:w-3/5 mb-4 sm:mb-0">
          <h2 class="text-gray-800 text-lg font-bold">{{ dispName }}</h2>
          <p class="my-0 text-gray-600 text-xs">
            Main sensor: {{ vesselProp.mainSensor }}
          </p>
          <p class="my-0 text-gray-600 text-xs">
            Main actor: {{ vesselProp.mainActor }}
          </p>
        </div>
        <div
          class="flex text-red-600 rounded-tr"
          @mouseover="toggleTooltip()"
          @mouseleave="toggleTooltip()"
        >
          <div class="relative mt-20 md:mt-0">
            <div
              id="tooltip1"
              role="tooltip"
              class="z-20 -left-1 transition duration-150 ease-in-out bottom-12 absolute shadow-lg border pt-4 pr-2 pl-3 pb-5 bg-white text-gray-600 rounded-lg w-40"
              :class="{'opacity-0': !tooltip }"
            >
              <svg
                class="absolute bottom-0 -mb-2"
                width="16px"
                height="8px"
                viewBox="0 0 16 8"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    id="Tooltips-"
                    transform="translate(-84.000000, -203.000000)"
                    fill="#FFFFFF"
                  >
                    <g
                      id="Group-3-Copy"
                      transform="translate(76.000000, 145.000000)"
                    >
                      <polygon
                        class="shadow"
                        id="Triangle"
                        transform="translate(16.000000, 62.000000) rotate(-180.000000) translate(-16.000000, -62.000000) "
                        points="16 58 24 66 8 66"
                      ></polygon>
                    </g>
                  </g>
                </g>
              </svg>
              <p class="text-xs text-gray-600 leading-4">
                This information will be used for personalization
              </p>
            </div>
          </div>
          <div class="my-auto mx-auto">
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <!-- Header -->
      <!-- Start Main Card Body -->
      <div class="flex flex-col items-center p-3">
        <div class="flex w-full justify-between">
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
      </div>
      <div
        class="flex flex-row bg-gray-100 bg-opacity-40 rounded-t justify-between w-full shadow-sm mb-2 px-4 py-2"
      >
        <div class="sm:w-3/5 mb-4 sm:mb-0">
          <h2 class="text-gray-800 text-lg font-bold truncate">
            {{ vesselProp.vesselController }}
          </h2>
        </div>
      </div>
      <div class="flex flex-col items-center p-3">
        <div class="flex w-full justify-center">
          <ToggleButton v-bind:controllerId="vesselProp.id" />
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { eventStore } from "@/store/events";
import { eventbus } from "@/eventbus";
import result from "@/pub_sub";
import VesselProp from "@/models/vesselProps";
import capitalizeFirstLetter from "@/utils";
import ToggleButton from "@/components/ToggleButton.vue";

@Component({
  components: {
    ToggleButton,
  },
})
export default class Vessel extends Vue {
  private manualPower = 0.0;

  private vesselStatus = 3; // Todo

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
