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
        <div>
          <status-ind :status="this.status" :size="4" />
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
import StatusInd from "@/components/utils/StatusInd.vue";
import { IconName } from "@/utils";

enum Success {
  Ok = 1,
  Issue = 2,
  Error = 3,
}

@Component({
  components: {
    StatusInd,
  },
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
}
</script>
