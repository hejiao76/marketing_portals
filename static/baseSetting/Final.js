/**
 * Created by jsb-cpyy on 2017/8/30.
 */
const proxy='/action' //代理请求目标声明
const payDomain = "http://static.EC_WEB_DOMAIN_REPLACE";
const OBJ ={
  PROXY:proxy, //代理请求目标
  IMG_PATH:"http://img.familyku.com",  //图片访问地址配置
  QRCODE:'http://openapi.dev.yunyang.work', //核销码访问地址配置
  CHILD_FLOADER_NAME:"", //域名下静态资源目录 可以为空
  BUILD_PATH:"js/app", //webPack 编译路径
  PAY_DOMAIN:payDomain,//支付跳转页路径
  SERIALTYPE:{
    1:"全车系", 2:"指定车系"
  },

  COUPON_TYPE:{
    1:"抵扣车款", 2:"其他权益" ,3:"抵扣车款,其他权益"
  },
  COUPON_STATUS:{
    0:"未使用", 1:"已使用" ,2:"快到期", 3:"已过期"
  }
}
export  default OBJ;
