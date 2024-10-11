<template>
  <ChartJs />
</template>

<script>
import ChartJs from "./components/ChartJs.vue";

export default {
  name: "App",
  components: {
    ChartJs,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* scroll bar style start here */
::-webkit-scrollbar {
  width: 9px;
  height: 9px;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb {
  background: #c5c5c5;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #fff;
  border-radius: 10px;
}
/* scroll bar style end here */
</style>
