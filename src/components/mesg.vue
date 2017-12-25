<template>
  <div class="showmesg" v-show="showstatus">
    {{msg}}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showstatus: false,
        msg:'',
        showTime:2000,
      }
    },
    props: ['mesg'],
    watch: {
      mesg(val, oldval) {
        console.log(val, oldval)
        var _that = this;
        this.msg=this.mesg;
        if (val != "" && val != oldval) {
          this.showstatus = true;
          setTimeout(function () {
            _that.showstatus = false;
          }, this.showTime)
        }
      }
    },
    methods :{
        showMsgTip(msg) {
            this.msg=msg;
            console.log("1111111111");
            this.showstatus = true;
            let _self = this;
            window.setTimeout(function (){
              _self.showstatus=false;
            },this.showTime);
        },
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .showmesg {
    position: fixed;
    width: 2rem;
    height: .6rem;
    z-index: 333;
    font-size: .14rem;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: .04rem;
    background: rgba(0, 0, 0, 0.5);
    color: #ffffff;
  }
</style>
