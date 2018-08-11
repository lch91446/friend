var WxParse = require('../../utils/wxParse/wxParse.js');

var app = getApp();

Page({
  data: {
  },
  onLoad: function () {
    let params = {
      url: 'sundry/getAbout',
      header: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      data: {
      },
      needLoadingIndicator: true,
      success: (rel) => {
        var article = rel.data.data.about
        WxParse.wxParse('article', 'html', article, this, 5);
      }
    }
    app.jamasTool.request(params);
 
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      console.log(ops.target)
    }
    return {
      title: app.globalData.shareProfile,
      path: 'pages/ListView/ListView',
      imageUrl: app.globalData.shareimageUrl,
      success: function (res) {
        wx.showToast({
          icon: 'none',
          title: '转发成功',
        })
      },
      fail: function (res) {
        wx.showToast({
          icon: 'none',
          title: '转发失败',
        })
      }
    }
  },
})
