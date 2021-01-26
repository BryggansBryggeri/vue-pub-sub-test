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
              <h1 class="text-center font-lg font-bold pb-5 tracking-normal leading-tight mb-5">
                Adjust automagic parameters
              </h1>

              <div class="flex flex-col w-3/4 h-24">
                <label
                  for="password1"
                  class="text-xs font-semibold leading-tight tracking-normal mb-2"
                  >New target temperature</label
                >
                <div class="flex flex-row">
                  <input
                    ref="targetfield"
                    name="target"
                    id="target"
                    :placeholder="'e.g 16.7'"
                    v-model="$v.value.$model"
                    class="focus:outline-none focus:border dark:bg-blue-gray-700 focus:border-indigo-700 text-right pr-4 font-normal h-10 flex items-center text-sm rounded-l-lg shadow-inner"
                    :class="{
                      'border border-red-400 text-red-400': $v.value.$invalid,
                    }"
                  />
                  <div class="bg-indigo-700 rounded-r-lg h-10 p-3 flex items-center cursor-default">
                    <p class="text-base text-white">&#x2103;</p>
                  </div>
                </div>
                <div
                  v-show="$v.value.$invalid && $v.value.$dirty"
                  class="flex items-center text-xs leading-3 tracking-normal justify-between mt-2 text-red-400"
                >
                  <p>Please enter a value between -10.0 and 110.0</p>
                </div>
              </div>
              <div class="flex flex-col items-center justify-center w-full">
                <div>
                  <button
                    :disabled="$v.value.$invalid"
                    class="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded cursor-auto text-white px-8 py-2 text-sm disabled:bg-gray-600 disabled:cursor-not-allowed"
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
    </div>
    <div class="opacity-40 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import SvgIcon from "@/components/symbols/SvgIcon.vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/material.css";
import { Validate } from "vuelidate-property-decorators";
import { required, decimal, between } from "vuelidate/lib/validators";

@Component({
  components: {
    VueSlider,
    SvgIcon,
  },
})
export default class AutoModal extends Vue {
  @Prop() isVisible!: boolean;

  @Ref() readonly targetfield!: HTMLInputElement;

  @Ref() readonly target!: HTMLInputElement;

  private validate = false;

  private tryValidate = false;

  @Validate({
    required,
    decimal,
    between: between(-10, 110),
  })
  value = "";

  get newTarget() {
    return this.value;
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
