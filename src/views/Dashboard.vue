<template>
  <main id="dashboard" class="leading-tight min-h-screen h-full mx-8 space-y-4">
    <!--<Overview />-->
    <!-- <ChartView /> -->
    <!-- <Todo /> -->

    <div v-if="isLoading === 1">
      <loading msg="Loading" />
    </div>
    <div v-if="isLoading === 3">
      <loading msg="Error, cannot find Supervisor" type="error" @admin="setAdmin($event)" />
    </div>

    <section
      v-else
      class="mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4"
    >
      <controller
        v-for="controller in controllers"
        v-bind:controllerProps="controller"
        v-bind:key="controller.name"
      />
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { eventStore, NatsClientStatus } from "@/store/events";
import Controller from "@/components/Controller.vue";
import Sensor from "@/components/Sensor.vue";
import Loading from "@/components/utils/Loading.vue";
import NavBar from "@/components/NavBar.vue";
// import DashboardTop from "@/components/DashboardTop.vue";
import ChartView from "@/components/ChartView.vue";
import { ControllerProps } from "@/models/controller";

@Component({
  components: {
    Sensor,
    Loading,
    Controller,
    NavBar,
    ChartView,
    // DashboardTop,
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

  private loading!: boolean;

  private devByPass = false;

  get isLoading() {
    if (this.devByPass) {
      return 2;
    }
    return this.natsClientConnecting();
  }

  private setAdmin() {
    this.devByPass = !this.devByPass;
  }

  private natsClientConnecting(): NatsClientStatus {
    return eventStore.natsClientStatus;
  }

  // private controllers = [this.mash, this.manifold, this.boil];
  private controllers = [this.mash, this.boil];

  // get listActiveClients(): string[] {
  //   return eventStore.listActiveClients();
  // }
}
</script>
