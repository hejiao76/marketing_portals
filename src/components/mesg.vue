<template>
  <div class="showmesg"  v-model="mesg" v-show="showstatus">
    {{mesg}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      showstatus:false
    }
  },
  props:['mesg'],
  watch: {
    mesg (val, oldval) {
      console.log(val, oldval)
      var _that=this;
      if(val!="" &&val!=oldval){
        this.showstatus=true;
        setTimeout(function(){
          _that.showstatus=false;
          _that.mesg='';
        },2000)
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.showmesg { position: fixed; width:1rem; height: .6rem; z-index: 333; font-size: .14rem; left: 0; right:0; top:0; bottom:0; margin: auto; display: flex; align-items: center;justify-content:center; text-align: center; border-radius: .04rem; background: rgba(0,0,0,0.5); color: #ffffff;}
</style>
