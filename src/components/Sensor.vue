<template>
  <!-- TODO: Unique id by sensorId -->
  <div class="sensor">
    <status-card :status="this.status" :name="sensorId">
      <!-- TODO: Unique id by sensorId -->
      <div
        id="main-sensor-value"
        class="flex flex-row justify-center items-center"
      >
        <div id="icon" class="pr-2">
          <SvgIcon name="temp" size="7" />
        </div>
        <div class="text-3xl font-bold">
          <span>{{ sensorMeasDisp }}</span
          ><span>&#8451;</span>
        </div>
      </div>
      <div class="flex flex-row justify-end text-xs">
        <div class="cursor-pointer flex flex-row" @click="showMore = !showMore">
          <div class="flex flex-row">
            <span v-if="showMore">Show less</span>
            <span v-else>Show less</span>
            <svg-icon
              class="transform transition duration-200 ease-in-out"
              :class="{ 'transform rotate-90': showMore }"
              name="chevronRight"
              size="4"
            />
          </div>
        </div>
      </div>
      <div
        v-if="showMore"
        class="w-full text-xs mx-auto grid gap-x-1 gap-y-3"
        :class="{
          'grid-cols-3 sm:grid-cols-3 place-items-center': isFullWidth,
          'grid-cols-2 sm:grid-cols-2': !isFullWidth,
        }"
      >
        <div class="">
          <span class="font-normal">Target:</span>
          <div>
            <span class="font-extrabold">72,2</span><span>&#8451;</span>
          </div>
        </div>
        <div class="font-normal">
          <span>Diff:</span>
          <div>
            <span class="font-extrabold">-4,1</span><span>&#8451;</span>
          </div>
        </div>

        <div class="">
          <span class="font-normal">RoC:</span>
          <div>
            <span class="font-extrabold">1,27</span><span>&#8451;/min</span>
          </div>
        </div>
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
import StatusCard from "@/components/utils/StatusCard.vue";

enum Success {
  Ok = 1,
  Issue = 2,
  Error = 3,
}

@Component({
  components: {
    SvgIcon,
    StatusInd,
    StatusCard,
  },
})
export default class Sensor extends Vue {
  @Prop() sensorId!: string;

  private showMore = false;

  private target = 68.7; // Subscribe to Controller.Actor.Target ?

  private fullWidth = true;

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
