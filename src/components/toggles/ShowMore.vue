<template>
  <div class="flex flex-row justify-center">
    <svg-icon
      class="transform transition opacity-60 duration-500 ease-in-out"
      :class="{ '-rotate-90 ': showMore, 'rotate-90': !showMore }"
      name="chevronRight"
      size="4"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SvgIcon from "@/components/symbols/SvgIcon.vue";

@Component({
  components: {
    SvgIcon,
  },
})
export default class ShowMore extends Vue {
  @Prop() isMore!: boolean;

  get showMore() {
    return this.isMore;
  }
}
</script>
