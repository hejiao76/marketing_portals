<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!--<v-tip-msg></v-tip-msg>-->
  </div>
</template>

<script>
  import api from "./fetch/api"
export default {
  name: 'app',
  created (){
    this.checkLogin();
  },
  components :{
  },
  methods : {
      checkLogin(){
//          let token = localStorage.getItem("token");
//          if(!token){
//              this.$router.replace("login");
//          }else {
//              var param={token : token};
//            login_api.checkLogin(param)
//              .then(res =>{
//                if(res.status!=1){
//                  this.$router.replace("login");
//                }
//            }).catch(error => {
//              this.$router.replace("login");
//            })
//          }
      }
  }
}
</script>

<style>
  @import "./assets/icon/iconfont.css";
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
</style>
