<template>
  <main id="dashboard" class="min-h-screen h-full mx-8 space-y-4">
    <div v-if="!breweryReady">
      <Loading />
    </div>
    <!-- <Overview /> -->
    <!-- <Todo /> -->
    <!-- <Chart /> -->

    <section
      v-else
      class="mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4"
    >
      <Controller
        v-for="controller in controllers"
        v-bind:controllerProps="controller"
        v-bind:key="controller.name"
      />
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { eventStore } from "@/store/events";
import Controller from "@/components/Controller.vue";
import Sensor from "@/components/Sensor.vue";
import Loading from "@/components/utils/Loading.vue";
import NavBar from "@/components/NavBar.vue";
import DashboardTop from "@/components/DashboardTop.vue";
import { ControllerProps } from "@/models/controller";

@Component({
  components: {
    Sensor,
    Loading,
    Controller,
    NavBar,
    DashboardTop,
    // MashCard,
  },
})
export default class Dashboard extends Vue {
  private mash: ControllerProps = {
    controllerId: "mash",
    actorId: "mash_heater",
    sensorId: "mash_temp",
    type: "manual",
  };

  private boil: ControllerProps = {
    controllerId: "boil",
    actorId: "boil_heater",
    sensorId: "boil_temp",
    type: "manual",
  };

/*   private manifold: ControllerProps = {
    controllerId: "boil",
    actorId: "boil_heater",
    sensorId: "boil_temp",
    type: "manual",
  }; */

  // Gatekeeper for rendering the 'Brewery view'.
  // More predicates can be added as needed.
  get breweryReady() {
    return this.natsClientReady();
  }

  private natsClientReady(): boolean {
    return eventStore.natsClientReady;
  }

  // private controllers = [this.mash, this.manifold, this.boil];
  private controllers = [this.mash, this.boil];

  // get listActiveClients(): string[] {
  //   return eventStore.listActiveClients();
  // }
}
</script>
