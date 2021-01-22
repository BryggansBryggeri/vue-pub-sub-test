<template>
  <div class="controller">
    <div
      class="rounded-xl bg-white dark:bg-blue-gray-900 p-4 shadow-lg py-4 flex flex-col"
    >
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
              <div
                id="6x6grid"
                class="mx-auto grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                <sensor
                  :sensorId="controllerProps.sensorId"
                  :target="dispAutoTarget"
                />
                <actor
                  :actorId="controllerProps.actorId"
                  :mode="mode"
                  :signal="dispActorSignal"
                />
                <content
                  id="ControllerCard"
                  class="rounded-lg space-y-2 col-span-full border-2 dark:bg-blue-gray-800 p-2 min-h-20 flex flex-col"
                  :class="{
                    'bg-blue-gray-100 border-transparent': status === 1,
                    'bg-yellow-100 border-yellow-400': status === 2,
                    'bg-red-100 border-red-600': status === 3,
                  }"
                >
                  <div class="flex flex-row justify-between w-full">
                    <span class="font-semibold text-lg capitalize"
                      >{{ dispName }} controller</span
                    >
                    <div>
                      <status-ind :status="this.status" :size="5" />
                    </div>
                  </div>
                  <div id="ingredients" class="flex flex-col">
                    <div class="flex flex-col space-y-1 justify-left text-xxs">
                      <div class="flex flex-row">
                        <span class="pr-1 font-semibold"
                          >Controller sensor:</span
                        ><span class="">{{ controllerProps.sensorId }}</span>
                      </div>
                      <div class="flex flex-row">
                        <span class="pr-1 font-semibold">Controller actor:</span
                        ><span class="">{{ controllerProps.actorId }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col space-y-2">
                    <div
                      class="flex flex-col space-x-2 justify-center items-center"
                    >
                      <man-auto-toggle
                        :state="isAuto"
                        :disabled="currentlySwitchingMode"
                        @click="toggleAuto"
                      />
                    </div>
                    <div v-if="isAuto">
                      <div class="flex flex-row items-center">
                        <div class="flex flex-col w-full items-center">
                          <div class="flex flex-col text-xs py-2">
                            <button
                              class="py-2 px-8 bg-purple-500 text-white rounded-lg shadow-lg font-semibold outline-none ring-0 focus:outline-none focus:ring-0 hover:bg-purple-400 hover:scale-105 transform duration-75 ease-in-out "
                              @click="autoModalVisible = true"
                            >
                              Set target temperature
                            </button>
                            <!-- TODO: Fix the input :currentPower -->
                            <div v-if="autoModalVisible">
                              <AutoModal
                                :isVisible="autoModalVisible"
                                :currentPower="Number(dispAutoTarget)"
                                @cancel="autoModalVisible = false"
                                @confirm="setAutoTarget($event)"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <div class="flex flex-row items-center">
                        <div class="flex flex-col w-full items-center">
                          <div class="flex flex-col text-xs py-2">
                            <button
                              class="py-2 px-8 bg-purple-500 text-white rounded-lg shadow-lg font-semibold outline-none ring-0 focus:outline-none focus:ring-0 hover:bg-purple-400 hover:scale-105 transform duration-75 ease-in-out "
                              @click="modalVisible = true"
                            >
                              Set power percentage
                            </button>
                            <!-- TODO: Fix the input :sliderVal -->
                            <div v-if="modalVisible">
                              <ManualModal
                                :isVisible="modalVisible"
                                :sliderVal="dispManTarget"
                                @cancel="modalVisible = false"
                                @confirm="setManTarget($event)"
                              />
                            </div>
                          </div>
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
import {
  typeFromMode,
  ControllerProps,
  ContrResult,
  Target,
  Mode,
} from "@/models/controller";
import SvgIcon from "@/components/symbols/SvgIcon.vue";
import { eventStore, NatsClientStatus } from "@/store/events";
import { eventbus } from "@/eventbus";
import { match } from "@/models/result";
import { IndicatorType } from "@/utils";
import OnOffToggle from "@/components/toggles/OnOffToggle.vue";
import ManAutoToggle from "@/components/toggles/ManAutoToggle.vue";
import Sensor from "@/components/Sensor.vue";
import Actor from "@/components/Actor.vue";
import ManualModal from "@/components/utils/ManualModal.vue";
import AutoModal from "@/components/utils/AutoModal.vue";
import StatusInd from "@/components/utils/StatusInd.vue";
import VueSlider from "vue-slider-component";

@Component({
  components: {
    VueSlider,
    OnOffToggle,
    ManAutoToggle,
    SvgIcon,
    Sensor,
    Actor,
    ManualModal,
    AutoModal,
    StatusInd,
  },
})
export default class Controller extends Vue {
  @Prop() controllerProps!: ControllerProps;

  private isStarted = false;

  private autoState = false;

  private currentlySwitchingMode = false;

  private modalVisible = false;

  private autoModalVisible = false;

  private latentAutoTarget: Target | "--" = "--";

  get status(): IndicatorType {
    return IndicatorType.Ok;
  }

  get isAuto(): boolean {
    return match(
      this.contrStatus(),
      (ok) => {
        return ok.mode !== Mode.Man;
      },
      () => {
        console.log("Controller status is Err. Setting 'isAuto = false'");
        return false;
      }
    );
  }

  get dispActorSignal(): string {
    return match(
      eventStore.actorSignal(this.controllerProps.actorId),
      (ok) => {
        return `${Math.round(100 * ok[0])}`;
      },
      () => "--"
    );
  }

  get dispAutoTarget(): Target | "--" {
    if (this.mode.valueOf() === Mode.Auto.valueOf()) {
      return this.target;
    }
    return this.latentAutoTarget;
  }

  get dispManTarget(): Target | "--" {
    return this.target;
  }

  private setAutoTarget(newTarget: Target) {
    if (this.mode.valueOf() === Mode.Auto.valueOf()) {
      this.latentAutoTarget = newTarget;
    } else {
      console.log("setAutoTarget called in auto mode");
    }
    this.setTarget(newTarget);
  }

  private setManTarget(newTarget: Target) {
    this.setTarget(newTarget);
  }

  private setTarget(newValue: Target) {
    // TODO: Fix this fulhack
    this.modalVisible = false;
    this.autoModalVisible = false;
    eventbus.setTarget(this.controllerProps.controllerId, newValue);
  }

  get target(): Target | "--" {
    return match(
      this.contrStatus(),
      (ok) => {
        // TODO: Why is this cast needed?
        return ok.target as Target | "--";
      },
      () => {
        return "--";
      }
    );
  }

  get mode(): Mode {
    return match(
      this.contrStatus(),
      (ok) => {
        return ok.mode;
      },
      () => {
        console.log("Controller status is Err. Setting 'mode = Mode.Man'");
        return Mode.Man;
      }
    );
  }

  get dispName(): string {
    return this.controllerProps.controllerId;
  }

  created(): void {
    this.startController();
  }

  private async startController(): Promise<void> {
    eventbus.startController(this.controllerProps, 0.0);
  }

  private contrStatus(): ContrResult {
    return eventStore.contrStatus(this.controllerProps.controllerId);
  }

  private async toggleAuto(): Promise<void> {
    if (
      eventStore.natsClientStatus.valueOf() === NatsClientStatus.Ready.valueOf()
    ) {
      let newTarget: Target = 0.0;
      if (this.mode.valueOf() === Mode.Man.valueOf()) {
        if (this.latentAutoTarget !== "--") {
          newTarget = this.latentAutoTarget;
        }
      }

      this.currentlySwitchingMode = true;
      await eventbus.switchController(this.toggledProps(), newTarget);
      this.currentlySwitchingMode = false;
    } else {
      console.log("Could not toggle. NATS client not ready");
    }
  }

  private toggledProps(): ControllerProps {
    const props = this.controllerProps;
    return {
      controllerId: props.controllerId,
      sensorId: props.sensorId,
      actorId: props.actorId,
      type: typeFromMode(this.toggleMode(this.mode)),
    };
  }

  private toggleMode(mode: Mode): Mode {
    switch (mode) {
      case Mode.Man:
        return Mode.Auto;
      case Mode.Auto:
        return Mode.Man;
      default:
        throw new Error("Uncreachable toggle mode");
    }
  }
}
</script>
