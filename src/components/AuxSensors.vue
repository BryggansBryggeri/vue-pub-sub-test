<template>
  <div class="aux-sensors">
    <div class="rounded-xl bg-white dark:bg-blue-gray-900 p-4 shadow-lg py-4 flex flex-col">
      <div id="card-header" class="flex flex-row justify-between">
        <span class="font-bold text-xl capitalize">Aux. sensors</span>
      </div>
      <div class="pt-6 w-full mx-auto">
        <div class="flex flex-wrap">
          <div class="w-full">
            <div class="space-y-3">
              <div id="6x6grid" class="mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">
                <sensor :sensorId="auxSensorsProps.sensorId" :target="dispAutoTarget" />
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

@Component({
  components: {
    OnOffToggle,
    ManAutoToggle,
    SvgIcon,
    Sensor,
  },
})
export default class AuxSensors extends Vue {
  @Prop() auxSensorsProps!: ControllerProps;

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
      eventStore.actorSignal(this.auxSensorsProps.actorId),
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
    eventbus.setTarget(this.auxSensorsProps.controllerId, newValue);
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
    return this.auxSensorsProps.controllerId;
  }

  created(): void {
    this.startController();
  }

  private async startController(): Promise<void> {
    eventbus.startController(this.auxSensorsProps, 0.0);
  }

  private contrStatus(): ContrResult {
    return eventStore.contrStatus(this.auxSensorsProps.controllerId);
  }

  private async toggleAuto(): Promise<void> {
    if (eventStore.natsClientStatus.valueOf() === NatsClientStatus.Ready.valueOf()) {
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
    const props = this.auxSensorsProps;
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
