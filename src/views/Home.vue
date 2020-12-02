<template>
  <div class="main flex flex-col">
    <!-- Main container -->
    <NavBar />

    <div class="px-10 flex flex-col">
      <!-- Dashboard container -->

      <div class="w-full pt-6 mx-auto">
        <!-- Full width layout -->
        <div class="flex flex-wrap">
          <div class="w-full">
            <div class="rounded shadow-lg h-40 border p-4">
              Full width top content here
            </div>
          </div>
        </div>
      </div>

      <!-- Three column layout  -->
      <div
        class="w-full mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8"
      >
        <div class="rounded shadow-lg border">
          <PubSubTest v-bind="mash" />
        </div>

        <div class="rounded shadow-lg border  border-yellow-500">
          <div class="mx-auto bg-yellow-50 h-full shadow rounded w-full">
            <div
              class="flex flex-row bg-gray-200 bg-opacity-40 rounded-t justify-between w-full shadow-sm mb-2 px-4 py-2"
            >
              <div class="sm:w-3/5 mb-4 sm:mb-0">
                <h2 class="text-gray-800 text-lg font-bold">
                  { { Vessel.Name } }
                </h2>
                <p class="my-0 text-gray-600 text-xs">
                  Main sensor: { { vessel.sensor } }
                </p>
                <p class="my-0 text-gray-600 text-xs">
                  Main actor: { { vessel.actor } }
                </p>
              </div>
              <div class="flex text-yellow-600 rounded-tr">
                <div class="my-auto mx-auto">
                  <svg
                    class="h-8 w-8 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      class="heroicon-ui"
                      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center p-3">
              <div class="flex w-full justify-between mb-8">
                <div class="flex flex-col items-center w-6/12">
                  <p class="text-gray-600 text-sm mb-1">Current Temp</p>
                  <p class="text-gray-800 text-4xl mb-2">76,1&deg;C</p>
                  <p class="text-gray-600 text-sm mb-1">Target Temp</p>
                  <p class="text-gray-800 text-xl">75,8&deg;C</p>
                </div>
                <div
                  class="flex flex-col items-center w-6/12 border-l border-gray-200"
                >
                  <p class="text-gray-600 text-sm mb-1">Controller</p>
                  <p class="text-gray-800 text-4xl mb-2">Auto</p>
                  <p class="text-gray-600 text-sm mb-1">Current Status</p>
                  <div class="flex" flex-row>
                    <p class="text-gray-800 text-xl">50%</p>
                    <div
                      class="h-4 w-4 bg-green-500 shadow-lg my-auto mx-2 rounded-full animate-pulse"
                    ></div>
                  </div>
                </div>
                <hr class="mb-4 lg:mb-4 h-1 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>

        <div class="rounded shadow-lg border border-red-500">
          <div class="mx-auto bg-red-100 h-full shadow rounded w-full">
            <div
              class="flex flex-row bg-gray-200 bg-opacity-40 rounded-t justify-between w-full shadow-sm mb-2 px-4 py-2"
            >
              <div class="sm:w-3/5 mb-4 sm:mb-0">
                <h2 class="text-gray-800 text-lg font-bold">
                  { { Vessel.Name } }
                </h2>
                <p class="my-0 text-gray-600 text-xs">
                  Main sensor: { { vessel.sensor } }
                </p>
                <p class="my-0 text-gray-600 text-xs">
                  Main actor: { { vessel.actor } }
                </p>
              </div>
              <div
                class="flex text-red-600 rounded-tr"
              >
                <div class="my-auto mx-auto">
                  <svg
                    class="h-8 w-8 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      class="heroicon-ui"
                      d="M4.93 19.07A10 10 0 1 1 19.07 4.93 10 10 0 0 1 4.93 19.07zm1.41-1.41A8 8 0 1 0 17.66 6.34 8 8 0 0 0 6.34 17.66zM13.41 12l1.42 1.41a1 1 0 1 1-1.42 1.42L12 13.4l-1.41 1.42a1 1 0 1 1-1.42-1.42L10.6 12l-1.42-1.41a1 1 0 1 1 1.42-1.42L12 10.6l1.41-1.42a1 1 0 1 1 1.42 1.42L13.4 12z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center p-3">
              <div class="flex w-full justify-between mb-8">
                <div class="flex flex-col items-center w-6/12">
                  <p class="text-gray-600 text-sm mb-1">Current Temp</p>
                  <p class="text-gray-800 text-4xl mb-2">76,1&deg;C</p>
                  <p class="text-gray-600 text-sm mb-1">Target Temp</p>
                  <p class="text-gray-800 text-xl">75,8&deg;C</p>
                </div>
                <div
                  class="flex flex-col items-center w-6/12 border-l border-gray-200"
                >
                  <p class="text-gray-600 text-sm mb-1">Controller</p>
                  <p class="text-gray-800 text-4xl mb-2">Auto</p>
                  <p class="text-gray-600 text-sm mb-1">Current Status</p>
                  <div class="flex" flex-row>
                    <p class="text-gray-800 text-xl">50%</p>
                    <div
                      class="h-4 w-4 bg-green-500 shadow-lg my-auto mx-2 rounded-full animate-pulse"
                    ></div>
                  </div>
                </div>
                <hr class="mb-4 lg:mb-4 h-1 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Three column layout -->
    </div>
    <!-- End Dashboard container -->
    <!-- <PubSubTest msg="Pub-sub test" /> -->
  </div>
  <!-- End Main container -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PubSubTest from '@/components/PubSubTest.vue'; // @ is an alias to /src
import NavBar from '@/components/NavBar.vue';
// import MashCard from "@/components/MashCard.vue";

private mash: Array<object> = [
  {
    name: 'Mash Vessel'
    mainSensor: 'Mash Sensor'
    mainActor: 'Mash Actor'
  }
]

@Component({
  components: {
    PubSubTest,
    NavBar,
    // MashCard,
  },
})
export default class Home extends Vue {}
</script>
