<template>
  <main
    class="full-height bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text transition"
  >
    <Spinner v-if="!loaded" />
    <div v-else class="container mx-auto px-6 h-full">
      <div class="pb-20 pt-12 lg:py-20">
        <router-link to="/">
          <button
            class="w-32 h-10 shadow border dark:border-dark-bg rounded bg-white dark:bg-dark-elements transition"
          >
            <font-awesome-icon
              icon="arrow-left"
              class="fill-current text-light-input text-sm"
            />
            <span class="ml-2 text-base">Back</span>
          </button>
        </router-link>
      </div>
      <div class="flex flex-col lg:flex-row lg:gap-10 lg:h-96">
        <div class="flex-1 h-full">
          <img :src="country.flag" alt="" class="w-full h-full" />
        </div>
        <div class="flex-1 flex flex-col pt-10 lg:py-10 lg:pl-20">
          <h2 class="text-3xl font-extrabold">{{ country.name }}</h2>
          <div class="flex flex-col lg:flex-row gap-6 mt-6">
            <div class="flex-1 flex flex-col">
              <span class="my-1 font-light"
                ><span class="font-semibold mr-1.5">Native Name:</span
                >{{ country.nativeName }}</span
              >
              <span class="my-1 font-light"
                ><span class="font-semibold mr-1.5">Population:</span
                >{{ country.population }}</span
              >
              <span class="my-1 font-light"
                ><span class="font-semibold mr-1.5">Region:</span
                >{{ country.region }}</span
              >
              <span class="my-1 font-light"
                ><span class="font-semibold mr-1.5">Sub Region:</span
                >{{ country.subregion }}</span
              >
              <span class="my-1 font-light"
                ><span class="font-semibold mr-1.5">Capital:</span
                >{{ country.capital }}</span
              >
            </div>
            <div class="flex-1 flex flex-col">
              <span class="my-1 font-light"
                ><span class="font-semibold mr-1.5">Top Level Domain:</span
                >{{ country.topLevelDomain && country.topLevelDomain[0] }}</span
              >
              <span class="my-1 font-light"
                ><span class="font-semibold mr-1.5">Currencies:</span
                >{{ currencies }}</span
              >
              <span class="my-1 font-light"
                ><span class="font-semibold mr-1.5">Languages:</span
                >{{ languages }}</span
              >
            </div>
          </div>
          <div
            class="my-8 lg:mt-auto flex flex-col lg:flex-row lg:items-center"
          >
            <span class="font-semibold mb-2 lg:mb-0 lg:mr-3 lg:min-w-max"
              >Border Countries:</span
            >

            <span v-if="borders.length === 0">None</span>
            <div v-else class="flex flex-wrap gap-2">
              <router-link
                v-for="border in borders"
                :key="border.name"
                :to="{ name: 'Details', params: { code: border.alpha3Code } }"
              >
                <div
                  class="py-0.5 px-6 shadow border dark:border-dark-bg rounded flex justify-center items-center"
                >
                  <span class="font-light">{{ border.name }}</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import Spinner from "@/components/Spinner";

export default {
  name: "Details",
  components: {
    Spinner,
  },
  data() {
    return {
      country: {},
      borders: [],
      loaded: false,
    };
  },
  mounted() {
    this.fetchData(this.$route.params.code);
  },
  methods: {
    fetchData: function(code) {
      axios
        .get(`https://restcountries.eu/rest/v2/alpha/${code}`)
        .then(({ data }) => {
          this.country = data;
          const { borders } = data;
          if (borders.length) {
            axios
              .get(
                `https://restcountries.eu/rest/v2/alpha?codes=${borders.join(
                  ";"
                )}`
              )
              .then(({ data }) => {
                this.borders = data;
                this.loaded = true;
              })
              .catch(() => {
                this.borders = [];
                this.loaded = true;
              });
          } else {
            this.borders = [];
            this.loaded = true;
          }
        })
        .catch(() => {
          this.country = {};
          this.loaded = true;
        });
    },
  },
  computed: {
    currencies: function() {
      if (this.country.currencies)
        return this.country.currencies.map((c) => c.name).join(", ");
      return "";
    },
    languages: function() {
      if (this.country.languages)
        return this.country.languages.map((l) => l.name).join(", ");
      return "";
    },
  },
  watch: {
    $route(to) {
      this.loaded = false;
      const { code } = to.params;
      this.fetchData(code);
    },
  },
};
</script>

<style scoped lang="scss">
.full-height {
  min-height: calc(100vh - 72px);
}
</style>
