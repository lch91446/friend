// pages/my/index.js
var app = getApp();
Page({
  data:{
    // 用户信息
    userInfo: {
      avatarUrl: "",
      nickName: "未登录",
      phone:''
    },
    bType: "primary", // 按钮类型
    token: "",
    lock: false, //登录按钮状态，false表示未登录
    // testurl: "http://wx.haining.cn/mag/circle/v1/forum/threadWapPage?tid=1290964&themecolor=ffbc00&circle_id=143"
  },
// 页面加载
  onLoad:function(){
    wx.getStorage({
      key: 'token',
      success: (res) => {
        this.setData({
          token: res.data
        })
        console.log(this.data.token);
      },
      fail: (res) => {
        console.log("login in")
        // 页面初始化 options为页面跳转所带来的参数
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: "未登录",
          success: ()=>{
            this.redirectToLogin()
          }
        })
        
      }
    })

    wx.getStorage({
      key: 'userinfo',
      // 能获取到则显示用户信息，并保持登录状态，不能就什么也不做
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: {
            avatarUrl: res.data.avatar,
            nickName: res.data.nickname,
            phone: res.data.mobile
          }
        })
      }
    });
  },
  onShow: function(){
    console.log("onShow");
  },
  logout: function(){

    wx.removeStorage({
      key: 'token',
      success: function (res) {
        console.log(res.data)
      }
    })
    wx.removeStorage({
      key: 'userinfo',
      success: function (res) {
        console.log(res.data)
      }
    })
    this.setData({
      userInfo: {
        avatarUrl: "",
        nickName: "未登录",
        phone: ''
      },
    });
    let params = {
      url: 'user/logout',
      header: {
        'Content-Type': 'application/json',
        'token' : this.data.token
      },
      method: 'post',
      data: {
      },
      needLoadingIndicator: true,
      success: (rel) => {
        console.log(rel)
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: rel.data.msg,
        })
      }
    }
    app.jamasTool.request(params);
  },
  login: function () {
    this.redirectToLogin()
  },
  uploadTap: function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值
        wx.redirectTo({
          url: `../avatarUpload/upload/upload?src=${src}`
        })
      }
    })
  },
  redirectToLogin: function () {
    wx.redirectTo({
      url: '../login/index'
    })
  },
})