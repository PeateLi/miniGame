<template>
  <div id="main" :style="{width:width+'px',height:height+'px'}">
    <div 
    v-for="(item,index) in blockPoints" 
    :key="item.id" 
    :style="{
      width:blockWidth+'px',
      height:blockHeight+'px',
      left:item.x+'px',
      top:item.y+'px',
      backgroundImage:'url(' + require('../assets/timp.jpg') + ')',
      backgroundPosition:'-'+correctPoints[index].x+'px -'+correctPoints[index].y+'px',
      opacity: blockPoints.length-1-index
      }" class="parzzs" @click="handleClick" :ref="index === blockPoints.length-1?'empty':'block'" :data-correctX = "correctPoints[index].x" :data-correctY = "correctPoints[index].y"></div>
  </div>
</template>

<script>

export default {
  props:{
       width:{
          type:Number,
          default:500
       },
       height:{
          type:Number,
          default:500
       },
       row:{
        type:Number,
        default:4
      },
      col:{
          type:Number,
          default:4
      },
      img:{
        type:String,
        required:true
      }
     },
     
     computed:{
       blockWidth(){
         return this.width/this.col
       },
       blockHeight(){
         return this.height/this.row
       },
       correctPoints(){
         const {row,col,blockWidth,blockHeight} = this;
         const arr = []
         for(let i = 0;i<row;i++){
            for(let j = 0;j<row;j++){
                arr.push({
                  x:j*blockWidth,
                  y:i*blockHeight,
                  id:new Date().getTime()+Math.random()*100
                })
            }
         }
         return arr
       },
       blockPoints(){
        const points = this.correctPoints
        const length = points.length
        const lastEle = points[length-1]
        const newArray = [...points]
        newArray.length = length-1
        newArray.sort(() => Math.random() - 0.5)
        newArray.push(lastEle)
        return newArray
       }
     },
     methods:{
       handleClick(e){
         const blockDom = e.target
        const emptyDom = this.$refs.empty[0]
        const {left,top} = blockDom.style 
        if(!this.isAdjacent(blockDom,emptyDom)){
          console.log("操作失误不能移动")
        }else{
          blockDom.style.left = emptyDom.style.left
          blockDom.style.top = emptyDom.style.top
          emptyDom.style.left = left
          emptyDom.style.top = top
          const winFlag = this.checkWin()
          if(winFlag){
            if(confirm("通过成功是否前往下一关")){
              this.col = this.col+1
              this.row = this.row+1
              // this.correctPoints()
            }
          }
        }
        
       },
       isAdjacent(blockDom,emptyDom){
          const {left:domLeft,top:domTop,width,height} = blockDom.style
          const {left:emptyLeft,top:emptyTop} = emptyDom.style
          const xDis =Math.floor(Math.abs(parseFloat(domLeft) - parseFloat(emptyLeft))) 
          const yDis =Math.floor(Math.abs(parseFloat(domTop) - parseFloat(emptyTop))) 
          // console.log(width)
          const flag = (domLeft ===emptyLeft && yDis === parseInt(height)) || (domTop === emptyTop && xDis === parseInt(width) )
          return flag
       },
       checkWin(){
          const blockDomArr = this.$refs.block
          return blockDomArr.every( dom => {
           const {left:domLeft,top:domTop} = dom.style
           const {correctx:correctX,correcty:correctY} = dom.dataset
           const flag =parseInt(domLeft)=== parseInt(correctX) && parseInt(domTop) === parseInt(correctY)
           console.log(flag)
           return flag
           })
       }
     }
     
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main{
  border:2px solid #ccc;
  position: relative;
}
.parzzs{
box-sizing: border-box;
position: absolute;
/* background-image: url("../assets/timp.jpg"); */
border:1px solid #fff;
transition: 1s;
}
</style>
