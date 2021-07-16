<template>
  <status-card :status="this.status" typeOfCard="actor" :name="actorId">
    <div id="main-actor-value" class="flex flex-row justify-left items-center">
      <div id="icon" class="pr-2">
        <SvgIcon name="power" size="9" />
      </div>
      <div class="flex flex-col">
        <div class="text-3xl font-bold space-x-1">
          <span class="font-mono min-w-max">{{ signal }}</span
          ><span>%</span>
        </div>
        <div class="flex flex-row text-sm items-center align-text-bottom space-x-2">
          <span class="">Control:</span>

          <span class="font-extrabold font-mono -mb-px">{{ currentMode }}</span>
        </div>
      </div>
    </div>
  </status-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { eventStore } from "@/store/events";
import StatusInd from "@/components/utils/StatusInd.vue";
import StatusCard from "@/components/layouts/StatusCard.vue";
import SvgIcon from "@/components/symbols/SvgIcon.vue";
import { IndicatorType } from "@/utils";
import { match } from "@/models/result";
import { Target, Mode } from "@/models/controller";

@Component({
  components: {
    StatusInd,
    StatusCard,
    SvgIcon,
  },
})
export default class Actor extends Vue {
  @Prop() actorId!: string;

  @Prop() mode!: Mode; // Should probably not come in as a veriable but get read from eventbus?

  @Prop() signal!: Target; // Should probably not come in as a veriable but get read from eventbus?

  get currentMode() {
    let disp!: string;
    if (this.mode === 0) {
      disp = "Manual";
    } else if (this.mode === 1) {
      disp = "Auto";
    } else {
      disp = "--";
    }
    return disp;
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
