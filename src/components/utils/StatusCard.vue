<template>
  <div
    class="rounded-lg space-y-4 border-2 dark:bg-blue-gray-800 p-2 min-h-20 h-full flex flex-col"
    :class="{
      'col-span-full': isFullWidth,
      'col-span-1': !isFullWidth,
      'bg-blue-gray-100 border-transparent': indType = 1,
      'bg-yellow-100 border-yellow-400': indType = 2,
      'bg-red-100 border-red-600': indType = 3,
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IndicatorType } from "@/utils";

@Component({
  components: {
  },
})
export default class StatusCard extends Vue {
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
