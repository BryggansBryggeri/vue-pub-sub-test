<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { eventbus } from '@/eventbus';

@Component
export default class App extends Vue {
  created(): void {
    eventbus.start();
  }
}
</script>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>
