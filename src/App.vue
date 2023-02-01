<!--
 * @Descripttion: 
 * @version: 
 * @Author: maoyueer
 * @Date: 2023-01-12 17:04:27
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-01-30 10:15:10
-->
<!-- <template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template> -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// import HelloWorld from './components/HelloWorld.vue'
// import { calculationSmall } from "./api/test";
// import { ref, onMounted } from "vue";
export default {
  
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
