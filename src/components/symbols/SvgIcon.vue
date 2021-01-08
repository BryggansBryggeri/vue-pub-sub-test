<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="cssClass"
    viewBox="0 0 24 24"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke-linecap="round" stroke-linejoin="round" :d="path"></path>
  </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IconName } from "@/utils";

@Component({
  components: {},
})
export default class SvgIcon extends Vue {
  @Prop({ required: true }) name!: IconName;

  @Prop({ default: "4" }) size!: string;

  @Prop({ default: null }) color!: string;

  @Prop({ default: "2" }) stroke!: string;

  @Prop() tailwind!: string;

  get iconColor(): string {
    if (this.color) {
      return `text-${this.color}`;
    }
    return "";
  }

  get cssClass(): string {
    if (this.tailwind) {
      return this.tailwind;
    }
    return `h-${this.size} w-${this.size} stroke-${this.stroke} ${this.iconColor}`;
  }

  get path(): string {
    return this.icons[this.name];
  }

  get dimension(): string {
    return `h-${this.size} w-${this.size}`;
  }

  private icons = {
    check: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    cross: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    exclamation: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    power: "M13 10V3L4 14h7v7l9-11h-7z",
    temp: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    chevronDown: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    moon: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    sun: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    git: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
  } as const;
}
</script>
