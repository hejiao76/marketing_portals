import * as fetch from "./fetch.js"

export default {
    /*************方法命名规则：ap_ 前缀 ap_ 前缀 ap_ 前缀   写注释 写注释***************/
    /**
     * 秒杀活动页
     * @param params
     * @returns {*}
     */
    ap_sedkill_detail(params) {
      return fetch.fetch('user/seckill/activity', params,'get');
    },
    /**
      * 秒杀活动详情
      * @param params
      * @returns {*}
    */
    ap_sedkill_info(params) {
      return fetch.fetch('user/seckill/info', params,"get");
    },
    /**
     * 秒杀报名
     * @param params
     * @returns {*}
     */
    ap_sedkill_enrollaa(params) {
      return fetch.fetch('user/seckill/enroll', params,'post');
    },
    /**
     * 秒杀获取经销商
     * @param params
     * @returns {*}
     */
    ap_sedkill_enroll(params) {
      return fetch.fetch('user/seckill/dealer', params,'get');
    },
    /**
     * 秒杀
     * @param params
     * @returns {*}
     */
    ap_sedkill_seckill(params) {
      return fetch.fetch('user/seckill/seckill', params,'post');
    },
    /**
     * 支付宝支付
     * @param params
     * @returns {*}
     */
    ap_sedkill_aliPay(params) {
      return fetch.fetch('user/seckill/aliPay', params,'post');
    },
  /**
   * 微信支付
   * @param params
   * @returns {*}
   */
  ap_sedkill_aliPay(params) {
    return fetch.fetch('user/seckill/weixinPay', params,'post');
  },
  /**
   * 我的活动列表
   * @param params
   * @returns {*}
   */
  ap_sedkill_my_activity_list(params) {
    return fetch.fetch('user/seckill/myActivityList', params,'post');
  },
  /**
   * 我的活动详情
   * @param params
   * @returns {*}
   */
  ap_sedkill_my_activity_info(params) {
    return fetch.fetch('user/seckill/myActivityInfo', params,'post');
  },
  /**
   * 秒杀活动删除
   * @param params
   * @returns {*}
   */
  ap_sedkill_del(params) {
    return fetch.fetch('user/seckill/del', params,'post');
  },
  /**
   * 秒杀活动发送核销码
   * @param params
   * @returns {*}
   */
  ap_sedkill_send_code(params) {
    return fetch.fetch('user/seckill/sendCode', params,'post');
  },


}
