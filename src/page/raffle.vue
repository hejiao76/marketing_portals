<template>
  	<div class="raffle">
      <div class="title">
        <img class="title_bc" src="../assets/img/title_bc.png"></img>
        <div class="raffle_number">今日您还有 <span>{{cjNumber}}</span> 次抽奖机会</div>
      </div>
      <zhuanpan></zhuanpan>
      <div class="all_number">已有<span class="number">{{allNumber}}</span>人参见</div>
      <div class="showmesg">Shelly刚刚抽中了<span>二等奖</span>，快来试试你的运气吧！</div>
      <div class="protocolBtn">活动须知</div>
    </div>
</template>
<script>
//  import api from "./../fetch/api"
  import VHeader from "../components/header";
  import VLeft from "../components/left";
  import VConNav from "../components/con_nav";
  import Final from "../util/Final";
  import API from "./../fetch/api";
  import zhuanpan from "../components/zhuanpan";
  export default {
      data() {
          return {
            cjNumber:1,
            allNumber:60
          }
      },
      created (){
        //alert("create");
      },
      components :{
        VHeader,
        VLeft,
        VConNav,
        zhuanpan
      },
      methods : {
          a : function (data){


              //alert(data);
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
  @import "./../assets/css/common.css";
  @import "./../assets/css/zhuanpan.css";
</style>
