var app = getApp();
var util = require("../../utils/util.js");
var register = require('../../utils/refreshLoadRegister.js');
Page({
  data: {
    loadingMoreHidden: true,
    userFocusList: [
    ],
    page: 0,
  },
  // 页面加载
  onLoad: function () {

    this.setData({
      token: app.jamasTool.getUserToken()
    })
    register.register(this);

    this.doLoadData({
      page: this.data.page
    });
  },
  onShow: function () {
    console.log("onShow");
  },
  doLoadData(params) {
    let params2 = {
      url: 'operate/getFans',
      header: {
        'Content-Type': 'application/json',
        'token': this.data.token
      },
      method: 'post',
      data: {
        page: params.page
      },
      needLoadingIndicator: true,
      success: (rel) => {

        if (rel.data.code == "1") {
          console.log(rel.data.data.list.length)
          if (rel.data.data.list.length > 0) {
            let page = this.data.page + 1
            let userFocusList = []
            for (let i = 0; i < rel.data.data.list.length; i++) {
              userFocusList.push({
                id: rel.data.data.list[i]["follow_user_id"],
                avatar: rel.data.data.list[i]["user2"]["avatar"],
                nickName: rel.data.data.list[i]["user2"]["nickname"],
                gender: rel.data.data.list[i]["user2"]["gender"],
                age: rel.data.data.list[i]["user2"]["birthday_age"],
                focus: true
              })
            }

            this.setData({
              page: page,
              userFocusList: [...this.data.userFocusList, ...userFocusList],
            })

          } else {
            this.setData({
              loadingMoreHidden: false
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
            title: rel.data.msg,
            showCancel: false,
            content: rel.data.data.err
          })
        }
      },
      complete: () => {
        register.loadFinish(this, false);
      }
    }
    app.jamasTool.request(params2);
  },
  refresh: function () {
    this.setData({
      loadingMoreHidden: true,
      page: 0,
      userFocusList: [
      ],
    })

    this.doLoadData({
      page: this.data.page
    });
  },
  loadMore: function () {
    this.doLoadData({
      page: this.data.page
    });
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
})