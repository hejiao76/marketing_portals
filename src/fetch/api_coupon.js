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
       * 审核不通过
       * @param params
       * @returns {*}
       */
      ap_audit_reject_withdrawals(params) {
        return fetch.fetch('/wuliu-web-user/emp/trade/auditRejectWithdrawals.action', params);
      },
}
