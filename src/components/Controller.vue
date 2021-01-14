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
                  class="rounded-lg space-y-2 col-span-full pb-4 border-2 dark:bg-blue-gray-800 p-2 min-h-20 flex flex-col"
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
                      <man-auto-toggle
                        :state="isAuto"
                        :disabled="currentlySwitchingMode"
                        @click="toggleAuto"
                      />
                    </div>
                    <div v-if="isAuto">
                      <div class="flex flex-row items-center">
                        <div class="flex flex-col w-full items-center">
                          <div class="flex flex-col text-xs py-4">
                            <button
                              class="py-2 px-8 bg-purple-500 rounded-lg shadow-lg font-semibold outline-none ring-0 focus:outline-none focus:ring-0"
                              @click="autoModalVisible = true"
                            >
                              Set new target
                            </button>

                            <AutoModal
                              :isVisible="autoModalVisible"
                              :sliderVal="parseInt(actorSignalDisp)"
                              @cancel="autoModalVisible = false"
                              @confirm="sendUpdateRequest($event)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <div class="flex flex-row items-center">
                        <div class="flex flex-col w-full items-center">
                          <div class="flex flex-col text-xs py-4">
                            <button
                              class="py-2 px-8 bg-purple-500 rounded-lg shadow-lg font-semibold outline-none ring-0 focus:outline-none focus:ring-0"
                              @click="modalVisible = true"
                            >
                              Set new target
                            </button>

                            <ManualModal
                              :isVisible="modalVisible"
                              :sliderVal="parseInt(actorSignalDisp)"
                              @cancel="modalVisible = false"
                              @confirm="sendUpdateRequest($event)"
                            />
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
import { typeFromMode, ControllerProps, ContrResult, Target, Mode } from "@/models/controller";
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

  get actorSignalDisp(): string {
    return match(
      eventStore.actorSignal(this.controllerProps.actorId),
      (ok) => {
        return `${Math.round(100 * ok[0])}`;
      },
      () => "--"
    );
  }

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
        throw new Error("isAuto received error val");
      }
    );
  }

  get target(): Target {
    return match(
      this.contrStatus(),
      (ok) => {
        return ok.target;
      },
      () => {
        throw new Error("target received error val");
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
        throw new Error("mode received error val");
      }
    );
  }

  get dispName(): string {
    return this.controllerProps.controllerId;
  }

  created(): void {
    this.startController();
  }

  private sendUpdateRequest(newValue: number) {
    console.log("sendUpdateRequest ran");
    console.log(newValue);
    // SKICAK TILL VUEX
    this.modalVisible = false;
  }

  private async startController(): Promise<void> {
    eventbus.startController(this.controllerProps);
  }

  private contrStatus(): ContrResult {
    return eventStore.contrStatus(this.controllerProps.controllerId);
  }

  private async toggleAuto(): Promise<void> {
    if (eventStore.natsClientStatus.valueOf() === NatsClientStatus.Ready.valueOf()) {
      this.currentlySwitchingMode = true;
      await eventbus.switchController(this.toggledProps());
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
