<template>
  <div class="pub-sub-test">
    <h1>{{ msg }}</h1>
    <h3>Dummy sensor: {{sensorVal}}</h3>
    <button @click="addMessage('text')">Add</button>
    <ul>
      <li v-for="(msg, idx) in messages" :key="`msg-${idx}`">
        {{ msg }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { eventStore } from '@/store/events';
import { eventbus } from '@/eventbus';

@Component
export default class PubSubTest extends Vue {
  @Prop() private msg!: string;

  get messages(): string[] {
    return eventStore.messages;
  }

  get sensorVal(): number {
    return eventStore.sensorVal;
  }

  addMessage(msg: string): void {
    eventbus.publish('ext_comm.ui.test', msg);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
