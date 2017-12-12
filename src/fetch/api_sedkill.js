import * as fetch from "./fetch.js"

export default {
    /*************方法命名规则：ap_ 前缀 ap_ 前缀 ap_ 前缀   写注释 写注释***************/
      /**
        * 抵扣卷列表
        * @param params
        * @returns {*}
      */
      ap_sedkill_list(params) {
        return fetch.fetch('coupon/couponList', params);
      },
      /**
       * 审核通过
       * @param params
       * @returns {*}
       */
      ap_audit_agree_withdrawals(params) {
        return fetch.fetch('/wuliu-web-user/emp/trade/auditAgreeWithdrawals.action', params);
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
