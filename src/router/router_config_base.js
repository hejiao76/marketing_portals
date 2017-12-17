
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
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
  redirect:""
}, {
    path: '/prizedraw/:code', // 抽奖活动入口
    component: prizedraw
  }, {
    path: '/coupon/:code', //抵扣券活动入口
    component: coupons,
    meta:{KeepAlive:true}
    },
  {
    path: '/sedKill/:code', //秒杀活动入口
    component: secondkill
  },

  /*****************抵扣券路由********************/
  {
    path: '/coupon/:code/loginchecked', //抵扣券选择经销商
    component: loginchecked
  }
  , {
    path: '/mycoupon/couponlist', //我的抵扣券
    component: mycouponlist
  }
  , {
    path: '/coupon/:code/coupondetail', //抵扣券详情 缺ItemId
    component: coupondetail
  },

  /*****************秒杀活动路由********************/
  {
    path: '/sedKill/:code/secondcardetail', //秒杀券详情
    component: secondcardetail
  }, {
    path: '/sedKill/:code/secondkilllogin', //秒杀登录 缺ItemId
    component: secondkilllogin,
    meta:{keepAlive:true}
  },
  {
    path: '/sedKill/:code/sedkillloginchecked', //选择经销商 缺itemId
    component: sedkillloginchecked,
    meta:{keepAlive:true}
  },{
    path: '/sedKill/:code/secondkillpay', //秒杀支付
    component: secondkillpay
  },
  {
    path: '/mysedKill/secondlist',  //我的秒杀列表
    component: secondlist
  },
  {
    path: '/mysedKill/seconddetail',//我的秒杀订单详情
    component: seconddetail
  },

  //sedkillloginchecked
];

export default routerConfig;
