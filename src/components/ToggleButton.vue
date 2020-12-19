<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-col items-center w-full space-y-2">
      <div class="flex flex-row space-x-2 items-center">
        <span
          :class="{
            'text-gray-400': controllerState,
            'text-gray-900': !controllerState,
          }"
        >
          Manual</span
        >
        <div
          class="flex justify-between items-center"
          @click="toggleControllerState"
        >
          <div
            class="w-20 h-10 flex items-center bg-yellow-300 rounded-full p-1 duration-300 ease-in-out"
            :class="{ 'bg-green-400': controllerState }"
          >
            <div
              class="bg-white w-8 h-8 rounded-full shadow-md transform duration-300 ease-in-out"
              :class="{ 'translate-x-10': controllerState }"
            ></div>
          </div>
        </div>
        <span
          :class="{
            'text-gray-900': controllerState,
            'text-gray-400': !controllerState,
          }"
        >
          Setpoint</span
        >
      </div>
      <div>
        <div class="flex flex-col h-30 text-sm" v-show="controllerState">
          <div class="flex flex-row">
            <span class="pr-2 font-medium">Settings: </span>
            <span>Setpoint</span>
          </div>
          <div class="flex flex-col">
            <span
              >This controller will automatically controll the actor output to
              achieve the targeted setpoint.</span
            >
            <div
              class="flex flex-row justify-around mx-auto align-middle p-4 space-x-2"
            >
              <input
                type="number"
                min="0"
                max="101"
                step="0.1"
                v-model="targetTemp"
                class="bg-gray-50 py-2 w-32 text-center"
                placeholder="Enter target temp."
              />
              <button
                class="bg-green-200 rounded-lg px-2"
                @click="setTargetTemp(targetTemp)"
              >
                Set new Target
              </button>
            </div>
            <button @click="getTargetTemp(73.8)">Listen from NATS</button>
          </div>
        </div>
      </div>
      <div class="flex flex-col h-30 text-sm" v-show="!controllerState">
        <div class="flex flex-row">
          <span class="pr-2 font-medium">Settings: </span>
          <span>Manual</span>
        </div>

        <div class="flex flex-col">
          <span
            >This controller sets the duty cycle of the actor to the input
            percentage.</span
          >
          <div class="w-4/5 text-xs py-4 mx-auto -center">
            <vue-slider
              ref="manualSlider"
              class="w-20"
              v-model="percentage"
              tooltip="none"
              :lazy="true"
              :adsorb="true"
              :interval="10"
              :marks="manualMarks"
              :drag-on-click="true"
              @change="setValue(percentage)"
            />
          </div>
        </div>
        <button @click="getPercentage(60)">Listen from NATS</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { eventStore } from "@/store/events";

@Component({
  components: {
    VueSlider,
  },
})
export default class ToggleButton extends Vue {
  data() {
    return {
      percentage: 0,
      manualMarks: (val: number) =>
        val % 10 === 0
          ? {
              label: `${val}%`,
              labelStyle: {
                opacity: val * 0.01 * 0.7 + 0.3,
              },
              labelActiveStyle: {
                color: "#3498db",
              },
            }
          : false,
    };
  }

  private controllerState = false;

  private percentage!: number;

  private targetTemp = 0;

  @Prop() controllerId!: string;

  toggleControllerState() {
    this.controllerState = !this.controllerState;
    console.log(this.controllerState);
    eventStore.toggleController();
  }

  setPercentage(val: number) {
    console.log(val);
  }
  
  getPercentage(val: number) {
    this.percentage = val;
  }


  setTargetTemp(val: number) {
    console.log(val);
  }

  getTargetTemp(val: number){
    this.targetTemp = val;
  }
}
</script>
