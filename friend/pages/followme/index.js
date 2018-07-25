var app = getApp();
var util = require("../../utils/util.js");
Page({
  data:{
    // 用户信息

    avatar: "",
    nickName: "",
    gender: "",
    token: "",


  },
// 页面加载
  onLoad:function(){

    this.setData({
      token: app.jamasTool.getUserToken()
    })

    let params3 = {
      url: 'Operate/getUserInfo',
      header: {
        'Content-Type': 'application/json',
        'token': this.data.token
      },
      method: 'post',
      data: {},
      needLoadingIndicator: true,
      success: (rel) => {
        console.log(rel)
        if (rel.data.code == "1") {
          wx.setStorageSync("userinfo", rel.data.data.userinfo)
          this.setData({
              avatar: rel.data.data.userinfo.avatar,
              nickName: rel.data.data.userinfo.nickname,
              userName: rel.data.data.userinfo.username,
              gender: rel.data.data.userinfo.gender == "male" ? "男" : "女",
          })

        } else if (rel.data.code == "401"){
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: rel.data.msg,
            success: (res)=>{
              this.redirectToLogin();
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: rel.data.msg
          })
        }
      }
    }
    app.jamasTool.request(params3);
  },
  onShow: function(){
    console.log("onShow");
  },
  redirectToLogin: function () {
    wx.redirectTo({
      url: '../login/index'
    })
  },
})