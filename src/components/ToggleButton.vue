<template>
<div class="flex flex-row space-x-2 items-center">
    <span>Manual</span>
  <div
    class="flex justify-between items-center"
    @click="toggleActive = !toggleActive"
    
  >
    
    <div
      class="w-16 h-10 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out"
      :class="{ 'bg-green-400': toggleActive }"
    >
      <div
        class="bg-white w-8 h-8 rounded-full shadow-md transform duration-300 ease-in-out"
        :class="{ 'translate-x-6': toggleActive }"
      ></div>
    
    </div>
  </div>
  <span>Auto</span>
  </div>

  
</template>
<script>
export default {
  data() {
    return {
      toggleActive: false,
    };
  },

  computed: {
    isActive() {
      return this.currentState;
    },

    checkedValue: {
      get() {
        return this.defaultState;
        // Subscribe to changes from Nats?
      },
      set(newValue) {
        this.currentState = newValue;
        // Publish to nats?
      },
    },
  },
};
</script>