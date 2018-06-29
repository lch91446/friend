var util = require("../../utils/util.js");
var app = getApp();
Page({
  data: {
    registBtnTxt: "立刻激活",
    registBtnBgBgColor: "#ff9900",
    getSmsCodeBtnTxt: "获取验证码",
    getSmsCodeBtnColor: "#ff9900",
    // getSmsCodeBtnTime:60,
    btnLoading: false,
    registDisabled: false,
    smsCodeDisabled: false,
    phoneNum: '',
    token : "",
  },
  onLoad: function (options) {
    
    wx.getStorage({
      key: 'token',
      success: (res)=>{
        this.setData({
          token : res.data
        })
        console.log(this.data.token);
      },
      fail: (res)=>{
        console.log("login in")
        // 页面初始化 options为页面跳转所带来的参数
        this.redirectToLogin()
      }
    })
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

    wx.getStorage({
      key: 'timecount',
      success: (res)=>{
        console.log(res)
        if (res.data > 0){
          var count = res.data;
          if (count > 0) {
            this.setData({
              getSmsCodeBtnTxt: count + ' s',
              getSmsCodeBtnColor: "#999",
              smsCodeDisabled: true
            });
          }
          var si = setInterval(() => {
            if (count > 0) {
              count--;

              wx.setStorageSync("timecount", count);

              this.setData({
                getSmsCodeBtnTxt: count + ' s',
                getSmsCodeBtnColor: "#999",
                smsCodeDisabled: true
              });
            } else {
              this.setData({
                getSmsCodeBtnTxt: "获取验证码",
                getSmsCodeBtnColor: "#ff9900",
                smsCodeDisabled: false
              });
              count = 60;
              clearInterval(si);
            }
          }, 1000);
        }
      },
    })
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
    var flag = this.checkPhone(param.phone) && this.checkCaptcha(param.smsCode)
    if (flag) {
      this.setregistData1();

      let params = {
        url: 'user/changemobile',
        header: {
          'Content-Type': 'application/json',
          'token' : this.data.token
        },
        method: 'post',
        data: {
          mobile: param.phone,
          captcha: param.smsCode,
        },
        success: (rel) => {
          console.log(rel)
          if (rel.data.code == "1") {
            wx.setStorageSync("userinfo", rel.data.data.userinfo)
          }

          wx.showModal({
            title: '提示',
            showCancel: false,
            content: rel.data.msg,
            success: ()=>{
              if (rel.data.code == "401"){
                this.redirectToLogin()
              } else if (rel.data.code == "1") {
                this.redirectToMyself()
              }
            }
          })
          this.setregistData2();
        }
      }
      app.jamasTool.request(params);
    }
  },
  getPhoneNum: function (e) {
    var value = e.detail.value;
    this.setData({
      phoneNum: value
    });
  },
  setregistData1: function () {
    this.setData({
      registBtnTxt: "激活中",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  setregistData2: function () {
    this.setData({
      registBtnTxt: "立即激活",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#ff9900",
      btnLoading: !this.data.btnLoading
    });
  },
  checkPhone: function (param) {
    var phone = util.regexConfig().phone;
    var inputPhone = param.trim();
    if (phone.test(inputPhone)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的手机号码'
      });
      return false;
    }
  },
  checkCaptcha: function (param) {
    var captcha = util.regexConfig().captcha;
    var inputcaptcha = param.trim();
    if (captcha.test(inputcaptcha)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的6位验证码'
      });
      return false;
    }
  },
  getSmsCode: function () {
    var phoneNum = this.data.phoneNum;
    var that = this;

    var count = 60;
    if (this.checkPhone(phoneNum)) {

      let params = {
        url: 'sms/send',
        header: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        data: {
          mobile: phoneNum,
          event: "changemobile",
        },
        needLoadingIndicator: true,
        success: (rel) => {
          console.log(rel)
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: rel.data.msg
          })
        }


      }
      app.jamasTool.request(params);


      var si = setInterval(function () {
        if (count > 0) {
          count--;
         
          wx.setStorageSync("timecount", count);

          that.setData({
            getSmsCodeBtnTxt: count + ' s',
            getSmsCodeBtnColor: "#999",
            smsCodeDisabled: true
          });
        } else {
          that.setData({
            getSmsCodeBtnTxt: "获取验证码",
            getSmsCodeBtnColor: "#ff9900",
            smsCodeDisabled: false
          });
          count = 60;
          clearInterval(si);
        }
      }, 1000);
    }

  },
  redirectToLogin: function () {
    wx.redirectTo({
      url: '../login/index'
    })
  },
  redirectToMyself: function () {
    wx.redirectTo({
      url: '../my/index'
    })
  }

})