<template>
  <div  style="background-size:cover;">
    <div class="img_box" style="display: none;">
      <img class="imgitem" :id="['imglist'+index]" :src="item.bgImg" v-for="(item,index,key) in imglist" />
    </div>
  <div class="banner">
    <div class="turnplate" >
      <canvas class="item" id="wheelcanvas" width=300 height=300 ></canvas>
      <div class="pointer"><span :class="['centermesg',{poining: bRotate},{end: !bRotatea}]">{{bRotatea?'正在抽奖':'点击抽奖'}}</span></div>
    </div>
  </div>
  </div>
</template>
<script>
  import api from "./../fetch/api"
  import VHeader from "./header";
  import $ from 'jquery'
  import xx from '@/assets/js/awardRotate';
  import VLeft from "./left";
  import VConNav from "./con_nav";
  import Final from "../util/Final";
  import API from "../fetch/api";
  var widthaa=300;
var turnplate={
  restaraunts:[],				//大转盘奖品名称
  colors:[],					//大转盘奖品区块对应背景颜色
  canvas_width:widthaa,
  outsideRadius:widthaa*0.5,			//大转盘外圆的半径
  textRadius:widthaa*0.4,				//大转盘奖品位置距离圆心的距离
  insideRadius:0,			//大转盘内圆的半径
  startAngle:0,				//开始角度
};
  export default {
      data() {
          return {
            bRotate:false,
            bRotatea:false,
            imglist:[],
            levelType:['谢谢惠顾','一等奖','二等奖','三等奖','四等奖','五等奖','六等奖'],
          }
      },
    props:['loginstatus'],
      beforeMount (){
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
          console.log('outwidth',outwidth)
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
            ctx.font = 'bold 16px Microsoft YaHei';
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
              var text = this.levelType[turnplate.restaraunts[i].level];
              var line_height = 17;
              //translate方法重新映射画布上的 (0,0) 位置
              ctx.translate(outwidth/2 + Math.cos(angle + arc / 2) * turnplate.textRadius, outwidth/2 + Math.sin(angle + arc / 2) * turnplate.textRadius);
              //rotate方法旋转当前的绘图
              ctx.rotate(angle + arc / 2 + Math.PI / 2);
              /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
             if( text.length>6){//奖品名称长度超过一定范围
                text = text.substring(0,6)+"||"+text.substring(8);
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
              ctx.restore();
              //----绘制奖品结束----
            }
          }
        },
        sendmesgtoparent :function(status){
            this.$emit('listenstatus',status);
        },
        goclik:function(){

        }
      },
    mounted() {
      var self=this;
      var _that=this;
      var windowwidth=$(window).width();
      if(windowwidth>500){
        windowwidth=500;
      }
      var salse=windowwidth/375;
      $(".turnplate").css({
        '-webkit-transform':'scale('+salse+')',
        'transform':'scale('+salse+')',
        'margin-top':(windowwidth-375),
        'margin-bottom':(windowwidth-375),

      })
      if(windowwidth<375){
        $(".turnplate").css({
          'margin-top':(windowwidth-375)/2,
          'margin-bottom':(windowwidth-375)/2,
          'margin-left': (windowwidth - 375) / 6,
        })
      }
      console.log(windowwidth)
      let id = this.$route.params.id;
      api.ap_prizedraw({'activityCode':id}).then(res => {
        console.log('xxxdetail',res.result.prizeList)
        turnplate.restaraunts = res.result.prizeList;
        var thanks={bgImg: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3256036687,742666259&fm=27&gp=0.jpg", giftGroupName: "谢谢惠顾", level: 0}
        turnplate.restaraunts.unshift(thanks);
        turnplate.colors = ["#FD767B","#FD5B5D", "#FC4B4D","#FD767B","#FD5B5D", "#FC4B4D" ];
        this.imglist=turnplate.restaraunts;
          setTimeout(function(){_that.drawRouletteWheel();},200)
      }).catch(error => {
        console.log(error)
      })


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
      var rotateFn = function (item, txt,mesg){
        var angles = (item+1) * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length*2))+90;
        console.log(angles)
        $('.pointer').stopRotate();
        $('.pointer').rotate({
          angle:0,
          animateTo:angles+1800,
          duration:8000,
          callback:function (){	//回调
            _that.bRotate=false;
            _that.bRotatea = false;
            _that.sendmesgtoparent(mesg)

          }
        });
      };

      $('.pointer').click(function (){
        if(!_that.loginstatus){
          _that.sendmesgtoparent(false);
          return false;
        }
        if(_that.bRotate)return;
        _that.bRotate = !_that.bRotate;
        //获取随机数(奖品个数范围内)
        let id = self.$route.params.id;
        console.log(id)
        api.ap_prizedraw_go({'activityCode':id})
          .then(res => {
            console.log(res)
            if(res.code!=200){
              _that.sendmesgtoparent(res)
              _that.bRotate=false;
            }
            if(res.status){
              var item =res.result.level;
              _that.bRotatea = true;
              rotateFn(item, turnplate.restaraunts[item],res);
            }
        }).catch(error => {
          console.log(error)
          _that.senderrtoparent(res)
          var item = 0;
          //奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
          rotateFn(item, turnplate.restaraunts[item]);
        })


      });

function rnd(n, m){
  var random = Math.floor(Math.random()*(m-n+1)+n);
  return random;

}

}
  }


</script>
<style>
  @import "../assets/css/common.css";
  @import "../assets/css/actiona.css";
</style>
