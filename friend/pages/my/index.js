var app = getApp();
Page({
  data:{
    // 用户信息
    userInfo: {
      avatarUrl: "",
      nickName: "",
      identification_status: "",
      followMeCount: 0,
      myFolloweCount: 0,
      seeMeCount: 0,
      myAlbums: 0
    },
    token: "",
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

    this.setData({
      token: app.jamasTool.getUserToken()
    })
  },
  onShow: function(){
    console.log(this.data.token);

    let params3 = {
      url: 'Operate/getMyFansCount',
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

          if (rel.data.data.userinfo.avatar === "") {
            this.redirectFill()
            return
          }
          this.setData({
            userInfo: {
              avatarUrl: rel.data.data.userinfo.avatar,
              nickName: rel.data.data.userinfo.nickname,
              identification_status: rel.data.data.userinfo.identification_status,
              followMeCount: rel.data.data.followMeCount,
              myFolloweCount: rel.data.data.myFolloweCount,
              seeMeCount: rel.data.data.seeMeCount,
              myAlbums: rel.data.data.myAlbums
            }
          })
          console.log(this.data);
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
            title: '提示',
            showCancel: false,
            content: rel.data.msg
          })
        }
      }
    }
    app.jamasTool.request(params3);

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
  redirectFill: function () {
    wx.redirectTo({
      url: '../fillinfo/index'
    })
  },
})