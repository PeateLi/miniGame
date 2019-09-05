import Vue from 'vue'
import Router from 'vue-router'
import echarts from '@/components/echarts'
import index from '@/components/index'
import userInfo from '@/components/userInfo'
import login from '@/components/login'
import register from '@/components/register'
import Myinfo from '@/components/Myinfo'
import changePwd from '@/components/changePwd'
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path:'/index',
      name:"index",
      component:index,
      children:[
        {
          path:'userInfo',
          name:"userInfo",
          component:userInfo,
          beforeEnter:((to,from,next) => {
            if(to.path == "/login"){
              sessionStorage.setItem("url","/index")
              next()
            }else{
              sessionStorage.setItem("url",to.path)
              next()
            }
          })
        },
        {
          path:'echarts',
          name:"echarts",
          component:echarts
        },
        {
          path:'Myinfo',
          name:"Myinfo",
          component:Myinfo,
          beforeEnter:((to,from,next) => {
            if(to.path == "/login"){
              sessionStorage.setItem("url","/index")
              next()
            }else{
              sessionStorage.setItem("url",to.path)
              next()
            }
          })
        },
        {
          path:"changePwd",
          name:"changePwd",
          component:changePwd,
          beforeEnter:((to,from,next) => {
            if(to.path == "/login"){
              sessionStorage.setItem("url","/index")
              next()
            }else{
              sessionStorage.setItem("url",to.path)
              next()
            }
          })
        }
      ],
     
    },
    {
      path:"/login",
      name:"login",
      component:login
    },
    {
      path:"/register",
      name:"register",
      component:register
    }
  ]
})
