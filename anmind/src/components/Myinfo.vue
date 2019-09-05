<template>
    <div>
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index/echarts' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">个人信息</a></el-breadcrumb-item>
        </el-breadcrumb>
      <el-form>
        <el-form-item label="编号">
            <el-input type="text" v-model="userId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="账户">
            <el-input type="text" v-model="$store.state.userName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input value="密码" v-model="$store.state.userPwd" :disabled="true"></el-input>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            userId:"",
        }
    },
    methods:{
        peopleAjax(){
           var that = this
           console.log(that.$store.state.userName)
            this.axios.get("http://127.0.0.1:711/user",{
            params:{
              userName:that.$store.state.userName,
              userPwd:that.$store.state.userPwd
            }
          }).then((response) => {
              
              var json = eval("("+response.data+")")
              this.userId =json[0].userId
          })
      },
    },
    created(){
        this.peopleAjax()
        console.log(this.userId)
    }
}
</script>


<style scoped>

</style>