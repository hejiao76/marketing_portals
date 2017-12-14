<template>
  	<div>
      <loading v-show="loadingShow"></loading>
      <div class="cardetail">
          <img class="banner" src="../assets/img/timg.jpeg" />
          <div class="detail_mesg">
            <div class="mesg_title">北汽新能源万元车款抵扣</div>
            <div class="begintime">2017年02月08日  19:00 开抢</div>
            <div class="list">
              <span class="spa">秒杀价 </span>
              <span class="spb"></span>
            </div>
            <div class="list">
              <span class="spa">报名时间 </span>
              <span class="spb"></span>
            </div>
            <div class="list">
              <span class="spa">秒杀说明  </span>
              <span class="spb"></span>
            </div>
            <div class="city">查看适用城市</div>
          </div>
          <div class="bannr_title"></div>
        <div class="bannr_titlea"> <countdown endTime="1514061620" :callback="callback" endText="已经结束了"></countdown>后开始</div>
        <div class="btnbox">
          <div class="btna">即将开始</div>
          <div class="btnb">马上报名</div>
        </div>
        <img class="banner" src="../assets/img/timg.jpeg" />
      </div>
    </div>
</template>
<script>
  import Final from "../util/Final";
  import API from "./../fetch/api";
  import loading from "../components/loading";
  import countdown from "../components/countdown";
  export default {
      data() {
          return {

          }
      },
      components :{
        loading,
        countdown
      },
      methods : {

        callback:function(){

        },

      }
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/Secondcardetail.css";

</style>
