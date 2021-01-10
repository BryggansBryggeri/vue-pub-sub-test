<template>
  <Toggle>
    <component :is="ToggleType">
      <slot></slot>
    </component>
  </Toggle>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { ToggleType } from "@/utils";
import OnOffToggle from "@/components/toggles/OnOffToggle.vue";
import ManAutoToggle from "@/components/toggles/ManAutoToggle.vue";

@Component({
  components: {
      OnOffToggle,
      ManAutoToggle
      },
})
export default class Toggle extends Vue {
  @Prop({ required: true }) ToggleType!: ToggleType;

  @Prop({ default: false }) state!: boolean;

  @Emit()
  private click(): void {
    // click logic in parent comp.
  }
}
</script>