<template>
  <main class="min-h-screen h-full">
    <div class="main-container">
      <NavBar />
      <slot></slot>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/NavBar.vue";

@Component({
  components: {
    NavBar,
  },
})
export default class MainLayout extends Vue {}
</script>

<style>
.main-container {
  @apply bg-blue-gray-100 overscroll-none font-sans dark:bg-darkTrueGray w-full dark:text-gray-100 text-gray-700 pb-24;
}
</style>
