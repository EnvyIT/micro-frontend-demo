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
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  margin-top: 24px;
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
