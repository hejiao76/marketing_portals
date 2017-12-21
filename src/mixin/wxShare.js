function getScript() {
  return new Promise((resolve, reject) => {

    $.ajax({
      url: 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js',
      dataType: "script",
      cache : true,
    }).done(function() {
      resolve(window.wx)
    })
      .fail(function(error) {
        reject( error );
      });

  })
}

function act() {
  debugger;
  return new Promise((resolve, reject) => {
    // console.log(window.location.href)
    $.ajax({
      url: 'http://sem.familyku.com/sys/wx/info?type=1&businessId=4',//后台索要的算法签名
      type: 'get',
    }).done(function(ret) {
      console.log('ret',ret)
      resolve(ret.result)
    }).fail(function(ret) {
      reject( ret );
    })
  })
}



export function wechatShare(shareDate) {
  return new Promise(async function(resolve, reject) {

    try{
      let isWechat=navigator.userAgent.indexOf('MicroMessenger')>-1 //判断为微信浏览器
      if(!isWechat){
        return resolve('not weichat')
      }
      if(!window.wx){
        await getScript();
      }


      var defaultData = {
        title: `分享的标题`,
        content: `内容`,
        link: `${window.location.href}`,
        logo: `${require('../assets/img/get_bg.png')}`, //分享出来的图片的
        success: function (res) {

        },
      }
      let data = { ...defaultData, ...shareDate }
      let ret = await act()
      console.log(ret)
      wx.config($.extend({
        // debug:1,
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'],
      }, ret))

      wx.ready(function () {
        wx.onMenuShareTimeline({
          title: data.content,
          desc: '',
          link: data.link,
          imgUrl: data.logo,
          dataUrl: '',
          success: data.success,
          cancel: function () {
            alert(1)
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
            alert(2)
          },
        })
        wx.onMenuShareQQ({
          title: data.title,
          desc: data.content,
          link: data.link,
          imgUrl: data.logo,
          dataUrl: '',
          success: data.success,
          cancel: function () {},
        })
      })

    }catch(error){
      reject( error );
    }
  })

}
