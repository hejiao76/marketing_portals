import * as fetch from "./fetch.js"

import  apiApproval from './api_approval'
import  apiPrizedraw from './api_prizedraw'
import  apiCoupon from './api_coupon'
import  apisedkill from './api_sedkill'

const base = {
  /**
   * 用户登录
   */
  base_login(params) {
    return fetch.fetch('user/login', params);
  },
  // 验证码
  base_getPhoneCode (params){
    return fetch.fetch('user/getAuthCode',params);
  },
}

export  default  Object.assign(base,apiApproval,apiPrizedraw,apiCoupon,apisedkill);
