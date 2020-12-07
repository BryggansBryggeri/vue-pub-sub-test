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
            <span>This controller will automatically controll the actor output to
              achieve the targeted setpoint.</span>
          <div class="flex flex-row justify-around mx-auto align-middle py-3 space-x-2 bg-gray-50 shadow-lg border rounded-lg">
            <div class="text-xl border-r border-gray-300 px-3">-</div>
            <input class="bg-gray-50" placeholder="Enter target temp." type="text" />
            
            <div class="text-xl border-l border-gray-300 px-3">+</div>


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
              percentage.</span>
              <div class="w-4/5 text-xs py-4 mx-auto -center">
            <vue-slider class="w-20" v-model="manualValue" :tooltip="none" :lazy="true" :adsorb="true" :interval="10" :marks="manualMarks" :drag-on-click="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

@Component({
  components: {
    VueSlider,
  },
})
export default class ToggleButton extends Vue {
  data() {
    return {
      manualValue: 0,
      manualMarks: (val: number)  => val % 10 === 0 ? ({
          label: `${val}%`,
          labelStyle: {
            opacity: val * 0.01 * 0.7 + 0.3
          },
          labelActiveStyle: {
            color: '#3498db'
          }
        }) : false,
    };
  }

  private controllerState = false;

  @Prop() controllerId!: string;

  toggleControllerState() {
    this.controllerState = !this.controllerState;
  }
}
</script>



export default {
  components: {
    VueSlider
  },

    }
  }
}
