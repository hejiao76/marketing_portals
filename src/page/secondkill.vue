<template>
  <div>
    <loading v-show="loadingShow"></loading>
    <div :class="['killbox', {nolist:killlist.length==0}]">
      <div class="killbanner">
        <img class="bannerimg" src="../assets/img/ms_bc.png"/>
        <div class="actionTime">活动时间：{{beginTime}} ~ {{endTime}}</div>
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
        <div class="timetolset"><span class="iconfont icon-miaobiao_kuai"></span>{{util.toFullDateString(item.beginTime)}}
        </div>
        <div class="killdetail">
          <div class="killleft" @click="todetail(item)">
            <div class="label">
              <span class="bigicon"></span>
              <!--<div><span class="smallicon iconfont  icon-miaobiao"></span>-->
              <!--即将开始</div>-->
            </div>
            <img class="headimg" :src="item.whitePic"/>
          </div>
          <div class="killright">
            <div class="killtitle" @click="todetail(item)">{{item.itemName}}<span
              class="number">仅{{item.surplusCount}}张</span></div>
            <div class="right_center">
              <div>
                <div class="killtime">报名时间：{{util.toFullDateString(item.enrollStartTime).split(" ")[0]}} 至<br>
                  {{util.toFullDateString(item.enrollEndTime).split(" ")[0]}}
                </div>
                <div class="killprice">秒杀价 <span class="redcolor">￥{{item.amount}}</span> <span
                  style="color: #999999;font-size: .14rem; margin-left:10px;text-decoration:line-through;">￥{{item.couponAmount}}</span>
                </div>
              </div>
            </div>
            <div class="btn_box">
              <button class="btn btna">{{'立即秒杀'}}</button> <!--statustype[item.status]-->
              <button :class="['btn','btnb',{active:item.status==2}]" @click="tosign(item)">{{status[item.status]}}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="noShow" v-if="killlist.length==0"
           style="height:100%; position: absolute;width:100%; left: 0; top:0; background: #eee; z-index: 9; display: flex; align-items: center;">
        <div>
          <img style="width:100%" src="../assets/img/ms_end.png"/>
          <div class="errmeg" style="width: 100%; text-align: center; font-size: .2rem; color: #666666;">你来迟啦 活动{{errormesg}}</div>
        </div>
      </div>
    </div>
    <div class="brankout" v-show="enrol_show">
      <div class="out_box">
        <div class="title" style="font-size: .18rem; margin-top: .3rem;">报名成功</div>
        <div class="" style="margin-top:.1rem; color: #666666; ">秒杀将于{{actiontimeone}}准时开始</div>
        <div class="bottom" @click="enrol_show=false"
             style="height: .42rem; line-height: .42rem; font-size: .16rem; color: #007aff;">关闭
        </div>
      </div>
    </div>

    <div id="_umfp" style="display:inline;width:1px;height:1px;overflow:hidden"></div>
    <div id="dom_id" style="display:inline;width:1px;height:1px;overflow:hidden"></div>
  </div>
</template>
<script>
  import Final from "../util/Final";
  import api from "./../fetch/api";
  import loading from "../components/loading";
  import * as util from "../util/util"

  export default {
    data() {
      return {
        loadingShow: true,
        util: util,
        statustype: {1: '已上架', 2: '已下架', 3: '已过期', 4: '已删除'},
        mesgdata: {},
        killlist: [],
        status: ['活动已结束', '报名未开始', '快速报名', '已报名', '报名已结束'],
        enrol_show: false,
        actiontimeone: "",
        beginTime: '',
        endTime: '',
        errormesg: '已结束',
        codeId: ''
      }
    },
    created() {
      //alert("create");
    },
    components: {
      loading
    },
    computed: {
      willbegin: function () {
        let beginTime = this.beginTime;
      }
    },
    methods: {
      aliValid() {
        var nc_appkey = 'FFFF0000000001790EE8'; // 应用标识,不可更改
        var nc_scene = 'backup1_h5';  //场景,不可更改
        var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
        var nc_option = {
          renderTo: '#dom_id',//渲染到该DOM ID指定的Div位置
          appkey: nc_appkey,
          scene: nc_scene,
          token: nc_token,
          trans: '{"name1":"code100"}',//测试用，特殊nc_appkey时才生效，正式上线时请务必要删除；code0:通过;code100:点击验证码;code200:图形验证码;code300:恶意请求拦截处理
          callback: function (data) {// 校验成功回调
            document.getElementById('csessionid').value = data.csessionid;
            document.getElementById('sig').value = data.sig;
            document.getElementById('token').value = nc_token;
            document.getElementById('scene').value = nc_scene;
          },
          error: function (s) {
          },
          verifycallback: function (data) {
            if (data.code == "200") {
            }
          }
        };
        NoCaptcha.init(nc_option);
        NoCaptcha.setEnabled(true);
      },
      Pickclick: function (data) {
        this.loadingShow = true;
      },
      showdetail: function (index) {
        $(".listitem:eq(" + index + ") .xz_detail").toggleClass('active');
        $(".listitem:eq(" + index + ") .iconfont").toggleClass('active');
      },
      todetail: function (item) {
        this.$router.push({path: '/sedKill/' + this.codeId + '/secondcardetail', query: {id: item.itemId}})
      },
      tosign: function (item) {
        if (item.status == 2) {
          this.$router.push({path: '/sedKill/' + this.codeId + '/secondkilllogin', query: {id: item.itemId}})
        }
      }
    },
    mounted() {
      this.codeId = this.$route.params.code;
      api.ap_sedkill_detail({'activityCode': this.codeId})
        .then(res => {
          console.log(res)
          this.loadingShow = false;
          if (res.result.status == 1) {
            this.killlist = res.result.itemList;
          } else {
            this.errormesg = this.statustype[res.result.status]
          }
          this.beginTime = util.toDateString(res.result.beginTime)
          console.log("a----", this.beginTime);
          this.endTime = util.toDateString(res.result.endTime)
        }).catch(error => {
        console.log(error)
        this.loadingShow = false;
      });
    }
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/SecondKill.css";

</style>
