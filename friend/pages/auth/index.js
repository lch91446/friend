var util = require("../../utils/util.js");
var app = getApp();
Page({
	data: {
    token: "",
    img: "",
    imgFace: "",
    Id: "",
    Name: ""
	},
	onLoad() {

    this.setData({
      token: app.jamasTool.getUserToken()
    })

    let params = {
      url: 'user/getAuthInfo',
      header: {
        'Content-Type': 'application/json',
        'token': this.data.token
      },
      method: 'post',
      data: {},
      needLoadingIndicator: true,
      success: (rel) => {
        
        if (rel.data.code ==  "1") {
          this.setData({
            img: rel.data.data.info.ID_imageBack,
            imgFace: rel.data.data.info.ID_image,
            Id: rel.data.data.info.IDnumber,
            Name: rel.data.data.info.name
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
  uploadImg(e){
    const imgTpye = e.currentTarget.dataset.img
    console.log(imgTpye)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res)=> {
        const src = res.tempFilePaths[0]
        wx.showLoading({
          title: '请等待',
        })
        wx.uploadFile({
          url: app.jamasTool.globalConfig.baseRequestUrl + "user/uploadAuthImg",
          filePath: src,
          name: 'file',
          header: {
            'token': this.data.token
          },
          formData: {
            imgTpye: imgTpye
          },
          success: (res) => {
            let data = (JSON.parse(res.data))
            console.log(data)
            
            if (data.code == "1") {

              if (imgTpye == 'img') {
                this.setData({
                  img: data.data.image,
                })
              } else {
                this.setData({
                  imgFace: data.data.image
                })
              }

              wx.showModal({
                title: '提示',
                showCancel: false,
                content: data.msg
              })
            } else if (data.code == "401") {
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: data.msg,
                success: (res) => {
                  this.redirectToLogin();
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: data.msg
              })
            }
          },
          fail: (res) => {
            console.log(res)
          },
          complete: (res) => {
            wx.hideLoading()
          }
        })
      }
    })
  },
  changeName(e){
    this.setData({
      Name: e.detail.value
    })
  },
  changeId(e) {
    this.setData({
      Id: e.detail.value
    })
  },
  checkIdNo(param) {
    var regIdNo = util.regexConfig().regIdNo;
    var IdNo = param.trim();
    if (regIdNo.test(IdNo)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的身份证号码'
      });
      return false;
    }
  },
  checkName(param) {
    var regName = util.regexConfig().regName;
    var Name = param.trim();
    if (regName.test(Name)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的姓名'
      });
      return false;
    }
  },
  checkImage(param) {
    var Image = param.trim();
    if (Image) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的姓名'
      });
      return false;
    }
  }, 
  submit() {
    this.checkName(this.data.Name) && this.checkIdNo(this.data.Id) && this.checkImage(this.data.img) && this.checkImage(this.data.imgFace)
    
    let params = {
      url: 'user/auth',
      header: {
        'Content-Type': 'application/json',
        'token': this.data.token
      },
      method: 'post',
      data: {
        id: this.data.Id,
        name: this.data.Name,
      },
      needLoadingIndicator: true,
      success: (rel) => {

        if (rel.data.code == "1") {
          wx.showToast({
            icon: 'none',
            title: '上传成功，等待系统审核',
            duration: 2000
          })

          setTimeout(function(){
            wx.switchTab({
              url: '/pages/my/index',
            })
          },2000)
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