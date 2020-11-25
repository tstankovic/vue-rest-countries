<template>
  <div class="flex justify-between flex-col lg:flex-row gap-6 p-4 lg:gap-0">
    <div
      class="w-full lg:w-96 h-12 bg-white dark:bg-dark-elements shadow rounded flex items-center px-6 py-2"
    >
      <font-awesome-icon
        icon="search"
        class="text-light-input dark:text-dark-text"
      />
      <form @submit.prevent="$emit('search', name)" class="w-full h-full ml-3">
        <input
          type="text"
          placeholder="Search for a country..."
          class="w-full h-full bg-white dark:bg-dark-elements transition"
          v-model="name"
        />
      </form>
    </div>
    <div
      class="relative w-48 h-12 shadow rounded bg-white dark:bg-dark-elements transition"
    >
      <div
        class="w-full h-full flex justify-between items-center px-4 cursor-pointer"
        @click="handleOpenClick"
      >
        <span>{{ regionFilter }}</span>
        <font-awesome-icon icon="caret-down" />
      </div>
      <div
        class="absolute w-full top-full left-0 px-6 py-2 mt-1 shadow rounded bg-white dark:bg-dark-elements"
        :class="{ block: open, hidden: !open }"
      >
        <div class="py-1 cursor-pointer" @click="handleRegionClick('')">
          World
        </div>
        <div class="py-1 cursor-pointer" @click="handleRegionClick('africa')">
          Africa
        </div>
        <div class="py-1 cursor-pointer" @click="handleRegionClick('americas')">
          Americas
        </div>
        <div class="py-1 cursor-pointer" @click="handleRegionClick('asia')">
          Asia
        </div>
        <div class="py-1 cursor-pointer" @click="handleRegionClick('europe')">
          Europe
        </div>
        <div class="py-1 cursor-pointer" @click="handleRegionClick('oceania')">
          Oceania
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Options",
  props: ["region"],
  data() {
    return {
      name: "",
      open: false,
    };
  },
  methods: {
    handleInputChange(e) {
      this.name = e.target.value;
    },
    handleOpenClick() {
      this.open = !this.open;
    },
    handleRegionClick(region) {
      this.open = false;
      this.$emit("region", region);
    },
  },
  computed: {
    regionFilter: function() {
      const { region } = this.$props;
      if (region)
        return region[0].toUpperCase() + region.slice(1, region.length);
      else return "Filter by region";
    },
  },
};
</script>
