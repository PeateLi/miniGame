<template>
    <div>
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
                <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
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
           this.axios({
             method:"post",
             url:"http://127.0.0.1:711/register",
             data:{
                uname:that.ruleForm.name,
                pwd:that.ruleForm.password
             }
           }).then((response) => {
              if(response.data){
                this.$message({
                message: '注册成功',
                type: 'success'
              });
                this.$router.push("/login")
              }else if(response.data == false){
                 this.$message.error('注册失败！');
              }
           })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
.bg-purple-dark {
    background: skyblue;
  }
  .box-card{
      width: 480px;
      margin:200px auto;
  }
</style>