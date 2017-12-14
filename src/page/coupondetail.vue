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
              <img class="codeimg" :src="imgurl"  />
            </div>
            <div class="centerlist">
              <div>
                <span class="spa">核销码</span>
                <span class="spb codee">{{detail.couponCode}}</span>
                <span class="statustype">{{Final.COUPON_STATUS[detail.status]}}</span>
              </div>
              <img :src={} />
              <div>
                <span class="spa">可用的购车人</span>
                <span class="spb">{{detail.name}}</span>
              </div>
              <div>
                <span class="spa">适用范围</span>
                <span class="spb">{{Final.COUPON_TYPE[detail.type]}}</span>
              </div>
              <div class="">
                <span class="spa">有效期</span>
                <span class="spb">{{detail.validity.split(" ")[0]}}日前使用有效</span>
              </div>

            </div>
            <div class="centerlist qy_list">
              <span class="spa">使用细则</span>
              <ul class="qy_ul">
                <li :key="index" v-for="(item,index,key) in  detail.description.indexOf('\n')>-1?getsplit(detail.description):detail.description" v-if="index<4" >{{item}}</li>
              </ul>
            </div>
          </div>

        </div>

      </div>

    </div>
</template>
<script>
  import api from "./../fetch/api"
  import Final from "../util/Final";
  import API from "./../fetch/api";
  import loading from "../components/loading";
  export default {
      data() {
          return {
              Final:Final,
              imgurl:'',
              loadingShow:false,
              resDetails:'',
            activityId:'',
              detail:{titlename:'抵扣卷名称',status:1,amount:'888',codeimg:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3256036687,742666259&fm=27&gp=0.jpg',code:'ewwewewe',text:'祥云全系',name:'张三',timeout:'2019.08.23',qylist:['3000元保险增值礼包\n','3000元线上购车专享礼金\n', '2000元贴膜\n','2000元新车大礼包\n']}
          }
      },
      mounted (){
          this.activityId = this.$route.params.id;
          this.imgurl=Final.QRCODE+"/v1/gift/qrcode?activityId="+this.activityId+"&activityType=201&couponCode=yunyong"
          this.getmyCouponInfo({couponCode:this.activityId})
      },
      created (){
        //alert("create");
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
        getmyCouponInfo(data){
          api.ap_my_coupon_info(data)
           .then(res => {
              if(res.status){
                this.detail = res.result;
              }
          }).catch(error => {

          })
        },
        Pickclick : function (data){
          if(data.isGet==2){
            return false;
          }
           // this.loadingShow=true;
          let mobile=localStorage.mobile;
          let realName=localStorage.realName;
          if(mobile&&realName){
            $(".login .username").val(realName);
            $(".login .mobile").val(mobile);

          }
        },
        getsplit:function(detail){
          if(detail.indexOf('\n')>-1){
            return detail.split("\n");
          }else{
            return detail
          }
        }
      },
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/coupons.css";
  .detailbox { min-height:100%; position: absolute; width:100%; left: 0; top:0;}
  .detail_code { text-align: center; border-bottom: 1px solid #f1f1f1; padding-bottom: .15rem;}
  .detail_code .amount { font-size: .3rem; margin: .1rem auto .05rem;}
  .detail_code .amount>span { font-size: .18rem;}
  .detail_code>img { width:1.3rem;}
  .detailbox .getBox { padding-bottom: .2rem;}
  .detailbox .qy_list { border-bottom: none;}
  .detailbox .spa { color:#666;}
  .detailbox .codee { font-size: .18rem;}
  .statustype { background: #d8d8d8; font-size: .12rem; padding: .02rem .05rem; color: #666666; float: right; border-radius: .03rem; position: absolute; right: 0;}
</style>
