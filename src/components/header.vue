<template>
  <div class="headtop">
      <span class="back" @click="back"><<返回</span>
      <span class="title">{{'抵扣券列表'}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: ['titlea'],
    mounted() {
    },
    methods : {
        initPage (){

        },
        back () {
            this.$router.go(-1);
        }
    },
  }
</script>
<style>
  .headtop{ position: relative;
    height: .4rem; line-height: .4rem;    box-shadow: 1px 1px 4px #ccc;    text-align: center;
  }
  .headtop .back { position: absolute; height: 100%; left: .1rem;}
</style>

