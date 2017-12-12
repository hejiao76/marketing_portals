<template>
  	<div>
      <loading v-show="loadingShow"></loading>
      <div class="secondlist">
          <div class="listitem" v-for="(item,index,key) in secondlist">
            <div class="status_top"><span class="orderNum" style="float: left; font-size: .12rem; color: #666666;" v-if="item.orderNum">订单号:{{item.orderNum}}</span><span style="float: right;">{{statuslist[item.status]}}</span></div>
            <div class="itemcenter">
              <div class="center_left">

              </div>
              <div class="killright">
                <div class="killtitle">{{item.itemName}}</div>
                <div class="right_center">
                  <div>
                    <div class="killprice">秒杀价 <span class="redcolor">￥{{item.amount}}</span></div>
                  </div>
                </div>
                <div class="rightbottom">
                  <div class="bottomlist status1" v-if="item.status==1&&item.itemStatus==1">距秒杀开始还有 <countdown endTime="1513061620" :callback="callback" endText="已经结束了"></countdown></div>
                  <div class="bottomlist status1" v-if="item.itemStatus==0">秒杀已结束</div>
                  <div class="bottomlist status1" v-if="item.status==2&&item.itemStatus==1">支付倒计时 02分 02秒</div>

                  <div class="bottomlist status1" v-if="item.status==4">核销码：{{item.verifyCode}}</div>
                  <div class="bottomlist status1" v-if="item.status==6||item.status==7">秒杀已结束</div>
                </div>
              </div>
            </div>
            <div class="btn_box">
              <span class="timesigning">报名时间：{{}}</span>
              <span class="hexiao" style="font-size: .12rem; color: #168dde; margin-right: .06rem;" v-if="item.status==4 &&item.itemStatus==1"><i class="iconfont icon-libao" style="color: #168dde; margin-right: .05rem;"></i>查看核销码</span>
              <button class="btn btnb active " v-if="item.itemStatus==0">删除</button>
              <button @click="miaosha(item)" class="btn btnb"  v-if="(item.status==4 && item.itemStatus==1)|| item.itemStatus==0">查看秒杀</button>
              <button @click="miaosha(item)" class="btn btna"  v-if="(item.status==1||item.status==2 ||item.status==3 )&&item.itemStatus==1">前往秒杀</button>
            </div>
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
            statuslist:['','已报名','待支付','已支付','秒杀成功','已取消','退款中','已退款','已使用','已过期','去秒杀'],
            secondlist:[
              {
                status:1,
                itemStatus:1,//"1正常,0已结束"
                itemName:"活动名称",
                amount:444,
                itemId:21213,//"秒杀id",
                imgUrl:"",
                description:"说明",
                orderNum:"订单编号",
                beginTime:1520761620,//"秒杀开始时间",
                userName:"用户名称",
                userPhone:18201321593,//"用户手机",
                dealerName:"经销商简称",
                dealerAddress:1212121,//"经销商地址",
                verifyCode:22323,//"核销码",
                payType:1,//"支付方式:1支付宝2微信",
                payTime:121212,//"支付时间",
                refundTime:1212121,//"退款时间",
                orderNum:'G123123123123',
              },{
                status:2,
                itemStatus:1,//"1正常,0已结束"
                itemName:"活动名称",
                amount:444,
                itemId:21213,//"秒杀id",
                imgUrl:"",
                description:"说明",
                orderNum:"订单编号",
                beginTime:1520761620,//"秒杀开始时间",
                userName:"用户名称",
                userPhone:18201321593,//"用户手机",
                dealerName:"经销商简称",
                dealerAddress:1212121,//"经销商地址",
                verifyCode:22323,//"核销码",
                payType:1,//"支付方式:1支付宝2微信",
                payTime:121212,//"支付时间",
                refundTime:1212121,//"退款时间",
                orderNum:'G123123123123',
              },{
                status:3,
                itemStatus:1,//"1正常,0已结束"
                itemName:"活动名称",
                amount:444,
                itemId:21213,//"秒杀id",
                imgUrl:"",
                description:"说明",
                orderNum:"订单编号",
                beginTime:1520761620,//"秒杀开始时间",
                userName:"用户名称",
                userPhone:18201321593,//"用户手机",
                dealerName:"经销商简称",
                dealerAddress:1212121,//"经销商地址",
                verifyCode:22323,//"核销码",
                payType:1,//"支付方式:1支付宝2微信",
                payTime:121212,//"支付时间",
                refundTime:1212121,//"退款时间",
                orderNum:'G123123123123',
              },{
                status:1,
                itemStatus:0,//"1正常,0已结束"
                itemName:"活动名称",
                amount:444,
                itemId:21213,//"秒杀id",
                imgUrl:"",
                description:"说明",
                orderNum:"订单编号",
                beginTime:1520761620,//"秒杀开始时间",
                userName:"用户名称",
                userPhone:18201321593,//"用户手机",
                dealerName:"经销商简称",
                dealerAddress:1212121,//"经销商地址",
                verifyCode:22323,//"核销码",
                payType:1,//"支付方式:1支付宝2微信",
                payTime:121212,//"支付时间",
                refundTime:1212121,//"退款时间",
                orderNum:'G123123123123',
              },{
                status:4,
                itemStatus:1,//"1正常,0已结束"
                itemName:"活动名称",
                amount:444,
                itemId:21213,//"秒杀id",
                imgUrl:"",
                description:"说明",
                orderNum:"订单编号",
                beginTime:1520761620,//"秒杀开始时间",
                userName:"用户名称",
                userPhone:18201321593,//"用户手机",
                dealerName:"经销商简称",
                dealerAddress:1212121,//"经销商地址",
                verifyCode:22323,//"核销码",
                payType:1,//"支付方式:1支付宝2微信",
                payTime:121212,//"支付时间",
                refundTime:1212121,//"退款时间",
                orderNum:'G123123123123',
              },
            ],

            status:['快速报名','报名未开始','报名已结束','已报名'],
            enrol_show:false,
            actiontimeone:""
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
        callback :function(){
          console.log('xx')
        }

      },
      mounted:{

      }
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/secondlist.css";

</style>
