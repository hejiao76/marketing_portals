<template>
  <div>
    <loading v-show="loadingShow"></loading>
    <div class="center_box detailbox">
      <!--领取状态-->
      <div class="getist">
        <div class="getBox getSucceed">
          <div class="gettop">
            <div>{{detail.name}}</div>
          </div>
          <div class="detail_code">
            <div class="amount"><span>￥</span>{{detail.amount}}</div>
            <img class="codeimg" :src="imgurl"/>
          </div>
          <div class="centerlist">
            <div>
              <span class="spa">核销码</span>
              <span class="spb codee">{{detail.couponCode}}</span>
              <span class="statustype">{{Final.COUPON_STATUS[detail.status]}}</span>
            </div>
            <div>
              <span class="spa">可用的购车人</span>
              <span class="spb">{{detail.userName}}</span>
            </div>
            <div>
              <span class="spa">适用范围</span>
              <span class="spb">{{detail.serialName}}</span>
            </div>
            <div class="">
              <span class="spa">有效期</span>
              <span class="spb">{{detail.validity.split(" ")[0]}}日前使用有效</span>
            </div>

          </div>
          <div class="centerlist qy_list">
            <span class="spa">使用细则</span>
            <div class="qy_ul" v-html="detail.details">
              <!--<li :key="index" v-for="(item,index,key) in  getsplit(detail.description)" v-if="index<4" >{{item}}</li>-->
              <!---->
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>
<script>
  import api from "./../fetch/api"
  import Final from "../../static/baseSetting/Final";
  import API from "./../fetch/api";
  import loading from "../components/loading";

  export default {
    data() {
      return {
        Final: Final,
        imgurl: '',
        loadingShow: true,
        resDetails: '',
        activityId: '',
        detail: {
          titlename: '抵扣卷名称',
          status: 1,
          amount: '888',
          codeimg: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3256036687,742666259&fm=27&gp=0.jpg',
          code: 'ewwewewe',
          text: '祥云全系',
          name: '张三',
          timeout: '2019.08.23',
          qylist: ['3000元保险增值礼包\n', '3000元线上购车专享礼金\n', '2000元贴膜\n', '2000元新车大礼包\n']
        }
      }
    },
    mounted() {
      document.title="礼券详情";
      this.activityId = this.$route.params.code;

      this.getmyCouponInfo({couponCode: this.activityId})
    },
    created() {
      //alert("create");
    },
    components: {
      loading
    },
    methods: {
      /**
       * 获取我的抵扣券列表
       * @param params
       * @returns {*}
       */
      getmyCouponInfo(data) {
        api.ap_my_coupon_info(data)
          .then(res => {
            if (res.status) {
              this.detail = res.result;
              //厂商 经销商未区分....
              let activityType = 103;
              let ownerType = res.result.ownerType || localStorage.getItem("ownerType") || 1;
              if(ownerType==2){
                activityType =203;
              }else {
                activityType=103;
              }

              this.imgurl = Final.QRCODE + "/v1/gift/qrcode?activityId=" + res.result.activityId + "&activityType="+activityType+"&couponCode="+res.result.couponCode;
              this.loadingShow = false;
            }
          }).catch(error => {
        })
      },
      getsplit: function (detail) {
        return detail.split("\n");
      }
    },
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/coupons.css";

  .detailbox {
    min-height: 100%;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
  }

  .detail_code {
    text-align: center;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: .15rem;
  }

  .detail_code .amount {
    font-size: .3rem;
    margin: .1rem auto .05rem;
  }

  .detail_code .amount > span {
    font-size: .18rem;
  }

  .detail_code > img {
    width: 1.3rem;
    height: 1.3rem;
  }

  .detailbox .getBox {
    padding-bottom: .2rem;
  }

  .detailbox .qy_list {
    border-bottom: none;
  }

  .detailbox .spa {
    color: #666;
  }

  .detailbox .codee {
    font-size: .14rem;
  }

  .statustype {
    background: #d8d8d8;
    font-size: .12rem;
    padding: .02rem .05rem;
    color: #666666;
    float: right;
    border-radius: .03rem;
    position: absolute;
    right: 0;
  }
</style>
