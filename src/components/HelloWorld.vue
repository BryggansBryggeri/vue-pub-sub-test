<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
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
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  get messages(): string[] {
    return eventStore.messages;
  }

  addMessage(msg: string): void {
    eventbus.publish('demo', msg);
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
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
