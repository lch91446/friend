var app = getApp();
Page({
  data: {
    token: "",
    userinfo: {
      userid: ""
    }
  },
  onLoad (option) {

    if (option.userid) {
      this.setData({
        userinfo: {
          userid: option.userid ? option.userid:1
        }
      })
    }
  }
})
