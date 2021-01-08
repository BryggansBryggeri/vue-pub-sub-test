<template>
  <!-- TODO: Unique id by sensorId -->
  <div class="sensor">
    <content
      class="rounded-lg space-y-4 border-2 dark:bg-blue-gray-800 p-2 min-h-20 flex flex-col"
      :class="{
        'col-span-full': isFullWidth,
        'col-span-1': !isFullWidth,
        'bg-blue-gray-100 border-transparent': status === undefined,
        'bg-blue-gray-100 border-transparent': status === 1,
        'bg-yellow-100 border-yellow-400': status === 2,
        'bg-red-100 border-red-600': status === 3,
      }"
    >
      <div class="flex flex-row justify-between w-full">
        <span class="font-semibold text-sm">{{ this.sensorId }}</span>
        <div>
          <status-ind :status="this.status" :size="4" />
        </div>
      </div>
      <!-- TODO: Unique id by sensorId -->
      <div id="main-sensor-value" class="flex flex-row justify-center items-center">
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
          <span v-if="showMore">Show less</span>
          <span v-else>Show more</span>
          <svg
            class="w-4 h-4 transform transition duration-200 ease-in-out"
            :class="{ 'rotate-90': showMore }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
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
          <div><span class="font-extrabold">72,2</span><span>&#8451;</span></div>
        </div>
        <div class="font-normal">
          <span>Diff:</span>
          <div><span class="font-extrabold">-4,1</span><span>&#8451;</span></div>
        </div>

        <div class="">
          <span class="font-normal">RoC:</span>
          <div><span class="font-extrabold">1,27</span><span>&#8451;/min</span></div>
        </div>
      </div>
    </content>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { eventStore } from "@/store/events";
import { match } from "@/models/result";
import SvgIcon from "@/components/symbols/SvgIcon.vue";
import StatusInd from "@/components/utils/StatusInd.vue";
import { IconName } from "@/utils";

enum Success {
  Ok = 1,
  Issue = 2,
  Error = 3,
}

@Component({
  components: {
    SvgIcon,
    StatusInd
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

  get iconType(): IconName {
    switch (this.status) {
      case Success.Ok:
        return "check";
      case Success.Issue:
        return "exclamation";
      case Success.Error:
        return "cross";
      default:
        console.log("Unreachable iconType");
        return "cross";
    }
  }

  get sensorMeasDisp(): string {
    return match(
      eventStore.sensorVal(this.sensorId),
      (ok) => {
        console.log(ok);
        return ok[0].toFixed(2);
      },
      () => "--"
    );
  }
}
</script>
