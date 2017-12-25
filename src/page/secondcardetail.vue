<template>
  <div class="mainContent" v-show="showPanel">
    <loading v-show="loadingShow"></loading>
    <mesg ref="msgTip" v-bind:mesg="mesg"></mesg>
    <div class="out_box sigin" v-show="loginshow">
      <div class="out_boxa">
        <span class="close iconfont icon-guanbi" @click="loginshow=false"></span>
        <div class="title_name">登录</div>
        <input type="number" class="username" :onchange="isiphone()" v-model="userPhone" placeholder="请输入手机号"/>
        <div class="errortext" v-if="ipone_err">请输入正确的手机号</div>
        <div class="Verification">
          <input type="number" v-model="userCode" class="logintext code" placeholder="请输入验证码"/>
          <span :class="['btn_code',{clicked:!codestatus}]" @click="getcode">{{codestatus ? '获取验证码' : timeout + 's后再次获取'}}</span>
        </div>
        <div class="errortext" v-if="code_err">请输入验证码</div>
        <div class="tishi"><span class="iconfont icon-tishi"></span>未注册过的手机号将自动创建帐户</div>
        <div class="codebtn" @click="loginin">立即登录</div>
      </div>
    </div>

    <div class="cardetail">
      <img class="banner" :src="datamesg.whitePic"/>
      <div class="detail_mesg">
        <div class="mesg_title">{{datamesg.itemName}}</div>
        <div class="begintime">{{util.toFullDateString(datamesg.beginTime)}}开抢</div>
        <div class="list">
          <span class="spa">秒杀价 </span>
          <span class="spb"><span>{{datamesg.amount+'元'}}</span><span style=" margin-left: 10px;text-decoration:line-through; color: #999999; ">{{datamesg.couponAmount+'元'}}</span></span>
        </div>
        <div class="list">
          <span class="spa">报名时间 </span>
          <span
            class="spb">{{util.toFullDateString(datamesg.enrollStartTime)}}至{{util.toFullDateString(datamesg.enrollEndTime)}}</span>
        </div>
        <div class="list">
          <span class="spa">秒杀说明  </span>
          <span class="spb">{{datamesg.description}}</span>
        </div>
        <div class="city" @click="saycity">查看适用城市</div>
      </div>
      <div class="carbtnbox">
        <div class="bannr_titlea" v-show="reversedMessage>5000">
          <countdown :endTime="String(datamesg.beginTime)" :callback="callback" endText="00：00：00"></countdown>
          后开始
        </div>
        <div class="btnbox ">
          <div :class="['btna',{close:datamesg.itemStatus==0},{willbegin:datamesg.itemStatus!=0 &&reversedMessage > 5000}]" @click="checkSedkill">
            {{datamesg.itemStatus==0?'已结束':(reversedMessage > 5000 ? '即将开始' : (reversedMessage > 0 ? reversedMessage / 1000 + '秒后即将开始' : '立即秒杀'))}}
          </div>
          <div :class="['btnb',{close:(datamesg.status==4 || datamesg.status==1 ||datamesg.itemStatus==0)}]" @click="tosign(datamesg)">{{status[datamesg.status]}}</div>
        </div>
      </div>
      <div class="carbtnbox" v-if="datamesg.areaStatus==0">
        <div class="btnbox noaction">您所在的城市暂无秒杀</div>
      </div>
      <div class="detailbox" style="margin-left:.2rem;margin-right:.2rem" v-html="datamesg.details"></div>
    </div>

    <div class="citybox" v-show="citylist">
      <div class="citylist">
        <div class="title"><span class="iconfont icon-dingwei"></span>适用城市</div>
        <ul class="itemlistcity">
          <li class="cityname" v-for="(item,index,key) in wherelist">
            {{item}}
          </li>
        </ul>
        <div class="closebtn" @click="citylist=false">关闭</div>
      </div>
    </div>
  </div>
