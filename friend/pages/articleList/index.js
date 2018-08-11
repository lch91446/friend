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
