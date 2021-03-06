<template>
  <!-- TODO: Unique id by sensorId -->
  <status-card :status="this.status" typeOfCard="sensor" :name="sensorId">
    <!-- TODO: Unique id by sensorId -->
    <div id="main-sensor-value" class="flex flex-row justify-left items-center">
      <div id="icon" class="pr-2">
        <svg-icon name="temp" size="9" />
      </div>
      <div class="flex flex-col">
        <div class="text-3xl font-bold space-x-1">
          <span class="font-mono min-w-max">{{ sensorMeasDisp }}</span
          ><span>&#8451;</span>
        </div>
        <div class="flex flex-row text-sm items-center align-text-bottom space-x-2">
          <span class="">Target:</span>

          <span class="font-extrabold font-mono -mb-px">{{ target }}</span
          ><span>&#8451;</span>
        </div>
      </div>
    </div>
    <error-msg :msg="errMsg" />
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

    <div class="flex flex-row justify-center" cursor-pointer @click="isMore = !isMore">
      <show-more :isMore="isMore" />
    </div>
  </status-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { eventStore } from "@/store/events";
import { match } from "@/models/result";
import { MeasResult } from "@/models/sensor";
import SvgIcon from "@/components/symbols/SvgIcon.vue";
import StatusInd from "@/components/utils/StatusInd.vue";
import ErrorMsg from "@/components/utils/ErrorMsg.vue";
import ShowMore from "@/components/toggles/ShowMore.vue";
import StatusCard from "@/components/layouts/StatusCard.vue";
import { Target } from "@/models/controller";

enum Success {
  Ok = 1,
  Issue = 2,
  Error = 3,
}

@Component({
  components: {
    ErrorMsg,
    ShowMore,
    SvgIcon,
    StatusInd,
    StatusCard,
  },
})
export default class Sensor extends Vue {
  @Prop() sensorId!: string;

  @Prop() target!: Target | "--";

  private isMore = false;

  get diffDisp(): number {
    return 13;
  }

  get rocDisp(): number {
    return 13;
  }

  get status(): Success {
    return match(
      this.sensorVal,
      () => Success.Ok,
      () => Success.Error
    );
  }

  get errMsg(): string | null {
    return match(
      this.sensorVal,
      () => null,
      (err) => err[0]
    );
  }

  get sensorVal(): MeasResult {
    return eventStore.sensorVal(this.sensorId);
  }

  get sensorMeasDisp(): string {
    return match(
      this.sensorVal,
      (ok) => {
        return ok[0].toFixed(2);
      },
      () => "--"
    );
  }
}
</script>
