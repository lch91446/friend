var WxParse = require('../../utils/wxParse/wxParse.js');
var util = require("../../utils/util.js");
var app = getApp();

Page({
  data: {
  },
  onLoad: function (option) {

    this.setData({
      id: option.id
    })
    let params = {
      url: 'sundry/getDatingsite',
      header: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      data: {
        id: this.data.id
      },
      needLoadingIndicator: true,
      success: (rel) => {
        var article = rel.data.data.article.content
        console.log(article)
        console.log(rel.data.data.article.content)
        WxParse.wxParse('article', 'html', article, this, 5);
        wx.setNavigationBarTitle({
          title: rel.data.data.article.name
        })

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
      path: util.getCurrentPageUrlWithArgs(),
      imageUrl: app.globalData.shareimageUrl,
      success: function (res) {
        wx.showToast({
          icon: "none",
          title: '分享成功',
        })
      },
      fail: function (res) {
        wx.showToast({
          icon: "none",
          title: '分享失败',
        })
      }
    }
  },
})
