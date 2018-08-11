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
          wx.showModal({
            title: '警告',
            content: '系统异常，请稍候再试',
          })

          params.fail && params.fail(err);
        },
        complete: function () {
          
          if (params.needLoadingIndicator) {
            wx.hideLoading();
          }
          params.complete && params.complete();
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
    shareProfile: '百款精品商品，总有一款适合您', 
    shareimageUrl: "http://img.haining.cn/pic/20171208/qi_niu_1512719942777_950_381_448.jpg",
    message1: "超过最多修改次数，请联系管理员进行修改",
    sysAvatar: "http://img.haining.cn/pic/20171208/qi_niu_1512719942777_950_381_448.jpg",
    sysName: "系统消息"
  }
})