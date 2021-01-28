<template>
  <main id="library" class="min-h-screen h-full">
    <div class="chart-area">
      <TimeSeriesChart :chart-data="chartData" :resetChart="resetChart" :styles="chartStyles" />
      <div class="button-area">
        <button @click="resetPosition()">Reset</button>
        <button @click="stop()">Stop</button>
        <button @click="start()">Start</button>
      </div>
    </div>

    <div class="flex flex-grid grid-cols-6 gap-4 justify-around">
      <div class="w-1/6 border-2 rounded border-gray-700 flex flex-col items-center space-y-3">
        <span class="justify-left text-left">Component</span>
        <span class="text-sm">utils/Modal</span>
        <button
          class="p-2 bg-green-400 rounded-lg shadow-md outline-none ring-0 focus:outline-none focus:ring-0"
          @click="modalVisible = true"
        >
          Open modal
        </button>
        <div>
          <Modal
            :isVisible="modalVisible"
            @cancel="modalVisible = false"
            @confirm="modalVisible = false"
          />
        </div>
      </div>
      <div class="w-1/6 border-2 rounded border-gray-700">
        <div class="flex flex-wrap">
          <div class="flex w-8/12">
            <input
              type="text"
              value="7"
              class="bg-white text-sm text-gray-900 text-center focus:outline-none border border-gray-800 focus:border-gray-600 rounded-l-md w-full"
            />
          </div>
          <div class="flex flex-col w-4/12">
            <button
              class="text-white text-center text-md font-semibold rounded-tr-md px-1 bg-gray-800 focus:bg-gray-600 focus:outline-none border border-gray-800 focus:border-gray-600"
            >
              +
            </button>
            <button
              class="text-white text-center text-md font-semibold rounded-br-md px-1 bg-gray-800 focus:bg-gray-600 focus:outline-none border border-gray-800 focus:border-gray-600"
            >
              -
            </button>
          </div>
        </div>
      </div>

      <div class="w-1/6 border-2 rounded border-gray-700">
        <div class="flex flex-col w-3/4 h-24">
          <label for="password1" class="text-xs font-semibold leading-tight tracking-normal mb-2"
            >Enter url to NATS-server</label
          >
          <div class="flex flex-row">
            <!-- Needs to take a regex in as a validator instead. Since we want to take for example ws://192.168.1.1:9999 -->
            <input
              ref="targetfield"
              name="target"
              id="target"
              :placeholder="'e.g 192.168.1.1'"
              v-model="$v.natsAddress.$model"
              class="focus:outline-none focus:border dark:bg-blue-gray-700 focus:border-indigo-700 text-right pr-4 font-normal h-10 flex items-center text-sm rounded-lg shadow-inner"
              :class="{
                'border border-red-400 text-red-400': $v.natsAddress.$invalid,
              }"
            />
          </div>
          <div
            v-show="$v.natsAddress.$invalid && $v.natsAddress.$dirty"
            class="flex items-center text-xs leading-3 tracking-normal justify-between mt-2 text-red-400"
          >
            <p>Please enter a valid url</p>
          </div>
        </div>
      </div>
      <div class="w-1/6 border-2 rounded border-gray-700"></div>
      <div class="w-1/6 border-2 rounded border-gray-700"></div>
      <div class="w-1/6 border-2 rounded border-gray-700"></div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Modal from "@/components/utils/Modal.vue";
import { Validate } from "vuelidate-property-decorators";
import { required, ipAddress } from "vuelidate/lib/validators";
import TimeSeriesChart from "@/components/utils/TimeSeriesChart.vue";
import { Data, DataPoint } from "@/models/chart";
import { Chart, ChartOptions } from "chart.js";
import "chartjs-plugin-colorschemes";

@Component({
  components: {
    Modal,
    TimeSeriesChart,
  },
})
export default class Library extends Vue {
  private modalVisible = false;

  @Validate({
    ipAddress,
    required,
    // ^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$ should work for all urls with port number.
  })
  natsAddress = "";

  private allData: Data<Date, number>[] = [];
  /**
   * Data for chart
   */

  private chartData: Chart.ChartData = {};
  /**
   * chart style
   */

  private chartStyles = {
    height: "100%",
    width: "100%",
    margin: "auto",
  };

  private resetChart = false;

  private resetPosition() {
    this.resetChart = true;
    setInterval(() => {
      this.resetChart = false;
    }, 1000);
  }

  private startInterval!: any;

  private start() {
    if (!this.startInterval) {
      this.startInterval = setInterval(() => {
        this.updateDatasets();
      }, 3000);
    }
  }

  private stop() {
    clearInterval(this.startInterval);
    this.startInterval = undefined;
  }

  /**
   * mounted
   */

  mounted() {
    // eslint-disable-next-line
    for (let i = 1; i <= 3; i++) {
      // eslint-disable-next-line
      this.allData.push({ label: "Data" + i, data: [] });
    }
    this.start();
  }

  /**
   * Update datasets
   */

  private updateDatasets() {
    this.allData.forEach((data) => {
      data.data.push({
        x: new Date(),
        y: Math.random() * 1000,
      });

      /*    Splice the data to only keep last 30*3 secnds
      if (data.data.length > 30) {
        data.data.splice(0, 1);
      } */
    });

    const dataset = (labelData: Data<Date, number>) => ({
      label: labelData.label,
      data: labelData.data,
      fill: false,
      radius: 5,
    });
    this.chartData = {
      datasets: this.allData.map((label) => dataset(label)),
    };
  }
}
</script>
