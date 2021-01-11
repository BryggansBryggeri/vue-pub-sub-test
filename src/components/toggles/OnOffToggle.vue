<template>
  <div class="flex flex-row space-x-4">
    <span>Off</span>
    <div class="flex flex-row justify-between items-center" @click="click()">
      <div
        class="w-10 h-6 flex items-center rounded-full p-1 border-2 border-gray-500 duration-300 ease-in-out"
        :class="{
          'bg-red-600': !state,
          'bg-green-600': state,
        }"
      >
        <div
          class="w-4 h-4 bg-white rounded-full shadow-lg transform duration-300 ease-in-out"
          :class="{
            'translate-x-4': state,
          }"
        ></div>
      </div>
    </div>
    <span>On</span>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { ToggleType } from "@/utils";

@Component({
  components: {},
})
export default class Toggle extends Vue {
  // @Prop({ required: true }) ToggleType!: ToggleType;

  @Prop({ default: false }) state!: boolean;

  @Emit()
  private click(): void {
    // click logic in parent comp.
  }
}
</script>
