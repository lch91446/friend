const config = require('/utils/config.js'); 

App({
  onLaunch: function(){
    console.log(this.jamasTool.globalConfig.baseRequestUrl);
  },
  jamasTool: {
    globalConfig: config,
    globalData: {
      userInfo: null,
      userToken: null,
    },
    request: function (params){
      let that = this;
      if (typeof params.needLoadingIndicator === 'undefined') {
        params.needLoadneedLoadingIndicatoringIndicator = false;
      }
      if (params.needLoadingIndicator) {
        wx.showLoading({
          title: '加载中',
          mask: true
        });
      }
      wx.request({
        url: !params.url.indexOf("http") ? params.url:that.globalConfig.baseRequestUrl + params.url,
        header: params.header || that.globalConfig.http.defaultHead,
        method: params.method || that.globalConfig.http.method,
        data: params.data,
        needLoadingIndicator: true,
        success: function(res){
          params.success && params.success(res);
        },
        fail: function(err){
          params.fail && params.fail(err);
        },
        complete: function () {
          if (params.needLoadingIndicator) {
            wx.hideLoading();
          }
        }
      })
    },
    getUserInfo: function (cb) {
      wx.login({
        success: (res) => {
          let code = res.code;
          wx.getUserInfo({
            withCredentials: true,
            success: (res) => {
              typeof cb == "function" && cb(code, res);
            }
          })
        }
      })
    },
    getUserToken: function () {
      return wx.getStorageSync("token")
    },
    setUserToken: function () {

    },
  }, 
  globalData: {
    userInfo: null,
    subDomain: "tz", // 如果你的域名是： https://api.it120.cc/abcd 那么这里只要填写 abcd
    version: "2.0",
    shareProfile: '百款精品商品，总有一款适合您', // 首页转发的时候话术
    token: ''
  }
})