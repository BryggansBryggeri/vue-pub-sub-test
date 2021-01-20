<template>
  <main id="error" class="min-h-screen h-full">
    <div class="flex flex-row justify-center mx-auto my-auto">
    <span>We had errors. I'm sorry</span>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Modal from "@/components/utils/Modal.vue";

@Component({
  components: {
    Modal,
  },
})
export default class Error extends Vue {
  private modalVisible = false;
}
</script>
