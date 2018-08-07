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
 
  }
})
