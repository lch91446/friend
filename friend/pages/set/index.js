var app = getApp();
Page({
  data:{
    token: "",
  },
// 页面加载
  onLoad:function(){

    this.setData({
      token: app.jamasTool.getUserToken()
    })

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
    // app.jamasTool.request(params3);
  },
  onShow: function(){
    console.log("onShow");
  },
  logout(){
    console.log('logout')
    let params3 = {
      url: 'user/logout',
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
          wx.clearStorage()  
          this.redirectToIndex()
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
  redirectToLogin: function () {
    wx.redirectTo({
      url: '../login/index'
    })
  },
  redirectToIndex: function () {
    wx.switchTab({
      url: '../ListView/ListView',
    })
  },
})