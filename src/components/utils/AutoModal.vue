<template>
  <div v-if="isVisible">
    <div
      class="fixed inset-0 z-50 transition duration-150 ease-in-out flex justify-center items-center"
    >
      <div class="py-12 absolute top-10 right-0 bottom-0 left-0" id="modal">
        <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
          <div class="py-8 px-5 md:px-32 bg-white dark:bg-blue-gray-800 rounded-lg shadow-2xl">
            <div class="w-full flex flex-col space-y-6 items-center justify-center mb-4">
              <svg-icon name="power" size="12" />
              <h1 class="text-center font-lg font-bold tracking-normal leading-tight mb-5">
                Adjust automagic parameters
              </h1>
              <div class="w-full pt-5 pb-10">
                <div>
                  <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                  <div class="mt-1 inline-flex shadow-lg">
                    <input
                      type="number"
                      name="target"
                      id="target"
                      class="focus:ring-indigo-500 focus:border-indigo-500 pl-2 py-3 rounded-l-lg block shadow-inner w-full sm:text-sm border-gray-300"
                      placeholder="0.00"
                    />
                    <div class="bg-indigo-400 rounded-r-lg flex items-center">
                      <label for="scale" class="sr-only">Scale</label>
                      <select
                        id="scale"
                        name="scale"
                        class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                      >
                        <option>&#x2103;</option>
                        <option>&#x212A;</option>
                      </select>
                    </div>
                  </div>
                </div>
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
export default class AutoModal extends Vue {
  @Prop() isVisible!: boolean;

  @Prop({ default: 0 }) sliderVal!: number;

  private newPower!: number;

  setValue(sliderVal: number) {
    this.newPower = sliderVal;
  }

  emitCancel() {
    this.$emit("cancel");
  }

  emitConfirm() {
    this.$emit("confirm", this.newPower);
  }
}
</script>
