<template>
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
#app {
  display: flex;
}
.overview {
  display: flex;
}
</style>
