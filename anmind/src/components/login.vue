<template>
<div  id="bg">
    <el-row>
    <el-col :span="24"><div class="grid-content bg-purple-dark" style="height:60px;"><h3 style="margin:0px;line-height:60px;text-indent:20px;">学生后台管理系统</h3></div></el-col>
    </el-row>
    <el-card class="box-card">
        <div class="text item">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
                <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.native="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                 <el-button type="success" @click="register">注册</el-button>
            </el-form-item>
            </el-form>
        </div>
    </el-card>
</div>
    
</template>

<script>
 export default {
    data() {
      
      var validatePass = (rule, value, callback) => {
          console.log(value)
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          name: '',
          password: '',
        },
        rules: {
          name: [
            { validator: validatePass, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this
            console.log(that.ruleForm.name)
             console.log(that.ruleForm.password)
            this.axios({
              method:'post',
              url:'http://127.0.0.1:711/login',
              data:{
                uname:that.ruleForm.name,
                pwd:that.ruleForm.password
              }
            }).then((response) => {
              if(response.data == true){
                 this.$message({
                message: '登录成功',
                type: 'success'
              });
              this.$store.state.userName = this.ruleForm.name
              this.$store.state.userPwd = this.ruleForm.password
              // console.log(this.$store.state.toUrl)
              var nextUrl = sessionStorage.getItem("url")
              // console.log(nextUrl)
              
                  this.$router.push("/index")
              
               
              }else if(response.data == false){
                  this.$message.error('用户名或者密码错误！');
              }else{
                this.$message.error('服务器错误！');
              }
                 
              })
            // console.log(this.ruleForm.name)
            
            // alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      register(){
        this.$router.push("/register")
      }
    }
  }
</script>

<style scoped>
 .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
    margin:200px auto;
  }
  .bg-purple-dark {
    background: skyblue;
  }
  #bg{
      height: 900px;
      background: url("../assets/timg.jpg")
  }
</style>