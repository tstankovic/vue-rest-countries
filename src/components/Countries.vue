<template>
  <h1
    v-if="!$props.countries.length"
    class="text-2xl font-semibold text-center mt-20"
  >
    No countries matching the current filter
  </h1>
  <div
    v-else
    class="mt-4 px-12 sm:px-4 lg:mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-16 xl:gap-20"
  >
    <router-link
      v-for="country in countries"
      :key="country.name"
      :to="{ name: 'Details', params: { code: country.alpha3Code } }"
    >
      <div
        class="bg-white dark:bg-dark-elements transition shadow rounded cursor-pointer max-w-sm mx-auto sm:max-w-none sm:mx-0"
      >
        <div class="h-48 rounded-t">
          <img :src="country.flag" alt="" class="w-full h-full rounded-t" />
        </div>
        <div class="flex flex-col pb-10 pt-8 px-6">
          <h6 class="text-base font-extrabold mb-3">{{ country.name }}</h6>
          <p class="my-0.5">
            <span class="font-semibold mr-1">Population:</span
            >{{ population(country.population) }}
          </p>
          <p class="my-0.5">
            <span class="font-semibold mr-1">Region:</span>{{ country.region }}
          </p>
          <p class="my-0.5">
            <span class="font-semibold mr-1">Capital:</span
            >{{ country.capital }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import numeral from "numeral";

export default {
  name: "Countries",
  props: ["countries"],
  data() {
    return {
      name: "",
    };
  },
  methods: {
    handleInputChange(e) {
      this.name = e.target.value;
    },
    population(number) {
      return numeral(number).format("0,0");
    },
  },
};
</script>
