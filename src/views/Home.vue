<template>
  <main class="h-screen">
    <div v-if="natsClientReady">
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
        <div>
          <ul id="example-1">
            <li v-for="id in listActiveClients" :key="id">
              {{ id }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      Här borde Jonte lägga in en spinner som faktiskt fungerar! Det verkar inte den i App.vue göra
      nämligen.
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { eventStore } from "@/store/events";
import Controller from "@/components/Controller.vue";
import Sensor from "@/components/Sensor.vue";
import NavBar from "@/components/NavBar.vue";
import DashboardTop from "@/components/DashboardTop.vue";
import { ControllerProps } from "@/models/controller";

@Component({
  components: {
    Sensor,
    Controller,
    NavBar,
    DashboardTop,
    // MashCard,
  },
})
export default class Home extends Vue {
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

  get natsClientReady(): boolean {
    return eventStore.natsClientReady;
  }

  private controllers = [this.boil, this.mash];

  listActiveClients(): string[] {
    return eventStore.listActiveClients();
  }
}
</script>
