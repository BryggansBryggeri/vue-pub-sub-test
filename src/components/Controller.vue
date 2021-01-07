<template>
  <div class="controller">
    <div class="rounded-xl bg-white dark:bg-blue-gray-900 p-4 shadow-lg py-4 flex flex-col">
      <div id="card-header" class="flex flex-row justify-between">
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
                <sensor :sensorId="controllerProps.sensorId" />
                <actor :actorId="controllerProps.actorId" />
                <div class="flex flex-row space-x-4 items-center">
                  <span class="text-xs font-semibold">Enable actor:</span>
                  <toggle :isRight="toggleRight" @toggleRight="setToggleRight($event)" />
                  <toggle-button v-bind:controllerId="controllerProps.id" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ControllerProps from "@/models/controllerProps";
import capitalizeFirstLetter from "@/utils";
import ToggleButton from "@/components/ToggleButton.vue";
import Toggle from "@/components/utils/Toggle.vue";
import Sensor from "@/components/Sensor.vue";
import Actor from "@/components/Actor.vue";

@Component({
  components: {
    ToggleButton,
    Toggle,
    Sensor,
    Actor,
  },
})
export default class Controller extends Vue {
  @Prop() controllerProps!: ControllerProps;

  get toggleRight(): boolean {
    return true;
  }

  get dispName(): string {
    return capitalizeFirstLetter(this.controllerProps.id);
  }
}
</script>
