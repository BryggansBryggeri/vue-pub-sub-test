<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { eventbus } from "@/eventbus";
import { eventStore } from "@/store/events";

import MainLayout from "@/components/layouts/MainLayout.vue";

@Component({
  components: {
    MainLayout,
  },
})
export default class App extends Vue {


  get darkMode(): boolean {
    return eventStore.darkMode;
  }
}
</script>

<template>
  <div id="app" class="h-full min-h-screen" :class="{ ' dark ': darkMode }">
    <main-layout>
      <router-view />
    </main-layout>
  </div>
</template>
