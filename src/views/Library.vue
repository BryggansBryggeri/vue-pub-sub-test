<template>
  <main class="h-screen">
    <div
      id="content"
      class="bg-blue-gray-100 overscroll-none font-sans dark:bg-darkTrueGray w-full dark:text-gray-100 text-gray-700 h-full pb-24"
    >
      <NavBar />

      <div class="flex flex-grid grid-cols-6 gap-4 justify-around">
        <div class="w-1/6 border-2 rounded border-gray-700 flex flex-col items-center space-y-3">
          <span class="justify-left text-left">Component</span>
          <span class="text-sm">utils/Modal</span>
          <button
            class="p-2 bg-green-400 rounded-lg shadow-md outline-none ring-0 focus:outline-none focus:ring-0"
            @click="modalVisible = true"
          >
            Open modal
          </button>
          <div>
            <Modal
              :isVisible="modalVisible"
              @cancel="modalVisible = false"
              @confirm="modalVisible = false"
            />
          </div>
        </div>
        <div class="w-1/6 border-2 rounded border-gray-700">
          <div class="flex flex-wrap">
            <div class="flex w-8/12">
              <input
                type="text"
                value="7"
                class="bg-white text-sm text-gray-900 text-center focus:outline-none border border-gray-800 focus:border-gray-600 rounded-l-md w-full"
              />
            </div>
            <div class="flex flex-col w-4/12">
              <button
                class="text-white text-center text-md font-semibold rounded-tr-md px-1 bg-gray-800 focus:bg-gray-600 focus:outline-none border border-gray-800 focus:border-gray-600"
              >
                +
              </button>
              <button
                class="text-white text-center text-md font-semibold rounded-br-md px-1 bg-gray-800 focus:bg-gray-600 focus:outline-none border border-gray-800 focus:border-gray-600"
              >
                -
              </button>
            </div>
          </div>
        </div>

        <div class="w-1/6 border-2 rounded border-gray-700"></div>
        <div class="w-1/6 border-2 rounded border-gray-700"></div>
        <div class="w-1/6 border-2 rounded border-gray-700"></div>
        <div class="w-1/6 border-2 rounded border-gray-700"></div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { eventStore } from "@/store/events";
import Controller from "@/components/Controller.vue";
import Sensor from "@/components/Sensor.vue";
import NavBar from "@/components/NavBar.vue";
import Modal from "@/components/utils/Modal.vue";
import DashboardTop from "@/components/DashboardTop.vue";
import { ControllerProps } from "@/models/controller";

@Component({
  components: {
    Modal,
    NavBar,
  },
})
export default class About extends Vue {
  private modalVisible = false;
}
</script>
