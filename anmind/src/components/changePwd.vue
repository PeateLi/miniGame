<template>
   <div>
     <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index/echarts' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">修改密码</a></el-breadcrumb-item>
        </el-breadcrumb>
      <el-form>
        <el-form-item label="编号">
            <el-input type="text" v-model="userId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="账户">
            <el-input type="text" v-model="$store.state.userName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input value="密码" v-model="$store.state.userPwd" ></el-input>
        </el-form-item>
        </el-form>
        <el-button type="primary" @click="checkRight">更新</el-button>
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
      checkRight(){
         var that = this
          this.axios.get("http://127.0.0.1:711/changeUser",{
            params:{
              userId:that.userId,
              userName:that.$store.state.userName,
              userPwd:that.$store.state.userPwd
            }
          }).then((response) => {
              if(response.data == 1){
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  });
                   this.peopleAjax()
              }else if(response.data == 0){
                this.$message.error('修改失败！');
              }else{
                this.$message.error('服务器出错！');
              }
          })
      }
    },
    created(){
        this.peopleAjax()
        console.log(this.userId)
    }
}
</script>

<style>

</style>