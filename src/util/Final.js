/**
 * Created by jsb-cpyy on 2017/8/30.
 */
const OBJ ={
    SERIALTYPE:{
    1:"全车系", 2:"指定车系"
  },
  QRCODE:'http://openapi.dev.yunyang.work',
  COUPON_TYPE:{
    1:"抵扣车款", 2:"其他权益" ,3:"抵扣车款,其他权益"
  },
  COUPON_STATUS:{
    0:"未使用", 1:"已使用" ,2:"快到期", 3:"已过期"
  },
  PATH_MAPPING : ["startWorkDetail","companyDetail","personalDetail","personalDetailInfo","driverDetail","driverDetailInfo","truckDriverDetail","truckDriverDetailInfo","truckDetail","truckDetailInfo"],  //左侧菜单适配路由名称
  PATH_MAPPING_OBJ : {//左侧菜单适配路由映射地址
    "startWorkDetail" : {name :"startWorkDetail",defaultPathMap:"/startwork/startwork_1"},
    "companyDetail" : {name :"companyDetail",defaultPathMap:"/lgtcheck/companycheck/1"},
    "personalDetail" : {name :"personalDetail",defaultPathMap:"/lgtcheck/personalcheck/0"},
    "personalDetailInfo" : {name :"personalDetailInfo",defaultPathMap:"/lgtcheck/personalcheck/0"},
    "driverDetail" : {name :"driverDetail",defaultPathMap:"/lgtcheck/drivercheck/0"},
    "driverDetailInfo" : {name :"driverDetailInfo",defaultPathMap:"/lgtcheck/drivercheck/0"},
    "truckDriverDetail" : {name :"truckDriverDetail",defaultPathMap:"/lgtcheck/truckDrivercheck/0"},
  }
}
export  default OBJ;
