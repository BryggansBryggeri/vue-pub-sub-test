<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import { Chart, ChartOptions } from "chart.js";
import VueChart from "vue-chartjs";
import { TimeSeries } from "@/models/chart";
import "chartjs-plugin-colorschemes";
import "chartjs-plugin-crosshair";

@Component
export default class TimeSeriesChart extends Mixins(VueChart.Line, VueChart.mixins.reactiveProp) {
  @Prop({ required: true, default: {} })
  public chartData!: Chart.ChartData;
  // public chartData!: TimeSeries<number, number>[];

  @Prop({ default: false })
  public resetChart!: boolean;

  private options: Chart.ChartOptions = {};

  private chart!: Chart;

  mounted() {
    this.applyDefaultOptions();
    this.renderChart(this.chartData, this.options);
    // eslint-disable-next-line no-underscore-dangle
    this.chart = this.$data._chart;
  }

  private applyDefaultOptions() {
    this.options.maintainAspectRatio = false;
    this.options.aspectRatio = 6;
    this.options.responsive = true;
    this.options.elements = {
      line: {
        tension: 0.0,
        fill: false,
      },
    };
    this.options.tooltips = {
      mode: "x",
      intersect: false,
    };
    this.options.plugins = {
      crosshair: {
        line: {
          color: "#F66", // crosshair line color
          width: 1, // crosshair line width
        },
        sync: {
          enabled: true, // enable trace line syncing with other charts
          group: 1, // chart group
          suppressTooltips: false, // suppress tooltips when showing a synced tracer
        },
        zoom: {
          enabled: false, // enable zooming
          zoomboxBackgroundColor: "rgba(66,133,244,0.2)", // background color of zoom box
          zoomboxBorderColor: "#48F", // border color of zoom box
          zoomButtonText: "Reset Zoom", // reset zoom button text
          zoomButtonClass: "reset-zoom", // reset zoom button class
        },
        snap: {
          enabled: true,
        },
      },

      colorschemes: {
        scheme: "tableau.ClassicMedium10",
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
          display: true,
          id: "temp",
          type: "linear",
          gridLines: {
            color: "rgba(240, 52, 52, 0.1)",
            lineWidth: 1,
          },
          scaleLabel: {
            display: true,
            labelString: "Temperature",
          },
          ticks: {
            min: this.minYValFromData(),
            max: this.maxYValFromData(),
            stepSize: 5,
            beginAtZero: true,
          },
        },
        {
          display: false,
          id: "volume",
          type: "linear",
          position: "right",
          gridLines: {
            color: "rgba(52, 52, 255, 0.2)",
            lineWidth: 1,
          },
          scaleLabel: {
            display: true,
            labelString: "Volume",
          },
          ticks: {
            min: 0,
            max: 180,
            stepSize: 10,
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
    // const maxList = this.chartData.map( (ts) => ts.data.reduce(
    // (max, dataPoint) => (dataPoint.x > max ? dataPoint.x : max),
    // // ts.data[0].x));
    // 0));
    // return Math.max(...maxList);
    return 3600 / 30;
  }
}
</script>
