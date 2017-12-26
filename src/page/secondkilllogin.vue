<template>
  <div>
    <loading v-show="loadingShow"></loading>
    <mesg v-bind:mesg="mesg"></mesg>
    <div class="loginbox">
      <div class="input_list">
        <div class="list_item">
          <span class="title">姓名</span>
          <input type="text" maxlength="10" v-model="userName" placeholder="请输入真实姓名"/>
          <div class="errortext" v-show="">请输入您真实的姓名</div>
        </div>
        <div class="list_item">
          <span class="title">手机号</span>
          <input type="number" v-model="userPhone" oninput="if(value.length>11)value=value.slice(0,11)"
                 placeholder="请输入手机号"/>
          <div class="errortext" v-show="">请输入正确的11位手机号</div>
        </div>
        <div class="list_item">
          <span class="title">验证码</span>
          <input type="number" v-model="userCode" oninput="if(value.length>8)value=value.slice(0,8)"
                 placeholder="请输入验证码"/>
          <span class="getcode" @click="getAuthCode()">{{codestatus ? '获取验证码' : timeout + 's后获取'}}</span>
          <div class="errortext" v-show="">验证码有误</div>
        </div>
      </div>
      <div v-if="ownerType==1" class="list_item">
        <span class="title">选择经销商</span>
        <span :class="['delared',dealerName ? 'checked' : '']" @click="checkedlist">{{dealerName ? dealerName.substr(0, 12) : '请选择提车经销商参与活动'}}<i
          class="iconfont icon-jiantou"></i></span>
      </div>
      <div class="siginout" v-show="localname" @click="loginout">不是{{localname}}? 点此退出</div>
      <div class="sedkillbtn" @click="login">报名秒杀</div>
    </div>
  </div>
</template>
<script>
  import Final from "../../static/baseSetting/Final";
  import api from "./../fetch/api";
  import loading from "../components/loading";
  import mesg from "../components/mesg"

  export default {
    data() {
      return {
        loadingShow: false,
        codestatus: true,
        timeout: 60,
        userName: "",
        userPhone: "",
        userCode: "",
        ipone_err: false,
        localname: "",
        itemId: '',
        mesg: "",
        codeId: '',
        dealerId: '',
        dealerName: '',
        logining: true,
        logintext: '报名秒杀',
        ownerType:2,
      }
    },
    components: {
      loading,
      mesg
    },
    activated() {
      this.dealerId = localStorage.dealerId;
      this.dealerName = localStorage.dealerName;
      this.ownerType =localStorage.ownerType || 1
    },
    methods: {
      Pickclick: function (data) {
        this.loadingShow = true;
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
          _that.mesga('请输入完整用户信息');
        }

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
      checkedlist: function () {
        this.$router.push({path: '/sedKill/' + this.codeId + '/sedkillloginchecked', query: {id: this.itemId}})
      }
      ,
      mesga(text){
        this.mesg=text
        var that=this;
        setTimeout(function(){
          that.mesg="";
        },2000)
      },

      loginout: function () {
        api.base_logout()
          .then(res => {
            if (res.status) {
              this.mesga("退出成功");
              localStorage.removeItem("dealerId");
              localStorage.removeItem("realName");
              localStorage.removeItem("mobile");
              location.reload();
            } else {
              this.mesga("退出失败");
            }
          }).catch(err => {
        });
      },
      login: function () {
        if (!this.logining) {
          return;
        }
        if(this.ownerType==2){
          if (!this.userName || !this.userPhone || !this.userCode) {
            this.mesga('请填写报名信息');
            return;
          }
        }else{
          if (!this.userName || !this.userPhone || !this.userCode || !this.dealerId) {
            this.mesga('请填写报名信息');
            return;
          }
        }
//        if (!this.userName || !this.userPhone || !this.userCode || !this.dealerId) {
//          this.mesga('请填入报名信息');
//          return;
//        }
        this.logining = false;
        api.base_login({userPhone: this.userPhone, checkCode: this.userCode, username: this.userName})
          .then(res => {
            console.log(res)
            if (res.status) {
              this.setlocal(res.result);
              this.addUserCouponFun()
              this.status = 2;
              this.logintext = '报名成功'
              //this.$router.push({path: '/sedKill/' + this.codeId, query: {}})
            } else {
              this.mesga("登录失败")
              this.logining = true;
            }
          }).catch(err => {
          this.logining = true;
        });
//          this.status=2;
      },
      addUserCouponFun() {
        var obj = {
          userName: this.userName,
          userPhone: this.userPhone,
          checkCode: this.userCode,
          itemId: this.itemId,
          dealerId: this.dealerId
        }
        if(this.ownerType==2){
          delete obj.dealerId;
        }
        api.ap_sedkill_enrollaa(obj)
          .then(res => {
            if (res.status) {
              this.addUserCoupon = res;
//              location.href='/#/sedKill/' + this.codeId
              this.mesga("报名成功");
              let _self=this;
              window.setTimeout(function (){
                _self.$router.push({path: '/sedKill/' + _self.codeId, query: {}})
              },500);

              console.log('报名');

            } else {
              this.mesga("报名失败")
            }
          }).catch(err => {
          this.mesga("报名失败");
        });
      },

    }, mounted() {
      this.codeId = this.$route.params.code;
      this.itemId = this.$route.query.id;
      this.ownerType =localStorage.getItem("ownerType");
      let code = localStorage.sedkillcode;
      let mobile = localStorage.mobile;
      let realName = localStorage.realName;
      let dealerId= localStorage.dealerId
      this.localname = localStorage.realName;
      if (mobile && realName) {
        this.userName = realName;
        this.userPhone = mobile;
      }
      if(dealerId){
        this.dealerId = dealerId;
        // localStorage.removeItem("dealerId");
      }

    }
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/SecondKilllogin.css";

</style>
