<template>
  <div class="home">
    <NavBar />
    <PubSubTest msg="Pub-sub test"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PubSubTest from '@/components/PubSubTest.vue'; // @ is an alias to /src
import NavBar from '@/components/NavBar.vue'; // @ is an alias to /src

@Component({
  components: {
    PubSubTest,
    NavBar,
  },
})
export default class Home extends Vue {}
</script>
