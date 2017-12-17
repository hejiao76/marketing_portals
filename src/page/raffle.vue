<template>
  	<div class="raffle" v-if='bc_img' :style="{background: 'url('+ bc_img +')',backgroundSize:'cover' }">
      <loading v-show="loadingShow"></loading>
      <mesg v-bind:mesg="mesg"></mesg>
      <div class="title">
        <img class="title_bc" :src="title_img"></img>
        <div class="raffle_number">您还有 <span>{{remainnumber}}</span> 次抽奖机会</div>
      </div>
      <zhuanpan v-on:listenstatus="getstatus" v-bind:loginstatus="islogin" ></zhuanpan>
      <div class="all_number" v-if="isShowJoinSize===1">已有<span class="number">{{allNumber}}</span>人参加</div>
      <titleaa :titlelist="titlelistaa" v-if="isShowWinningRecord===1 && titlelistaa.length>0" ></titleaa>
      <div class="protocolBtn" @click="status=0">活动须知</div>
      <div class="out_box sigin" v-show="loginshow">
        <div class="out_boxa">
        <span class="close iconfont icon-guanbi"></span>
        <div class="title_name">登录</div>
          <input type="number" class="username" :onchange="isiphone()"  v-model="userPhone" placeholder="请输入手机号" />
          <div class="errortext" v-if="ipone_err">请输入正确的手机号</div>
          <div class="Verification">
            <input type="number"  v-model="userCode" class="logintext code" placeholder="请输入验证码" />
            <span :class="['btn_code',{clicked:!codestatus}]" @click="getcode">{{codestatus?'获取验证码':timeout+'s后再次获取'}}</span>
          </div>
          <div class="errortext" v-if="code_err">请输入验证码</div>
          <div class="tishi"><span class="iconfont icon-tishi"></span>未注册过的手机号将自动创建帐户</div>
          <div class="codebtn" @click="loginin">立即登录</div>
        </div>

      </div>
      <div class="out_box actionmesg" v-if="status==0">
        <div class="out_boxa">
          <span class="close iconfont icon-guanbi" @click="status=null"></span>
          <div class="title_name">活动须知</div>
          <div class="action_detail">
            <!--<div>1. 玩家通过签到来增加游戏的抽奖次数。</div>-->
            <!--<div>2. 转盘转动停止后，指针会停在装盘中的-->
            <!--某一个空格。</div>-->
              <!--<div>3. 中奖后会跳转进入奖品页面，未中奖可根据-->
            <!--主办方所确定的规则进行再抽奖。</div>-->
                <!--<div>4、奖品：-->
            <!--一等奖：iPhone 8 5台-->
            <!--二等奖：小米净化器 10台-->
            <!--三等奖：礼品卡 50张</div>-->
                  <!--<div>5、活动时间：2017.11.01——2017.11.30</div>-->
                    <!--<div>6、活动最终解释权归厂商所有</div>-->
            <div>{{description}}</div>
          </div>
        </div>

      </div>

      <div class="out_box " v-if="status==1">
        <div class="out_boxa min-width">
          <span class="close iconfont icon-guanbi" @click="status=null"></span>
          <img class="bc_img" src="../assets/img/prize.png" >
          <div class="title_name">恭喜您，中奖啦</div>
          <div class="jiangli">
              <div class="jl_name">{{jl_mesg.name}}</div>
              <ul>
                <li class="jl_list" v-for="(item,index,key) in jl_mesg.jllist">{{item.giftName}}</li>
              </ul>
          </div>
          <div class="color_btn" @click="tomyraddle">立即领取</div>
        </div>

      </div>

      <div class="out_box" v-if="status==2">
        <div class="out_boxa min-width noprize">
          <span class="close iconfont icon-guanbi" @click="status=null"></span>
          <div class="title_name">很遗憾，您没中奖</div>
          <div class="remainnumber">今日您还有 <span>{{remainnumber}}</span> 次抽奖机会</div>
          <div class="color_btn" @click="rafflealigon">再次抽奖</div>
        </div>
      </div>

      <div class="out_box"  v-if="status==3">
        <div class="out_boxa min-width getnumber">
          <span class="close iconfont icon-guanbi" @click="status=null"></span>
          <div class="title_name">抽奖机会已用完</div>
          <div class="iconfont icon-weixin weixinicon"></div>
          <div class="mesg">分享到微信<br>可增加抽奖机会噢~</div>
          <div class="color_btn" @click="getnumber">获取抽奖机会</div>
        </div>
      </div>

      <div class="out_box" v-if="status==4">
        <div class="out_boxa min-width noprize">
          <span class="close iconfont icon-guanbi" @click="status=null"></span>
          <div class="title_name">很遗憾，抽奖失败</div>
          <div class="remainnumber">{{errormesg}}</div>
          <div class="color_btn"  @click="status=null">确定</div>
        </div>
      </div>
    </div>
</template>
<script>
import api from "./../fetch/api"
  import Final from "../util/Final";
  import API from "./../fetch/api";
  import zhuanpan from "../components/zhuanpan";
  import titleaa from "../components/titleaa";
  import loading from "../components/loading";
  import mesg from "../components/mesg";
  import wxShare from '../mixin/wxShare.js'
  var xxUrl = window.location.origin
