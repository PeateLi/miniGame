<template>
    <div>
        <el-breadcrumb separator="/" style="margin-bottom:30px;">
        <el-breadcrumb-item :to="{ path: '/index/echarts' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">全部用户</a></el-breadcrumb-item>
        </el-breadcrumb>
        <el-table
        :data="peopleData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="userId"
          label="编号"
          width="400">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="400">
        </el-table-column>
        <el-table-column
          prop="userPwd"
          label="密码"
          width="400">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="400">
          <template slot-scope="scope">
            <el-button @click="delU(scope.row,scope.$index)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small" @click="change(scope.row,scope.$index)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:center">
      <el-button type="primary" style="margin-top:30px;" @click="addU">新增用户<i class="el-icon-upload el-icon--right"></i></el-button>
      </div>
      <el-dialog
        title="修改信息"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span slot="footer" class="dialog-footer">
          <el-form>
            <el-form-item label="用户名">
                <el-input type="text" v-model="userN"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="text"  v-model="userP"></el-input>
            </el-form-item>
            </el-form>
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeRight">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="新增用户"
        :visible.sync="addDialogVisible"
        width="30%"
        center>
        <span slot="footer" class="dialog-footer">
          <el-form>
            <el-form-item label="用户名">
                <el-input type="text" v-model="newN"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="text"  v-model="newP"></el-input>
            </el-form-item>
            </el-form>
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRight">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return {
            peopleData:[],
             centerDialogVisible: false,
             userN:"",
             userP:"",
             uId:"",
             addDialogVisible:false,
             newN:"",
             newP:""
        }
    },
    methods:{
         peopleAjax(){
           var that = this
           this.axios({
             method:"get",  //请求
             url:"http://192.168.1.163:711/allUser"  //服务器地址
           }).then((response) => {  //成功后函数  //数据
              var json = eval("(" + response.data + ")"); //转成json
              console.log(111)
              that.peopleData = json;
             
              that.$store.state.alluser = json
            })
      },
      delU(obj,i){
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(obj.userId)
          var that = this
          this.axios.get("http://127.0.0.1:711/delectUser",{
            params:{
              userId:obj.userId
            }
          }).then((response) => {
              if(response.data == 1){
                for (const i in that.peopleData) {
                if(that.peopleData[i].userName == that.$store.state.userName){
                  this.$router.push("/login")
                }
                }
                that.peopleData.splice(i,1)
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
              }else if(response.data == 0){
                this.$message.error('删除失败！');
              }else{
                this.$message.error('服务器出错！');
              }
          })
          
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        })
          
      },
      change(obj,i){
        this.userN = obj.userName
        this.userP = obj.userPwd
        this.uId = obj.userId
        // console.log(this.userN)
        this.centerDialogVisible = true
        
      },
      changeRight(){
         this.$confirm('确定要修改嘛?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var that = this
          this.axios.get("http://127.0.0.1:711/changeUser",{
            params:{
              userId:that.uId,
              userName:that.userN,
              userPwd:that.userP
            }
          }).then((response) => {
              if(response.data == 1){
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  });
                   this.$store.state.userName = this.userN
                   this.peopleAjax()
                  
              }else if(response.data == 0){
                this.$message.error('修改失败！');
              }else{
                this.$message.error('服务器出错！');
              }
          })

          this.centerDialogVisible = false
         
        }).catch(() => {
          this.centerDialogVisible = true
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
       
        
      },
      addU(){
        this.addDialogVisible = true
      },
      addRight(){
        this.$confirm('此操作将新增用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.addDialogVisible = false
         var that = this
           this.axios({
             method:"post",
             url:"http://127.0.0.1:711/register",
             data:{
                uname:that.newN,
                pwd:that.newP
             }
           }).then((response) => {
             if(response.data){
                this.$message({
                message: '注册成功',
                type: 'success'
              });
              this.newN = ""
              this.newP = ""
               this.peopleAjax()
              }else if(response.data == false){
                 this.$message.error('注册失败！');
              }else{
                this.$message.error('服务器出错！');
              }
           })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消新增'
          });          
        });
      }
    },
    created(){
        this.peopleAjax()
        
        console.log(this.$store.state.alluser)
    }
}
</script>

<style scoped>

</style>