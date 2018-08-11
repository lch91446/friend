var app = getApp();
var register = require('../../utils/refreshLoadRegister.js');
Page({
  data: {
    loadingMoreHidden: true,
    foucsCnt: 0,
    fansCnt: 0,
    vistorCnt: 0,
    sysCnt: 0
  },
  // 页面加载
  onLoad: function () {

    this.setData({
      token: app.jamasTool.getUserToken()
    })
    register.register(this);
    

  },
  getData(){
    
    let params = {
      url: 'operate/getMessageCount',
      header: {
        'Content-Type': 'application/json',
        'token': this.data.token
      },
      method: 'post',
      data: {},
      needLoadingIndicator: true,
      success: (rel) => {

        if (rel.data.code == "1") {
          this.setData({
            foucsCnt: parseInt(rel.data.data.foucsCnt), 
            fansCnt: parseInt(rel.data.data.fansCnt),
            vistorCnt: parseInt(rel.data.data.vistorCnt),
            sysCnt: parseInt(rel.data.data.sysCnt),
          })

        } else if (rel.data.code == "401") {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: rel.data.msg,
            success: (res) => {
              this.redirectToLogin();
            }
          })
        } else {
          wx.showModal({
            title: rel.data.msg,
            showCancel: false,
            content: rel.data.data.err
          })
        }
      },
      complete: () => {
        register.loadFinish(this, false);
      }
    }
    app.jamasTool.request(params);
  },
  onShow: function () {
    console.log("onShow");
    this.getData()
  },
  refresh: function () {
    this.setData({
      loadingMoreHidden: true,
      page: 0,
      userFocusList: [
      ],
    })

    this.getData()
  },
  loadMore: function () {
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
  redirectToLogin: function () {
    wx.redirectTo({
      url: '../login/index'
    })
  },
})