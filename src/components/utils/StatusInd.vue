<template>
    <svg-icon :name="iconType" :color="this.color" :stroke="this.stroke" :size="size"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SvgIcon from "@/components/symbols/SvgIcon.vue";
import { IconName } from "@/utils";

enum Success {
  Ok = 1,
  Issue = 2,
  Error = 3,
}

@Component({
  components: {
    SvgIcon,
  },
})
export default class StatusInd extends Vue {
  @Prop({ required: true }) status!: number;

  @Prop({ default: "4" }) size!: string;

    private color!: string;
    
    private stroke!: string;

get iconType(): IconName {
    switch (this.status) {
      case Success.Ok:
        this.color="green-500"
        return "check";
      case Success.Issue:
        return "exclamation";
      case Success.Error:
        this.color="red-500"
        this.stroke="2"
        return "cross";
      default:
        console.log("Unreachable iconType");
        this.color="blue-500"
        return "cross";
    }
  }

  get style(): string {
    switch (this.status) {
      case Success.Ok:
        return "text-green-500";
      case Success.Issue:
        return "text-yellow-500";
      case Success.Error:
        return "text-red-500";
      default:
        console.log("Unreachable stylee");
        return "";
    }
  }
}
</script>
