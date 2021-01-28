<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import { Chart, ChartOptions } from "chart.js";
import VueChart from "vue-chartjs";
import { TimeSeries } from "@/models/chart";

@Component
export default class TimeSeriesChart extends Mixins(VueChart.Line) {
  @Prop({ required: true, default: {} })
  public chartData!: TimeSeries<number, number>[];

  @Prop({ default: false })
  public resetChart!: boolean;

  private options: Chart.ChartOptions = {};

  private chart!: Chart;

  mounted() {
    this.applyDefaultOptions();
    this.renderChart(this.genChartData(this.chartData), this.options);
    // eslint-disable-next-line no-underscore-dangle
    this.chart = this.$data._chart;
  }

  private applyDefaultOptions() {
    this.options.maintainAspectRatio = false;
    this.options.elements = {
      line: {
        tension: 0.0,
        fill: false,
        borderColor: "green",
      },
    };
    this.options.scales = {
      xAxes: [
        {
          id: "time",
          type: "linear",
          ticks: {
            min: this.minXValFromData(),
            max: this.maxXValFromData(),
          },
        },
      ],
      yAxes: [
        {
          id: "temp",
          type: "linear",
          ticks: {
            min: this.minYValFromData(),
            max: this.maxYValFromData(),
          },
        },
      ],
    };
  }

  private genChartData(chartData: TimeSeries<number, number>[]): Chart.ChartData {
    return { datasets: chartData };
  }

  private minYValFromData(): number {
    return 0;
  }

  private maxYValFromData(): number {
    return 105;
  }

  private minXValFromData(): number {
    return 0;
  }

  private maxXValFromData(): number {
    const maxList: number[] = this.chartData.map((ts) =>
      ts.data.reduce((max, dataPoint) => (dataPoint.x > max ? dataPoint.x : max), ts.data[0].x)
    );
    return Math.max(...maxList);
  }
}
</script>
