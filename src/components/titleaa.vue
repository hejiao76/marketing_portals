<template>
  <div class="news">
    <div class="t_news">
      <ul class="news_li">
        <li v-for="item in titlelist">{{item.username}}刚刚抽中了<span>{{levelType[item.level]}}</span>，快来试试你的运气</li>
      </ul>
      <ul class="swap">
        <li v-for="item in titlelist">{{item.username}}刚刚抽中了<span>{{levelType[item.level]}}</span>，快来试试你的运气</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import $ from 'jquery'

  export default {
    data() {
      return {
        levelType: ['谢谢惠顾', '一等奖', '二等奖', '三等奖', '四等奖', '五等奖', '六等奖'],// 类型有 success error info warn
      }
    },
    props: ['titlelist'],
    methods: {},
    mounted() {
      var _self = this
      var heighta, x, y, h, hh = null;
      setTimeout(function () {
        heighta = $('.news_li li').height();
        x = $('.news_li');
        y = $('.swap');
        h = _self.titlelist.length * heighta; //计算属性
        hh = _self.titlelist.length;
        console.log(hh)
        if (hh > 1)
          b();
      }, 3000);

      function b() {
        console.log('xddd')
        var t = parseInt(x.css('top'));
        y.css('top', heighta);
        x.animate({
          top: t - heighta + 'px'
        }, 'slow'); //计算属性
        if (Math.abs(t) == h - heighta) { //计算属性
          y.animate({
            top: '0px'
          }, 'slow');
          var z = x;
          x = y;
          y = z;
        }
        setTimeout(b, 3000); //滚动间隔时间 现在是3秒
      }

    }
    , updated() {

    }
  }
</script>
<style>
  li {
    list-style: none;
  }

  .news {
    width: 3rem;
    text-align: center;
    height: .23rem;
    padding: 0 .1rem;
    font-size: .1rem;
    overflow: hidden;
    line-height: .23rem;
    background: rgba(0, 0, 0, .8);
    margin: 0rem auto;
    border-radius: .125rem;
    color: #ffffff;
  }

  .news .t_news {
    height: 20px;
    color: #2a2a2a;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .news .news_li, .swap {
    line-height: .23rem;
    display: inline-block;
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    text-align: center;
    color: #ffffff;
  }

  .news_li li, .swap li {
    color: #ffffff !important;
    font-size: .1rem;
    width: 100%;
    text-align: center;
  }

  .news .swap {
    top: .23rem;
  }
</style>

