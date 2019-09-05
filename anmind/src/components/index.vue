<template>
    <div>
       <el-container>
        <el-header style="background:skyblue">
          <h3 style="float:left;">学生后台管理系统</h3>
             <el-dropdown  style="float:right;line-height:60px;">
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <span>{{this.$store.state.userName}}</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="go(0)">全部用户</el-dropdown-item>
                  <el-dropdown-item  @click.native="go(1)">个人信息</el-dropdown-item>
                  <el-dropdown-item  @click.native="go(2)">修改密码</el-dropdown-item>
                  <el-dropdown-item  @click.native="go(3)">退出登录</el-dropdown-item>

                </el-dropdown-menu>
              </el-dropdown>
              
        </el-header>
        <el-container>
            <el-aside style="width:250px;">
                <el-menu
                  :router="true"
                  default-active="0"
                  class="el-menu-vertical-demo"
                  background-color="#fff"
                  text-color="#000"
                  active-text-color="#ffd04b"
                  style="border-right:0px;"
                  >
                  <el-menu-item v-for="(item,index) in navList" :index="item.name" :key="index">
                   <i class="el-icon-edit"></i>
                    <span>{{item.navItem}}</span>
                  </el-menu-item>
                 
                </el-menu>
            </el-aside>
            <el-main style="height:800px;">
              <el-breadcrumb separator="/" style="hieght:60px;bakcgorund:#fff;margin-bottom:30px;">
              <el-breadcrumb separator="/">
                <!-- <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/index/userInfo">全部用户</a></el-breadcrumb-item> -->
              </el-breadcrumb>
              </el-breadcrumb>
             
                <router-view/>
            
              
            </el-main>
        </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
     data(){
    return {
       navList:[
        {name:'/index/userInfo',navItem:'全部用户',navIcon:"el-icon-edit'"},
        {name:'/index/Myinfo',navItem:'个人信息'},
        {name:'/index/changePwd',navItem:'修改密码'}
        ],
        taburls:["/index/userInfo","/index/Myinfo","/index/changePwd","/login"]
    }
  },
  methods:{
    go(i){
        this.$router.push(this.taburls[i])
    },
    toUrl(){
      var nextUrl = sessionStorage.getItem("url")
      if(nextUrl != null){
        this.$router.push(nextUrl)
      }else{
        this.$router.push("/index/echarts")
      }
    }
  },
  created(){
    this.toUrl()
    
  } 

}
</script>

<style scoped>

</style>