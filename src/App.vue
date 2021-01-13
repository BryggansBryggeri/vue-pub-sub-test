<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { eventbus } from "@/eventbus";
import { eventStore } from "@/store/events";

@Component
export default class App extends Vue {
  created(): void {
    eventbus.start();
  }

  natsClientReady(): boolean {
    return eventStore.natsClientReady;
  }

  get darkMode(): boolean {
    return eventStore.darkMode;
  }
}
</script>

<template>
  <div id="app" class="h-full min-h-screen" :class="{ ' dark ': darkMode }">
    <router-view />
  </div>
</template>
