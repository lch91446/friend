var util = require("../../utils/util.js");

Page({
  data: {
    token: '',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad');
    wx.getStorage({
      key: 'token',
      success: (res) => {
        this.setData({
          token: res.data
        })
        console.log(this.data.token);
        this.redirectToList()
      },
      fail: (res) => {
        console.log("login in")
        // 页面初始化 options为页面跳转所带来的参数
        
      }
    })



  },
  onReady: function () {
    // 页面渲染完成
    console.log('onReady');
  },
  onShow: function () {
    // 页面显示
    console.log('onShow');
  },
  onHide: function () {
    // 页面隐藏
    console.log('onHide');
  },
  onUnload: function () {
    // 页面关闭
    console.log('onUnload');
  },

  redirectToList: function () {
    wx.redirectTo({
      url: '../ListView/ListView'
    })
  }

})