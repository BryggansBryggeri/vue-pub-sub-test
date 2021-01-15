<template>
  <!-- TODO: Unique id by sensorId -->
  <div class="sensor">
    <status-card :status="this.status" typeOfCard="sensor" :name="sensorId">
      <!-- TODO: Unique id by sensorId -->
      <div
        id="main-sensor-value"
        class="flex flex-row justify-left items-center"
      >
        <div id="icon" class="pr-2">
          <SvgIcon name="temp" size="9" />
        </div>
        <div class="flex flex-col">
          <div class="text-3xl font-bold">
            <span class="font-mono">{{ sensorMeasDisp }}</span
            ><span>&#8451;</span>
          </div>
          <div
            class="flex flex-row text-sm items-center align-text-bottom space-x-2"
          >
            <span class="">Target:</span>

            <span class="font-extrabold font-mono -mb-px">{{ target }}</span
            ><span>&#8451;</span>
          </div>
        </div>
      </div>
      <div v-if="isMore" class="flex flex-row w-full text-xxs justify-around">
        <div class="">
          <span class="font-normal">Diff:</span>
          <div class="">
            <span class="font-extrabold font-mono min-w-max">{{ diffDisp }}</span
            ><span>&#8451;</span>
          </div>
        </div>

        <div class="">
          <span class="font-normal">RoC:</span>
          <div class="">
            <span class="font-extrabold font-mono min-w-max">{{ rocDisp }}</span
            ><span>&#8451;/min</span>
          </div>
        </div>
      </div>
      <div
        class="flex flex-row justify-center"
        cursor-pointer
        @click="isMore = !isMore"
      >
        <ShowMore :isMore="isMore" />
      </div>
    </status-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { eventStore } from "@/store/events";
import { match } from "@/models/result";
import SvgIcon from "@/components/symbols/SvgIcon.vue";
import StatusInd from "@/components/utils/StatusInd.vue";
import ShowMore from "@/components/toggles/ShowMore.vue";
import StatusCard from "@/components/layouts/StatusCard.vue";
import {
  typeFromMode,
  ControllerProps,
  ContrResult,
  Target,
  Mode,
} from "@/models/controller";

enum Success {
  Ok = 1,
  Issue = 2,
  Error = 3,
}

@Component({
  components: {
    ShowMore,
    SvgIcon,
    StatusInd,
    StatusCard,
  },
})
export default class Sensor extends Vue {
  @Prop() sensorId!: string;
  
  @Prop() target!: Target;

  private isMore = false;

  private diff = (Number(this.sensorMeasDisp) - this.target).toFixed(2);

  private fullWidth = true;

  get diffDisp() {
    return (Number(this.sensorMeasDisp) - this.target).toFixed(2);
  }

  get rocDisp() {
    return 13;
  }

  get isFullWidth(): boolean {
    return this.fullWidth;
  }

  get status(): Success {
    return match(
      eventStore.sensorVal(this.sensorId),
      () => Success.Ok,
      () => Success.Error
    );
  }

  get sensorMeasDisp(): string {
    return match(
      eventStore.sensorVal(this.sensorId),
      (ok) => {
        return ok[0].toFixed(2);
      },
      () => "--"
    );
  }
}
</script>
