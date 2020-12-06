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
          
          <div class="flex flex-row">
          <span>This controller will automatically controll the actor output to achieve the targeted setpoint.</span>
          </div>


        </div>
        <div class="flex flex-col h-30 text-sm" v-show="!controllerState">
          <div class="flex flex-row">
          <span class="pr-2 font-medium">Settings: </span>
          <span>Manual</span>
          </div>
          
          <div class="flex flex-row">
          <span>This controller sets the duty cycle of the actor to the input percentage.</span>
          </div>
          

        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class ToggleButton extends Vue {
  private controllerState = false;

  toggleControllerState() {
    this.controllerState = !this.controllerState;
  }
}
</script>
