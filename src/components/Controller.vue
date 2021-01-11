<template>
  <div class="controller">
    <div class="rounded-xl bg-white dark:bg-blue-gray-900 p-4 shadow-lg py-4 flex flex-col">
      <div id="card-header" class="flex flex-row justify-between">
        <span class="font-bold text-xl">{{ dispName }}</span>
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
                  class="rounded-lg space-y-4 col-span-full border-2 dark:bg-blue-gray-800 p-2 min-h-20 flex flex-col"
                  :class="{
                    'bg-blue-gray-100 border-transparent': status === 1,
                    'bg-yellow-100 border-yellow-400': status === 2,
                    'bg-red-100 border-red-600': status === 3,
                  }"
                >
                  <div class="flex flex-row justify-between w-full">
                    <span class="font-semibold text-sm">{{ dispName }} controller</span>
                    <div>
                      <status-ind :status="this.status" :size="4" />
                    </div>
                  </div>
                  <div id="ingredients" class="flex flex-col">
                    <div class="flex flex-col justify-left text-xs">
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

                  <div class="flex flex-col space-y-2">
                    <span class="text-sm">Controll:</span>
                    <div class="flex flex-row space-x-2 justify-center">
                      <span></span>
                      <!-- <toggle-2 :state="state" @toggleState="toggleState()"/> -->
                      <span>{{ target }}</span>
                      <toggle :state="isAuto" @click="toggleAuto" />
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
import { eventStore } from "@/store/events";
import { eventbus } from "@/eventbus";
import { match } from "@/models/result";
import { IndicatorType } from "@/utils";
import ToggleButton from "@/components/ToggleButton.vue";
import Toggle from "@/components/utils/Toggle.vue";
import Toggle2 from "@/components/utils/Toggle2.vue";
import Sensor from "@/components/Sensor.vue";
import Actor from "@/components/Actor.vue";
import StatusInd from "@/components/utils/StatusInd.vue";

@Component({
  components: {
    ToggleButton,
    Toggle,
    Toggle2,
    Sensor,
    Actor,
    StatusInd,
  },
})
export default class Controller extends Vue {
  @Prop() controllerProps!: ControllerProps;

  private isStarted = false;

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

  private contrStatus(): ContrResult {
    return eventStore.contrStatus(this.controllerProps.controllerId);
  }

  private toggleAuto(): void {
    if (eventbus.ready() && this.isStarted) {
      eventbus.switchController(this.toggledProps());
    } else {
      console.log("Starting controller: ", this.controllerProps.controllerId);
      eventbus.startController(this.controllerProps);
      this.isStarted = true;
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
