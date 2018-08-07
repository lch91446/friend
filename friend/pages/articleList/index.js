var app = getApp();
Page({
  data: {
    articlesList: []
  },
  onLoad: function () {
  
    let params = {
      url: 'sundry/getArticlesList',
      header: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      data: {
      },
      needLoadingIndicator: true,
      success: (rel) => {
        console.log(rel)
        this.setData({
          articlesList: rel.data.data.articlesList
        })
      }
    }
    app.jamasTool.request(params);
 
  }
})
