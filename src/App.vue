<template>
  <div id="app" :class="{ dark: darkMode }">
    <Header :dark="darkMode" v-on:dark-mode="handleDarkMode" />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  components: {
    Header,
  },
  data() {
    return {
      darkMode: false,
    };
  },
  mounted() {
    if (localStorage.dark) this.darkMode = true;
  },
  methods: {
    handleDarkMode() {
      if (localStorage.dark) localStorage.removeItem("dark");
      else localStorage.setItem("dark", true);
      this.darkMode = !this.darkMode;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap");

#app {
  font-family: "Nunito Sans", sans-serif;
  font-size: 14px;
  min-height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
