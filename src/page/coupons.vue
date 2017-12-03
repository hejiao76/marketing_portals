<template>
  	<div>
      <loading v-show="loadingShow"></loading>
      <div class="center_box">
      <img class="banner" src="../assets/img/couponBanner.png"/>
        <div class="login" v-show="!logon">
            <input type="text" class="logintext username" placeholder="请填写真实购车人姓名" />
            <input type="password" class="logintext password" placeholder="请输入手机号" />
            <div class="Verification">
              <input type="number" class="logintext code" placeholder="请输入验证码" />
              <span class="btn_code">获取验证码</span>
            </div>
            <button class="codebtn">点击领卷</button>
        </div>
        <div class="couponList"  v-for="item in couponlist" :key="item.id">
          <div class="couponTop">
            <img class="couponImg" :src="item.img">
            <div class="couponright">
              <div class="coupontitle">{{item.title}}</div>
              <ul class="detailslist">
                <li v-for="itemssss in item.alllist" >
                  <span class="iconfont icon-libao"></span>{{itemssss}}
                </li>
              </ul>
            </div>
          </div>
          <div class="couponBottom" @click="Pickclick">立即领取</div>
        </div>
        <div class="ruleDestail">
            <div class="ruletitle">活动细则</div>
            <div class="rulelist">
              <div>1. 10000元线上专享礼包，含3000元保险增值礼包+3000元延保现金补贴+2000元贴膜+2000元购车大礼包。<br>
                其中2000元购车大礼包包含：500元京东卡、1000元中石化加油卡、500元行车记录一部</div>
              <div>2. 订金核销抵扣车款，未核销用户99元在活动结束后退款
              下单手机号需与实际购车人手机号一致。<br>
                以上活动政策均已当地经销商为准。</div>
              <div>3. 3000元保险增值礼包说明:<br>
                价值1000元保险礼遇、价值1000元新车置换补偿和钥匙重置补偿、价值1000元就医帮手服务。</div>
                <div>4. 1000元延保现金抵扣说明:<br>
                  本券仅用于购买北京汽车延长质保产品使用、上汽大众延长质量担保提供重要部件、全面保障两种保障范围；时限分为一年或者两年。延保现金抵扣券可线下议价后厨师抵扣相应金额，具体产品价格及相关明细咨询当地经销商。</div>
            </div>
        </div>
      </div>

    </div>
</template>
<script>
//  import api from "./../fetch/api"
  import Final from "../util/Final";
  import API from "./../fetch/api";
  import zhuanpan from "../components/zhuanpan";
  import loading from "../components/loading";
  export default {
      data() {
          return {
            logon:false,
            loadingShow:false,
            couponlist:[{id:12,status:1,img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=169726949,11506498&fm=27&gp=0.jpg',title:'xxxxx',alllist:['xsss','xxx','xssdsd']},{id:12,status:2,img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=169726949,11506498&fm=27&gp=0.jpg',title:'xxxxx',alllist:['xsss','xxx','xssdsd']}]
          }
      },
      created (){
        //alert("create");
      },
      components :{
        loading
      },
      methods : {
        Pickclick : function (data){
            this.loadingShow=true;
        }
      }
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/coupons.css";
</style>
