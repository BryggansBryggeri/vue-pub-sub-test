<template>
<div class="rounded shadow-lg border">
  <div class="mx-auto shadow rounded h-full w-full">
    <div
      class="flex flex-row bg-gray-200 bg-opacity-40 rounded-t justify-between w-full shadow-sm mb-2 px-4 py-2"
    >
      <div class="sm:w-3/5 mb-4 sm:mb-0">
        <h2 class="text-gray-800 text-lg font-bold">{{vesselData.name}}</h2>
        <p class="my-0 text-gray-600 text-xs">
          Main sensor: {{ vesselData.mainSensor }}
        </p>
        <p class="my-0 text-gray-600 text-xs">
          Main actor: {{vesselData.mainActor}}
        </p>
      </div>
      <div class="flex text-green-600 rounded-tr">
        <div class="my-auto mx-auto">
          <svg
            class="h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              class="heroicon-ui"
              d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center p-3">
      <div class="flex w-full justify-between mb-8">
        <div class="flex flex-col items-center w-6/12">
          <p class="text-gray-600 text-sm mb-1">Current Temp</p>
          <p class="text-gray-800 text-4xl mb-2">{{ sensorVal }}&deg;C</p>
          <p class="text-gray-600 text-sm mb-1">Target Temp</p>
          <p class="text-gray-800 text-xl">{{ sensorVal + 10 }}&deg;C</p>
        </div>
        <div class="flex flex-col items-center w-6/12 border-l border-gray-200">
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
      <div>
        <div>
          <h1> msg </h1>
          <h3>Dummy sensor: {{ sensorVal }}</h3>
          <button @click="addMessage('text')">Add</button>
          <ul>
            <li v-for="(msg, idx) in messages" :key="`msg-${idx}`">
              msg
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { eventStore } from '@/store/events';
import { eventbus } from '@/eventbus';
import VesselProp from '@/models';


@Component
export default class Vessel extends Vue {
  @Prop() vesselData!: VesselProp;

  get messages(): string[] {
    return eventStore.messages;
  }

  get sensorVal(): number {
    return eventStore.sensorVal;
  }

  addMessage(msg: string): void {
    eventbus.publish('ext_comm.ui.test', msg);
  }
}
</script>

