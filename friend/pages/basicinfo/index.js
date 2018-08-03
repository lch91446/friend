var app = getApp();
var util = require("../../utils/util.js");
const config = require('../../utils/config.js'); 
var app = getApp();

const data = Object.assign({
  // 用户信息
  birthday: "未选择",
  constellation: "",
  avatar: "",
  nickName: "",
  userName: "",
  gender: "",
  heightarray: [
    140, 141, 142, 143, 144, 145, 146, 147, 148, 149,
    150, 151, 152, 153, 154, 155, 156, 157, 158, 159,
    160, 161, 162, 163, 164, 165, 166, 167, 168, 169,
    170, 171, 172, 173, 174, 175, 176, 177, 178, 179,
    180, 181, 182, 183, 184, 185, 186, 187, 188, 189,
    190, 191, 192, 193, 194, 195, 196, 197, 198, 199
  ],
  heigh: "",
  heighindex: 0,
  weigh: "",
  weightindex: 0,
  bloodindex: 0,
  educationindex: 0,
  placeindex: 0,
  occupationindex: 0,
  incomeindex: 0,
  carindex: 0,
  houseindex: 0,
  maritalindex: 0,
  babyindex: 0,
  userlabelStr: "",
  token: "",
  changeLabel: false,
  labelGroup: [],
  selectLabel: [],
  userlabelStrArr: [],
  changeFieldArr: [],
  birthdaychange: 0,
  heightchange: 0,
  incomechange: 0,
  educationchange: 0,


}, config.basicinfo);

