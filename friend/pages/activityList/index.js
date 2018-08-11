var app = getApp();
Page({
  data: {
    doingactivity: [],
    hadactivity: [],
    toactivity: []
  },
  onLoad: function () {
  
    let params = {
      url: 'sundry/getActivityList',
      header: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      data: {
      },
      needLoadingIndicator: true,
      success: (rel) => {
        this.setData({
          doingactivity: rel.data.data.doingactivity,
          hadactivity: rel.data.data.hadactivity,
          toactivity: rel.data.data.toactivity
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
