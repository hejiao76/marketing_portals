
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
const home = r => require.ensure([], () => r(require('../page/home')), 'home');
const login = r => require.ensure([], () => r(require('../page/login')), 'login');
const prizedraw = r => require.ensure([], () => r(require('../page/raffle')), 'prizedraw');
const coupons = r => require.ensure([], () => r(require('../page/coupons')), 'coupons');
const mycouponlist = r => require.ensure([], () => r(require('../page/couponlist')), 'couponlist');
const secondkill = r => require.ensure([], () => r(require('../page/secondkill')), 'secondkill');
const secondlist = r => require.ensure([], () => r(require('../page/secondlist')), 'secondlist');
const coupondetail = r => require.ensure([], () => r(require('../page/coupondetail')), 'coupondetail');
const seconddetail = r => require.ensure([], () => r(require('../page/seconddetail')), 'seconddetail');
const secondcardetail = r => require.ensure([], () => r(require('../page/secondcardetail')), 'secondcardetail');
const secondkilllogin = r => require.ensure([], () => r(require('../page/secondkilllogin')), 'secondkilllogin');
const secondkillpay = r => require.ensure([], () => r(require('../page/secondkillpay')), 'secondkillpay');
const loginchecked = r => require.ensure([], () => r(require('../page/loginchecked')), 'loginchecked');
const sedkillloginchecked = r => require.ensure([], () => r(require('../page/sedkillloginchecked')), 'sedkillloginchecked');

const routerConfig = [{
  path: '',
  redirect:"/prizedraw"
}, {
    path: '/prizedraw/:id', // 抽奖活动入口
    name:"prizedraw",
    component: prizedraw
  }, {
    path: '/coupon/:id', //抵扣券活动入口
    name:"coupons",
    component: coupons
    }, {
    path: '/coupon/:id/loginchecked', //抵扣券选择经销商
    name:"loginchecked",
    component: loginchecked
  }
  , {
    path: '/mycoupon/couponlist', //我的抵扣券
    name:"mycouponlist",
    component: mycouponlist
  }
  , {
    path: '/coupon/coupondetail/:id', //抵扣券详情
    name:"coupondetail",
    component: coupondetail
  }
  , {
    path: '/sedKill/:code', //秒杀活动入口
    component: secondkill
  },
  {
    path: '/mysedKill/secondlist',  //我的秒杀列表
    component: secondlist
  },{
    path: '/mysedKill/seconddetail',
    component: seconddetail
  },{
    path: '/mysedKill/secondcardetail/:itemId',
    component: secondcardetail
  },{
    path: '/mysedKill/secondkilllogin/:itemId',
    component: secondkilllogin
  },{
    path: '/mysedKill/sedkillloginchecked/:itemId',
    component: sedkillloginchecked
  },{
    path: '/mysedKill/secondkillpay',
    component: secondkillpay
  },
  {
    path: '/mysedKill/secondkillpay',
    component: secondkillpay
  },

  //sedkillloginchecked
];

export default routerConfig;
