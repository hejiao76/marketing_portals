<template>
  <div>
      <span @click="back"><<返回</span>
      <span>{{title}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: ['title'],
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

</style>

