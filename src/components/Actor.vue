<template>
  <!-- TODO: Unique id by actorId -->
  <div class="actor">
    <content
      class="rounded-lg space-y-4 border-2 dark:bg-blue-gray-800 p-2 min-h-20 flex flex-col"
      :class="{
        'col-span-full': isFullWidth,
        'col-span-1': !isFullWidth,
        'bg-blue-gray-100 border-transparent': status === 1,
        'bg-yellow-100 border-yellow-400': status === 2,
        'bg-red-100 border-red-600': status === 3,
      }"
    >
      <div class="flex flex-row justify-between w-full">
        <span class="font-semibold text-sm">{{ actorId }}</span>
        <div
          :class="{
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
            <!-- Issue -->
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
      <!-- TODO: Unique id by actorId -->
      <div id="main-actor-value" class="flex flex-row justify-center items-center">
        <div id="icon" class="pr-2 animate-pulse text-green-600">
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
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <div class="flex text-3xl font-bold">
          <span class="">{{ dispSignal }}%</span>
        </div>
      </div>
    </content>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { eventStore } from "@/store/events";

enum Success {
  Ok = 1,
  Issue = 2,
  Error = 3,
}

@Component({
  components: {},
})
export default class Actor extends Vue {
  @Prop() actorId!: string;

  private fullWidth = true;

  get isFullWidth(): boolean {
    return this.fullWidth;
  }

  get status(): Success {
    return Success.Ok;
  }

  get actorSignal(): number {
    return eventStore.actorSignal;
  }

  get dispSignal(): number {
    return Math.round(this.actorSignal * 100.0);
  }
}
</script>
