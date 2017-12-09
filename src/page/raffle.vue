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
      <div class="out_box sigin" v-if="loginshow">
        <div class="out_boxa">
        <span class="close iconfont icon-guanbi"></span>
        <div class="title_name">登录</div>
          <input type="number" class="username" placeholder="请输入手机号" />
          <div class="Verification">
            <input type="number" class="logintext code" placeholder="请输入验证码" />
            <span class="btn_code">获取验证码</span>
          </div>
          <div class="tishi"><span class="iconfont icon-tishi"></span>未注册过的手机号将自动创建帐户</div>
          <div class="codebtn">立即登录</div>
        </div>

      </div>
      <div class="out_box actionmesg" v-if="actionmesga">
        <div class="out_boxa">
          <span class="close iconfont icon-guanbi"></span>
          <div class="title_name">活动须知</div>
          <div class="action_detail">
            <div>1. 玩家通过签到来增加游戏的抽奖次数。</div>
            <div>2. 转盘转动停止后，指针会停在装盘中的
            某一个空格。</div>
              <div>3. 中奖后会跳转进入奖品页面，未中奖可根据
            主办方所确定的规则进行再抽奖。</div>
                <div>4、奖品：
            一等奖：iPhone 8 5台
            二等奖：小米净化器 10台
            三等奖：礼品卡 50张</div>
                  <div>5、活动时间：2017.11.01——2017.11.30</div>
                    <div>6、活动最终解释权归厂商所有</div>
          </div>
        </div>

      </div>

      <div class="out_box " v-if="actionmesga">
        <div class="out_boxa min-width">
          <span class="close iconfont icon-guanbi"></span>
          <img class="bc_img" src="../assets/img/prize.png" >
          <div class="title_name">恭喜您，中奖啦</div>
          <div class="jiangli">
              <div class="jl_name">{{jl_mesg.name}}</div>
              <ul>
                <li class="jl_list" v-for="(item,index,key) in jl_mesg.jllist">{{item}}</li>
              </ul>
          </div>
          <div class="color_btn">立即领取</div>
        </div>

      </div>

      <div class="out_box " v-if="actionmesga">
        <div class="out_boxa min-width noprize">
          <span class="close iconfont icon-guanbi"></span>
          <div class="title_name">很遗憾，您没中奖</div>
          <div class="remainnumber">今日您还有 <span>{{remainnumber}}</span> 次抽奖机会</div>
          <div class="color_btn">再次抽奖</div>
        </div>
      </div>

      <div class="out_box " v-if="actionmesg">
        <div class="out_boxa min-width getnumber">
          <span class="close iconfont icon-guanbi"></span>
          <div class="title_name">抽奖机会已用完</div>
          <div class="iconfont icon-weixin weixinicon"></div>
          <div class="mesg">分享到微信<br>可增加抽奖机会噢~</div>
          <div class="color_btn">获取抽奖机会</div>
        </div>
      </div>
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
            remainnumber:3,
            allNumber:60,
            loginshow:false,
            actionmesg:true,
            jl_mesg:{name:'一等奖',jllist:['高压锅','电饭煲','平底锅','锅铲']}
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
