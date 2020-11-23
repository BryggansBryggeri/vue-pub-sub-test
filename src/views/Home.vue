<template>
  <div class="home">
    <PubSubTest msg="Pub-sub test"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PubSubTest from '@/components/PubSubTest.vue'; // @ is an alias to /src

@Component({
  components: {
    PubSubTest,
  },
})
export default class Home extends Vue {}
</script>
