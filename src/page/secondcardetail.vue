<template>
  <div>
    <loading v-show="loadingShow"></loading>
    <mesg v-bind:mesg="mesg"></mesg>
    <div class="cardetail">
      <img class="banner" :src="datamesg.whitePic"/>
      <div class="detail_mesg">
        <div class="mesg_title">{{datamesg.itemName}}</div>
        <div class="begintime">{{util.toFullDateString(datamesg.beginTime)}}开抢</div>
        <div class="list">
          <span class="spa">秒杀价 </span>
          <span class="spb"><span>{{datamesg.amount}}</span><span>{{datamesg.couponAmount}}</span></span>
        </div>
        <div class="list">
          <span class="spa">报名时间 </span>
          <span
            class="spb">{{util.toFullDateString(datamesg.enrollStartTime)}}至{{util.toFullDateString(datamesg.enrollEndTime)}}</span>
        </div>
        <div class="list">
          <span class="spa">秒杀说明  </span>
          <span class="spb">{{datamesg.description}}</span>
        </div>
        <div class="city" @click="saycity">查看适用城市</div>
      </div>
      <div class="carbtnbox" v-if="datamesg.areaStatus==1">
        <div class="bannr_titlea" v-show="reversedMessage>0">
          <countdown :endTime="String(datamesg.beginTime)" :callback="callback" endText="00：00：00"></countdown>
          后开始
        </div>
        <div class="btnbox ">
          <div class="btna" @click="sedkill">
            {{reversedMessage > 5000 ? '即将开始' : (reversedMessage > 0 ? reversedMessage / 1000 + '秒后即将开始' : '立即秒杀')}}
          </div>
          <div class="btnb" @click="tosign(datamesg)">{{status[datamesg.status]}}</div>
        </div>
      </div>
      <div class="carbtnbox" v-if="datamesg.areaStatus==0">
        <div class="btnbox noaction">您所在的城市暂无秒杀</div>
      </div>
      <div class="detailbox" v-html="datamesg.details"></div>
    </div>

    <div class="citybox" v-show="citylist">
      <div class="citylist">
        <div class="title"><span class="iconfont icon-dingwei"></span>适用城市</div>
        <ul class="itemlistcity">
          <li class="cityname" v-for="(item,index,key) in datamesg.areaNames?datamesg.areaNames.split(','):[]">
            {{item}}
          </li>
        </ul>
        <div class="closebtn" @click="citylist=false">关闭</div>
      </div>
    </div>
  </div>
</template>
<script>
  import Final from "../util/Final";
  import api from "./../fetch/api";
  import loading from "../components/loading";
  import countdown from "../components/countdown";
  import * as util from "./../util/util"
  import mesg from "../components/mesg";

  export default {
    data() {
      return {
        mesg: '',
        util: util,
        status: ['活动已结束', '报名未开始', '快速报名', '已报名', '报名已结束'],
        loadingShow: true,
        itemId: '',
        datamesg: {beginTime: ''},
        reversedMessage: null,
        codeId: '',
        timeval: null,
        citylist: false,
      }
    },
    components: {
      loading,
      countdown,
      mesg
    },
    computed: {},
    methods: {
      callback: function () {

      },
      ALiCheck: function () {
        api.base_AliCheck()
      },
      /**
       * 校验是否登录
       */
      checkLogin: function () {
        api.base_veifyToken({})
          .then(res => {
            if (res.status == true) {
                alert("跳转");
              window.location.href = "static/aliValid/aliValid.html?itemId=" + this.itemId;  //用户登录成功 跳转阿里滑块验证页面
            } else {
              this.mesg = ""
              this.mesg = res.message;
            }
            console.log(res)
          }).catch(error => {
          console.log(error)
        });
      },
      tosign: function (item) {
        if (item.status == 2) {
          this.$router.push({path: '/sedKill/' + this.codeId + '/secondkilllogin', query: {id: this.itemId}})
        }
      },
      sedkill: function () {
        //校验是否登录
        this.checkLogin();
        if (reversedMessage < 0) {
          this.checkLogin();
        } else {

        }
//          api.ap_sedkill_seckill({clientType:1,itemId:this.itemId})
//            .then(res => {
//              if(res.status){
//
//              }else{
//                  this.mesg=""
//                  this.mesg=res.message;
//              }
//              console.log(res)
//            }).catch(error => {
//            console.log(error)
//          });
      },
      saycity: function () {
        this.citylist = true;
      }

    }, mounted() {
      let self = this;
      setInterval(function () {
        if (self.datamesg.beginTime) {
          let enrollStartTime = self.datamesg.beginTime
          self.reversedMessage = enrollStartTime - Date.parse(new Date());
        }
        ;
      }, 1000);
      this.codeId = this.$route.params.code;
      this.itemId = this.$route.query.id;
      console.log("detail---->", this.itemId);
      api.ap_sedkill_info({itemId: this.itemId})
        .then(res => {
          console.log(res)
          this.loadingShow = false;
          if (res.status) {
            this.datamesg = res.result
            var self = this;


          }
        }).catch(error => {
        this.loadingShow = false;
        console.log(error)
      });
    }
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/Secondcardetail.css";

</style>
