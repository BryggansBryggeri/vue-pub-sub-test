<template>
  <div
    class="rounded-lg space-y-3 border-2 dark:bg-blue-gray-800 p-2 flex flex-col"
    :class="{
      'col-span-full': isFullWidth,
      'col-span-1': !isFullWidth,
      'bg-blue-gray-100 border-transparent': indType === 1,
      'bg-yellow-100 border-yellow-400': indType === 2,
      'bg-red-100 border-red-600': indType === 3,
    }"
  >
    <div class="flex flex-row justify-between w-full">
      <div class="flex flex-col">
        <span class="font-semibold text-xxs capitalize">{{ typeOfCard }}</span>
        <span class="font-semibold text-sm">{{ name }}</span>
      </div>
      <div>
        <status-ind :status="this.status" :size="5" />
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import StatusInd from "@/components/utils/StatusInd.vue";
import { IndicatorType } from "@/utils";

@Component({
  components: {
    StatusInd,
  },
})
export default class StatusCard extends Vue {
  @Prop({ required: true }) readonly name!: string;

  @Prop({ required: true }) readonly typeOfCard!: string;

  @Prop({ required: true }) readonly status!: IndicatorType;

  @Prop({ default: false }) fullWidth!: boolean;

  get isFullWidth(): boolean {
    return this.fullWidth;
  }

  get indType(): IndicatorType {
    return this.status;
  }

  set indType(indType: IndicatorType) {
    // void
  }
}
</script>
