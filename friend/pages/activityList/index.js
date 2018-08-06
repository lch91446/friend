var app = getApp();
Page({
  data: {
  },
  onLoad: function () {
  
    let params = {
      url: 'operate/getArticlesList',
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
      }
    }
    // app.jamasTool.request(params);
 
  }
})
