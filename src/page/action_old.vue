<template>
  	<div class="action_box">
      <img id="zhizhen" @click="rotatea"  ref="zhizhena" src="../assets/img/zhizhen.png" />
    <canvas id="cvs" width="360px" height="360px"></canvas>
    </div>
</template>
<script>
//  import api from "./../fetch/api"
  import VHeader from "../components/header";
  import $ from 'jquery'
  import VLeft from "../components/left";
  import VConNav from "../components/con_nav";
  import Final from "../util/Final";
  import API from "./../fetch/api";
  export default {
      data() {
          return {
              test:1,
              test2:"这是变量",
              testObj:{a:"这是a"},
              data_err:[{color:'#f00'},{color:'#0f0'},{color:'#00f'},{color:'#789'},{color:'#ff9'}]
          }
      },
      created (){
        //alert("create");
      },
      components :{
        VHeader,
        VLeft,
        VConNav
      },
      methods : {
          rotatea:function(){
            var current = 0;
            var zhizhen=this.$refs.zhizhena;
            console.log($("#zhizhen"))
              current = 90
              zhizhen.style.transform = 'rotate('+1080+current+'deg)';
//            zhizhen.style.transitionDuration=3+current/360+'s';
          },
        buildImg:function(){
          //扇形
          CanvasRenderingContext2D.prototype.sector = function (x, y, radius, sDeg, eDeg) {
            // 初始保存
            this.save();
            // 位移到目标点
            this.translate(x, y);
            this.beginPath();
            // 画出圆弧
            this.arc(0,0,radius,sDeg, eDeg);
            // 再次保存以备旋转
            this.save();
            // 旋转至起始角度
            this.rotate(eDeg);
            // 移动到终点，准备连接终点与圆心
            this.moveTo(radius,0);
            // 连接到圆心
            this.lineTo(0,0);
            // 还原
            this.restore();
            // 旋转至起点角度
            this.rotate(sDeg);
            // 从圆心连接到起点
            this.lineTo(radius,0);
            this.closePath();
            // 还原到最初保存的状态
            this.restore();
            return this;
          }
          var ctx = document.getElementById('cvs').getContext('2d');
          var deg = Math.PI/180;
          var radii=360/2;
          var smccircle = {x: radii,y: radii, radius: 150}

          var number=['一','二','三','四','五','六']
          function drawCircularText(s,string, startAngle, endAngle ,lv){
            var radius = s.radius,
              angleDecrement = (startAngle - endAngle)/(string.length-1),
              angle = parseFloat(startAngle),
              index = 0,
              character;
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.font = '30px 微软雅黑';
            ctx.textAlign = lv;
            ctx.textBaseline = 'middle';

            while (index < string.length) {
              character = string.charAt(index);

              ctx.save();
              ctx.beginPath();
              ctx.translate(s.x + Math.cos(angle) * radius,
                s.y + Math.sin(angle) * radius);
              ctx.rotate(Math.PI/2 + angle);

              ctx.fillText(character, 0, 0);
//            ctx.strokeText(character, 0, 0);

              angle -= angleDecrement;
              index++;
              ctx.restore();
            }
            ctx.restore();
          }
          var arr_length=this.data_err.length;
          var radio=360/arr_length;
          for(var i=0;i<arr_length;i++){
            var test=i==arr_length-1?'谢谢惠顾':number[i]+'等奖'
            var start=i*(radio-0)*deg;
            var end=(i+1)*(radio-0)*deg
            //start=start<=0?360+start:start;
            //end=end<=0?360+end:end;
            var center=(start+end)/2;
            ctx.sector(radii,radii,radii,start,end).fill();
            drawCircularText(smccircle,test,center-15*deg,center+15*deg,'center');
            ctx.fillStyle=this.data_err[i].color;
          }
        }
      },
    mounted() {

        this.buildImg();
    }
  }

//  api.Login({a:1,b:2})
//    .then(res => {
//        alert("请求成功..");
//    }).catch(error => {
//      alert("fail");
//    })

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/action.css";
</style>