</template>
<script>
  import Final from "../../static/baseSetting/Final";
  import api from "./../fetch/api";
  import loading from "../components/loading";
  import countdown from "../components/countdown";
  import * as util from "./../util/util"
  import mesg from "../components/mesg";

  export default {
    data() {
      return {
        Final:Final,
        showPanel:false, //加载数据前 隐藏DOM

        loginshow:false,
        timeout: 60,
        sendCodeTimer: '',
        userPhone: '',
        userCode: '',
        ipone_err: false,
        code_err: false,
        codestatus:true,

        mesg: '',
        util: util,
        status: ['活动已结束', '报名未开始', '快速报名', '已报名', '报名已结束'],
        loadingShow: true,
        itemId: '',
        datamesg: {beginTime: ''},
        reversedMessage: null,
        codeId: '',
        timeval: null,
        citylist: false,
        wherelist:[],
        timer:'',  //倒计时定时器
      }
    },
    components: {
      loading,
      countdown,
      mesg
    },
    mounted() {
      this.initPage();
    },
    computed: {},
    methods: {
      /**
       * 初始化页面
       */
      initPage () {
        this.codeId = this.$route.params.code;
        this.itemId =this.$route.query.id;
        this.requestDetail(this.itemId);
      },
      /**
       * 请求秒杀详情
       */
      requestDetail (itemId){
        if(itemId){
          api.ap_sedkill_info({itemId:itemId})
            .then(res => {
              this.loadingShow = false;
              if (res.status == true) {
//                  res.result.status=0; //测试状态
                this.datamesg = res.result;
                this.showPanel=true;
                this.formatArea();
                if(this.datamesg.status!=0){
                  this.startTimer();
                }
              }
            }).catch(error => {
            this.loadingShow = false;
          });
        }
      },
      /**
       * 格式化活动区域数据
       */
      formatArea () {
        if(this.datamesg.areaIds){
          let newidlist= this.datamesg.areaIds.split(",");
          let newwherelist=this.datamesg.areaNames.split(",");
          let newarr=[]
          for(let i=0;i<newidlist.length;i++){
            if(newidlist[i]>99){
              newarr.push(newwherelist[i]);
            }
          }
          this.wherelist=newarr;
        }
//        datamesg.areaNames?datamesg.areaNames.split(','):[]
      },
      /**
       * 发送验证码
       */
      getcode: function () {
        var _that = this;
        if (this.userPhone.length >= 11 && this.ipone_err == false) {
          if (_that.codestatus) {
            _that.codestatus = false;
            api.ap_get_auth_code({userPhone: this.userPhone})
              .then(res => {
                if (res.status) {
                  _that.sendCodeTimer = setInterval(function () {
                    if (_that.timeout > 0) {
                      _that.timeout--
                    } else {
                      _that.codestatus = true;
                      _that.timeout = 60;
                      clearInterval(_that.sendCodeTimer);
                    }
                  }, 1000)
                }
              }).catch(error => {
              console.log(error)
            })
          }
        }
      },
      /**
       * 登录
       */
      loginin: function () {
        var _that = this;
        if (this.userCode == "") {
          this.code_err = true;
          return false;
        } else {
          this.code_err = false;
        }
        if (this.userPhone == "") {
          this.ipone_err = true;
          return false;
        } else {
          this.code_err = false;
        }
        if (!this.ipone_err) {
          api.base_login({userPhone: this.userPhone, checkCode: this.userCode})
            .then(res => {
              console.log(res)
              if (res.status) {
                _that.mesg = '登录成功';
                clearInterval(_that.sendCodeTimer);
                _that.loginshow = false;
                _that.islogin = true;
              } else {
                _that.mesg = '登录失败';
              }
            }).catch(err => {
            _that.mesg = '登录失败';
          });
        }
      },
      /**
       * 校验手机号
       */
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
       * 显示登录模态框
       */
      showLogin(){
          this.loginshow=true;
      },
      callback: function () {

      },
      /**
       * 校验是否登录
       */
      checkLogin: function () {
        return new Promise((resolve, reject) => {
          // console.log(window.location.href)
          api.base_veifyToken({})
            .then(res => {
              if (res.status == true) {
//                window.location.href =window.location.origin+Final.CHILD_FLOADER_NAME+"/"+Final.BUILD_PATH+"/aliValid/aliValid.html?itemId=" + this.itemId;  //用户登录成功 跳转阿里滑块验证页面
                resolve({isLogin: true});
              } else {
                resolve({isLogin: false});
//              this.mesg = ""
//              this.mesg = res.message;
              }
              console.log(res)
            }).catch(error => {
            reject(error);
          });
        })
      },
      /**
       * 跳转报名
       */
      tosign: function (item) {
        if (item.status == 2) {
          this.$router.push({path: '/sedKill/' + this.codeId + '/secondkilllogin', query: {id: this.itemId}})
        }
      },
      /**
       * 秒杀校验和跳转
       */
      checkSedkill : function (){
          if(this.datamesg && this.datamesg.itemId){
            var isLogin=this.checkLogin();
            isLogin.then((value) =>{
                console.log(value);
              if(value.isLogin){
                api.ap_sedkill_seckill_check({itemId:this.datamesg.itemId})
                  .then(res => {
                    if (res.status == true) {
                      window.location.href =window.location.origin+Final.CHILD_FLOADER_NAME+"/"+Final.BUILD_PATH+"/aliValid/aliValid.html?itemId=" + this.itemId;  //用户登录成功 跳转阿里滑块验证页面
                    } else {
                      if(res.code==999){
                        this.showLogin();
                      }else if(res.code == 3){
                        this.$refs.msgTip.showMsgTip("您没有报名该秒杀活动")
                      }else if(res.code ==4){
                        this.$refs.msgTip.showMsgTip("你已经参与过该活动");
                      }else if(res.code == 5){
                        this.$refs.msgTip.showMsgTip("秒杀活动未开始");
                      }else if(res.code==6){
                        this.$refs.msgTip.showMsgTip("秒杀活动已结束");
                      }else if(res.code == 7){
                        this.$refs.msgTip.showMsgTip("秒杀达到限制");
                      }else if(res.code == 8){
                        this.$refs.msgTip.showMsgTip("你已经参与过该活动");
                      }
                    }
                  }).catch(error => {
                });
              }else{
                  let mobile=localStorage.getItem('mobile');
                if(mobile){
                  this.showLogin();
                }else{
                  this.tosign(this.datamesg);
                }

              }
            })
//            if(isLogin){
//
//            }else{
//                this.showLogin();
//            }

          }
      },
//      sedkill: function () {
//        if(this.reversedMessage>0){
//          this.mesg="秒杀未开始1111111";
//          return;
//        }else if(this.datamesg.status==4){
//          this.mesg="请先报名";
//          return;
//        }else
//        if(this.reversedMessage>0 || this.datamesg.status==0 || this.datamesg.status==4){
//          if(this.datamesg.status==4){
//            this.mesg="请先报名"
//          }
//          return false;
//        }
//        this.checkLogin();
//        if (this.reversedMessage < 0) {
//          this.checkLogin();
//        } else {
//
//        }
////          api.ap_sedkill_seckill({clientType:1,itemId:this.itemId})
////            .then(res => {
////              if(res.status){
////
////              }else{
////                  this.mesg=""
////                  this.mesg=res.message;
////              }
////              console.log(res)
////            }).catch(error => {
////            console.log(error)
////          });
//      },
      saycity: function () {
        this.citylist = true;
      },
      /**
       * 开启倒计时
       */
      startTimer () {
        let self = this;

        setTimeout(function () {
          if (self.datamesg.beginTime) {
            let enrollStartTime = self.datamesg.beginTime
            self.reversedMessage = enrollStartTime - Date.parse(new Date())-1000;
            console.log(self.reversedMessage)
            if(self.reversedMessage<=0 &&  self.datamesg.status!=3){
              self.datamesg.status=4;
            }else{
                self.startTimer();
            }
          };
        }, 1000);
        console.log("timer--------->",this.timer);
      }
    }
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/Secondcardetail.css";

</style>
