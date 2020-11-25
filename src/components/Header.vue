<template>
  <header
    class="py-5 dark:bg-dark-elements text-light-text dark:text-dark-text transition"
  >
    <div class="container px-4 mx-auto flex justify-between items-center">
      <router-link to="/">
        <h1 class="text-base md:text-2xl font-extrabold">
          Where in the world?
        </h1>
      </router-link>
      <div class="flex items-center cursor-pointer" @click="$emit('dark-mode')">
        <font-awesome-icon v-if="dark" :icon="['fas', 'moon']" />
        <font-awesome-icon v-else :icon="['far', 'moon']" />
        <h6 class="ml-2">Dark mode</h6>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: ["dark"],
};
</script>
