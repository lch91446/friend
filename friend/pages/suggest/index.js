var app = getApp();
Page({
  data:{
    token: "",
    length: 0,
    report: '',
  },
// 页面加载
  onLoad:function(){

    this.setData({
      token: app.jamasTool.getUserToken()
    })
  },
  onShow: function(){
    console.log("onShow");
  },
  change(e){
    this.setData({
      length: e.detail.value.length,
      report: e.detail.value
    })
  },
  submit: function (e) {
    if(this.data.length < 3){
      wx.showToast({
        icon: 'none',
        title: '建议太精简啦，我们的小编可能看不懂哦',
      })
      return
    }


    let msg = this.data.report



    let params = {
      url: 'operate/report',
      header: {
        'Content-Type': 'application/json',
        'token': this.data.token
      },
      method: 'post',
      data: {
        msg: msg,
        type: 0
      },
      needLoadingIndicator: true,
      success: (rel) => {
        console.log(rel)
        if (rel.data.code == "1") {
          if (rel.data.data.result) {
            wx.showToast({
              icon: 'none',
              title: '感谢您的建议，我们会提供更好的服务努力',
            })
            this.setData({
              report: ''
            })
          } else {
            wx.showToast({
              title: '服务器繁忙，请稍候再试',
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
            title: '提示',
            showCancel: false,
            content: rel.data.msg
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