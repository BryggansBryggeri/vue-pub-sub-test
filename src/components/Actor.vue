<template>
  <!-- TODO: Unique id by actorId -->
  <content
    class="rounded-lg space-y-4 border-2 dark:bg-blue-gray-800 p-2 min-h-20 h-full flex flex-col"
    :class="{
      'col-span-full': isFullWidth,
      'col-span-1': !isFullWidth,
      'bg-blue-gray-100 border-transparent': status === 1,
      'bg-yellow-100 border-yellow-400': status === 2,
      'bg-red-100 border-red-600': status === 3,
    }"
  >
    <div class="flex flex-row justify-between w-full">
      <span class="font-semibold text-base">{{ actorId }}</span>
      <div>
        <status-ind :status="this.status" :size="4" />
      </div>
    </div>
    <!-- TODO: Unique id by actorId -->
    <div id="main-actor-value" class="flex flex-row justify-center items-center">
      <div id="icon" class="pr-2 animate-pulse text-green-600">
        <SvgIcon name="power" size="7" />
      </div>
      <div class="flex text-3xl font-bold">
        <span class="">{{ actorSignalDisp }}%</span>
      </div>
    </div>
  </content>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { eventStore } from "@/store/events";
import StatusInd from "@/components/utils/StatusInd.vue";
import Toggle from "@/components/utils/Toggle.vue";
import SvgIcon from "@/components/symbols/SvgIcon.vue";
import { IndicatorType } from "@/utils";
import { match } from "@/models/result";

@Component({
  components: {
    StatusInd,
    Toggle,
    SvgIcon,
  },
})
export default class Actor extends Vue {
  @Prop() actorId!: string;

  private fullWidth = false;

  get isFullWidth(): boolean {
    return this.fullWidth;
  }

  get status(): IndicatorType {
    return match(
      eventStore.actorSignal(this.actorId),
      () => IndicatorType.Ok,
      () => IndicatorType.Error
    );
  }

  get actorSignalDisp(): string {
    return match(
      eventStore.actorSignal(this.actorId),
      (ok) => {
        return `${Math.round(100 * ok[0])}`;
      },
      () => "--"
    );
  }
}
</script>
