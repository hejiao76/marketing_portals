<template>
  <span :endTime="String(endTime)" :callback="callback" :endText="endText">
    <slot>
      <span v-html="content" class="countdown"></span>
    </slot>
  </span>
</template>
<style>
  .countdown { display: inline-block;}
  .countdown span { display: inline-block;text-align: center;}
</style>
<script>
  export default {
    data(){
      return {
        content: '',
        timer:''
      }
    },
    props:{
      endTime:{
        type: String,
        default :''
      },
      endText:{
        type : String,
        default:'已结束'
      },
      callback : {
        type : Function,
        default :function(){}
      }
    },
    watch:{
      endTime(){
        console.log("~~~~~watch");

        if(this.endTime){
          this.initPage(this.endTime/1000);
        }
//        this.countdowm(this. endTime/1000)
      }
    },
    mounted () {
      if(this.endTime){
        this.initPage(this.endTime/1000);
      }

    },
    methods: {
      initPage(timestamp){
        if(this.timer){
          window.clearInterval(this.timer);
        }else{
          this.countdowm(timestamp)
        }
      },
      countdowm(timestamp){
        let self = this;
        let timer = setInterval(function(){
          let nowTime = new Date();
          let endTime = new Date(timestamp * 1000);
          let t = endTime.getTime() - nowTime.getTime();
          if(t>0){
            let day = Math.floor(t/86400000);
            let hour=Math.floor((t/3600000)%24);
            let min=Math.floor((t/60000)%60);
            let sec=Math.floor((t/1000)%60);
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec :sec;
            let format = '';
            if(day > 0){
              format = '<span>'+day+'</span>'+'天'+ '<span>'+hour+'</span>'+'小时'+ '<span>'+min+ '</span>'+'分'+ '</span>'+sec+ '<span>'+'秒';
            }
            if(day <= 0 && hour > 0 ){
              format ='<span>'+hour+'</span>'+'小时'+ '<span>'+min+ '</span>'+'分'+ '<span>'+sec+ '</span>'+'秒';

            }
            if(day <= 0 && hour <= 0){
              format = '<span>'+min+ '</span>'+'分'+ '<span>'+sec+ '</span>'+'秒';

            }
            self.content = format;
          }else if(self.endTime){
            clearInterval(timer);
            self.content = self.endText;
            self._callback();
          }
        },1000);
      },
      _callback(){
        if(this.callback && this.callback instanceof Function){
          this.callback(...this);
        }
      }
    }
  }
</script>
