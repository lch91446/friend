var WxParse = require('../../utils/wxParse/wxParse.js');

var app = getApp();

Page({
  data: {
  },
  onLoad: function (option) {

    this.setData({
      token: app.jamasTool.getUserToken(),
      id: option.id
    })
    let params = {
      url: 'sundry/getActivity',
      header: {
        'Content-Type': 'application/json',
        'token': this.data.token
      },
      method: 'post',
      data: {
        id: this.data.id
      },
      needLoadingIndicator: true,
      success: (rel) => {

        if (rel.data.code == "1") {
            var article = rel.data.data.activity.detail
            WxParse.wxParse('article', 'html', article, this, 5);
            wx.setNavigationBarTitle({
              title: rel.data.data.activity.name
            })
            this.setData({
              isJoin: rel.data.data.isJoin,
              isdoing: parseInt(rel.data.data.isdoing) ? false : true
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
            content: rel.data.msg,
            showCancel: false,
          })
        }
      }
    }
    app.jamasTool.request(params);
 
  },
  join(){
    let params = {
      url: 'sundry/joinActivity',
      header: {
        'Content-Type': 'application/json',
        'token': this.data.token
      },
      method: 'post',
      data: {
        id: this.data.id
      },
      needLoadingIndicator: true,
      success: (rel) => {
        if (rel.data.code == "1") {
          this.setData({
            isJoin: rel.data.data.isJoin
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
            content: rel.data.msg,
            showCancel: false,
          })
        }


      }
    }
    app.jamasTool.request(params); 
  },
  redirectToLogin: function () {
    wx.redirectTo({
      url: '../login/index'
    })
  },
})
