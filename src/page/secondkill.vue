<template>
  <div>
    <loading v-show="loadingShow"></loading>
    <div :class="['killbox', {nolist:killlist.length==0}]">
      <div class="killbanner">
        <img class="bannerimg" src="../assets/img/ms_bc.png"/>
        <div class="actionTime">活动时间：{{beginTime}} ~ {{endTime}}</div>
        <ul class="banner_list" v-if="killlist.length!=0">
          <li><span class="float iconfont icon-jushouxin"></span>
            <span class="list_text float">报名秒杀</span>
          </li>
          <li><span class="float iconfont icon-miaobiao_kuai"></span>
            <span class="list_text float">秒杀开启</span>
          </li>
          <li><span class="float iconfont icon-duigou"></span>
            <span class="list_text">支付订单<br>秒杀成功</span>
          </li>
        </ul>
      </div>
      <div class="killlist" :key="item.itemId" v-for="(item,index,key) in killlist">
        <div class="timetolset"><span class="iconfont icon-miaobiao_kuai"></span>{{util.toFullDateString(item.beginTime)}}
        </div>
        <div class="killdetail">
          <div class="killleft" @click="todetail(item)">
            <div class="label" v-if="validWillBegin(item)">
              <span class="bigicon"></span>
              <!--<div><span class="smallicon iconfont  icon-miaobiao"></span>-->
              <!--即将开始</div>-->
            </div>
            <div class="label" v-if="validBegin(item)">
              <span class="beginKill"></span>
            </div>
            <img class="headimg" :src="item.whitePic"/>
          </div>
          <div class="killright">
            <div class="killtitle" @click="todetail(item)">{{item.itemName}}<span
              class="number">仅{{item.surplusCount}}张</span></div>
            <div class="right_center">
              <div>
                <div class="killtime">报名时间：{{util.toFullDateString(item.enrollStartTime).split(" ")[0]}} 至<br>
                  {{util.toFullDateString(item.enrollEndTime).split(" ")[0]}}
                </div>
                <div class="killprice">秒杀价 <span class="redcolor">￥{{item.amount}}</span> <span
                  style="color: #999999;font-size: .14rem; margin-left:10px;text-decoration:line-through;">￥{{item.couponAmount}}</span>
                </div>
              </div>
            </div>
            <div class="btn_box">
              <button class="btn btna" @click="todetail(item)">{{'立即秒杀'}}</button> <!--statustype[item.status]-->
              <button :class="['btn','btnb',{active:item.status==2}]" @click="tosign(item)">{{status[item.status]}}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="noShow" v-if="killlist.length==0"
           style="height:100%; position: absolute;width:100%; left: 0; top:0; background: #eee; z-index: 9; display: flex; align-items: center;">
        <div>
          <img style="width:100%" src="../assets/img/ms_end.png"/>
          <div class="errmeg" style="width: 100%; text-align: center; font-size: .2rem; color: #666666;">你来迟啦 活动{{errormesg}}</div>
        </div>
      </div>
    </div>
    <div class="brankout" v-show="enrol_show">
      <div class="out_box">
        <div class="title" style="font-size: .18rem; margin-top: .3rem;">报名成功</div>
        <div class="" style="margin-top:.1rem; color: #666666; ">秒杀将于{{actiontimeone}}准时开始</div>
        <div class="bottom" @click="enrol_show=false"
             style="height: .42rem; line-height: .42rem; font-size: .16rem; color: #007aff;">关闭
        </div>
      </div>
    </div>

    <div id="_umfp" style="display:inline;width:1px;height:1px;overflow:hidden"></div>
    <div id="dom_id" style="display:inline;width:1px;height:1px;overflow:hidden"></div>
    <mesg ref="msgTip"></mesg>
  </div>
</template>
<script>
  import Final from "../../static/baseSetting/Final";
  import api from "./../fetch/api";
  import loading from "../components/loading";
  import * as util from "../util/util";
  import mesg from "../components/mesg";
  import { wechatShare }  from '../mixin/wxShare.js';
  import wx from 'weixin-js-sdk';

  export default {
    data() {
      return {
        Final:Final,
        loadingShow: true,
        util: util,
        statustype: {1: '已上架', 2: '已下架', 3: '已过期', 4: '已删除'},
        mesgdata: {},
        killlist: [],
        status: ['活动已结束', '报名未开始', '快速报名', '已报名', '报名已结束'],
        enrol_show: false,
        actiontimeone: "",
        beginTime: '',
        endTime: '',
        errormesg: '已结束',
        codeId: ''
      }
    },
    created() {
      //alert("create");
    },
    mounted() {
      this.initPage();
    },
    components: {
      loading:loading,
      mesg:mesg,
    },
    computed: {
      willbegin: function () {
        let beginTime = this.beginTime;
      }
    },
//    activated() {
//      this.dealerId = localStorage.dealerId;
//      this.dealerName = localStorage.dealerName;
//    },
    methods: {
      /**
       * 初始化页面
       */
      initPage : function (){
        this.codeId = this.$route.params.code;
        if(this.codeId){
            this.requestDetail(this.codeId);
        }
      },
      /**
       * 请求秒杀详情数据
       */
      requestDetail(codeId) {
        if(codeId){
          this.loadingShow = true;
          api.ap_sedkill_detail({'activityCode': codeId})
            .then(res => {
              if(res.status==true){
                this.wxShareFn(res.result);
                window.localStorage.setItem("ownerType",res.result.ownerType);
                document.title=res.result.name || "秒杀活动";
                this.loadingShow = false;
                if (res.result.status == 1) {
                  this.killlist = res.result.itemList;
                } else {
                  this.errormesg = this.statustype[res.result.status]
                }
                this.beginTime = util.toDateString(res.result.beginTime)
                this.endTime = util.toDateString(res.result.endTime)
              }else{
                this.loadingShow = false;
                this.$refs.msgTip.showMsgTip(res.message || "访问异常，请刷新重试");
              }
            }).catch(error => {
            console.log(error)
            this.loadingShow = false;
            this.$refs.msgTip.showMsgTip("访问异常，请刷新重试");
          });
        }
      },
//      Pickclick: function (data) {
//        this.loadingShow = true;
//      },
//      showdetail: function (index) {
//        $(".listitem:eq(" + index + ") .xz_detail").toggleClass('active');
//        $(".listitem:eq(" + index + ") .iconfont").toggleClass('active');
//      },
      /**
       * 查看详情
       */
      todetail: function (item) {
        this.$router.push({path: '/sedKill/' + this.codeId + '/secondcardetail', query: {id: item.itemId}})
      },
      /**
       * 登录
       */
      tosign: function (item) {
        if (item.status == 2) {
          this.$router.push({path: '/sedKill/' + this.codeId + '/secondkilllogin', query: {id: item.itemId}})
        }
      },
      /**
       * 验证是否即将开始规则（24小时）
       */
      validWillBegin:function(item){
        return ((item.beginTime-Date.parse(new Date()))>24*60*60*1000 ||  item.beginTime<Date.parse(new Date()))?false:true
      },
      /**
       * 验证是否已经开始
       */
      validBegin:function(item){
        return (item.beginTime>=Date.parse(new Date()))?false:true
      },
      /***初始化微信分享标题内容***/
      wxShareFn (data) {
        let _self=this;
        wechatShare({
          title: data.name,
          content: data.description || '',
          link: window.location.href,
          logo:data.shareImg ? data.shareImg.includes('http://') ? data.shareImg : Final.IMG_PATH+data.shareImg : "",
          success:function (){
            alert("分享成功");
            _self.addFree();
          }
        });
      }
    }

  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/SecondKill.css";

</style>
