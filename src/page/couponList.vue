<template>
  <div>
    <loading v-show="loadingShow"></loading>
    <!--<headera titlea="抵扣券列表"></headera>-->
    <div class="couponlist">
      <div class="listitem"
           :class="[ {nouser: item.status == 0},{user: item.status == 1}, {outofdate: item.status == 3},{outwilldate: item.status ==2 }, {dikou: item.type == 1}, {youhui: item.type == 2}, {youhui: item.type == 3}]"
           v-for="(item,index,key) in couponlist">
        <div class="itemleft" @click="getDetail(item.couponCode)">
          <span class="status">{{Final.COUPON_STATUS[item.status]}}</span>
          <div><span>￥</span>{{item.amount}}</div>
        </div>
        <div class="itemright">
          <div class="righttop">
           <span class="type">{{'抵扣券'}}</span>
            <!-- Final.COUPON_TYPE[item.type]-->
            <span class="name">{{item.name}}</span>
          </div>
          <div class="rightcenter">
            <span class="time">{{'有效期:' + item.validity.split(" ")[0]+'前有效'}}</span>
            <span class="userbtn ft_tight" @click="getDetail(item.couponCode)">立即使用</span>
          </div>
          <div class="rightbottom">
            <span>使用细则</span>
            <span class="bt_tight iconfont icon-jiantou" @click="showdetail(index)"></span>
          </div>
        </div>
        <div class="xz_detail" v-html="item.details">
          {{item.details}}
        </div>
      </div>
    </div>
    <div class="nolist" v-if="nolistshow">
      <img src="../assets/img/couponNulla.png"/>
      <div class="mesg">暂无可用优惠券</div>
    </div>
  </div>
</template>
<script>
  import Final from "../../static/baseSetting/Final";
  import api from "./../fetch/api";
  import loading from "../components/loading";
  import headera from "../components/header";

  export default {
    data() {
      return {
        Final: Final,
        loadingShow: true,
        couponlist: [],
        codeId: '',
        nolistshow: false,
      }
    },
    created() {
      document.title="我的礼券";
      this.getmyCouponList();

    },
    components: {
      loading,
      headera
    },
    methods: {
      /**
       * 获取我的抵扣券列表
       * @param params
       * @returns {*}
       */
      getmyCouponList() {
        api.ap_get_myCouponList()
          .then(res => {
            this.loadingShow = false;
            if (res.status) {
              this.couponlist = res.result;
              if (this.couponlist.length == 0) {
                this.nolistshow = true;
              }
            } else {
              this.nolistshow = true;
            }
          }).catch(err => {
          this.loadingShow = false;
          this.nolistshow = true;
        });
      },
      /**
       * 跳转到列表详情页
       * @param params
       * @returns {*}
       */
      getDetail(couponCode) {
        this.$router.push({path: '/coupon/' + couponCode + '/coupondetail'})
      },
      showdetail: function (index) {
        console.log(index)
        $(".listitem:eq(" + index + ") .xz_detail").toggleClass('active');
        $(".listitem:eq(" + index + ") .iconfont").toggleClass('active');
      }
    }
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/coupons.css";
  @import "./../assets/css/couponlist.css";

</style>
