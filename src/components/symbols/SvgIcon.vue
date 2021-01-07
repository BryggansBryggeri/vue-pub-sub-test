<template>
  <div class="svg-icons">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-16 w-16"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="path"></path>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IconName } from "@/utils";

@Component({
  components: {},
})
export default class SvgIcon extends Vue {
  @Prop() name!: IconName;

  get path(): string {
    return this.icons[this.name];
  }

  private icons = {
    check: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    exclamation: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    cross: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
  } as const;
}
</script>

<!--
<svg
  xmlns="http://www.w3.org/2000/svg"
  class="h-7 w-7"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M13 10V3L4 14h7v7l9-11h-7z"
  ></path>
</svg>
-->
