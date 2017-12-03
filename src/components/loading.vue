<template>
  <div  class="loading_box">
    <img class="loading" src="../assets/img/loadinga.gif" />
  </div>
</template>
<style>
  .loading_box { position: fixed; height: 100%;
    width:100%; z-index: 100;}
  .loading_box::after { content: ""; z-index: 9; position:absolute; background: rgba(0,0,0,0.5); width: 100%; height: 100%; left: 0;
    top:0; }
  .loading { position: absolute;
    width:100px;
    height:100px;
    left:0;
    right:0;
    top:0;
    bottom: 0;
    margin: auto;
    z-index: 10;
  }

</style>
