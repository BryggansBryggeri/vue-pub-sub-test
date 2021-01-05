<template>
  <div class="main flex flex-col">
    <!-- Main container -->
    <NavBar />

    <div class="px-10 flex flex-col">
      <!-- Dashboard container -->

      <!-- Full width layout -->
      <DashboardTop />

      <!-- Three column layout  -->
      <div class="three-column-grid">
        <Vessel v-for="vessel in vessels" v-bind:vesselProp="vessel" v-bind:key="vessel.name" />
      </div>
      <!-- End Three column layout -->
    </div>
    <!-- End Dashboard container -->
  </div>
  <!-- End Main container -->
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
