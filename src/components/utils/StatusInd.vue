<template>
  <svg-icon :name="iconType" :color="color" :size="size" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SvgIcon from "@/components/symbols/SvgIcon.vue";
import { IconName, IndicatorType, IconColor, IconStyle } from "@/utils";

@Component({
  components: {
    SvgIcon,
  },
})
export default class StatusInd extends Vue {
  @Prop({ required: true }) status!: number;

  @Prop({ default: "4" }) size!: string;

  private stroke!: string;

  get iconType(): IconName {
    return this.iconProps(this.status)[0];
  }

  get color(): IconColor {
    return this.iconProps(this.status)[1];
  }

  get style(): string {
    return this.iconProps(this.status)[2];
  }

  iconProps(iconStatus: IndicatorType): [IconName, IconColor, IconStyle] {
    switch (iconStatus) {
      case IndicatorType.Ok:
        return ["check", "green-500", "text-green-500"];
      case IndicatorType.Issue:
        return ["exclamation", "yellow-500", "text-yellow-500"];
      case IndicatorType.Error:
        return ["cross", "red-500", "text-red-500"];
      default:
        throw new Error("Unreachable IndicatorType");
    }
  }
}
</script>
