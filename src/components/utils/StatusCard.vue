<template>
  <div
    class="rounded-lg space-y-4 border-2 dark:bg-blue-gray-800 p-2 min-h-20 h-full flex flex-col"
    :class="{
      'col-span-full': fullWidth,
      'col-span-1': !fullWidth,
      'bg-blue-gray-100 border-transparent': status === 1,
      'bg-yellow-100 border-yellow-400': status === 2,
      'bg-red-100 border-red-600': status === 3,
    }"
  >
      <div class="flex flex-row justify-between w-full">
      <span class="font-semibold text-base">{{ name }}</span>
      <div>
        <status-ind :status="status" :size="4" />
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

  @Prop({ required: true }) readonly status!: IndicatorType;

  @Prop({ default: false }) readonly fullWidth!: boolean;
}

</script>
