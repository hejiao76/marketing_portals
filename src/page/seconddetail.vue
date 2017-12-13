<template>
  	<div>
      <loading v-show="loadingShow"></loading>
      <div class="detailbox">
        <div class="detailTop">
          <div class="typeaa">{{statustext[detailmesg.status]}}</div>
          <div class="typebb" v-if="detailmesg.status==0">距秒杀开始还有<countdown endTime="1514061620" :callback="callback" endText="已经结束了"></countdown></div>
          <div class="typebb" v-if="detailmesg.status==2">支付后有机会秒杀成功</div>
          <div class="typebb" v-if="detailmesg.status==3">很遗憾您没有秒到该商品，我们正在为您退款</div>
          <div class="typebb" v-if="detailmesg.status==4">请您尽快到所选经销商处提车</div>
        </div>
        <div class="detail_list">
            <div class="list_item itema">
                <img src="../assets/img/ms_end.png" />
                <div class="itema_right spb">
                  <div class="title">{{detailmesg.itemName}}</div>
                  <div class="amount">秒杀价：{{detailmesg.amount+'元'}}</div>
                </div>
            </div>
            <div class="list_item">
              <span class="spa">活动说明</span>
              <span class="spb">秒杀成功即可第扣车款2万元</span>
            </div>

          <div class="list_item">
            <div class="item_list">
              <span class="spa">订单编号</span>
              <span class="spb">{{detailmesg.itemId}}</span>
            </div>
            <div class="item_list">
              <span class="spa">活动时间</span>
              <span class="spb">{{detailmesg.itemId}}</span>
            </div>
            <div class="item_list">
              <span class="spa">支付方式</span>
              <span class="spb">{{detailmesg.itemId}}</span>
            </div>
            <div class="item_list">
              <span class="spa">支付时间</span>
              <span class="spb">{{detailmesg.itemId}}</span>
            </div>
            <div class="item_list">
              <span class="spa">退款时间</span>
              <span class="spb">{{detailmesg.itemId}}</span>
            </div>
          </div>
          <div class="list_item">
            <div class="item_list">
              <span class="spa">购车人姓名</span>
              <span class="spb">{{detailmesg.itemId}}</span>
            </div>
            <div class="item_list">
              <span class="spa">购车人手机</span>
              <span class="spb">{{detailmesg.itemId}}</span>
            </div>
            <div class="item_list">
              <span class="spa">提车经销商</span>
              <span class="spb">{{detailmesg.itemId}}</span>
            </div>
            <div class="item_list">
              <span class="spa">经销商地址</span>
              <span class="spb">{{detailmesg.itemId}}
                <div><span class="iconfont icon-dingwei"></span><span class="mapbtn">查看地图</span></div>
              </span>
            </div>

          </div>
        </div>
        <div class="detail_btn_box">
            <span class="btn brna">立即支付</span>
          <span class="btn brna">发送核销码短信</span>
            <span class="btn">查看秒杀</span>
        </div>
      </div>
    </div>
</template>
<script>
  import Final from "../util/Final";
  import API from "./../fetch/api";
  import loading from "../components/loading";
  import countdown from "../components/countdown";
  export default {
      data() {
          return {
            loadingShow:false,
            statustext:{0:'报名成功',1:'待支付',2:'已结束',3:'已支付，秒杀已结束',4:'秒杀成功',5:'已退款'},
            detailmesg:{itemId:21212,status:0,timetype:1,itemName:'xxxx',amount:11,beginTime:112121212,}
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
        Pickclick : function (data){
            this.loadingShow=true;
        },
        callback:function(){

        },
        showdetail:function(index){
          $(".listitem:eq("+index+") .xz_detail").toggleClass('active');
          $(".listitem:eq("+index+") .iconfont").toggleClass('active');
        },
        miaosha:function(item){
          console.log(item)
          if(item.status!=0){
            return false;
          }
          this.actiontimeone=item.killtime;
          this.enrol_show=true;
        }
      }
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/Seconddetail.css";

</style>
