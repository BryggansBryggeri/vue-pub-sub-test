<template>
  <div class="main"> <!-- Main container -->
    <NavBar />

    <div class="px-10"> <!-- Dashboard container -->

      <div class="pt-6 mx-auto"> <!-- Full width layout -->
        <div class="flex flex-wrap">
          <div class="w-full">
            <div
              class="rounded border-gray-300 border-dashed border-2 h-24"
            >
            Full width top content here
            </div>
          </div>
        </div>
      </div>

      <!-- Three column layout  -->
      <div
        class="mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8"
      >
        <div class="rounded border-gray-300 border-dashed border-2 h-24">
          Main column 1
        </div>

        <div class="rounded border-gray-300 border-dashed border-2 h-24">
          Main column 2
        </div>

        <div class="rounded border-gray-300 border-dashed border-2 h-24">
          Main column 3
        </div>
      </div>
      <!-- End Three column layout -->

      <PubSubTest msg="Pub-sub test" />
    </div><!-- End Dashboard container -->
  </div> <!-- End Main container -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PubSubTest from '@/components/PubSubTest.vue'; // @ is an alias to /src
import NavBar from '@/components/NavBar.vue';

@Component({
  components: {
    PubSubTest,
    NavBar,
  },
})
export default class Home extends Vue {}
</script>
