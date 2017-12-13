<template>
  	<div>
      <loading v-show="loadingShow"></loading>
      <div :class="['killbox', {nolist:killlist.length==0}]">
          <div class="killbanner">
            <img class="bannerimg" src="../assets/img/ms_bc.png" />
            <div class="actionTime">活动时间：2017-04-13 ~ 2017-06-17</div>
            <ul class="banner_list" v-if="killlist.length!=0">
              <li><span class="float iconfont icon-jushouxin"></span>
                <span class="list_text float">报名秒杀</span>
              </li>
              <li><span class="float iconfont icon-miaobiao_kuai"></span>
                <span class="list_text float">秒杀开启</span>
              </li>
              <li><span class="float iconfont icon-duigou"></span>
                <span class="list_text">支付订单<br>秒杀成功</span>
              </li>
            </ul>
          </div>
          <div class="killlist" :key="item.itemId" v-for="(item,index,key) in killlist">
              <div class="timetolset"><span class="iconfont icon-miaobiao_kuai"></span>{{item.beginTime}}</div>
              <div class="killdetail">
                <div class="killleft">
                    <div class="label">
                      <span class="bigicon iconfont icon-biaoqianx"></span>
                      <div><span class="smallicon iconfont  icon-miaobiao"></span>
                      即将开始</div>
                    </div>
                    <img class="headimg" :src="item.shareImg" />
                </div>
                <div class="killright">
                  <div class="killtitle">{{item.itemName}}<span class="number">仅{{item.surplusCount}}张</span></div>
                    <div class="right_center">
                      <div>
                        <div class="killtime">报名时间：{{item.enrollStartTime}} 至 {{item.enrollEndTime}}</div>
                         <div class="killprice">秒杀价 <span class="redcolor">￥{{item.amount}}</span></div>
                      </div>
                    </div>
                    <div class="btn_box">
                      <button class="btn btna">立即秒杀</button>
                      <button @click="miaosha(item)" :class="['btn','btnb',{active:item.status==0}]">{{status[item.status]}}</button>
                    </div>
                </div>
              </div>
          </div>
          <div class="noShow" v-if="killlist.length==0" style="height:100%; position: absolute;width:100%; left: 0; top:0; background: #eee; z-index: 9; display: flex; align-items: center;">
              <img style="width:100%" src="../assets/img/ms_end.png" />
          </div>
      </div>
      <div class="brankout" v-show="enrol_show">
        <div class="out_box">
          <div class="title" style="font-size: .18rem; margin-top: .3rem;">报名成功</div>
          <div class="" style="margin-top:.1rem; color: #666666; ">秒杀将于{{actiontimeone}}准时开始</div>
          <div class="bottom"  @click="enrol_show=false" style="height: .42rem; line-height: .42rem; font-size: .16rem; color: #007aff;">关闭</div>
        </div>
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
            loadingShow:false,
            killlist:[{itemId:1213,shareImg:'',surplusCount:9,amount:4000,status:0,itemName:'新人注册抵车款超级优',beginTime:'2017.8.1',enrollStartTime:'2017.8.1',enrollEndTime:'2017.8.1'},
              {itemId:1213,shareImg:'',surplusCount:9,amount:4000,status:0,itemName:'新人注册抵车款超级优',beginTime:'2017.8.1',enrollStartTime:'2017.8.1',enrollEndTime:'2017.8.1'},
              {itemId:1213,shareImg:'',surplusCount:9,amount:4000,status:0,itemName:'新人注册抵车款超级优',beginTime:'2017.8.1',enrollStartTime:'2017.8.1',enrollEndTime:'2017.8.1'}
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
        loading
      },
      methods : {
        Pickclick : function (data){
            this.loadingShow=true;
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
      },mounted (){
      let id = this.$route.params.id;
      var _that=this;
        api.ap_sedkill_detail({'activityCode':id})
        .then(res => {
          console.log(res)
          _that.titlelistaa=res.result;
        }).catch(error => {
          console.log(error)
        });
      }
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/SecondKill.css";

</style>
