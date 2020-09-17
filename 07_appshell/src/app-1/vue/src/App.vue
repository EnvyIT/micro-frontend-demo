<template>
  <h1>Übersicht Österreich</h1>
  <img class="logo" src="./assets/logo.png" alt="Vue.js Logo" />
  <Overview class="overview" />
</template>

<script>
import Overview from "./components/Overview.vue";

export default {
  name: "App",
  components: {
    Overview,
  },
};
</script>

<style>
h1 {
  display: inline-block;
}
#app {
  display: flex;
}
.overview {
  display: flex;
}
</style>
