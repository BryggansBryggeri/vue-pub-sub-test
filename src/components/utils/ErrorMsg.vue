<template>
  <div class="error-msg">
    <p style="color: red">{{ msg }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Sensor extends Vue {
  @Prop() msg!: string | null;
}
</script>
