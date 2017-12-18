<template>
  <div>
    <loading v-show="loadingShow"></loading>
    <mesg v-bind:mesg="mesg"></mesg>
    <div class="checkedbox">
      <div class="boxtop">
        <div class="itemlist">
          <div class="input_box" @click="activeed=!activeed"><span class="text">{{provinceName}}</span><i
            class="iconfont icon-jiantou"></i></div>
          <ul :class="['dowmlist',{active:activeed}]">
            <li v-for="(item,index,key) in alllist" @click="provinceclick(item)">{{item.provinceName}}</li>
          </ul>
        </div>
        <div class="itemlist">
          <div class="input_box" @click="citylist.length>0?activeeda=!activeeda:null"><span
            class="text">{{cityName}}</span><i class="iconfont icon-jiantou"></i></div>
          <ul :class="['dowmlist',{active:activeeda}]">
            <li v-for="(item,index,key) in citylist" @click="cityclick(item)">{{item.cityName}}</li>
          </ul>
        </div>


      </div>
      <div class="checkedlist">
        <div class="listitem" v-for="item in checkedlist" @click="checkedDealer(item)">
          <img class="logoimg" :src="item.dealerPicUrl"/>
          <div class="mesg_right">
            <div class="title">{{item.dealerFullName}}</div>
            <div class="where"><span class="iconfont icon-dingwei"></span> {{item.contactAddress}}</div>
          </div>
        </div>
      </div>
      <div class="nolist" v-if="checkedlist.length==0">
        <img src="../assets/img/couponNulld.png"/>
        <div class="mesg">该地区暂无经销商</div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from "./../fetch/api"
  import Final from "../../static/baseSetting/Final";
  import API from "./../fetch/api";
  import loading from "../components/loading";
  import mesg from "../components/mesg"

  export default {
    data() {
      return {
        loadingShow: true,
        provinceName: '请选择',
        provinceId: '',
        cityName: '请选择',
        cityId: '',
        checkedlist: null,
        alllist: [],
        citylist: [],
        activeed: false,
        activeeda: false,
        itemId: '',
        mesg: "",
      }
    },
    components: {
      loading,
      mesg
    },
    methods: {
      provinceclick: function (item) {
        console.log(item)
        let provinceId = item.provinceId;
        this.activeeda = false;
        this.activeed = false;
        this.provinceName = item.provinceName
        this.provinceId = item.provinceId
        this.citylist = this.alllist[provinceId - 1].cityVmList;
        this.cityName = '请选择';
        this.cityId = '';
      },
      cityclick: function (item) {
        console.log(item)
        this.activeeda = false;
        this.activeed = false;
        this.cityName = item.cityName
        this.cityId = item.cityId
        let data = {
          itemId: this.itemId,
          cityId: this.cityId,
          cityName: this.cityName,
          provinceId: this.provinceId,
          provinceName: this.provinceName,
          pageSize: 99
        }
        api.ap_sedkill_enroll(data).then(res => {
          console.log(res)
          this.checkedlist = res.objList;
        }).catch(error => {
          console.log(error)
        });
      },
      checkedDealer: function (item) {
        localStorage.dealerId = item.dealerId;
        localStorage.dealerName = item.dealerFullName;
        this.$router.back()
      }

    },
    mounted() {
      this.itemId = this.$route.query.id;
      api.base_getcity().then(res => {
        console.log(res)
        this.alllist = res.result;
        api.ap_sedkill_enroll({itemId: this.itemId, pageSize: 99}).then(res => {
          this.provinceId = res.provinceId;
          this.provinceName = res.provinceName;
          this.cityId = res.cityId;
          this.cityName = res.cityName;
          this.checkedlist = res.objList;
          this.loadingShow = false;
        }).catch(error => {
          console.log(error)
        });
      }).catch(error => {
        console.log(error)
      });
      this.cityId = localStorage.cityId
    },
  }

</script>
<style>
  @import "./../assets/css/common.css";
  @import "./../assets/css/loginchecked.css";
</style>
