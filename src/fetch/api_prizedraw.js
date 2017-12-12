import * as fetch from "./fetch.js"

export default {
    /*************方法命名规则：ap_ 前缀 ap_ 前缀 ap_ 前缀   写注释 写注释***************/
      /**
        * 抽奖详情
        * @param params
        * @returns {*}
      */
      ap_prizedraw(params) {
        return fetch.fetch('user/lottery/info', params,'get');
      },
      /**
       * 	获取剩余抽奖次数
       * @param params
       * @returns {*}
       */
      ap_prizedraw_number(params) {
        return fetch.fetch('user/lottery/surplus', params,'get');
      },
      /**
       * 3.2.4.	最近中奖信息查询
       * @param params
       * @returns {*}
       */
      ap_prizedraw_log(params) {
        return fetch.fetch('user/lottery/record', params,'get');
      },/**
     * 3.2.4.	抽奖
     * @param params
     * @returns {*}
     */
  ap_prizedraw_go(params) {
      return fetch.fetch('user/lottery/go', params);
    },/**
   * 3.2.4.	抽奖人数
   * @param params
   * @returns {*}
   */
  ap_prizedraw_users(params) {
    return fetch.fetch('user/lottery/joinSize', params,'get');
  },





}
