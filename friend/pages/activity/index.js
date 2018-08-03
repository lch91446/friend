var WxParse = require('../../utils/wxParse/wxParse.js');

var app = getApp();

Page({
  data: {
  },
  onLoad: function () {
  
    let params = {
      // url: 'operate/getArticlesList',
      url: 'operate/getArticle',
      header: {
        'Content-Type': 'application/json',
        'token': this.data.token
      },
      method: 'post',
      data: {
        id: 2
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
