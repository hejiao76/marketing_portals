<template>
  <div  style="background-size:cover;">
    <div class="img_box" style="display: none;">
      <img class="imgitem" :id="['imglist'+index]" :src="item" v-for="(item,index,key) in imglist" />
    </div>
  <div class="banner">
    <div class="turnplate" >
      <canvas class="item" id="wheelcanvas" width="300px" height="300px"></canvas>
      <div class="pointer"><span :class="['centermesg',{poining: bRotate},{end: !bRotate}]">{{bRotate?'正在抽奖':'点击抽奖'}}</span></div>
    </div>
  </div>
  </div>
</template>
<script>
//  import api from "./../fetch/api"
  import VHeader from "./header";
  import $ from 'jquery'
  import xx from '@/assets/js/awardRotate';
  import VLeft from "./left";
  import VConNav from "./con_nav";
  import Final from "../util/Final";
  import API from "../fetch/api";
  var widthaa=$(window).width;

var turnplate={
  restaraunts:[],				//大转盘奖品名称
  colors:[],					//大转盘奖品区块对应背景颜色
  canvas_width:300,
  outsideRadius:150,			//大转盘外圆的半径
  textRadius:120,				//大转盘奖品位置距离圆心的距离
  insideRadius:0,			//大转盘内圆的半径
  startAngle:0,				//开始角度

};
  export default {
      data() {
          return {
            bRotate:false,
            imglist:[],
          }
      },
      created (){
        //alert("create");
      },
      methods : {
          rotatea:function(){
            var current = 0;
            var zhizhen=this.$refs.zhizhena;
              current = 90
              zhizhen.style.transform = 'rotate('+1080-current+'deg)';
          },
         drawRouletteWheel:function() {
          var canvas = document.getElementById("wheelcanvas");
          var outwidth=turnplate.canvas_width;
          if (canvas.getContext) {
            //根据奖品个数计算圆周角度
            var arc = Math.PI / (turnplate.restaraunts.length/2);
            //turnplate.startAngle=360/turnplate.restaraunts.length;
            var ctx = canvas.getContext("2d");
            //在给定矩形内清空一个矩形
            ctx.clearRect(0,0,outwidth,outwidth);
            //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
           // ctx.strokeStyle = "rgba(0,0,0,0)";
            ctx.strokeStyle = "#FD767B";
            //font 属性设置或返回画布上文本内容的当前字体属性
            ctx.font = 'bold 14px Microsoft YaHei';
            for(var i = 0; i < turnplate.restaraunts.length; i++) {
              var angle = turnplate.startAngle + i * arc;
              ctx.fillStyle = turnplate.colors[i];
              ctx.beginPath();
              //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
              ctx.arc(outwidth/2, outwidth/2, turnplate.outsideRadius, angle, angle + arc, false);
              ctx.arc(outwidth/2, outwidth/2, turnplate.insideRadius, angle + arc, angle, true);
              ctx.stroke();
              ctx.fill();
              //锁画布(为了保存之前的画布状态)
              ctx.save();

              //改变画布文字颜色
                ctx.fillStyle = "#FFFFFF";
              //----绘制奖品开始----
              var text = turnplate.restaraunts[i];
              var line_height = 17;
              //translate方法重新映射画布上的 (0,0) 位置
              ctx.translate(outwidth/2 + Math.cos(angle + arc / 2) * turnplate.textRadius, outwidth/2 + Math.sin(angle + arc / 2) * turnplate.textRadius);
              //rotate方法旋转当前的绘图
              ctx.rotate(angle + arc / 2 + Math.PI / 2);
              /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
             if( text.length>8){//奖品名称长度超过一定范围
                text = text.substring(0,8)+"||"+text.substring(8);
                var texts = text.split("||");
                for(var j = 0; j<texts.length; j++){
                  ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                }
              }else{
                //在画布上绘制填色的文本。文本的默认颜色是黑色
                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
              }

              //添加对应图标

                var img= document.getElementById("imglist"+i);
             if(img){
               ctx.drawImage(img,-20,30,40,40);
             }





              //把当前画布返回（调整）到上一个save()状态之前
              ctx.restore();
              //----绘制奖品结束----
            }
          }
}
      },
    mounted() {
      turnplate.restaraunts = ["碧根果一袋", "年货红包", "水果拼盘300元月卡", "2元现金红包", "夏威夷果一袋",'谢谢惠顾'];
      turnplate.colors = ["#FD767B","#FD5B5D", "#FC4B4D","#FD767B","#FD5B5D", "#FC4B4D" ];
     this.imglist=["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512672494498&di=8c31ade21ccef8a59eafc99888e89f1e&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fbba1cd11728b471064dc28dec9cec3fdfc032335.jpg"
     ]
        var _that=this;
        setTimeout(function(){_that.drawRouletteWheel();},200)
      var rotateTimeOut = function (){
        $('#wheelcanvas').rotate({
          angle:0,
          animateTo:2160,
          duration:8000,
          callback:function (){
            alert('网络超时，请检查您的网络设置！');
          }
        });
      };

      //旋转转盘 item:奖品位置; txt：提示语;
      var rotateFn = function (item, txt){
        var angles = (item+1) * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length*2))+90;
        console.log(angles)
//        if(angles<270){
//          angles = 90 - angles;
//        }else{
//          angles = 360 - angles;
//        }
        $('.pointer').stopRotate();
        $('.pointer').rotate({
          angle:0,
          animateTo:angles+1800,
          duration:8000,
          callback:function (){	//回调
            _that.bRotate=false;
            alert('恭喜获得'+txt);

          }
        });
      };

      $('.pointer').click(function (){
        if(_that.bRotate)return;
        _that.bRotate = !_that.bRotate;
        //获取随机数(奖品个数范围内)
        var item = 2;
        //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
        rotateFn(item, turnplate.restaraunts[item]);

      });

function rnd(n, m){
  var random = Math.floor(Math.random()*(m-n+1)+n);
  return random;

}

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
  @import "../assets/css/common.css";
  @import "../assets/css/actiona.css";
</style>
