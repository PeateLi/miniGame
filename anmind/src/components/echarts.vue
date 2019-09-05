<template>
  <div>
    <div id="myChart" :style="{width: '400px', height: '600px'}"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName:[],
      userId:[]
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        
        // 绘制图表
        var that = this
        this.axios({
          method:"get",
          url:"http://127.0.0.1:711/allUser"
        }).then((response) => {
          var json = eval("("+response.data+")")
          var name = []
          var uid = []
          for (const i in json) {
            name.push(json[i].userName)
            uid.push(json[i].userId)
            myChart.setOption({
            color:["skyblue"],
            title: { text: 'ECharts 数据统计' },  //标题
            tooltip: {},
            xAxis: {
                data: name
            },
            yAxis: {},
            series: [{
                name: '用户',
                type: 'bar',
                data: uid,
            }],
            
        });
          }
          
        })
        
    },
    allAjax(){
      var that = this
      this.axios({
        method:"get",
        url:"http://127.0.0.1:711/allUser"
      }).then((response) => {
        var json = eval("("+response.data+")")
        for (const i in json) {
         that.userName.push(json[i].userName)
         that.userId.push(json[i].userId)
        }
        // console.log(json.userName)
        // that.allUser.push(json)
      })
    }
  },
  created(){
    this.allAjax()
    // console.log(this.userName)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>