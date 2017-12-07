
//require.ensure()，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
const home = r => require.ensure([], () => r(require('../page/home')), 'home');
const login = r => require.ensure([], () => r(require('../page/login')), 'login');
const action = r => require.ensure([], () => r(require('../page/raffle')), 'action');
const coupons = r => require.ensure([], () => r(require('../page/coupons')), 'coupons');
const couponlist = r => require.ensure([], () => r(require('../page/couponlist')), 'couponlist');
const routerConfig = [{
  path: '',
  redirect:"/login"
}, {
  path: '/home',
  component: home
}
, {
  path: '/login',
  component: login
}, {
    path: '/action',
    component: action
  }, {
    path: '/coupons',
    component: coupons
  }
  , {
    path: '/couponlist',
    component: couponlist
  }
];

export default routerConfig;
