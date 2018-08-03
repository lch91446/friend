let app = getApp();

Page({
    data: {
      uid: 0,
      token: ""
    },
    onLoad(option){

      this.setData({
        token: app.jamasTool.getUserToken(),
        uid: option.userid ? parseInt(option.userid) :0
      })

      this.chat = this.selectComponent("#chat");
      this.chat.notify();
    }
})