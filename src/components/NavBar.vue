
<template>
  <div
    id="Navbar"
    class="px-6 py-2 mb-4 bg-white dark:bg-blue-gray-900 mx-auto flex flex-row items-center align-middle justify-between shadow-lg"
  >
    <h4 class="text-xl font-bold leading-tight">BryggIO</h4>
    <div class="flex flex-row space-x-4">
      <button class="focus:outline-none focus:ring-0" @click="toggleDarkMode()">
        <svg
          v-if="toggleDarkMode"
          class="w-6 h-6 hover:text-purple-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          ></path>
        </svg>

        <svg
          v-else
          class="w-6 h-6 hover:text-purple-700"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
          ></path>
        </svg>
      </button>

      <button
        class="flex flex-row transition focus:outline-none duration-150 ease-in-out hover:bg-indigo-400 border border-white rounded px-8 py-2 text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          class="w-5 h-5"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
          />
        </svg>
        <span class="pl-2">Github</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {Emit, Component, Prop, Vue } from "vue-property-decorator";
import { eventStore } from "@/store/events";

// import { Options, Vue } from "vue-class-component";
// import { Emit, Prop } from "vue-property-decorator";
@Component({
  components: {
  },
})
export default class Navbar extends Vue {
  @Prop({ default: false }) isDarkmode = false;

  @Emit()
  private toggleDarkMode(): boolean {
    eventStore.toggleDarkMode();
    return !this.isDarkmode;
  }
}
</script>
