<template>
  	<div>
      <loading v-show="loadingShow"></loading>
      <div class="detailbox">
        <div class="detailTop">
          <div class="typeaa">{{statustext[orderstatus]}}</div>
          <div class="typebb" v-if="orderstatus==0">距秒杀开始还有<countdown endTime="1514061620" :callback="callback" endText="已经结束了"></countdown></div>
          <div class="typebb" v-if="orderstatus==2">支付后有机会秒杀成功</div>
          <div class="typebb" v-if="orderstatus==3">很遗憾您没有秒到该商品，我们正在为您退款</div>
          <div class="typebb" v-if="orderstatus==4">请您尽快到所选经销商处提车</div>
        </div>
        <div class="detail_list">
            <div class="list_item itema">
                <img :src="detailmesg.imgUrl" />
                <div class="itema_right spb">
                  <div class="title">{{detailmesg.itemName}}</div>
                  <div class="amount">秒杀价：{{detailmesg.amount+'元'}}</div>
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
            <div class="item_list">
              <span class="spa">订单编号</span>
              <span class="spb">{{detailmesg.orderNum}}</span>
            </div>
            <div class="item_list">
              <span class="spa">活动时间</span>
              <span class="spb">{{detailmesg.beginTime}}至{{detailmesg.endTime}}</span>
            </div>
            <div class="item_list" v-if="orderstatus==3 || orderstatus==4 || orderstatus==6|| orderstatus==8">
              <span class="spa">支付方式</span>
              <span class="spb">{{payType==1?'支付宝':(payType==2?'微信支付':'')}}</span>
            </div>
            <div class="item_list"  v-if="orderstatus==3 || orderstatus==4 || orderstatus==6||  orderstatus==7|| orderstatus==8">
              <span class="spa">支付时间</span>
              <span class="spb">{{detailmesg.payTime}}</span>
            </div>
            <div class="item_list"  v-if="orderstatus==7">
              <span class="spa">退款时间</span>
              <span class="spb">{{detailmesg.refundTime}}</span>
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
                <div><span class="iconfont icon-dingwei"></span><span class="mapbtn">查看地图</span></div>
              </span>
            </div>

          </div>
        </div>
        <div class="detail_btn_box">
            <span class="btn brna"  v-if="orderstatus==3 || orderstatus==4 || orderstatus==6|| orderstatus==8">立即支付</span>
            <span class="btn"  v-if="orderstatus==1">前往秒杀</span>
            <span class="btn"  v-if="orderstatus !=1 && orderstatus!=2 && orderstatus!=4">查看秒杀</span>
        </div>
      </div>
    </div>
</template>
<script>
  import Final from "../util/Final";
  import api from "./../fetch/api";
  import loading from "../components/loading";
  import countdown from "../components/countdown";
  export default {
      data() {
          return {
            loadingShow:false,
            statustext:{0:'报名成功',1:'待支付',2:'已结束',3:'已支付，秒杀已结束',4:'秒杀成功',5:'已退款'},
            detailmesg:{itemId:21212,status:0,timetype:1,itemName:'xxxx',amount:11,beginTime:112121212,},
            orderstatus:null,
          }
      },
      created (){
        //alert("create");
      },
      components :{
        loading,
        countdown
      },
      methods : {
        callback:function(){
        },

      },mounted () {
      this.itemId = this.$route.query.id;
      api.ap_sedkill_my_activity_info({itemId:this.itemId})
        .then(res => {
          if (res.status) {
            this.detailmesg = res.result;
            this.orderstatus=res.result.status;
          }else {

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
