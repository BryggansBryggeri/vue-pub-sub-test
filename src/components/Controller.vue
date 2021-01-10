<template>
  <div class="controller">
    <div class="rounded-xl bg-white dark:bg-blue-gray-900 p-4 shadow-lg py-4 flex flex-col">
      <div id="card-header" class="flex flex-row justify-between">
        <span class="font-bold text-xl capitalize">{{ dispName }}</span>
        <div class="text-green-600">
          <!--<StatusInd :status="this.status"/>-->
          <StatusInd :status="status" size="6" />
          <!--Use for now until we get Vessel/controller Status -->
        </div>
      </div>
      <div class="pt-6 w-full mx-auto">
        <div class="flex flex-wrap">
          <div class="w-full">
            <div class="space-y-3">
              <div id="6x6grid" class="mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">
                <sensor :sensorId="controllerProps.sensorId" />
                <actor :actorId="controllerProps.actorId" />
                <content
                  id="ControllerCard"
                  class="rounded-lg space-y-2 col-span-full pb-10 border-2 dark:bg-blue-gray-800 p-2 min-h-20 flex flex-col"
                  :class="{
                    'bg-blue-gray-100 border-transparent': status === 1,
                    'bg-yellow-100 border-yellow-400': status === 2,
                    'bg-red-100 border-red-600': status === 3,
                  }"
                >
                  <div class="flex flex-row justify-between w-full">
                    <span class="font-semibold text-lg capitalize">{{ dispName }} controller</span>
                    <div>
                      <status-ind :status="this.status" :size="4" />
                    </div>
                  </div>
                  <div id="ingredients" class="flex flex-col">
                    <div class="flex flex-col space-y-1 justify-left text-xxs">
                      <div class="flex flex-row">
                        <span class="pr-1 font-semibold">Controller sensor:</span
                        ><span class="">{{ controllerProps.sensorId }}</span>
                      </div>
                      <div class="flex flex-row">
                        <span class="pr-1 font-semibold">Controller actor:</span
                        ><span class="">{{ controllerProps.actorId }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col pt-4 space-y-2">
                    <div class="flex flex-col space-x-2 justify-center items-center">
                      <man-auto-toggle :state="isAuto" @click="toggleAuto" />
                    </div>
                    <div v-if="isAuto">
                      <div class="flex flex-row justify-between w-full">
                        <span class="font-semibold text-base">Manual Controll</span>
                      </div>
                      <div class="flex flex-row justify-between items-center">
                        <div id="icon" class="pr-2 animate-pulse text-green-600">
                          <SvgIcon name="power" size="7" />
                        </div>
                        <div class="flex text-3xl font-bold">
                          <span class="">{{ actorSignalDisp }}%</span>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      Manuellt läge

                      <div class="flex flex-row justify-around">
                        <div
                          class="shadow bg-blue-gray-700 p-5 rounded-lg flex flex-col items-center justify-center"
                        >
                          <span>Current Power</span>
                          <span class="text-3xl">80%</span>
                          <span>Adjust</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </content>
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
import ControllerProps from "@/models/controller";
import { IndicatorType, ToggleType } from "@/utils";
import ToggleButton from "@/components/ToggleButton.vue";
import Toggle from "@/components/utils/Toggle.vue";
import OnOffToggle from "@/components/toggles/OnOffToggle.vue";
import ManAutoToggle from "@/components/toggles/ManAutoToggle.vue";
import Toggle2 from "@/components/utils/Toggle2.vue";
import Sensor from "@/components/Sensor.vue";
import Actor from "@/components/Actor.vue";
import StatusInd from "@/components/utils/StatusInd.vue";

@Component({
  components: {
    ToggleButton,
    OnOffToggle,
    ManAutoToggle,
    Toggle,
    Toggle2,
    Sensor,
    Actor,
    StatusInd,
  },
})
export default class Controller extends Vue {
  @Prop() controllerProps!: ControllerProps;

  private autoState = false;

  private autoStateOther = false;

  get isAuto(): boolean {
    return this.autoState;
  }

  get isAutoOther(): boolean {
    return this.autoStateOther;
  }

  private toggleAuto(): void {
    this.autoState = !this.autoState;
  }

  private toggleAutoOther(): void {
    this.autoStateOther = !this.autoStateOther;
  }

  get status(): IndicatorType {
    return IndicatorType.Ok;
  }

  get dispName(): string {
    return this.controllerProps.id;
  }
}
</script>
