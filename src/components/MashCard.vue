<template>
  <div class="mx-auto bg-white shadow flex flex-col items-center p-8 rounded w-full">
    <div class="h-24 w-24 p-2 bg-red-200 rounded-full mb-1">
      <img
        :src="profilePhoto"
        alt=""
        class="h-full w-full object-cover overflow-hidden rounded-full"
      />
    </div>
    <p class="mb-1 text-gray-800 text-base">Timothy Jon Oliphant</p>
    <p class="mb-6 text-gray-600 text-xs">Los Angeles, California</p>
    <div class="flex w-full justify-between mb-8">
      <div class="flex flex-col items-center w-4/12">
        <p class="text-gray-600 text-2xl">82</p>
        <p class="text-gray-800 text-sm">Reviews</p>
      </div>

      <div class="flex flex-col items-center w-4/12 border-r border-l border-gray-200">
        <p class="text-gray-600 text-2xl">28</p>
        <p class="text-gray-800 text-sm">Projects</p>
      </div>
      <div class="flex flex-col items-center w-4/12">
        <p class="text-gray-600 text-2xl">42</p>
        <p class="text-gray-800 text-sm">Approved</p>
      </div>
    </div>
    <button
      class="bg-gray-200 transition text-sm duration-150 ease-in-out hover:bg-gray-300 rounded text-indigo-600 px-6 py-2 focus:outline-none"
    >
      Send Message
    </button>
  </div>
</template>

<script>
export default {
  name: "MashCard",
  data() {
    return {
      profilePhoto: "https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_25.png",
    };
  },
};
</script>
