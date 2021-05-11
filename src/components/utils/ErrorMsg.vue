<template>
  <div class="error-msg">
    <div v-if="nonNull">
      <p style="color: red">{{ msg }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Sensor extends Vue {
  @Prop() msg!: string | null;

  get nonNull(): boolean {
    return !(this.msg === null);
  }
}
</script>
