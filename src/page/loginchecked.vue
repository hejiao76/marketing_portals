<template>
  <div>
    <loading v-show="loadingShow"></loading>
    <div class="checkedbox">
      <div class="boxtop">
        <div class="itemlist">
          <span class="text">{{provinceName}}</span><i class="iconfont icon-jiantou"></i>
          <ul class="dowmlist">
            <li></li>
          </ul>
        </div>
        <div class="itemlist">
          <span class="text">{{cityName}}</span><i class="iconfont icon-jiantou"></i>
          <ul class="dowmlist">
            <li></li>
          </ul>
        </div>

      </div>
      <div class="checkedlist">
        <div class="listitem" v-for="item in checkedlist">
          <img class="logoimg" :src="item.img"/>
          <div class="mesg_right">
            <div class="title">{{item.title}}</div>
            <div class="where"><span class="iconfont icon-dingwei"></span> {{item.mesg}}</div>
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
        loadingShow: false,
        provinceName: '',
        cityName: '',
        checkedlist: [{img: 'xx', title: 'xxxxx', mesg: 'weewrwerwerwer'}]
      }
    },
    components: {
      loading
    },
    methods: {},
    mounted() {
      this.activityCode = window.location.href.split('coupon/')[1];
      console.log(this.activityCode);
    },
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/loginchecked.css";
</style>
