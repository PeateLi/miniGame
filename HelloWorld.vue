<template>
  <div>
    <p>
      <b>题目类型</b>
      <label><input type="radio" name="topic" />选择题</label>
      <label><input type="radio" name="topic" />填空题</label>
      <label><input type="radio" name="topic" />问答题</label>
      <button @click="add">+</button>
      <button @click="redu">-</button>
    </p>
    {{this.$store.getters.newMessage}}
        
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    add(){
      // this.$store.commit("add")
      this.$store.dispatch("addFun")
    },
    redu(){
      //  this.$store.commit("redu")
      this.$store.dispatch("reduFun")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
