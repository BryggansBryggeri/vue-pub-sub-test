<template>
  <div
    class="rounded-xl bg-white dark:bg-blue-gray-900 p-4 shadow-lg py-4 flex flex-col"
  >
    <div class="flex flex-row flex-1 relative w-full">
      <time-series-chart :chartData="genTestData" class="w-full h-64" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TimeSeriesChart from "@/components/charts/TimeSeries.vue";
import { eventStore } from "@/store/events";
import { TimeSeries, DataPoint } from "@/models/chart";

@Component({
  components: {
    TimeSeriesChart,
  },
})
export default class ChartView extends Vue {
  @Prop()
  private someProp!: string;

  get genTestData(): Chart.ChartData {
    // const xData = [0, 1, 2, 3, 4];
    // const yData = [57.8, 68.1, 72.2, 68.0, 74.3];
    // const data: DataPoint<number, number>[] = xData.map((x, i) => {
    //   const tmp: DataPoint<number, number> = { x, y: yData[i] };
    //   return tmp;
    // });
    const tsData: TimeSeries<number, number> = {
      label: "test",
      data: eventStore.dummySensorTimeSeries,
    };
    return { datasets: [tsData] };
  }



}
</script>
