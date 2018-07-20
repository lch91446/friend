var app = getApp();
Page({
  data: {
    step: 0,
    gender: "",
    avatar: "",
    birthday: "",
    genderMaleClass: "hidden",
    genderFemaleClass: "hidden",
    steptext: '下一步',
    userinfo: {
      name: "",
    },
    token: "",
  },
  onLoad () {
    wx.getStorage({
      key: 'userinfo',
      // 能获取到则显示用户信息，并保持登录状态，不能就什么也不做
      success: (res) => {
        console.log(res);
        this.setData({
          userinfo: {
            name: res.data.nickname,
          }
        })
      },
      fail: (res) =>{
        this.redirectToRegister();
      }
    });
    wx.getStorage({
      key: 'token',
      success: (res) => {
        this.setData({
          token: res.data
        })
      },
      fail: (res) => {
        this.redirectToRegister();
      }
    })

  },
  redirectToRegister: function () {
    wx.redirectTo({
      url: '../register/index'
    })
  },
  nativeChange({ detail }) {

    this.setData({ birthday: detail.value.slice(0,3).join('-')})
    console.log(this.data.birthday);
  },
  clicknext(){
    console.log(this.data.step);
    
    if (this.data.step == 0 && this.data.gender == '') {
      wx.showModal({
        title: '警告',
        content: '请选择正确的性别',
        showCancel: false
      })
      return;
    }else if (this.data.step == 1){
      if (this.data.birthday == "") {
        wx.showModal({
          title: '警告',
          content: '请选择正确的出生年月日',
          showCancel: false
        })
        return;
      }
      this.setData({
        step: 2,
        steptext: "开始交友",
      })
    } else if (this.data.step == 2) {
      //push data
      console.log(this.data)
     
      if (this.data.avatar == "") {
        wx.showModal({
          title: '警告',
          content: '请上传本人照片',
          showCancel: false
        })
        return;
      }
      wx.uploadFile({
        url: app.jamasTool.globalConfig.baseRequestUrl + "user/profileGBA",
        filePath: this.data.avatar,
        name: 'file',
        header: {
          'token': this.data.token
        },
        formData: {
          'gender': this.data.gender,
          'birthday': this.data.birthday
        },
        success: (res) => {
          let data = (JSON.parse(res.data))
          console.log(data)

          if (data.code) {
            wx.setStorageSync("userinfo", data.data.userinfo)
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: data.msg,
              success: () => {
     
                wx.switchTab({
                    url: '../ListView/ListView'
                  })
               
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
        }
      })
    }else if (this.data.step < 2){
      let prestep = this.data.step + 1;
      this.setData({
        step: prestep,
      })
    }

  },
  genderChange(detail){
    this.setData({
      gender: detail.detail.value,
      genderMaleClass: detail.detail.value=="male"?"":"hidden",
      genderFemaleClass: detail.detail.value == "female" ? "" : "hidden",
    })
  },
  chooseimage(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值


        wx.navigateTo({
          url: `../avatarUpload/getavater/upload?src=${src}`
        })
      }
    })
  }
})