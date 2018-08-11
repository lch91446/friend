var app = getApp();
Page({
  data:{
    token: "",
    isopen: false
  },
// 页面加载
  onLoad:function(){

    this.setData({
      token: app.jamasTool.getUserToken()
    })

    let params3 = {
      url: 'user/getOpenState',
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
          this.setData({
            isopen: parseInt(rel.data.data.isopen) == 0 ? false: true 
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
  switchChange(e){
    let isopen = e.detail.value
    let alarmStr =""
    if(isopen){
      alarmStr = "你确定公开自己的个人资料?"
    }else{
      alarmStr = "你确定隐藏自己的个人资料?隐藏后别人无法搜索到你"
    }
    wx.showModal({
      title: '提示',
      content: alarmStr,
      success:(e)=>{
        if(e.confirm){

          let params3 = {
            url: 'user/triggerOpen',
            header: {
              'Content-Type': 'application/json',
              'token': this.data.token
            },
            method: 'post',
            data: {
              'isopen': isopen==false?"0":"1"
            },
            needLoadingIndicator: true,
            success: (rel) => {
              console.log(rel)
              if (rel.data.code == "1") {
                this.setData({
                  isopen: parseInt(rel.data.data.isopen) == 0 ? false : true
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
        }else{
          this.setData({
            isopen: this.data.isopen
          })
        }
      }
    })




  },
  redirectToLogin: function () {
    wx.redirectTo({
      url: '../login/index'
    })
  },
})