Page({
  data:data,
// 页面加载
  onLoad:function(){

    this.setData({
      token: app.jamasTool.getUserToken()
    })

    let params3 = {
      url: 'Operate/getUserInfo',
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
              gender: rel.data.data.userinfo.gender == "male" ? "男" : "女",
              birthday: rel.data.data.userinfo.birthday,
              birthdaychange: rel.data.data.userinfo.birthdaychange,
              constellation: this.getAstro(rel.data.data.userinfo.birthday)
          })
     

          if (rel.data.data.userinfo.userinfo){
            this.setData({
              heighindex: this.data.heightarray.indexOf(parseInt(rel.data.data.userinfo.userinfo.height)),
              heigh: rel.data.data.userinfo.userinfo.height,
              weightindex: this.data.weightarray.indexOf(parseInt(rel.data.data.userinfo.userinfo.weight)),
              weigh: rel.data.data.userinfo.userinfo.weight,
              bloodindex: rel.data.data.userinfo.userinfo.bloodtype,
              educationindex: rel.data.data.userinfo.userinfo.education,
              placeindex: rel.data.data.userinfo.userinfo.nativeplace,
              occupationindex: rel.data.data.userinfo.userinfo.occupation,
              incomeindex: rel.data.data.userinfo.userinfo.income,
              carindex: rel.data.data.userinfo.userinfo.hascar,
              houseindex: rel.data.data.userinfo.userinfo.hashouse,
              maritalindex: rel.data.data.userinfo.userinfo.maritalStatus,
              babyindex: rel.data.data.userinfo.userinfo.hasbaby,
              heightchange: rel.data.data.userinfo.userinfo.heightchange,
              incomechange: rel.data.data.userinfo.userinfo.incomechange,
              educationchange: rel.data.data.userinfo.userinfo.educationchange
            })
          }
          if (rel.data.data.userinfo.userlabelStr) {
            this.setData({
              userlabelStr: rel.data.data.userinfo.userlabelStr.join('、'),
              userlabelStrArr: rel.data.data.userinfo.userlabelStr
            })
          }
          if (rel.data.data.userinfo.userlabelArr) {
            this.setData({
              selectLabel: rel.data.data.userinfo.userlabelArr
            })
          } 
          this.setData({
            labelGroup: rel.data.data.LabelGroup
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
  goChoiceLabel: function(){
    this.setData({
      changeLabel: true
    })
  },
  goUserInfo: function(){
    let changeFieldArr = this.data.changeFieldArr
    this.addToArr(changeFieldArr, "label_ids")
    this.setData({
      changeLabel: false,
      changeFieldArr: changeFieldArr
    }) 
  },
  bindDateChange: function (e) {
    
    //生日只能修改一次
    if (this.data.birthdaychange > 0){
      wx.showModal({
        title: app.globalData.message1,
        showCancel: false
      })
      return
    }
    let changeFieldArr = this.data.changeFieldArr
    this.addToArr(changeFieldArr, "birthday")

    this.setData({
       birthday: e.detail.value,
       constellation: this.getAstro(e.detail.value),
       changeFieldArr: changeFieldArr
    })
    console.log(this.data.changeFieldArr)
  },
  bindRegionChange: function (e) {
    let changeFieldArr = this.data.changeFieldArr
    switch (e.target.id){
      case "heigh":  
        //身高只能修改一次
        if (this.data.heightchange > 0) {
          wx.showModal({
            title: app.globalData.message1,
            showCancel: false
          })
          return
        }

        this.addToArr(changeFieldArr, "height")
        this.setData({
          heighindex: e.detail.value,
          heigh: this.data.heightarray[parseInt(e.detail.value)],
          changeFieldArr: changeFieldArr
        })
      break;
      case "weight": 
       
        this.addToArr(changeFieldArr, "weight")
        this.setData({
          weightindex: e.detail.value,
          weigh: this.data.weightarray[parseInt(e.detail.value)],
          changeFieldArr: changeFieldArr
        })
      break;
      case "blood": 
        this.addToArr(changeFieldArr, "bloodtype")
        this.setData({
          bloodindex: e.detail.value,
          changeFieldArr: changeFieldArr
        })
      break;
      case "education":  
        //学历只能修改3次
        if (this.data.educationchange > 2) {
          wx.showModal({
            title: app.globalData.message1,
            showCancel: false
          })
          return
        }
 
        this.addToArr(changeFieldArr, "education")
        this.setData({
          educationindex: e.detail.value,
          changeFieldArr: changeFieldArr
        })      
      break;
      case "place": ; 

        this.addToArr(changeFieldArr, "nativeplace")
        this.setData({
          placeindex: e.detail.value,
          changeFieldArr: changeFieldArr
        })
      break;
      case "occupation": 
        this.addToArr(changeFieldArr, "occupation")
        this.setData({
          occupationindex: e.detail.value,
          changeFieldArr: changeFieldArr
        })     
      break;
      case "income":
        //收入只能修改10次
        if (this.data.incomechange > 9) {
          wx.showModal({
            title: app.globalData.message1,
            showCancel: false
          })
          return
        }
        this.addToArr(changeFieldArr, "income")
        this.setData({
          incomeindex: e.detail.value,
          changeFieldArr: changeFieldArr
        })
      break;
      case "house": 
        this.addToArr(changeFieldArr, "hashouse")
        this.setData({
          houseindex: e.detail.value,
          changeFieldArr: changeFieldArr
        })
      break;
      case "car": 
        this.addToArr(changeFieldArr, "hascar")
        this.setData({
          carindex: e.detail.value,
          changeFieldArr: changeFieldArr
        })
      break;
      case "marital": 
        this.addToArr(changeFieldArr, "maritalStatus")
        this.setData({
          maritalindex: e.detail.value,
          changeFieldArr: changeFieldArr
        })
      break;
      case "baby": 
        this.addToArr(changeFieldArr, "hasbaby")
        this.setData({
          babyindex: e.detail.value,
          changeFieldArr: changeFieldArr
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
  labelToggle: function(e){
    let id = e.target.dataset.id
    let groudid = e.target.dataset.groudid
    let lid = e.target.dataset.lid
    let name = e.target.dataset.name
    let labelGroup = this.data.labelGroup
    let selectLabel = this.data.selectLabel
    let userlabelStrArr = this.data.userlabelStrArr

    labelGroup[groudid]["label"][lid]["sta"] = !labelGroup[groudid]["label"][lid]["sta"]
    if (labelGroup[groudid]["label"][lid]["sta"]){
      selectLabel.push(String(id))
      userlabelStrArr.push(name)
      labelGroup[groudid]["cnt"]++
      if (labelGroup[groudid]["cnt"]>3){
        labelGroup[groudid]["cnt"] = 3
        labelGroup[groudid]["label"][lid]["sta"] = !labelGroup[groudid]["label"][lid]["sta"]
        wx.showToast({
          title: '每项最多选择3个标签',
          icon: 'none'
        })
        return
      }
    }else{
      this.arrRmove(selectLabel, String(id))
      this.arrRmove(userlabelStrArr, name)
      labelGroup[groudid]["cnt"]--
    }
    
    this.setData({
      labelGroup: labelGroup,
      selectLabel: selectLabel,
      userlabelStrArr: userlabelStrArr,
      userlabelStr: userlabelStrArr.join("、")
    })


  },
  addToArr(arr, elem) {
    if (Array.isArray(arr)) {
      let index = arr.indexOf(elem);
      if (index == -1) {
        arr.push(elem);
      }
    }
  },
  arrRmove(arr, elem){
    if (Array.isArray(arr)){
      let index = arr.indexOf(elem);
      if (index > -1) {
        arr.splice(index, 1);
      }
    }
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
  changeGender(){
    wx.showModal({
      title: app.globalData.message1,
      showCancel: false
    })
  },
  getAstro(data){ 
    let dataArr = data.split("-");
    let m = dataArr[1]
    let d = dataArr[2]
    return "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯".substr(m * 2 - (d < "102223444433".charAt(m - 1) - -19) * 2, 2);
  },
  checkUserName(e) {
    let nickName = e.detail.value
    var userName = util.regexConfig().userName;
    if (userName.test(nickName)) {
      let changeFieldArr = this.data.changeFieldArr
      this.addToArr(changeFieldArr, "nickname")
      this.setData({
        nickName: nickName,
        changeFieldArr: changeFieldArr
      })
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '昵称只能是3-12位中文、数字和英文，不能包含特殊字符'
      });
      return false;
    }
  },
  saveUserInfo(){
    wx.showLoading({
      title: '请等待',
    })

    let formData =  {
      'nickname': this.data.nickName,
      'birthday': this.data.birthday,
      'height': this.data.heigh,
      'weight': this.data.weigh,
      'bloodtype': this.data.bloodindex,
      'education': this.data.educationindex,
      'nativeplace': this.data.placeindex,
      'occupation': this.data.occupationindex,
      'income': this.data.incomeindex,
      'hashouse': this.data.houseindex,
      'hascar': this.data.carindex,
      'maritalStatus': this.data.maritalindex,
      'hasbaby': this.data.babyindex,
      'label_ids': this.data.selectLabel.join(','),
      'changeFieldArr': this.data.changeFieldArr.join(',')
    }
   
    if (this.data.avatar.indexOf("haining") > 0){
      let params = {
        url: 'user/profile',
        header: {
          'Content-Type': 'application/json',
          'token': this.data.token
        },
        method: 'post',
        data: formData,
        success: (rel) => {
          console.log(rel)

          if (rel.data.code) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: rel.data.msg
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
          }else {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: rel.data.msg
            })
           
          }
          wx.hideLoading()
        },

      }
      app.jamasTool.request(params);
    }else{

      console.log(this.data.avatar)

      wx.uploadFile({
        url: app.jamasTool.globalConfig.baseRequestUrl + "user/profile",
        filePath: this.data.avatar,
        name: 'file',
        header: {
          'token': this.data.token
        },
        formData: formData,
        success: (res) => {
          let data = (JSON.parse(res.data))
          console.log(data)

          if (data.code == "1") {
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
          wx.hideLoading()
        },
        fail: (res) => {
          console.log(res)
        },
      })
    }



  },
  redirectToLogin: function () {
    wx.redirectTo({
      url: '../login/index'
    })
  },
})