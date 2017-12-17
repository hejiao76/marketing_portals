import * as fetch from "./fetch.js"

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
  // 是否登录
  base_veifyToken (params){
    return fetch.fetch('user/veifyToken',params);
  },
  // 查询省市
  base_getcity (params){
    return fetch.fetch('sys/location',params,"get");
  }

}

export  default  Object.assign(base,apiPrizedraw,apiCoupon,apisedkill);
