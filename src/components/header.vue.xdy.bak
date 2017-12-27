<template>
  <div class="headtop">
      <span class="back" @click="back"><span class="iconfont icon-fanhui"></span>返回</span>
      <span class="title">{{titlea}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: ['titlea','callback'],
    mounted() {
    },
    methods : {
        initPage (){

        },
        back () {
          if(this.callback){
            this.callback()
          }else{
            this.$router.go(-1);
          }
        }
    },
  }
</script>
<style>
  .headtop{ position: relative; z-index: 9; background: #ffffff;
    height: .4rem; line-height: .4rem;    box-shadow: 1px 1px 4px #ccc;    text-align: center;
  }
  .headtop .back { position: absolute; height: 100%; left: .1rem;    display: flex;
    align-items: center;}
</style>

