<template>
  <div>
    <loading v-show="loadingShow"></loading>
    <div class="secondlist">
      <div class="listitem" v-for="(item,index,key) in secondlist">
        <div class="status_top"><span class="orderNum" style="float: left; font-size: .12rem; color: #666666;"
                                      v-if="item.orderNum">订单号:{{item.orderNum}}</span><span
          style="float: right;">{{statustext[item.status]}}</span></div>
        <div class="itemcenter">
          <div class="center_left"  @click="todetail(item)">
            <img :src="item.imgUrl"/>
          </div>
          <div class="killright">
            <div class="killtitle"  @click="todetail(item)">{{item.itemName}}</div>
            <div class="right_center">
              <div>
                <div class="killprice">秒杀价 <span class="redcolor">￥{{item.amount}}</span></div>
              </div>
            </div>
            <div class="rightbottom">
              <div class="bottomlist status1" v-if="item.status==1 ||item.status==10 && item.itemStatus==1">距秒杀开始还有<countdown :endTime="String(item.beginTime)" :callback="callback(index)" endText="00:00:00"></countdown>
              </div>
              <div class="bottomlist status1" v-if="item.itemStatus==0">秒杀已结束</div>
              <div class="bottomlist status1" v-if="item.status==2 && item.itemStatus==1">支付倒计时<countdown :endTime="getordertime(item,index)" :callback="callbacka(index,item)" endText="00:00:00"></countdown></div>
              <div class="bottomlist status1" v-if="item.status==4 && item.itemStatus==1">核销码：{{item.verifyCode}}</div>
            </div>
          </div>
        </div>
        <div class="btn_box">
          <span class="timesigning">报名时间:{{util.toFullDateString(item.createTime)}}</span>
          <span class="hexiao" v-show=" item.itemStatus==1 && item.status==4"  @click="getcode(item)" style="font-size: .12rem;    display: inline-block; color: #168dde; margin-right: .04rem;"><i
            class="iconfont icon-libao" style="color: #168dde; margin-right: .05rem;"></i>查看核销码</span>
          <span class="btn btnb " @click="sedkill_del(item)" v-if="item.status==6 || item.status==7 || item.itemStatus==0 ">删除</span>
          <span @click="tocardetail(item)" class="btn btnb active" v-if="item.status !=1 && item.status!=2&& item.status!=10 ">查看秒杀</span>
          <span @click="tocardetail(item)" class="btn btna" v-if="item.status==1 ||item.status==2 || item.status==10 && item.itemStatus==1 ">前往秒杀</span>
        </div>
      </div>
    </div>
    <div class="nolist" v-if="nolistshow">
      <img src="../assets/img/couponNulla.png"/>
      <div class="mesg">您还未参加过秒杀活动</div>
    </div>
    <div class="codeimgshow" v-show="codeimgshow">
      <div class="imgbox">
        <span class="close iconfont icon-guanbi" @click="codeimgshow=null"></span>
        <img :src="imgurl"/>
        <div class="text">请将此二维码
          出示给销售顾问
        </div>
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

  export default {
    data() {
      return {
        util: util,
        Final:Final,
        loadingShow: true,
        activityCode: '',
        codeId: '',
        codeimgshow:null,
        imgurl: '',
        statustext: {
          1: '已报名',
          2: '待支付',
          3: '已支付',
          4: '秒杀成功',
          5: '已取消',
          6: '退款中',
          7: '已退款',
          8: '已使用',
          9: '已过期',
          10: '已报名'
        },
        secondlist:[],
        status: ['快速报名', '报名未开始', '报名已结束', '已报名'],
        enrol_show: false,
        actiontimeone: "",
        nolistshow: false,
      }
    },
    created() {

    },
    components: {
      loading,
      countdown
    },
    methods: {
      Pickclick: function (data) {
        this.loadingShow = true;
      },
      callback: function (index) {
      },
      callbacka:function (index,item) {
        if(Date.parse(new Date())-item.orderTime>600*1000){
          this.secondlist[index].status=9;
        }
      },
      getcode:function(item){
        this.codeimgshow=true;
        this.imgurl = Final.QRCODE + "/v1/gift/qrcode?activityId=" + item.itemId + "&activityType=102&couponCode=yunyong"
      },
      tocardetail: function (item) {
        //this.codeId = this.$route.params.code;
        this.activityCode=item.activityCode;
        this.$router.push({path: '/sedKill/' + this.activityCode + '/secondcardetail', query: {id: item.itemId}})
      },
      todetail: function (item) {
        this.$router.push({path: '/mysedKill/seconddetail', query: {id: item.itemId}})
      },
      getordertime:function(item){
        return (item.orderTime+1000*60*10).toString()
      },
      sedkill_del: function (item) {
        api.ap_sedkill_del({itemId: item.itemId})
          .then(res => {
            this.mesg = '删除成功';
            setTimeout(function () {
              location.reload();
            }, 1000)
          }).catch(error => {

        });
      },
      getlist:function () {
        api.ap_sedkill_my_activity_list()
          .then(res => {
            if (res.status) {
              this.secondlist = res.result;

              if (this.secondlist.length == 0) {
                this.nolistshow = true

              }
            } else {
              this.nolistshow = true
            }
            this.loadingShow = false;
          }).catch(error => {
          this.loadingShow = false;
          this.nolistshow = true
        });
      }

    },
    mounted() {
        document.title="我的活动";
        this.getlist();
    }
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/secondlist.css";

</style>
