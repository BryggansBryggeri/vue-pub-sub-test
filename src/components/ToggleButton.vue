<template>
  <div class="flex flex-row space-x-2 items-center">
    <span>Manual</span>
    <div class="flex justify-between items-center" @click="toggleActive">
      <div
        class="w-16 h-10 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out"
        :class="{ 'bg-green-400': active }"
      >
        <div
          class="bg-white w-8 h-8 rounded-full shadow-md transform duration-300 ease-in-out"
          :class="{ 'translate-x-6': active }"
        ></div>
      </div>
    </div>
    <span>Auto</span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class ToggleButton extends Vue {
  private active = false;

  toggleActive() {
    this.active = !this.active;
  }

};
</script>
