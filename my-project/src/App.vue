<template>
  <div id="app">
    <Hellow img="./assets/timp.jpg"/>
  </div>
</template>

<script>
import Hellow from './components/HelloWorld'
export default {
  components:{
    Hellow
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
