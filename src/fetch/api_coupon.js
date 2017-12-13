import * as fetch from "./fetch.js"

export default {
    /*************方法命名规则：ap_ 前缀 ap_ 前缀 ap_ 前缀   写注释 写注释***************/
      /**
        * 抵扣卷列表
        * @param params
        * @returns {*}
      */
      ap_coupon(params) {
        return fetch.fetch('user/coupon/couponActivityInfo', params,"post","json");
      },
      /**
       * 获取验证码
       * @param params
       * @returns {*}
       */
      ap_get_auth_code(params) {
        return fetch.fetch('user/getAuthCode', params,'post');
      },
      /**
       * 获取我的抵扣券列表
       * @param params
       * @returns {*}
       */
      ap_get_myCouponList(params) {
        return fetch.fetch('user/coupon/myCouponList', params,'post',"json");
      },
      /**
       * 领券
       * @param params
       * @returns {*}
       */
      ap_add_user_coupon(params) {
        return fetch.fetch('user/coupon/addUserCoupon', params,'post',"json");
      },
      /**
       * 我的抵扣券详情
       * @param params
       * @returns {*}
       */
      ap_my_coupon_info(params) {
        return fetch.fetch('user/coupon/myCouponInfo', params,'post',"json");
      },
}
