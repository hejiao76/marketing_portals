/**
 * Created by jsb-cpyy on 2017/8/30.
 */
var proxy="/action"  //静态代理请求目标声明
window.staticObj = {
  PROXY:proxy, //代理请求目标,
  CHILD_FLOADER_NAME:"", //域名下静态资源目录 可以为空
  BUILD_PATH:"js/app", //webPack 编译路径
}
