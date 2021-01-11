<template>
  <status-card :status="this.status" >
    <div class="flex flex-row justify-between w-full">
      <span class="font-semibold text-base">{{ actorId }}</span>
      <div>
        <status-ind :status="this.status" :size="4" />
      </div>
    </div>
    <div
      id="main-actor-value"
      class="flex flex-row justify-center items-center"
    >
      <div id="icon" class="pr-2 animate-pulse text-green-600">
        <SvgIcon name="power" size="7" />
      </div>
      <div class="flex text-3xl font-bold">
        <span class="">{{ actorSignalDisp }}%</span>
      </div>
    </div>
  </status-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { eventStore } from "@/store/events";
import StatusInd from "@/components/utils/StatusInd.vue";
import StatusCard from "@/components/utils/StatusCard.vue";
import SvgIcon from "@/components/symbols/SvgIcon.vue";
import { IndicatorType } from "@/utils";
import { match } from "@/models/result";

@Component({
  components: {
    StatusInd,
    StatusCard,
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
