<template>
  <div id="loading">
    <div
      class="flex-col space-y-4 fixed inset-0 z-30 transition-all duration-550 ease-in-out flex justify-center items-center text-green-500"
    >
      <svg
        version="1.1"
        id="Ebene_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="100%"
        height="500px"
        viewBox="0 0 560 960"
        style="enable-background: new 0 0 560 960"
        xml:space="preserve"
      >
        <path
          class="beer"
          d="M147,386.582c0,0,0.833,235.875,0.833,257.209S168.333,668,172.667,668s145.667,0,154.333,0s17-11,17-28
	s0-253,0-253L147,386.582z"
        />
        <path
          class="schaum"
          d="M344,387l-132-0.418V422c0,0-2,16.75-20.75,16.75S171,428.25,171,423.5c0-5.25,0-36.5,0-36.5
	s-12.25-0.334-24-0.418c-19.625-2.457-23-25.332-3.625-38.832c-7.5-30.25,64.063-94.25,107.896-16.418
	c15.333-15.5,39.781-19,49.115,14.168c3.666-24.834,10.437-43.25,42.974-43.25c28.668,0,41.457,27.082,41.457,41.422
	C384.814,375,356.732,387,346.215,387H344z"
        />
        <path
          class="handle"
          d="M348,597c0,0,27.75,0,53,0c14,0,20.5-16.5,20.5-25.5c0-4.25,0.355-99,0.355-113.75S407.75,437,399.25,437
	S348,437,348,437"
        />
        <path
          class="outline"
          d="M147,385.481c0,0,0.833,235.875,0.833,257.209s20.5,24.209,24.834,24.209s145.667,0,154.333,0s17-11,17-28
	s0-48,0-48v-4v-201l-132-0.418v35.418c0,0-2,16.75-20.75,16.75s-20.25-10.5-20.25-15.25c0-5.25,0-36.5,0-36.5
	S158.75,385.565,147,385.481c-19.625-2.457-23-25.332-3.625-38.832c-7.5-30.25,64.063-94.25,107.896-16.418
	c15.332-15.5,39.78-19,49.114,14.168c3.666-24.834,10.437-43.25,42.974-43.25c28.668,0,41.457,27.082,41.457,41.422
	c-0.002,31.328-28.084,43.328-38.602,43.328"
        />
        <line class="lines" x1="196" y1="480" x2="196" y2="562" />
        <line class="lines" x1="250" y1="480" x2="250" y2="562" />
        <line class="lines" x1="304" y1="480" x2="304" y2="562" />
      </svg>
      <p class="text-2xl">{{ msg }}<span class="animate-pulse">...</span></p>
      <div class="flex flex-row space-x-2" v-if="type === 'error'">
        <button class="bg-green-500 p-3 rounded-xl shadow-xl text-white" @click="reload()">
          Try again!
        </button>
        <router-link class="bg-red-500 p-3 rounded-xl shadow-xl text-white" to="/Error"
          >Ok, show me errors!
        </router-link>
        <button class="bg-yellow-500 p-3 rounded-xl shadow-xl text-white" @click="emitAdmin()">
          Dev
        </button>
      </div>
    </div>
    <div class="opacity-90 fixed inset-0 z-20 bg-black"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Loading extends Vue {
  @Prop({}) msg!: string;

  @Prop({}) type!: string;

  emitAdmin() {
    this.$emit("admin");
  }

  private reload() {
    window.location.reload();
  }
}
</script>

<style scoped>
body {
  background: red;
}
.lines {
  fill: none;
  stroke: #4d4d4d;
  stroke-width: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}
.schaum {
  fill: #f15a24;
}
.outline {
  fill: none;
  stroke: #4d4d4d;
  stroke-width: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}
.beer {
  fill: transparent;
}
.handle {
  fill: none;
  stroke: #4d4d4d;
  stroke-width: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}

/*** Animation ***/
/* Outline */
.outline {
  stroke-dasharray: 1500;
  stroke-dashoffset: 1500;
  animation: outlinedash 6s linear infinite;
}

@keyframes outlinedash {
  5% {
    stroke-dashoffset: 1500;
  }
  45% {
    stroke-dashoffset: 0;
  }
  55% {
    stroke-dashoffset: 0;
  }
  95% {
    stroke-dashoffset: 1500;
  }
}

/* Handle */
.handle {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: handledash 6s linear infinite;
}

@keyframes handledash {
  10% {
    stroke-dashoffset: 300;
  }
  20% {
    stroke-dashoffset: 300;
  }
  23% {
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dashoffset: 0;
  }
  77% {
    stroke-dashoffset: 0;
  }
  80% {
    stroke-dashoffset: 300;
  }
  90% {
    stroke-dashoffset: 300;
  }
}

/* Lines */
.lines {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: linedash 6s linear infinite;
}

@keyframes linedash {
  5% {
    stroke-dashoffset: 100;
  }
  10% {
    stroke-dashoffset: 0;
  }
  90% {
    stroke-dashoffset: 0;
  }
  95% {
    stroke-dashoffset: 100;
  }
}

/* Schaum */
.schaum {
  fill: #131313;
  animation: fillschaum 6s linear infinite;
}

@keyframes fillschaum {
  40% {
    fill: transparent;
  }
  45% {
    fill: #ffffff;
  }
  55% {
    fill: #ffffff;
  }
  60% {
    fill: transparent;
  }
}

/* Beer */
.beer {
  fill: transparent;
  animation: fillbeer 6s linear infinite;
}
@keyframes fillbeer {
  40% {
    fill: transparent;
  }
  45% {
    fill: #deb712;
  }
  55% {
    fill: #deb712;
  }
  60% {
    fill: transparent;
  }
}
</style>
