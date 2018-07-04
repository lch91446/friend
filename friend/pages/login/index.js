


var util = require("../../utils/util.js");
var app = getApp();
Page({
  data: {
    registBtnTxt: "登陆",
    registBtnBgBgColor: "#ff9900",
    btnLoading: false,
    registDisabled: false,
    smsCodeDisabled: false,
    inputUserName: '',
    inputPassword: '',
    openid : "",
  },
  onLoad: function (options) {
    
    wx.getStorage({
      key: 'openid',
      success: (res)=>{
        this.setData({
          openid : res.data
        })
        console.log(this.data.openid);
      },
      fail: (res)=>{
        console.log("login in")
        // 页面初始化 options为页面跳转所带来的参数
        wx.login({

          success: (res) => {
            let code = res.code;
            let params = {
              url: 'wx/getOpenId',
              header: {
                'Content-Type': 'application/json'
              },
              method: 'post',
              data: {
                code: code,
              },
              needLoadingIndicator: true,
              success: (rel) => {
                wx.setStorageSync("openid", rel.data.data.openid);
                console.log(this)
                this.setData({
                  openid: rel.data.data.openid
                })

              }


            }
            app.jamasTool.request(params);

          }

        })
      }
    })

  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  formSubmit: function (e) {
    var param = e.detail.value;
    console.log(param);
    this.mysubmit(param);
  },
  mysubmit: function (param) {
    var flag = this.checkUserName(param.username) && this.checkPassword(param)
    var that = this;
    if (flag) {
      this.setregistData1();

      let params = {
        url: 'user/login',
        header: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        data: {
          username: param.username,
          password: param.password,
          openid: this.data.openid,
        },
        needLoadingIndicator: false,
        success: (rel) => {
          console.log(rel)
          this.setregistData2();
          if (rel.data.code) {
            wx.setStorageSync("userinfo", rel.data.data.userinfo)
            wx.setStorageSync("token", rel.data.data.userinfo.token)
          }

          wx.showModal({
            title: '提示',
            showCancel: false,
            content: rel.data.msg,
            success: ()=>{
              console.log(rel.data.data)
              if (rel.data.code) {
                if (rel.data.data.userinfo.mobile === ""){
                  console.log("null mobile")
                  this.redirectToActivation()
                }else{
                  this.redirectToMyself()
                }  
              }
              
            }
          })     
        }
      }
      app.jamasTool.request(params);
    }
  },
  setregistData1: function () {
    this.setData({
      registBtnTxt: "登陆中",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  setregistData2: function () {
    this.setData({
      registBtnTxt: "登陆",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#ff9900",
      btnLoading: !this.data.btnLoading
    });
  },
  checkUserName: function (param) {
    var userName = util.regexConfig().userName;
    var inputUserName = param.trim();
    if (userName.test(inputUserName)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '用户名只能是3-12位中文、数字和英文，不能包含特殊字符'
      });
      return false;
    }
  },
  checkPassword: function (param) {
    var userName = param.username.trim();
    var password = param.password.trim();
    if (password.length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请设置密码'
      });
      return false;
    } else if (password.length < 6 || password.length > 20) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '密码长度为6-20位字符'
      });
      return false;
    } else {
      return true;
    }
  },
  redirectToActivation: function () {
    wx.redirectTo({
      url: '../activation/index'
    })
  },
  redirectToMyself: function () {
    wx.switchTab({
      url: '../my/index'
    })
  }

})