export default {
  mixins: [wxShare],
      data() {
          return {
            loadingShow:true,
            remainnumber:0,
            allNumber:0,
            islogin:false,
            loginshow:false,
            status:null,//状态
            titlelistaa:[],//获奖list
            errormesg:"",//失败原因
            jl_mesg:{name:'',jllist:[]},
            isShowJoinSize:null,
            isShowWinningRecord:null,
            codestatus:true,//code 状态
            timeout:60,
            interval:null,
            userPhone:'',
            userCode:'',
            ipone_err:false,
            code_err:false,
            mesg:'',
            bc_img:null,
            title_img:null,
            timeout:60,
            description:''
          }
      },
      created (){
        //alert("create");
      },
      components :{
        VHeader,
        VLeft,
        VConNav,
        zhuanpan,
        titleaa,
        loading,
        mesg
      },
      methods : {
        getstatus : function (data){
          let _that=this;
          if(data==false){
              _that.loginshow=true;
          }
          if(data.code==2){
            _that.status=3;
          }
          if(data.code==3 || data.code==4||data.code==5||data.code==6||data.code==7||data.code==8){
            _that.status=4;
            _that.errormesg=data.message;
          }
          if(data.status){

            var mesg=data.result;
            if(mesg.level==0){
              _that.status=2;
            }else {
              _that.status=1;
              this.jl_mesg.name=mesg.giftDetail.giftGroupName;
              this.jl_mesg.jllist=mesg.giftDetail.giftInfoList;
            }
            this.remainnumber=mesg.surplusCount;
          }
          console.log(data.result);
          },
        getcode:function(){
          var _that=this;
          if(this.userPhone.length>=11 && this.ipone_err==false){
            if(_that.codestatus){
              _that.codestatus=false;
              api.ap_get_auth_code({userPhone:this.userPhone})
                .then(res => {
                  if(res.status){
                    _that.interval=setInterval(function(){
                      if(_that.timeout>0){
                        _that.timeout--
                      }else {
                        _that.codestatus=true;
                        _that.timeout=60;
                        clearInterval(_that.interval);
                      }
                    },1000)
                  }
                }).catch(error => {
                console.log(error)
              })
            }
          }
        },
        loginin:function(){
          var _that=this;
          if(this.userCode==""){
            this.code_err=true;
            return false;
          }else{
            this.code_err=false;
          }
          if(this.userPhone==""){
            this.ipone_err=true;
            return false;
          }else{
            this.code_err=false;
          }
          if(!this.ipone_err){
          api.base_login({userPhone:this.userPhone,checkCode:this.userCode})
            .then(res => {
              console.log(res)
              if (res.status) {
                _that.mesg='登录成功';
                _that.loginshow=false;
              }else {
                _that.mesg='登录失败';
              }
            }).catch(err => {
              _that.mesg='登录失败';
          });
          }
        },
        isiphone:function () { //校验是否是手机号
          var phone=this.userPhone;
          console.log(phone)
          if(phone.length>=11){
            this.userPhone=phone.substr(0,11)
            if(!(/^1[345789]\d{9}$/.test(phone))){
              this.ipone_err=true;
            }else{
              this.ipone_err=false;
            }
          }
        },
        rafflealigon:function(){
          this.status=null;
          $(".pointer").trigger("click");
        },
        tomyraddle:function(){
            location.href="http://ec.web.dev.chinameds.cn/web/html/gift/giftlist.html"
        }
      },
    mounted (){
//      var shareInfo={
//        title:'xxxxx',
//        link:'http:www.baidu.com',
//        imgUrl:'',
//        desc:'xq'
//      }
//      this.weChatShare(shareInfo)
      let id = this.$route.params.code;
      var _that=this;
      console.log(id);
      api.base_veifyToken().then(res => {
        if(res.status==true){
          _that.islogin=true;
        }else{
          _that.islogin=false;
        }
      }).catch(error => {
        console.log(error)
      });
      //获取详情
      api.ap_prizedraw({'activityCode':id}).then(res => {
        console.log(res)
        let isShowJoinSize=res.result.isShowJoinSize;
        let isShowWinningRecord=res.result.isShowWinningRecord;
        _that.isShowJoinSize=isShowJoinSize;
        _that.isShowWinningRecord=isShowWinningRecord;
        _that.description=res.result.description;
        _that.bc_img=res.result.bgImg;
        _that.title_img=res.result.titleImg;
        if(isShowJoinSize==1){
          //获取抽奖人数
          api.ap_prizedraw_users({'activityCode':id}).then(res => {
            console.log(res)
            _that.allNumber=res.result.joinSize
          }).catch(error => {
            console.log(error)
          });
        }
        if(isShowWinningRecord==1){
          //获取最近中奖
          api.ap_prizedraw_log({'activityCode':id}).then(res => {
            console.log(res)
            _that.titlelistaa=res.result;
          }).catch(error => {
            console.log(error)
          });
        }
        _that.loadingShow=false;
      }).catch(error => {
        console.log(error)
      })
      //获取抽奖次数
      api.ap_prizedraw_number({'activityCode':id}).then(res => {
        console.log(res)
        _that.remainnumber=res.result.surplusCount
      }).catch(error => {
        console.log(error)
      })





    },
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/zhuanpan.css";
</style>
