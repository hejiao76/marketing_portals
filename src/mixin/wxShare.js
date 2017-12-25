import Final from "./../../static/baseSetting/Final"
function getScript() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js',
      dataType: "script",
      cache : true,
    }).done(function() {
      // alert("加载wxjs 静态资源")
      resolve(window.wx)
    })
    .fail(function(error) {
      reject( error );
    });

  })
}

function act() {
  return new Promise((resolve, reject) => {
    // console.log(window.location.href)
    $.ajax({
      url: Final.PROXY+'/sys/wx/info?type=1&businessId=10001',//后台索要的算法签名
      param:{type:1,businessId:4},
      type: 'get',
    }).done(function(ret) {
      console.log('ret',ret);
      // alert("签名:"+JSON.stringify(ret));
      resolve(ret.result)
    }).fail(function(ret) {
      reject( ret );
    })
  })
}



export function wechatShare(shareDate) {
  return new Promise(async function(resolve, reject) {
    try{
      // alert("分享入口-------->"+JSON.stringify(shareDate));
      let isWechat=navigator.userAgent.indexOf('MicroMessenger')>-1 //判断为微信浏览器
      if(!isWechat){
        return resolve('not weichat')
      }
      if(!window.wx){
        await getScript();
      }
    // alert("判断浏览器成功-------->");

      var defaultData = {
        title:'',
        content:'',
        link:'',
        logo:'', //分享出来的图片的
        success: function (res) {

        },
      }
      let data = { ...defaultData, ...shareDate };
      // alert("数据装载-------->"+JSON.stringify(data));
      let ret = await act();
      let configData={
        debug:true,
        appId:ret.appId,
        timestamp:ret.timestamp,
        nonceStr:ret.nonceStr,
        signature:ret.signature,
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'],
      };
      // alert("config数据封装-------->"+JSON.stringify(configData));
      wx.config(configData);
      // alert("装载微信分享配置->")
      wx.ready(function () {
        wx.onMenuShareTimeline({
          title: data.title,
          desc: data.content,
          link: data.link,
          imgUrl: data.logo,
          dataUrl: '',
          success: data.success,
          cancel: function () {
            alert("取消分享1");
          },
        })
        wx.onMenuShareAppMessage({
          title: data.title,
          desc: data.content,
          link: data.link,
          imgUrl: data.logo,
          dataUrl: '',
          success: data.success,
          cancel: function () {
            alert("取消分享2");
          },
        })
        wx.onMenuShareQQ({
          title: data.title,
          desc: data.content,
          link: data.link,
          imgUrl: data.logo,
          dataUrl: '',
          success: data.success,
          cancel: function () {
            alert("取消分享3");
          },
        })
      })

     }catch(error){
      reject( error );
    }
  })

}
