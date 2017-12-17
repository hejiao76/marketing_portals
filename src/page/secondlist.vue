<template>
  <div>
    <loading v-show="loadingShow"></loading>
    <div class="secondlist">
      <div class="listitem" v-for="(item,index,key) in secondlist">
        <div class="status_top"><span class="orderNum" style="float: left; font-size: .12rem; color: #666666;"
                                      v-if="item.orderNum">订单号:{{item.orderNum}}</span><span
          style="float: right;">{{statustext[item.status]}}</span></div>
        <div class="itemcenter">
          <div class="center_left">
            <img :src="item.imgUrl"/>
          </div>
          <div class="killright">
            <div class="killtitle">{{item.itemName}}</div>
            <div class="right_center">
              <div>
                <div class="killprice">秒杀价 <span class="redcolor">￥{{item.amount}}</span></div>
              </div>
            </div>
            <div class="rightbottom">
              <div class="bottomlist status1" v-if="item.status==1&&item.itemStatus==1">距秒杀开始还有
                <countdown :endTime="String(item.beginTime)" :callback="callback" endText="00:00:00"></countdown>
              </div>
              <div class="bottomlist status1" v-if="item.itemStatus==0">秒杀已结束</div>
              <div class="bottomlist status1" v-if="item.status==2&&item.itemStatus==1">支付倒计时 02分 02秒</div>

              <div class="bottomlist status1" v-if="item.status==4">核销码：{{item.verifyCode}}</div>
              <div class="bottomlist status1" v-if="item.status==6||item.status==7">秒杀已结束</div>
            </div>
          </div>
        </div>
        <div class="btn_box">
          <span class="timesigning">报名时间：{{util.toFullDateString(item.createTime)}}</span>
          <span class="hexiao" style="font-size: .12rem; color: #168dde; margin-right: .06rem;" v-if="item.status==4"><i
            class="iconfont icon-libao" style="color: #168dde; margin-right: .05rem;"></i>查看核销码</span>
          <button class="btn btnb active " @click="sedkill_del(item)" v-if="orderstatus==6 || orderstatus==7 ">删除
          </button>
          <button @click="todetail(item)" class="btn btnb" v-if="orderstatus !=1 && orderstatus!=2 ">查看秒杀</button>
          <button @click="tocardetail(item)" class="btn btna" v-if="orderstatus==1 ||orderstatus==2 ">前往秒杀</button>
        </div>
      </div>
    </div>
    <div class="nolist" v-if="nolistshow">
      <img src="../assets/img/couponNulla.png"/>
      <div class="mesg">你还没用秒杀活动哦~</div>
    </div>
  </div>
</template>
<script>
  import Final from "../util/Final";
  import api from "./../fetch/api";
  import loading from "../components/loading";
  import countdown from "../components/countdown";
  import * as util from "./../util/util"

  export default {
    data() {
      return {
        util: util,
        loadingShow: true,
        activityCode: '',
        orderstatus: null,
        codeId: '',
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
          10: '去秒杀'
        },
        secondlist: [],
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
      callback: function () {
        console.log('xx')
      },
      tocardetail: function (item) {
        this.codeId = res.result.activityCode
        this.$router.push({path: '/sedKill/' + this.codeId + '/secondcardetail', query: {id: item.itemId}})
      },
      todetail: function (item) {
        this.$router.push({path: '/mysedKill/seconddetail', query: {id: item.itemId}})
      },
      sedkill_del: function (item) {
        api.ap_sedkill_del({itemId: item.itemId})
          .then(res => {
            this.mesg = '';
            this.mesg = '删除成功';
            setTimeout(function () {
              location.reload();
            }, 1000)
          }).catch(error => {

        });
      }

    },
    mounted() {
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
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/secondlist.css";

</style>
