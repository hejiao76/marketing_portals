
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
const home = r => require.ensure([], () => r(require('../page/home')), 'home');
const login = r => require.ensure([], () => r(require('../page/login')), 'login');
const prizedraw = r => require.ensure([], () => r(require('../page/raffle')), 'prizedraw');
const coupons = r => require.ensure([], () => r(require('../page/coupons')), 'coupons');
const couponlist = r => require.ensure([], () => r(require('../page/couponlist')), 'couponlist');
const secondkill = r => require.ensure([], () => r(require('../page/secondkill')), 'secondkill');
const secondlist = r => require.ensure([], () => r(require('../page/secondlist')), 'secondlist');
const coupondetail = r => require.ensure([], () => r(require('../page/coupondetail')), 'coupondetail');


const routerConfig = [{
  path: '',
  redirect:"/prizedraw"
}, {
    path: '/prizedraw/:id', // 抽奖活动入口
    component: prizedraw
  }, {
    path: '/coupon/:id', //抵扣券活动入口
    component: coupons
  }
  , {
    path: '/coupon/couponlist', //我的抵扣券
    component: couponlist
  }
  , {
    path: '/coupon/coupondetail/:id', //抵扣券详情
    component: coupondetail
  }
  , {
    path: '/sedKill/:code', //秒杀活动入口
    component: secondkill
  },
  {
    path: '/sedKill/secondlist',  //我的秒杀列表
    component: secondlist
  }

];

export default routerConfig;
