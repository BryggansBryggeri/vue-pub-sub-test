<template>
  <div
    class="rounded-lg space-y-4 border-2 dark:bg-blue-gray-800 p-2 min-h-20 h-full flex flex-col"
    :class="{
      'col-span-full': fullWidth,
      'col-span-1': !fullWidth,
      'bg-blue-gray-100 border-transparent': isStatus === 1,
      'bg-yellow-100 border-yellow-400': isStatus === 2,
      'bg-red-100 border-red-600': isStatus === 3,
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
  @Prop({ required: true }) status!: number;

  @Prop({ default: false }) fullWidth!: boolean;

  get isStatus(): number {
      return this.status
  }

}

</script>
