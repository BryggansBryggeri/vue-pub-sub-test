<template>
  <svg-icon :name="iconType" :color="color" :size="size" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SvgIcon from "@/components/symbols/SvgIcon.vue";
import { IndicatorType } from "@/utils";

type IndicatorName = "check" | "exclamation" | "cross";
type IndicatorColor = "green-500" | "yellow-500" | "red-500";
type IndicatorStyle = "text-green-500" | "text-yellow-500" | "text-red-500";

@Component({
  components: {
    SvgIcon,
  },
})
export default class StatusInd extends Vue {
  @Prop({ required: true }) status!: IndicatorType;

  @Prop({ default: "4" }) size!: string;

  private stroke!: string;

  get iconType(): IndicatorName {
    return this.iconProps(this.status)[0];
  }

  get color(): IndicatorColor {
    return this.iconProps(this.status)[1];
  }

  get style(): string {
    return this.iconProps(this.status)[2];
  }

  iconProps(iconStatus: IndicatorType): [IndicatorName, IndicatorColor, IndicatorStyle] {
    switch (iconStatus) {
      case IndicatorType.Ok:
        return ["check", "green-500", "text-green-500"];
      case IndicatorType.Issue:
        return ["exclamation", "yellow-500", "text-yellow-500"];
      case IndicatorType.Error:
        return ["cross", "red-500", "text-red-500"];
      default:
        console.log("error status", iconStatus);
        throw new Error("Unreachable IndicatorType");
    }
  }
}
</script>
