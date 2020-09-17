<template>
  <div
    class="dashlet-container"
    v-bind:style="{ background: entry.backgroundColor }"
  >
    <strong class="row" v-bind:style="{ color: entry.color }">
      {{ entry.title }}
    </strong>
    <p class="row value" v-bind:style="{ color: entry.color }">
      {{ entry.value }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Dashlet",
  props: {
    entry: Object,
  },
};
</script>

<style scoped>
.dashlet-container {
  display: flex;
  flex: 0 1 45%;
  height: 12.5em;
  max-height: 12.5em;
  flex-wrap: wrap;
  padding: 2em;
}

.row {
  display: flex;
  flex: 0 1 100%;
  justify-content: center;
  align-items: center;
}

.value {
  font-size: xx-large;
  font-weight: bold;
}
</style>
