<template>
  <div class="flex flex-row space-x-4">
    <div>
      <p
        class="transform transition-all justify-self-start duration-500 ease-in-out"
        :class="{ 'underline': !state }"
      >
        Manual
      </p>
    </div>
    <div class="flex flex-row justify-between items-center" @click="click()">
      <div
        class="w-14 h-6 flex items-center rounded-full p-1 border-2 shadow-inner border-gray-500 duration-300 ease-in-out"
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
    <div>
      <p class="justify-self-end" :class="{ 'underline': state }">
        Auto
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { ToggleType } from "@/utils";

@Component({
  components: {},
})
export default class ManAutoToggle extends Vue {
  @Prop({ required: true }) ToggleType!: ToggleType;

  @Prop({ default: false }) state!: boolean;

  @Emit()
  private click(): void {
    // click logic in parent comp.
  }
}
</script>