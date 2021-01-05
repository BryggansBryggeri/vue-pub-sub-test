<template>
  <div class="w-full pt-6 mx-auto">
    <div class="flex flex-wrap">
      <div class="w-full">
        <div class="rounded shadow-lg h-40 border p-4">Full width top content here</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class DashboardTop extends Vue {
  @Prop()
  private someProp!: string;
}
</script>
