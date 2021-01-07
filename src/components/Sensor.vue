<template>
  <!-- TODO: Unique id by sensorId -->
  <div id="sensor">
    <content
      class="rounded-lg space-y-4 border-2 dark:bg-blue-gray-800 p-2 min-h-20 flex flex-col"
      :class="{
        'col-span-full': isFullWidth,
        'col-span-1': !isFullWidth,
        'bg-blue-gray-100 border-transparent': status === undefined,
        'bg-blue-gray-100 border-white': status === 1,
        'bg-yellow-100 border-yellow-400': status === 2,
        'bg-red-100 border-red-600': status === 3,
      }"
    >
      <div class="flex flex-row justify-between w-full">
        <span class="font-semibold text-sm">{{ this.sensorId }}</span>
        <div
          :class="{
            'text-green-600': status === undefined,
            'text-green-600': status === 1,
            'text-yellow-600': status === 2,
            'text-red-600': status === 3,
          }"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- error -->
            <path
              v-if="status === 3"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
            <!-- issue -->
            <path
              v-else-if="status === 2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
            <!-- Ok -->
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      </div>
      <!-- TODO: Unique id by sensorId -->
      <div id="main-sensor-value" class="flex flex-row justify-center items-center">
        <div id="icon" class="pr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" />
            <line x1="10" y1="9" x2="14" y2="9" />
          </svg>
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

enum Success {
  Ok = 1,
  Issue = 2,
  Error = 3,
}

@Component({
  components: {},
})
export default class Sensor extends Vue {
  @Prop() sensorId!: string;

  private showMore = false;

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
        console.log(ok);
        return ok[0].toFixed(2);
      },
      () => "--"
    );
  }
}
</script>
