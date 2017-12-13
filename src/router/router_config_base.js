
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
const home = r => require.ensure([], () => r(require('../page/home')), 'home');
const login = r => require.ensure([], () => r(require('../page/login')), 'login');
const prizedraw = r => require.ensure([], () => r(require('../page/raffle')), 'prizedraw');
const coupons = r => require.ensure([], () => r(require('../page/coupons')), 'coupons');
const couponlist = r => require.ensure([], () => r(require('../page/couponlist')), 'couponlist');
const coupondetail = r => require.ensure([], () => r(require('../page/coupondetail')), 'coupondetail');
const secondkill = r => require.ensure([], () => r(require('../page/secondkill')), 'secondkill');
const secondlist = r => require.ensure([], () => r(require('../page/secondlist')), 'secondlist');
const seconddetail = r => require.ensure([], () => r(require('../page/seconddetail')), 'seconddetail');


const routerConfig = [{
  path: '',
  redirect:"/prizedraw"
}, {
    path: '/prizedraw/:id',
    component: prizedraw
  }, {
    path: '/coupon/:id',
    component: coupons
  }
  , {
    path: '/couponlist',
    component: couponlist
  }
  , {
    path: '/coupondetail/:id',
    component: coupondetail
  }
  , {
    path: '/secondkill/:id',
    component: secondkill
  },
  {
    path: '/secondlist',
    component: secondlist
  },{
    path: '/seconddetail',
    component: seconddetail
  },


];

export default routerConfig;
