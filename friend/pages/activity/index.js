var WxParse = require('../../utils/wxParse/wxParse.js');
var util = require("../../utils/util.js");
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
  submitInfo(e){

    let formId = e.detail.formId;

    let params = {
      url: 'sundry/joinActivity',
      header: {
        'Content-Type': 'application/json',
        'token': this.data.token
      },
      method: 'post',
      data: {
        id: this.data.id,
        formId: formId
      },
      needLoadingIndicator: true,
      success: (rel) => {
        if (rel.data.code == "1") {
          this.setData({
            isJoin: rel.data.data.isJoin
          })
          if (rel.data.data.errcode){
            wx:wx.showToast({
              icon: 'none',
              title: 'errcode:'+rel.data.data.errcode,
            })
          }

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
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      console.log(ops.target)
    }
    return {
      title: app.globalData.shareProfile,
      path: util.getCurrentPageUrlWithArgs(),
      imageUrl: app.globalData.shareimageUrl,
      success: function (res) {
        wx.showToast({
          icon: "none",
          title: '分享成功',
        })
      },
      fail: function (res) {
        wx.showToast({
          icon: "none",
          title: '分享失败',
        })
      }
    }
  },
})
