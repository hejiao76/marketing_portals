<template>
  <div>
    <loading v-show="loadingShow"></loading>
    <mesg v-bind:mesg="mesg"></mesg>
    <div class="center_box">
      <div class="bannerbox">
        <img class="banner" v-show="status==0||status==1 ||status==10||status==11"
             src="../assets/img/couponBanner.png"/>
        <div class="bottomtext">活动日期：<br>{{beginTime + '至' + endTime}}</div>
      </div>

      <div class="login"  v-show="status==1">
        <input type="text" class="logintext username" v-model="userName" placeholder="请填写真实购车人姓名"/>
        <input type="number" class="logintext mobile" v-model="userPhone" :onchange="isiphone()" placeholder="请输入手机号"/>
        <div class="errortext" v-if="ipone_err">请输入正确的手机号</div>
        <div class="Verification">
          <input type="number" class="logintext code" v-model="userCode" placeholder="请输入验证码"/>
          <span class="btn_code" @click="getAuthCode()">{{codestatus ? '获取验证码' : timeout + 's后再次获取'}}</span>
        </div>

        <span :class="['checked',dealerName ? 'active' : '']" @click="tochecked">{{dealerName ? dealerName.substr(0, 12) : '请选择提车经销商参与活动'}}<i class="iconfont icon-jiantou"></i></span>
        <button class="codebtn" @click="getcoupon">点击领券</button>
      </div>
      <div class="couponList" v-show="status==0" v-for="item in couponlist" :key="item.id">
        <div class="couponTop">
          <img class="couponImg"
               src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=169726949,11506498&fm=27&gp=0.jpg">
          <div class="couponright">
            <div class="coupontitle">{{item.name}}</div>
            <ul class="detailslist">
              <li :key="item.id" v-for="(itemssss,index,key) in getsplit(item.description)" v-if="index<4">
                <span class="iconfont icon-libao"></span>{{itemssss}}
              </li>
            </ul>
          </div>
        </div>
        <div :class="['couponBottom',{getend:item.isGet==2}]" @click="Pickclick(item)">
          {{item.isGet == 1 ? '立即领取' : '已领取'}}
        </div>
      </div>

      <div style="font-size: .2rem; text-align: center; margin:0.5rem auto 0;" v-if="status==10||status==11">
        {{status == 10 ? '活动已下线~~' : '活动未开始~~'}}
      </div>

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
      <div class="ruleDestail" v-show="status!=2">
        <div class="ruletitle">活动细则</div>
        <div class="rulelist">
          <div>1. 10000元线上专享礼包，含3000元保险增值礼包+3000元延保现金补贴+2000元贴膜+2000元购车大礼包。<br>
            其中2000元购车大礼包包含：500元京东卡、1000元中石化加油卡、500元行车记录一部
          </div>
          <div>2. 订金核销抵扣车款，未核销用户99元在活动结束后退款
            下单手机号需与实际购车人手机号一致。<br>
            以上活动政策均已当地经销商为准。
          </div>
          <div>3. 3000元保险增值礼包说明:<br>
            价值1000元保险礼遇、价值1000元新车置换补偿和钥匙重置补偿、价值1000元就医帮手服务。
          </div>
          <div>4. 1000元延保现金抵扣说明:<br>
            本券仅用于购买北京汽车延长质保产品使用、上汽大众延长质量担保提供重要部件、全面保障两种保障范围；时限分为一年或者两年。延保现金抵扣券可线下议价后厨师抵扣相应金额，具体产品价格及相关明细咨询当地经销商。
          </div>
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
  import { wechatShare }  from '../mixin/wxShare.js'
  import wx from 'weixin-js-sdk';

  export default {
    data() {
      return {
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
        status: 1,
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
      return false;
      this.activityCode = this.$route.params.code;
      console.log(this.activityCode);
      this.getCouponActivityInfo();
    },
    created() {
      //alert("create");
    },
    components: {
      loading,
      mesg
    },
    activated() {
      this.dealerId = localStorage.dealerId;
      this.dealerName = localStorage.dealerName;
    },
    methods: {
      /**
       * 获取抵扣券详情即抵扣券列表
       * @returns {}
       */
      getCouponActivityInfo() {
        api.ap_coupon({'activityCode': this.activityCode}).then(res => {
          console.log(res)
          this.wxShareFn(res.result);
          document.title=res.result.name || "抵扣券活动";
          if (res.status) {
            if (res.result.status == 3) {
              this.status = 10;
            } else if (res.result.status == 1) {
              this.status = 11;
            }
            this.endTime = res.result.endTime
            this.beginTime = res.result.beginTime
            this.couponlist = res.result.couponList;
            this.activityId = res.result.id
          } else {
            this.status = 10;
            this.endTime = "";
            this.beginTime = "";
          }
        }).catch(error => {
          console.log(error)
          this.status = 10;
          this.endTime = "";
          this.beginTime = "";
        })
      },
      /**
       * 获取验证码
       * @returns {}
       */
      getAuthCode() {
        var _that = this;
        if (this.userPhone.length >= 11 && this.ipone_err == false) {
          if (_that.codestatus) {
            _that.codestatus = false;
            api.ap_get_auth_code({userPhone: this.userPhone})
              .then(res => {
                if (res.status) {
                  _that.interval = setInterval(function () {
                    if (_that.timeout > 0) {
                      _that.timeout--
                    } else {
                      _that.codestatus = true;
                      _that.timeout = 60;
                      clearInterval(_that.interval);
                    }
                  }, 1000)
                }
              }).catch(error => {
              console.log(error)
            })
          }
        } else {
          this.ipone_err = true
        }

      },
      isiphone: function () { //校验是否是手机号
        var phone = this.userPhone;
        console.log(phone)
        if (phone.length >= 11) {
          this.userPhone = phone.substr(0, 11)
          if (!(/^1[345789]\d{9}$/.test(phone))) {
            this.ipone_err = true;
          } else {
            this.ipone_err = false;
          }
        }
      },
      /**
       * 验证是否可以领取
       * @returns {}
       */
      Pickclick: function (data) {
        if (data.isGet == 2) {
          return false;
        }
        this.activecouponId = data.id; // 储存抵扣券ID
        // this.loadingShow=true;
        let mobile = localStorage.mobile;
        let realName = localStorage.realName;
        let dealerId= localStorage.dealerId
        this.localname = localStorage.realName;

        if (mobile && realName) {
//            $(".login .username").val(realName); // 弃用JQ
//            $(".login .mobile").val(mobile); // 弃用JQ
          this.userName = realName;
          this.userPhone = mobile;

        }
        if(dealerId){
          this.dealerId = dealerId;
         // localStorage.removeItem("dealerId");
        }
        this.status = 1;
      },
      /**
       * 存储用户数据
       * @returns {}
       */
      setlocal: function (mesg) {
        localStorage.realName = mesg.realName;
        localStorage.mobile = mesg.mobile;
        localStorage.cityId = mesg.cityId;
        localStorage.userId = mesg.userId;
        localStorage.weixin_id = mesg.weixin_id;
        localStorage.photo = mesg.photo;
      },
      /**
       * 领取抵扣券
       * @returns {}
       */
      addUserCouponFun() {
        var obj = {
          userName: this.userName,
          userPhone: this.userPhone,
          checkCode: this.userCode,
          couponId: this.activecouponId,
          activityId: this.activityId,
          dealersName:this.dealerName,
          dealerId:this.dealerId
        }
        api.ap_add_user_coupon(obj)
          .then(res => {
            if (res.status) {
              this.addUserCoupon = res
              console.log('领取成功');
            } else {
              if (res.code == 201) {
                this.addUserCoupon = res;
              } else if (res.code == 202) {
                this.addUserCoupon = res;
              }
            }
          }).catch(err => {

        });
      },
      /**
       * 选择经销商
       * @returns {}
       */
      tochecked() {
        this.$router.push({
          path: '/coupon/' + this.activityCode + '/loginchecked',
          query: {itemId: this.activecouponId}
        })
      },
      mesg(text){
        this.mesg=text
        var that=this;
        setTimeout(function(){
          that.mesg="";
        },2000)
      },
      /**
       * 点击领券前验证是否登录
       * @returns {}
       */
      getcoupon: function () {
        if (!this.userName || !this.userPhone || !this.userCode) {
          this.mesg("请输入登录信息~");
          return;
        }
        api.base_login({userPhone: this.userPhone, checkCode: this.userCode, username: this.userName})
          .then(res => {
            console.log(res)
            if (res.status) {
              this.setlocal(res.result);
              this.addUserCouponFun()
              this.status = 2;
            } else {
              alert('登录失败')
            }
          }).catch(err => {

        });
//          this.status=2;
      },
      /***初始化微信分享标题内容***/
      wxShareFn (data) {
        let _self=this;
        wechatShare({
          title: data.name,
          content: data.description,
          link: window.location.href,
          logo:data.shareImg ? data.shareImg.includes('http://') ? data.shareImg : Final.IMG_PATH+data.shareImg : "",
          success:function (){
            alert("分享成功");
            _self.addFree();
          }
        });
      },
      /**
       * 跳转到我的礼券列表
       * @returns {}
       */
      tolist: function () {
        this.$router.push({path: '/mycoupon/couponlist', params: {}})
      },
      todetail: function () {
        this.status = 0;
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
