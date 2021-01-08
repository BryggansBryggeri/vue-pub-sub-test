<template>
  <main class="h-full" :class="{ ' dark ': darkMode }">
    <div
      id="content"
      class="bg-blue-gray-100 overscroll-none font-sans dark:bg-darkTrueGray w-full dark:text-gray-100 text-gray-700 h-full pb-24"
    >
      <!-- Main container -->
      <NavBar />

      <div class="mx-8 space-y-4">
        <!-- <Overview /> -->
        <!-- <Todo /> -->
        <!-- <Chart /> -->

        <section
          id="vesselGrid"
          class="mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4"
        >
          <!--
          <Vessel v-for="vessel in vessels" v-bind:vesselProp="vessel" v-bind:key="vessel.name" />
          -->
          <Controller
            v-for="controller in controllers"
            v-bind:controllerProps="controller"
            v-bind:key="controller.name"
          />
        </section>
      </div>
      <!-- End Main container -->
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { eventStore } from "@/store/events";
import Vessel from "@/components/Vessel.vue";
import Controller from "@/components/Controller.vue";
import Sensor from "@/components/Sensor.vue";
import NavBar from "@/components/NavBar.vue";
import DashboardTop from "@/components/DashboardTop.vue";
// import VesselProp from "@/models/vesselProps";
import ControllerProp from "@/models/controllerProps";

@Component({
  components: {
    Sensor,
    Vessel,
    Controller,
    NavBar,
    DashboardTop,
    // MashCard,
  },
})
export default class Home extends Vue {
  get darkMode(): boolean {
    return eventStore.darkMode;
  }

  private mash: ControllerProp = {
    id: "mash",
    actorId: "mash_heater",
    sensorId: "mash_temp",
  };

  private boil: ControllerProp = {
    id: "boil",
    actorId: "boil_heater",
    sensorId: "boil_temp",
  };

  private controllers = [this.boil, this.mash];
}
</script>
