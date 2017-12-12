<template>
  	<div>
      <loading v-show="loadingShow"></loading>
      <div class="center_box">
        <div class="bannerbox">
          <img class="banner" v-show="status==0||status==1" src="../assets/img/couponBanner.png"/>
          <div class="bottomtext">活动日期：<br>{{beginTime+'至'+endTime}}</div>
        </div>

        <div class="login" v-show="status==1">
            <input type="text" class="logintext username" placeholder="请填写真实购车人姓名" />
            <input type="number" class="logintext mobile" placeholder="请输入手机号" />
            <div class="Verification">
              <input type="number" class="logintext code" placeholder="请输入验证码" />
              <span class="btn_code">获取验证码</span>
            </div>
            <button class="codebtn" @click="getcoupon">点击领卷</button>
        </div>
        <div class="couponList"  v-show="status==0"  v-for="item in couponlist" :key="item.id">
          <div class="couponTop">
            <img class="couponImg" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=169726949,11506498&fm=27&gp=0.jpg">
            <div class="couponright">
              <div class="coupontitle">{{item.name}}</div>
              <ul class="detailslist">
                <li :key="item.id" v-for="(itemssss,index,key) in getsplit(item.description)" v-if="index<4" >
                  <span class="iconfont icon-libao"></span>{{itemssss}}
                </li>
              </ul>
            </div>
          </div>
          <div  :class="['couponBottom',{getend:item.isGet==2}]"  @click="Pickclick(item)">{{item.isGet==1?'立即领取':'已领取'}}</div>
        </div>

        <!--领取状态-->
        <div class="getist" v-show="status==2">
          <div class="getBox getSucceed">
            <div class="gettop">
              恭喜您，领取成功！
            </div>
            <div class="centerlist">
              <div>
                <span class="spa">核销码</span>
                <span class="spb">{{discount.code}}</span>
              </div>
              <div>
                <span class="spa">适用车系</span>
                <span class="spb">{{discount.text}}</span>
              </div>
              <div>
                <span class="spa">购车人姓名</span>
                <span class="spb">{{discount.name}}</span>
              </div>
            </div>
            <div class="centerlist qy_list">
              <span class="spa">抵扣权益</span>
              <ul class="qy_ul">
                <li v-for="(item,index,key) in discount.qylist" :key="index">{{item}}</li>
              </ul>
            </div>
            <div class="centerlist validity">
              <span class="spa">有效期</span>
              <span class="spb" style="color: #FF0036">{{discount.timeout}}日前使用有效</span>
            </div>

          </div>
          <div class="getbtn" @click="tolist">查看我的礼券</div>
        </div>
        <div class="getist" v-show="status==3||status==4">
          <div class="getBox getSucceed">
            <div class="gettop">
             {{status==3?'很遗憾，抵扣券已发放完':'您已领取过相同的抵扣券'}}
            </div>
            <div class="get_bg">

            </div>
          </div>
          <div class="getbtn">查看其他活动</div>
        </div>



        <div class="ruleDestail">
            <div class="ruletitle">活动细则</div>
            <div class="rulelist">
              <div>1. 10000元线上专享礼包，含3000元保险增值礼包+3000元延保现金补贴+2000元贴膜+2000元购车大礼包。<br>
                其中2000元购车大礼包包含：500元京东卡、1000元中石化加油卡、500元行车记录一部</div>
              <div>2. 订金核销抵扣车款，未核销用户99元在活动结束后退款
              下单手机号需与实际购车人手机号一致。<br>
                以上活动政策均已当地经销商为准。</div>
              <div>3. 3000元保险增值礼包说明:<br>
                价值1000元保险礼遇、价值1000元新车置换补偿和钥匙重置补偿、价值1000元就医帮手服务。</div>
                <div>4. 1000元延保现金抵扣说明:<br>
                  本券仅用于购买北京汽车延长质保产品使用、上汽大众延长质量担保提供重要部件、全面保障两种保障范围；时限分为一年或者两年。延保现金抵扣券可线下议价后厨师抵扣相应金额，具体产品价格及相关明细咨询当地经销商。</div>
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
              username:"",
              usermobile:"",
              usercode:"",
            loadingShow:false,
            status:0,
            endTime:null,
            beginTime:null,
            couponlist:[{id:12,status:1,img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=169726949,11506498&fm=27&gp=0.jpg',title:'xxxxx',alllist:['xsss','xxx','xssdsd']},{id:12,status:2,img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=169726949,11506498&fm=27&gp=0.jpg',title:'xxxxx',alllist:['xsss','xxx','xssdsd']}],
            discount:{code:47927498,text:'迈腾全系车型',name:'任宝生',timeout:'2018.05.20',qylist:['3000元保险增值礼包\n','3000元线上购车专享礼金\n', '2000元贴膜\n','2000元新车大礼包\n']}
          }
      },
      mounted (){
          let id = this.$route.params.id;
          console.log(id);
          api.ap_coupon({'id':id}).then(res => {
            console.log(res)
            if(res.couponList)
            this.endTime=res.endTime
            this.beginTime=res.beginTime
            this.couponlist=res.couponList;
          }).catch(error => {
            console.log(error)
          })
      },
      created (){
        //alert("create");
      },
      components :{
        loading
      },
      methods : {
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
          this.status=1;
        },
        setlocal:function(mesg){
          localStorage.realName=mesg.realName;
          localStorage.mobile=mesg.mobile;
          localStorage.cityId=mesg.cityId;
          localStorage.userId=mesg.userId;
          localStorage.weixin_id=mesg.weixin_id;
          localStorage.photo=mesg.photo;
        },
        getcoupon:function(){

          api.base_login({userPhone:'15010357825',checkCode:'2343242'})
            .then(res => {
              console.log(res)
              if (res.status) {
                this.setlocal(res.result)
                this.status=2;
              }else {

              }
            }).catch(err => {

          });
//          this.status=2;
        },
        tolist:function(){
          location.href='/#/couponlist'
        },
        getsplit:function(detail){
          if(detail.indexOf('\r\n')!=-1){
            return detail.split("\r\n");
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
</style>
