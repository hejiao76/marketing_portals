<template>
  <div>
    <loading v-show="loadingShow"></loading>
    <mesg v-bind:mesg="mesg"></mesg>
    <v-header :showBack="true" :targetPath="backPath" :title="pageTitle"></v-header>
    <div class="center_box">
      <!--领取状态-->
      <div class="getist" v-show="status==2">

        <div class="getBox getSucceed" v-if="addUserCoupon.status">
          <div class="gettop">
            {{addUserCoupon.message}}
          </div>
          <div class="centerlist ">
            <span class="spa">核销码</span>
            <span class="spb">{{addUserCoupon.result.couponCode}}</span>
          </div>
          <div class="centerlist ">
            <span class="spa">适用车系</span>
            <span class="spb"> {{addUserCoupon.result.serialName}}</span>
          </div>
          <div class="centerlist ">
            <span class="spa">购车人姓名</span>
            <span class="spb">{{addUserCoupon.result.userName}}</span>
          </div>
          <div class="centerlist qy_list">
            <span class="spa">抵扣权益</span>
            <ul class="qy_ul">
              <li v-for="(item,index,key) in addUserCoupon.result.couponContent" :key="index">{{item.name}}</li>
            </ul>
          </div>
          <div class="centerlist validity">
            <span class="spa">有效期</span>
            <span class="spb" style="color: #FF0036">{{addUserCoupon.result.validity.split(" ")[0]}}前使用有效</span>
          </div>
          <div class="getbtn" @click="tolist">查看我的礼券</div>
        </div>
        <div class="getist" v-if="!addUserCoupon.status">

          <div class="getBox getSucceed">
            <div class="gettop">
              {{!addUserCoupon.status && addUserCoupon.code == 201 ? '很遗憾，抵扣券已发放完' : '您已领取过相同的抵扣券'}}
            </div>
            <div class="get_bg">

            </div>
          </div>
          <div class="getbtn" @click="todetail">查看其他活动</div>
        </div>
      </div>
      <div class="ruleDestail" v-show="status==2" style="padding-bottom: 1rem;">
        <div class="ruletitle">使用细则</div>
        <div class="rulelist" v-html="addUserCoupon.result.details">
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import api from "./../fetch/api"
  import Final from "../../static/baseSetting/Final";
  import API from "./../fetch/api";
  import loading from "../components/loading";
  import mesg from "../components/mesg";
  import VHeader from "../components/header";
  import { wechatShare }  from '../mixin/wxShare.js'
  import wx from 'weixin-js-sdk';

  export default {
    data() {
      return {
        pageTitle:'',
        backPath:'',
        userName: "",
        userPhone: "",
        userCode: "",
        mesg:"",
        activecouponId: '',
        addUserCoupon: {
          result: {
            couponContent: [
              {}
            ],
          },
        },
        activityCode: '',//活动Id
        loadingShow: false,
        status: 0,
        Final: Final,
        endTime: null,
        beginTime: null,
        couponlist: [],
        discount: {},
        ipone_err: false,
        codestatus: true,//code 状态
        interval: null,
        timeout: 60,
        activityId: null,
        juanxize: '',
        dealerId:'',
        dealerName:'',
      }
    },
    mounted() {

      let getstatus = this.$route.query.status;
      this.couponCode = this.$route.query.couponCode;
      this.activityCode = this.$route.params.code;
      this.backPath="/coupon/"+this.activityCode;
      document.title=this.pageTitle = '礼券详情';
//      let dealerId= localStorage.dealerId
//      alert(this.couponCode);
//      return;
//      alert(this.couponCode );
      if(getstatus==1){
        this.getCouponInfo();
      }else if(getstatus==201){
        this.addUserCoupon.code=201;
        this.addUserCoupon.status=false;
        this.status=2;
      }else if(getstatus==202){
        this.addUserCoupon.code=202;
        this.addUserCoupon.status=false;
        this.status=2;
      }

    },
    created() {
      //alert("create");
    },
    components: {
      VHeader,
      loading,
      mesg
    },
    activated() {
//      this.dealerId = localStorage.dealerId;
//      this.dealerName = localStorage.dealerName;
    },
    methods: {
      /**
       * 获取抵扣券详情即抵扣券列表
       * @returns {}
       */
      getCouponInfo() {
        api.ap_get_user_coupon_info({'couponCode': this.couponCode}).then(res => {
          if (res.status) {
            this.addUserCoupon=res;
            this.status=2;
          }
        }).catch(error => {
          console.log(error)
          this.endTime = "";
          this.beginTime = "";
        })
      },

      mesgFn(text){
        this.mesg=text
        var that=this;
        setTimeout(function(){
          that.mesg="";
        },2000)
      },
      /**
       * 跳转到我的礼券列表
       * @returns {}
       */
      tolist: function () {
        this.$router.push({path: '/mycoupon/couponlist', params: {}})
      },
      todetail: function () {
        this.$router.push({path: '/coupon/'+this.activityCode, params: {}})
      },
      /**
       * @returns {}
       */
      getsplit: function (detail) {
        return detail.split("\n");

      }
    },
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/coupons.css";
</style>
