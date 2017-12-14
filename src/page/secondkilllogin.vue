<template>
  	<div>
      <loading v-show="loadingShow"></loading>
      <div class="loginbox">
        <div class="input_list">
          <div class="list_item">
              <span class="title">姓名</span>
              <input type="text" maxlength="10" placeholder="请输入真实姓名" />
              <div class="errortext">请输入您真实的姓名</div>
          </div>
          <div class="list_item">
            <span class="title">手机号</span>
            <input type="number" oninput="if(value.length>11)value=value.slice(0,11)" placeholder="请输入手机号" />
            <div class="errortext">请输入正确的11位手机号</div>
          </div>
          <div class="list_item">
            <span class="title">验证码</span>
            <input type="number" oninput="if(value.length>8)value=value.slice(0,8)"  placeholder="请输入验证码" />
            <span class="getcode">获取验证码</span>
            <div class="errortext">验证码有误</div>
          </div>
        </div>
        <div class="list_item">
          <span class="title">选择经销商</span>
          <span class="checked">请选择提车经销商参与活动<i class="iconfont icon-jiantou"></i></span>
        </div>
        <div class="siginout">不是任大壮? 点此退出</div>
        <div class="sedkillbtn">报名秒杀</div>
      </div>
    </div>
</template>
<script>
  import Final from "../util/Final";
  import api from "./../fetch/api";
  import loading from "../components/loading";
  export default {
      data() {
          return {
            loadingShow:false,
          }
      },
      components :{
        loading
      },
      methods : {
        Pickclick : function (data){
            this.loadingShow=true;
        },

      },mounted (){
      let id = this.$route.params.id;

      }
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/SecondKilllogin.css";

</style>
