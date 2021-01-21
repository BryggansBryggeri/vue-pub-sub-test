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
              <p>Currently there is no validation on this field so please use "68.7"</p>
              <p>{{ validInput }}</p>
              <div class="w-3/4 p-5">
                <div class="mt-1 inline-flex rounded-lg shadow-lg">
                  <input
                    ref="targetfield"
                    type="text"
                    v-model.number="targetTemp"
                    name="target"
                    id="target"
                    class="outline-none px-5 py-3 dark:bg-blue-gray-700 text-right rounded-l-lg block shadow-inner w-full sm:text-sm"
                    :placeholder="currentPower"
                  />
                  <div class="bg-indigo-700 rounded-r-lg p-3 flex items-center cursor-default">
                    <p class="text-base text-white">&#x2103;</p>
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
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
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

  @Prop() currentPower!: number;

  @Ref() readonly targetfield!: HTMLInputElement;

  @Ref() readonly target!: HTMLInputElement;

  private targetTemp: number | string = 0.0;

  get validInput(): boolean {
    return !Number.isNaN(parseFloat(`${this.targetTemp}`));
  }

  get newTarget() {
    return this.targetTemp;
  }

  created() {
    this.$nextTick(() => this.targetfield.focus());
  }

  emitCancel() {
    this.$emit("cancel");
  }

  emitConfirm() {
    this.$emit("confirm", this.newTarget);
  }
}
</script>
