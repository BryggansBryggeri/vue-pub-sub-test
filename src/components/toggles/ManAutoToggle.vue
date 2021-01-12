<template>
  <button
    class="flex flex-row space-x-4 h-14 items-center disabled:text-red-500 disabled:cursor-not-allowed"
    :disabled="disabled"
    @click="click()"
  >
    <div>
      <p class="justify-self-start" :class="{ underline: !state }">Manual</p>
    </div>
    <div class="relative flex-none w-14">
      <div
        v-if="disabled"
        class="absolute z-40 w-full items-center px-4 transition ease-in-out duration-150 cursor-not-allowed"
      >
        <svg
          class="animate-spin h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      <div class="flex flex-row justify-between items-center" :class="{ 'opacity-40': disabled }">
        <div
          class="w-full h-6 flex items-center rounded-full border-gray-500 p-1 border-2 shadow-inner duration-300 ease-in-out"
          :class="{
            'bg-blue-600': state,
            'bg-yellow-400': !state,
          }"
        >
          <div
            class="w-4 h-4 bg-white rounded-full shadow-lg transform duration-300 ease-in-out"
            :class="{
              'translate-x-7': state,
            }"
          ></div>
        </div>
      </div>
    </div>
    <div>
      <p class="justify-self-end" :class="{ underline: state }">Auto</p>
    </div>
  </button>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class ManAutoToggle extends Vue {
  // @Prop({ required: true }) ToggleType!: ToggleType;

  @Prop({ default: false }) state!: boolean;

  @Prop({ required: true }) private disabled = false;

  @Emit()
  private click(): void {
    //
  }
}
</script>
