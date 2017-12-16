<template>
  	<div>
      <loading v-show="loadingShow"></loading>
      <div class="couponlist">
        <div class="listitem" :class="[ {nouser: item.status == 0},{user: item.status == 1}, {outofdate: item.status == 3},{outwilldate: item.status ==2 }, {dikou: item.type == 1}, {youhui: item.type == 2}, {youhui: item.type == 3}]" v-for="(item,index,key) in couponlist">
            <div class="itemleft" @click="getDetail(item.couponCode)">
              <span class="status">{{Final.COUPON_STATUS[item.status]}}</span>
              <div><span>￥</span>{{item.amount}}</div>
            </div>
            <div class="itemright">
                <div class="righttop">
                  <span class="type">{{Final.COUPON_TYPE[item.type]}}</span>
                  <span class="name">{{item.name}}</span>
                </div>
              <div class="rightcenter">
                <span class="time">{{'有效期:'+item.validity}}</span>
                <span class="userbtn ft_tight" @click="getDetail(item.couponCode)">立即使用</span>
              </div>
              <div class="rightbottom">
                <span >使用细则</span>
                <span class="bt_tight iconfont icon-jiantou" @click="showdetail(index)"></span>
              </div>
            </div>
            <div class="xz_detail" v-html="item.details">
              {{item.details}}
            </div>
        </div>
      </div>
      <div class="nolist" v-if="couponlist.length==0">
          <img src="../assets/img/couponNulla.png" />
         <div class="mesg">暂无可用优惠券</div>
      </div>
    </div>
</template>
<script>
  import Final from "../util/Final";
  import api from "./../fetch/api";
  import loading from "../components/loading";
  export default {
      data() {
          return {
            Final:Final,
            loadingShow:false,
            couponlist:[{amount:4000,type:1,status:1,name:'新人注册抵车款超级优惠券',timeout:'2017.8.1',detail:'1. 活动最终解释权归平台所有2. 活动最终解释权归平台所有。'},
              {amount:4000,type:2,status:2,name:'新人注册抵车款超级优惠券',timeout:'2017.8.1',detail:'1. 活动最终解释权归平台所有2. 活动最终解释权归平台所有。'},
              {amount:4000,type:1,status:3,name:'新人注册抵车款超级优惠券',timeout:'2017.8.1',detail:'1. 活动最终解释权归平台所有2. 活动最终解释权归平台所有。'}
            ],
            codeId:'',
          }
      },
      created (){
        this.getmyCouponList();

      },
      components :{
        loading
      },
      methods : {
        /**
         * 获取我的抵扣券列表
         * @param params
         * @returns {*}
         */
        getmyCouponList(){
          api.ap_get_myCouponList()
            .then(res => {
              if (res.status) {
                this.couponlist = res.result;
              }else {

              }
            }).catch(err => {

          });
        },
        /**
         * 跳转到列表详情页
         * @param params
         * @returns {*}
         */
        getDetail(couponCode){
          this.$router.push({path:'/coupon/'+couponCode+'/coupondetail'})
        },
        Pickclick : function (data){
            this.loadingShow=true;
        },
        showdetail:function(index){
          console.log(index)
          $(".listitem:eq("+index+") .xz_detail").toggleClass('active');
          $(".listitem:eq("+index+") .iconfont").toggleClass('active');
        }
      }
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/coupons.css";
  @import "./../assets/css/couponlist.css";

</style>
