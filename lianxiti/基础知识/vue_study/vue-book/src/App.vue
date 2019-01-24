<template>
  <div id="app">
    <router-view></router-view>
    <tab></tab>
  </div>
</template>

<script>
import Tab from "./base/Tab.vue";
export default {
  name: "App",
  components: {
    Tab
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  touch-action: none;
}
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
input,
button {
  -webkit-appearance: none;
}
.content{
  position: fixed;
  width: 100%;
  top: 40px;
  bottom: 50px;
  overflow: auto;
}
</style>
