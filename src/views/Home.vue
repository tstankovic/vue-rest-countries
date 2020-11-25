<template>
  <main
    class="full-height bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text transition"
  >
    <div class="container mx-auto">
      <div class="lg:py-10">
        <Options
          v-on:search="handleSearch"
          v-on:region="handleRegionChange"
          :region="regionFilter"
        />
        <Spinner v-if="!loaded" />
        <Countries v-else :countries="countries" />
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import Options from "@/components/Options.vue";
import Countries from "@/components/Countries.vue";
import Spinner from "@/components/Spinner.vue";

export default {
  name: "Home",
  components: {
    Options,
    Countries,
    Spinner,
  },
  mounted() {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(({ data }) => {
        this.countries = data;
        this.loaded = true;
      })
      .catch(() => {
        this.countries = [];
        this.loaded = true;
      });
  },
  data() {
    return {
      countries: [],
      loaded: false,
      nameFilter: "",
      regionFilter: "",
    };
  },
  methods: {
    handleSearch(name) {
      this.loaded = false;
      let url;
      if (name.trim().length)
        url = `https://restcountries.eu/rest/v2/name/${name}`;
      else url = "https://restcountries.eu/rest/v2/all";
      axios
        .get(url)
        .then(({ data }) => {
          if (this.regionFilter)
            this.countries = data.filter(
              (c) => c.region.toLowerCase() === this.regionFilter
            );
          else this.countries = data;
          this.loaded = true;
        })
        .catch(() => {
          this.countries = [];
          this.loaded = true;
        });
    },
    handleRegionChange(region) {
      this.loaded = false;
      this.regionFilter = region;
      let url;
      if (!region) url = "https://restcountries.eu/rest/v2/all";
      else url = `https://restcountries.eu/rest/v2/region/${region}`;
      axios
        .get(url)
        .then(({ data }) => {
          this.countries = data;
          this.loaded = true;
        })
        .catch(() => {
          this.countries = [];
          this.loaded = true;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.full-height {
  min-height: calc(100vh - 72px);
}
</style>
