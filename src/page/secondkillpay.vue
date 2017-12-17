<template>
  	<div>
      <loading v-show="loadingShow"></loading>
      <div class="loginbox">
      <div class="paybox true">
        <!-- error-->
          <div class="paytop">
            <img class="carimg" :src="xxUrl" />
            <div class="top_right">
              <div class="title" >荣威RX5 万元抵扣券秒杀</div>
              <div class="paynumber">订单金额：<span style="color: #ff0036;">1.00元</span></div>
            </div>
          </div>
          <div class="paytypebox ">
            <div class="paylist">
              <span class="iconleft iconfont icon-weixin"></span>
              微信支付
              <span class="iconright iconfont icon-jiantou"></span>
            </div>
            <div class="paylist">
              <span class="iconleft iconfont icon-zhifubao"></span>
              支付宝支付
              <span class="iconright iconfont icon-jiantou"></span>
            </div>
          </div>
          <div class="mesgbox truemesg">
            <div>支付倒计时<countdown endTime="1514061620" :callback="callback" endText="0分0秒"></countdown></div>
            <div>请您尽快支付，以免错失良机</div>
          </div>
          <div class="mesgbox errmesgbox">
            <div>很遗憾，本次秒杀已结束，您没有秒杀到该商品</div>
            <div>如已支付，请到 <span style="color: #ff0036;">我的秒杀</span> 中申请退款</div>
          </div>
        </div>
    </div>
    </div>
</template>
<script>
  import Final from "../util/Final";
  import api from "./../fetch/api";
  import loading from "../components/loading";
  import countdown from "../components/countdown";
  export default {
      data() {
          return {
            loadingShow:false,
            xxUrl:'',
          }
      },
      components :{
        loading,
        countdown
      },
      methods : {
        Pickclick : function (data){
            this.loadingShow=true;
        },callback:function () {

        }

      },mounted (){
      let id = this.$route.params.code;

      }
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/SecondKillpay.css";

</style>
