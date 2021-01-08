<template>
  <div class="controller">
    <div class="rounded-xl bg-white dark:bg-blue-gray-900 p-4 shadow-lg py-4 flex flex-col">
      <div id="card-header" class="flex flex-row justify-between">
        <span class="font-bold text-xl">{{ dispName }}</span>
        <div class="text-green-600">
          <!--<StatusInd :status="this.status"/>-->
          <StatusInd :status="1" size="6" /> <!--Use for now until we get Vessel/controller Status -->
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
import StatusInd from "@/components/utils/StatusInd.vue";

@Component({
  components: {
    ToggleButton,
    Toggle,
    Sensor,
    Actor,
    StatusInd,
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
