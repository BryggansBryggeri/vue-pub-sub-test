<template>
  <status-card :status="this.status" typeOfCard="actor" :name="'actorId'"> <!-- TODO something not working here -->
    <div id="main-actor-value" class="flex flex-row justify-left items-center">
      <div id="icon" class="pr-2">
        <div v-if="power"><!-- play -->
          <svg
            class="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div v-else> <!-- stopp -->
          <svg
            class="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
            ></path>
          </svg>
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
export default class SimpleActor extends Vue {
  @Prop() actorId!: string;

  @Prop() mode!: Mode; // Should probably not come in as a veriable but get read from eventbus?

  @Prop() signal!: Target; // Should probably not come in as a veriable but get read from eventbus?

  @Prop() power!: boolean;

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
