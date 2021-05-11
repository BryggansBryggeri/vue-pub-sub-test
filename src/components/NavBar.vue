<template>
  <div
    id="Navbar"
    class="w-full relative px-6 py-3 mb-4 border-t-2 border-green-800 bg-white dark:bg-blue-gray-900 mx-auto flex flex-row items-center align-middle justify-between shadow-lg z-50"
  >
    <h4 class="text-xl font-bold leading-tight underline logo">BryggIO</h4>
    <div class="flex flex-row items-center space-x-6 text-sm">
      <button class="focus:outline-none focus:ring-0" @click="toggleDarkMode()">
        <div v-if="darkMode" class="hover:text-yellow-600 transition duration-150">
          <svg-icon name="sun" size="6"></svg-icon>
        </div>
        <div v-else class="hover:text-indigo-400 transition duration-150">
          <svg-icon name="moon" size="6"></svg-icon>
        </div>
      </button>
      <router-link
        class="flex flex-row transition focus:outline-none duration-150 ease-in-out hover:text-indigo-400 rounded space-x-2"
        to="/"
        ><svg-icon name="dashboard" size="5" />
        <p>Dashboard</p></router-link
      >
      <router-link
        class="flex flex-row transition focus:outline-none duration-150 ease-in-out hover:text-indigo-400 rounded space-x-2"
        to="/Library"
        ><svg-icon name="book" size="5" />
        <p>Library</p></router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Emit, Component, Prop, Vue } from "vue-property-decorator";
import SvgIcon from "@/components/symbols/SvgIcon.vue";
import { eventbus } from "@/eventbus";
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

<style scoped>
.logo {
  text-decoration-color: green;
}
</style>
