<template>
  <div class="flex-container">
    <Dashlet v-for="entry in entries" :key="entry.id" :entry="entry"></Dashlet>
  </div>
</template>

<script>
import Dashlet from "./Dashlet.vue";

export default {
  name: "Overview",
  components: {
    Dashlet,
  },
  data() {
    return {
      entries: [
        {
          id: 1,
          title: "Aktuelle Erkrankungen",
          value: 6660,
          backgroundColor: "#c40027",
          color: "#ffffff",
        },
        {
          id: 2,
          title: "Positiv Getestet",
          value: 35771,
          backgroundColor: "#3575f4",
          color: "#ffffff",
        },
        {
          id: 3,
          title: "Genesen",
          value: 27655,
          backgroundColor: "#eff23a",
          color: "#000",
        },
        {
          id: 4,
          title: "Bestätigte Todesfälle",
          value: 739,
          backgroundColor: "#050303",
          color: "#ffffff",
        },
        {
          id: 5,
          title: "Gemeldete Todesfälle",
          value: 758,
          backgroundColor: "#8e8d8d",
          color: "#ffffff",
        },
        {
          id: 6,
          title: "Anzahl Testungen",
          value: 1379839,
          backgroundColor: "#00c4a7",
          color: "#000",
        },
      ],
    };
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex-container {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}
</style>
