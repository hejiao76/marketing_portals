<template>
  <div>
    <loading v-show="loadingShow"></loading>
    <div class="detailbox">
      <div class="detailTop">
        <div class="typeaa">{{statustext[orderstatus]}}</div>
        <div class="typebb" v-if="orderstatus==1 ||orderstatus==10">距秒杀开始还有
          <countdown :endTime="detailmesg.beginTime" :callback="callback" endText="00:00:00"></countdown>
        </div>
        <div class="typebb" v-if="orderstatus==2">支付后有机会秒杀成功</div>
        <div class="typebb" v-if="orderstatus==3">很遗憾您没有秒到该商品，我们正在为您退款</div>
        <div class="typebb" v-if="orderstatus==4">请您尽快到所选经销商处提车</div>
      </div>
      <div class="detail_list">
        <div class="list_item itema">
          <img :src="detailmesg.imgUrl"/>
          <div class="itema_right spb">
            <div class="title">{{detailmesg.itemName}}</div>
            <div class="amount">秒杀价：{{detailmesg.amount + '元'}}</div>
          </div>
        </div>
        <div class="list_item">
          <div class="item_list">
            <span class="spa">活动说明</span>
            <span class="spb">{{detailmesg.description}}</span>
          </div>
          <div class="item_list">
            <span class="spa">秒杀券价值</span>
            <span class="spb">{{detailmesg.couponAmount}}元</span>
          </div>
        </div>

        <div class="list_item">
          <div class="item_list" v-if="orderstatus==3 || orderstatus==4 || orderstatus==6|| orderstatus==8">
            <span class="spa">订单编号</span>
            <span class="spb">{{detailmesg.orderNum}}</span>
          </div>
          <div class="item_list">
            <span class="spa">活动时间</span>
            <span class="spb">{{util.toFullDateString(detailmesg.beginTime)}}</span>
          </div>
          <div class="item_list" v-if="orderstatus==3 || orderstatus==4 || orderstatus==6|| orderstatus==8">
            <span class="spa">支付方式</span>
            <span class="spb">{{detailmesg.payType == 1 ? '支付宝' : (detailmesg.payType == 2 ? '微信支付' : '')}}</span>
          </div>
          <div class="item_list"
               v-if="orderstatus==3 || orderstatus==4 || orderstatus==6||  orderstatus==7|| orderstatus==8">
            <span class="spa">支付时间</span>
            <span class="spb">{{util.toFullDateString(detailmesg.payTime)}}</span>
          </div>
          <div class="item_list" v-if="orderstatus==7">
            <span class="spa">退款时间</span>
            <span class="spb">{{util.toFullDateString(detailmesg.refundTime)}}</span>
          </div>
          <div class="item_list" v-if="orderstatus==4">
            <span class="spa">核销码</span>
            <span class="spb">{{detailmesg.verifyCode}}<span class="showcode" @click="codeimgshow=true">
              <span
              class="iconfont icon-erweima" style="margin-right: .05rem;"></span>查看核销码</span></span>
          </div>
        </div>
        <div class="list_item">
          <div class="item_list">
            <span class="spa">购车人姓名</span>
            <span class="spb">{{detailmesg.userName}}</span>
          </div>
          <div class="item_list">
            <span class="spa">购车人手机</span>
            <span class="spb">{{detailmesg.userPhone}}</span>
          </div>
          <div class="item_list">
            <span class="spa">提车经销商</span>
            <span class="spb">{{detailmesg.dealerName}}</span>
          </div>
          <div class="item_list">
            <span class="spa">经销商地址</span>
            <span class="spb">{{detailmesg.dealerAddress}}
              <!--<div class="mapbox"><span class="iconfont icon-dingwei"></span><span class="mapbtn" @click="tomap">查看地图</span></div>-->
              </span>
          </div>

        </div>
      </div>
      <div class="detail_btn_box">
        <span class="btn brna" v-if="orderstatus==2" @click="tojiaoyan()">立即支付</span>
        <span class="btn" @click="tocardetail(detailmesg)" v-if="orderstatus==1 || orderstatus==10">前往秒杀</span>
        <span class="btn" @click="tocardetail(detailmesg)" v-if="orderstatus !=1 && orderstatus!=2">查看秒杀</span>
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
        Final:Final,
        util: util,
        codeimgshow: null,
        loadingShow: false,
        activityCode:'',
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
          10: '秒杀中'
        },
        detailmesg: {itemId: 21212, status: 0, timetype: 1, itemName: 'xxxx', amount: 11, beginTime: 112121212,},
        orderstatus: null,
        itemId: '',
        codeId: '',
        imgurl: ''
      }
    },
    created() {
      //alert("create");
    },
    components: {
      loading,
      countdown
    },
    methods: {

      callback: function () {
      },
      tojiaoyan:function () {
//        window.location.href = "static/aliValid/aliValid.html?itemId=" + this.itemId;  //用户登录成功 跳转阿里滑块验证页面
        this.$router.push({path: '/sedKill/' + this.codeId + '/secondkilllogin', query: {id: this.itemId}})
      },
      todetail: function (item) {
        this.$router.push({path: '/sedKill/' + item.codeId, query: {}})
      },
      tocardetail: function (item) {
        this.activityCode=item.activityCode;
        this.$router.push({path: '/sedKill/' + this.codeId + '/secondcardetail', query: {id: item.itemId}})
      },
      tomap: function (item) {
        location.href = "http://ec.web.dev.chinameds.cn/web/html/dealer/dealersInMap.html?skuId=" + 10001
      },
    },
    mounted() {
      this.itemId = this.$route.query.customerFlag || this.$route.query.id;
      this.imgurl = Final.QRCODE + "/v1/gift/qrcode?activityId=" + this.itemId + "&activityType=102&couponCode=yunyong"
      let paySuccessTime= this.$route.query.paySuccessTime;
      if(paySuccessTime){
        detailmesg.payTime=paySuccessTime
      }
      api.ap_sedkill_my_activity_info({itemId: this.itemId})
        .then(res => {
          if (res.status) {
            this.detailmesg = res.result;
            this.orderstatus = res.result.status;
            this.codeId=res.result.activityCode;
          } else {

          }
        }).catch(err => {

      });
    }
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/Seconddetail.css";

</style>
