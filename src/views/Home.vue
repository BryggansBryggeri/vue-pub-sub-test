<template>
  <main class="h-full" :class="{ ' dark ': toggleDarkMode }">
    <div
      id="content"
      class="bg-blue-gray-100 overscroll-none font-sans dark:bg-darkTrueGray w-full dark:text-gray-100 text-gray-700 h-full pb-24"
    >
      <!-- Main container -->
      <NavBar
        :isDarkmode="toggleDarkMode"
        @toggleDarkMode="setDarkMode($event)"
      />

      <div class="mx-8 space-y-4">
        <!-- <Overview /> -->
        <!-- <Todo /> -->
        <!-- <Chart /> -->

        <section
          id="vesselGrid"
          class="mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4"
        >
            <!-- <Vessel :issue="issue" :fullWidth="fullWidth" /> -->
            <Vessel
              v-for="vessel in vessels"
              v-bind:vesselProp="vessel"
              v-bind:key="vessel.name"
            />
        </section>
      </div>
      <!-- End Main container -->
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Vessel from "@/components/Vessel.vue";
import NavBar from "@/components/NavBar.vue";
import DashboardTop from "@/components/DashboardTop.vue";
import VesselProp from "@/models/vesselProps";

@Component({
  components: {
    Vessel,
    NavBar,
    DashboardTop,
    // MashCard,
  },
})
export default class Home extends Vue {
  private toggleDarkMode = true;

  private setDarkMode(darkMode: boolean) {
    this.toggleDarkMode = darkMode;
  }

  private mash: VesselProp = {
    id: "mash",
    mainActor: "Mash Heater",
    mainSensor: "Mash Sensor",
    maxVolume: 180,
  };

  private boil: VesselProp = {
    id: "boil",
    mainActor: "Boil Heater",
    mainSensor: "Boil Sensor",
    maxVolume: 180,
  };

  private vessels = [this.boil, this.mash];
}
</script>
<style scoped>
.three-column-grid {
  @apply w-full mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8;
}
</style>