<template>
  <div v-if="propdisabled">
    Nu är det disajblat serru!
  </div>
  <button v-else class="flex flex-row space-x-4" :disabled="propdisabled" @click="click()">
    <div>
      <p
        class="transform transition-all justify-self-start duration-500 ease-in-out"
        :class="{ underline: !state }"
      >
        Manual
      </p>
    </div>
    <div class="flex flex-row justify-between items-center">
      <div
        class="w-14 h-6 flex items-center rounded-full p-1 border-2 shadow-inner  duration-300 ease-in-out"
        :class="{
          'bg-blue-600': state,
          'bg-yellow-400': !state,
          'border-gray-500': !propdisabled,
          'border-red-500': propdisabled,
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
    <div>
      <p class="justify-self-end" :class="{ underline: state }">Auto</p>
    </div>
  </button>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
 import { delay } from "@/utils";

@Component({
  components: {},
})
export default class ManAutoToggle extends Vue {
  // @Prop({ required: true }) ToggleType!: ToggleType;

  @Prop({ default: false }) state!: boolean;

  private propdisabled = false;

  private async disableForAWhile(): Promise<void> {
    this.propdisabled = true;
    await delay(1000)
    this.propdisabled = false
  }

  @Emit()
  private click(): void {
    this.disableForAWhile()
  }
}
</script>
