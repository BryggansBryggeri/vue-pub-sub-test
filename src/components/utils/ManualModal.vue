<template>
  <div v-if="isVisible">
    <div
      class="fixed inset-0 z-50 transition duration-150 ease-in-out flex justify-center items-center"
    >
      <div class="py-12 absolute top-10 right-0 bottom-0 left-0" id="modal">
        <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div class="py-8 px-5 md:px-32 bg-white dark:bg-blue-gray-800 rounded-lg shadow-2xl">
            <div class="w-full flex flex-col items-center space-y-6 justify-center mb-4">
              <svg-icon name="power" size="12" />
              <h1 class="text-center font-lg font-bold tracking-normal leading-tight mb-5">
                Set new Manual power target {{ value.toString() }}
              </h1>
              <div class="w-full pt-5 pb-10">
                <vue-slider
                  ref="manualSlider"
                  class="w-24"
                  v-model="value"
                  :min="0"
                  :max="100"
                  tooltip="none"
                  :lazy="false"
                  :adsorb="true"
                  :interval="10"
                  :marks="true"
                  :drag-on-click="true"
                  @change="setValue(value)"
                />
              </div>
              <div class="flex items-center justify-center w-full">
                <button
                  class="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                  @click="emitConfirm()"
                >
                  Confirm
                </button>
                <button
                  class="focus:outline-none ml-3 dark:bg-transparent bg-gray-100 transition duration-150 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                  @click="emitCancel()"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="opacity-40 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SvgIcon from "@/components/symbols/SvgIcon.vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/material.css";

@Component({
  components: {
    VueSlider,
    SvgIcon,
  },
})
export default class ManualModal extends Vue {
  @Prop() isVisible!: boolean;

  @Prop({ default: 0 }) sliderVal!: number;  // [0,1]

  private value!: number;

  created() {
    this.value = this.sliderVal*100;
    // this.$refs.slider.focus()
  }

  private newPower = 0;

  setValue(value: number) {
    this.newPower = value/100; // parent component want power for manual target to be [0,1]
    console.log("setValue called from");
  }

  emitCancel() {
    this.$emit("cancel");
  }

  emitConfirm() {
    this.$emit("confirm", this.newPower);
  }
}
</script>
