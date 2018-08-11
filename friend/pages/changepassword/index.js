var app = getApp();
Page({
  data:{
    token: "",
    oldpassword: '',
    password1: '',
    password2: ''
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
  oldpassword(e){
    this.setData({
      oldpassword: e.detail.value
    })
  },
  password1(e) {
    this.setData({
      password1: e.detail.value
    })
  },
  password2(e) {
    this.setData({
      password2: e.detail.value
    })
  },
  submit(){
    console.log('submit')

    console.log(this.data.password1.length)

    if (this.data.password1 !== this.data.password2) {
      wx.showToast({
        icon: 'none',
        title: '新密码和确认密码不相同',
      })
      return
    }
    if (this.data.password1.length < 6 || this.data.password1.length > 20){
      wx.showToast({
        icon: 'none',
        title: '请输入6~20位的密码',
      })
      return 
    }

    let params3 = {
      url: 'user/changepassword',
      header: {
        'Content-Type': 'application/json',
        'token': this.data.token
      },
      method: 'post',
      data: {
        oldpassword: this.data.oldpassword,
        newpassword: this.data.password1
      },
      needLoadingIndicator: true,
      success: (rel) => {
        console.log(rel)
        if (rel.data.code == "1") {
          wx.showToast({
            icon: 'none',
            title: '修改成功',
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
})