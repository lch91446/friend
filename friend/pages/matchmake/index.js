var WxParse = require('../../utils/wxParse/wxParse.js');

var app = getApp();

Page({
  data: {
  },
  onLoad: function (option) {

    this.setData({
      id: option.id
    })
    let params = {
      url: 'sundry/getMatchmaker',
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
          title: rel.data.data.article.title
        })

      }
    }
    app.jamasTool.request(params);

  }
})
