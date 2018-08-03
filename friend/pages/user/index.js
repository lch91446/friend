import { $wuxGallery } from '../../utils/wux-components/wux'
const config = require('../../utils/config.js'); 
var app = getApp();

const data = Object.assign({
  token: "",
  userinfo: {
    userid: ""
  },
  urls: [
  ]
}, config.basicinfo, config.sysMsg);


Page({
  data: data,
  onLoad (option) {

    this.setData({
      token: app.jamasTool.getUserToken()
    })

    if (option.userid) {
      this.setData({
        userinfo: {
          userid: option.userid ? option.userid:1
        }
      })
    }

    let params = {
      url: 'operate/getUserInfoByUid',
      header: {
        'Content-Type': 'application/json',
        'token': this.data.token
      },
      method: 'post',
      data: {
        userid: this.data.userinfo.userid
      },
      needLoadingIndicator: true,
      success: (rel) => {
        console.log(rel)
        if (rel.data.code == "1") {
          this.setData({
            urls: rel.data.data.userinfo.useralbum,
            userinfo: {
              userid: rel.data.data.userinfo.id,
              labels: rel.data.data.LabelGroup,
              canSeeAlbum: rel.data.data.myAlbumCnt?true:false,
              relationshop: parseInt(rel.data.data.userinfo.relationshop),
              followCount: rel.data.data.userinfo.followCount,
              userFollowCount: rel.data.data.userinfo.userFollowCount,
              avatar: rel.data.data.userinfo.avatar,
              username: rel.data.data.userinfo.username,
              nickname: rel.data.data.userinfo.nickname,
              identification: rel.data.data.userinfo.relationshop == '2' ? true : false,
              age: rel.data.data.userinfo.birthday_age,
              constellation: rel.data.data.userinfo.birthday_start,
              gender: rel.data.data.userinfo.gender,
              height: rel.data.data.userinfo.userinfo.height ? rel.data.data.userinfo.userinfo.height : "未选择",
              weight: rel.data.data.userinfo.userinfo.weight ? rel.data.data.userinfo.userinfo.weight:"未选择",
              bloodtype: config.basicinfo.bloodarray[parseInt(rel.data.data.userinfo.userinfo.bloodtype)],
              education: config.basicinfo.educationarray[parseInt(rel.data.data.userinfo.userinfo.education)],
              income: config.basicinfo.incomearray[parseInt(rel.data.data.userinfo.userinfo.income)],
              nativeplace: config.basicinfo.placearray[parseInt(rel.data.data.userinfo.userinfo.nativeplace)],
              occupation: config.basicinfo.occupationarray[parseInt(rel.data.data.userinfo.userinfo.occupation)],
              hascar: config.basicinfo.cararray[parseInt(rel.data.data.userinfo.userinfo.hascar)],
              hasbaby: config.basicinfo.babyarray[parseInt(rel.data.data.userinfo.userinfo.hasbaby)],
              maritalStatus: config.basicinfo.maritalarray[parseInt(rel.data.data.userinfo.userinfo.maritalStatus)],
              hashouse: config.basicinfo.housearray[parseInt(rel.data.data.userinfo.userinfo.hashouse)],
            }
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
    app.jamasTool.request(params);

  },
  showGallery(e) {

    if (this.data.userinfo.canSeeAlbum){
      const dataset = e.currentTarget.dataset
      const current = dataset.current
      const urls = this.data.urls

      const _this = this

      $wuxGallery.show({
        current: current,
        urls: urls,
        isdelete: false,
        cancel: () => console.log('Close gallery')
      })

    }else{
      wx.showModal({
        title: '提示',
        content: '为了公平原则，你需要上传照片后才能查看大图',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/myalbum/index',
            })
          }
        }
      })
    }

  },
  focusCancle(e) {
    console.log('Cancle')

    wx.showModal({
      title: '',
      content: '确定不在关注此人？',
      showCancel: true,
      success: (res) => {
        if (res.confirm) {
          let id = this.data.userinfo.userid
          let params = {
            url: 'operate/focusCancle',
            header: {
              'Content-Type': 'application/json',
              'token': this.data.token
            },
            method: 'post',
            data: {
              userid: id
            },
            needLoadingIndicator: true,
            success: (rel) => {
              console.log(rel)
              if (rel.data.code == "1") {
                if (rel.data.data.result) {
                  let userinfo = this.data.userinfo
                  userinfo.relationshop = rel.data.data.relationShip
                  this.setData({
                    userinfo: userinfo
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '你已经取消关注了',
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
            }
          }
          app.jamasTool.request(params);

        }
      }
    })
  },
  focus(e) {
    console.log('focus')
    let id = this.data.userinfo.userid
    let params = {
      url: 'operate/focus',
      header: {
        'Content-Type': 'application/json',
        'token': this.data.token
      },
      method: 'post',
      data: {
        userid: id
      },
      needLoadingIndicator: true,
      success: (rel) => {
        console.log(rel)
        if (rel.data.code == "1") {
          if (rel.data.data.result) {
            let userinfo = this.data.userinfo
            userinfo.relationshop = rel.data.data.relationShip
            this.setData({
              userinfo: userinfo
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '你已经关注了',
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
  bindRegionChange: function (e) {
    let report = this.data.report
    console.log(e.detail.value)
    console.log(report)
    console.log(report[e.detail.value])
    
    let msg = "举报用户 " + this.data.userinfo.username + " "+ report[e.detail.value];

    let params = {
      url: 'operate/report',
      header: {
        'Content-Type': 'application/json',
        'token': this.data.token
      },
      method: 'post',
      data: {
        msg: msg,
        type: 1
      },
      needLoadingIndicator: true,
      success: (rel) => {
        console.log(rel)
        if (rel.data.code == "1") {
          if (rel.data.data.result) {
            wx.showToast({
              title: '举报成功',
            })
          }else{
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
