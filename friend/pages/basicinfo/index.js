var app = getApp();
Page({
  data:{
    // 用户信息
    birthday: "未选择",
    avatar: "",
    nickName: "",
    userName: "",
    heightarray:[
      140, 141, 142, 143, 144, 145, 146, 147, 148, 149,
      150, 151, 152, 153, 154, 155, 156, 157, 158, 159,
      160, 161, 162, 163, 164, 165, 166, 167, 168, 169,
      170, 171, 172, 173, 174, 175, 176, 177, 178, 179,
      180, 181, 182, 183, 184, 185, 186, 187, 188, 189,
      190, 191, 192, 193, 194, 195, 196, 197, 198, 199       
    ],
    heighindex: 0,
    weightarray: [
      30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
      60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
      70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
      80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
    ],
    weightindex: 0,
    bloodarray: [
      "未选择", "A型", "B型", "AB型", "O型", "其他",
    ],
    bloodindex: 0,
    educationarray: [
      "未选择", "高中及以下", "中专", "大专", "大学本科", "硕士", "博士", "海归"
    ],
    educationindex: 0,
    placearray: [
      "未选择", "硖石街道", "海洲街道", "海昌街道", "马桥街道", "斜桥镇", "周王庙镇", 
      "盐官镇", "马桥镇", "许村镇", "长安镇", "黄湾镇", "袁花镇", "海盐县", 
      "嘉善县", "桐乡市", "嘉兴市", "其他地区",
    ],
    placeindex: 0,
    occupationarray: [
      "未选择", "公务员", "事业单位", "国企", "企业职员", "由职业", "个体户", "其他"
    ],
    occupationindex: 0,
    incomearray: [
      "未选择", "3000以下", "3000~4000", "4000~5000", "5000~7000", "7000~10000", 
      "10000~15000", "15000~20000", "20000以上"
    ],
    incomeindex: 0,
    cararray: [
      "未选择", "无车", "有车"
    ],
    carindex: 0,
    housearray: [
      "未选择", "与父母同住", "租房", "已购房（有贷款）", "已购房（有贷款）"
    ],
    houseindex: 0,
    maritalarray: [
      "未选择", "单身", "恋爱中", "已订婚", "已婚", "分居", "离异", "丧偶"
    ],
    maritalindex: 0,
    babyarray: [
      "未选择", "没有", "有且归我抚养", "有不归我抚养"
    ],
    babyindex: 0,
    token: "",
  },
// 页面加载
  onLoad:function(){
    wx.getStorage({
      key: 'token',
      success: (res) => {
        this.setData({
          token: res.data
        })
        console.log(this.data.token);
      },
      fail: (res) => {
        console.log("login in")
        // 页面初始化 options为页面跳转所带来的参数
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: "未登录",
          success: ()=>{
            this.redirectToLogin()
          }
        })
        
      }
    })

    this.setData({
      token: app.jamasTool.getUserToken()
    })

    let params3 = {
      url: 'Operate/getMyFansCount',
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
          wx.setStorageSync("userinfo", rel.data.data.userinfo)
          this.setData({
          
              avatar: rel.data.data.userinfo.avatar,
              nickName: rel.data.data.userinfo.nickname,
              userName: rel.data.data.userinfo.username,
        
          })
          console.log(this.data);
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
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
       birthday: e.detail.value
  
      
    })
  },
  bindRegionChange: function (e) {
    switch (e.target.id){
      case "heigh": console.log("heigh");
        this.setData({
          heighindex: e.detail.value
        })
      break;
      case "weight": console.log("weight"); 
        this.setData({
          weightindex: e.detail.value
        })
      break;
      case "blood": console.log("blood");
        this.setData({
          bloodindex: e.detail.value
        })
      break;
      case "education": console.log("education");
        this.setData({
          educationindex: e.detail.value
        })      
      break;
      case "place": ; console.log("place");
        this.setData({
          placeindex: e.detail.value
        })
      break;
      case "occupation": console.log("occupation"); 
        this.setData({
          occupationindex: e.detail.value
        })     
      break;
      case "income": console.log("income");
        this.setData({
          incomeindex: e.detail.value
        })
      break;
      case "house": console.log("house");
        this.setData({
          houseindex: e.detail.value
        })
      break;
      case "car": console.log("car"); 
        this.setData({
          carindex: e.detail.value
        })
      break;
      case "marital": console.log("marital"); 
        this.setData({
          maritalindex: e.detail.value
        })
      break;
      case "baby": console.log("baby"); 
        this.setData({
          babyindex: e.detail.value
        })
      break;
    }
    // this.setData({
    //   index: e.detail.value
    // })
  },
  uploadTap: function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值
        // wx.redirectTo({
        //   url: `../avatarUpload/getavater/upload?src=${src}`
        // })
      
        wx.navigateTo({
          url: `../avatarUpload/getavater/upload?src=${src}`
        })
      }
    })
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      console.log(ops.target)
    }
    return {
      title: app.globalData.shareProfile,
      path: 'pages/my/index',
      success: function (res) {
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  redirectToLogin: function () {
    wx.redirectTo({
      url: '../login/index'
    })
  },
})