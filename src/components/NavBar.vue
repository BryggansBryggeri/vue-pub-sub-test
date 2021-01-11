<template>
  <div
    id="Navbar"
    class="px-6 py-2 mb-4 bg-white dark:bg-blue-gray-900 mx-auto flex flex-row items-center align-middle justify-between shadow-lg"
  >
    <h4 class="text-xl font-bold leading-tight">BryggIO</h4>
    <div class="flex flex-row items-center space-x-4">
      <router-link to="/"><svg-icon name="dashboard" size="6" /></router-link>
      <router-link to="/Library"><svg-icon name="book" size="6" /></router-link>
      <button class="focus:outline-none focus:ring-0" @click="toggleDarkMode()">
        <div v-if="darkMode" class="hover:text-yellow-600 transition duration-150">
          <svg-icon name="sun" size="6"></svg-icon>
        </div>
        <div v-else class="hover:text-indigo-400 transition duration-150">
          <svg-icon name="moon" size="6"></svg-icon>
        </div>
      </button>
      <button
        class="flex flex-row transition focus:outline-none duration-150 ease-in-out hover:text-indigo-400 rounded px-2 py-2 text-sm"
      >
        <svg-icon name="git" size="5"></svg-icon>
        <span class="pl-2">Github</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Emit, Component, Prop, Vue } from "vue-property-decorator";
import SvgIcon from "@/components/symbols/SvgIcon.vue";
import { eventStore } from "@/store/events";

// import { Options, Vue } from "vue-class-component";
// import { Emit, Prop } from "vue-property-decorator";
@Component({
  components: {
    SvgIcon,
  },
})
export default class Navbar extends Vue {
  @Prop({ default: false }) isDarkmode = false;

  @Emit()
  private toggleDarkMode(): boolean {
    eventStore.toggleDarkMode();
    return !this.isDarkmode;
  }

  get darkMode(): boolean {
    return eventStore.darkMode;
  }
}
</script>
