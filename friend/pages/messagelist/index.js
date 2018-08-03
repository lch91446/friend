//获取应用实例
const app = getApp()

Page({
  data: {
    messageList: [
    ],
    msgtype: 1,
  },

  onLoad: function (option) {
    let msgtype = parseInt(option.type) ? parseInt(option.type) : this.data.msgtype
    let barTitle = '消息'
    this.setData({
      msgtype: msgtype
    })
    this.setData({
      token: app.jamasTool.getUserToken()
    })

    console.log(msgtype)
    switch (msgtype){
      case 1: 
        barTitle = "我的关注消息";
        break;
      case 2:
        barTitle = "我的粉丝消息";
        break;
      case 3:
        barTitle = "我的访客消息";
        break;
      case 4:
        barTitle = "系统消息";
        break;
    }
    wx.setNavigationBarTitle({
      title: barTitle,
    })

    this.getData(msgtype)
  },
  getData(msgtype) {
    let params = {
      url: 'operate/getMessageList',
      header: {
        'Content-Type': 'application/json',
        'token': this.data.token
      },
      method: 'post',
      data: {
        msgtype: msgtype
      },
      needLoadingIndicator: true,
      success: (rel) => {

        if (rel.data.code == "1") {
          console.log(rel)
          let messageList = []
          if (msgtype !== 4){
            let lth = rel.data.data.list.length
            for (let i = 0; i < lth; i++) {
              messageList.push(
                {
                  id: rel.data.data.list[i]['id'],
                  userid: rel.data.data.list[i]['user']['id'],
                  avatar: rel.data.data.list[i]['user']['avatar'],
                  nickname: rel.data.data.list[i]['user']['nickname'],
                  describeInfo: rel.data.data.list[i]['msg'][0],
                  formatUpdate: rel.data.data.list[i]['createtime_str'],
                  cnt: parseInt(rel.data.data.list[i]['message_tobe_cnt']),
                }
              )
            }
          }else{
            messageList.push(
              {
                id: rel.data.data.list['id'],
                userid: 0,
                avatar: app.globalData.sysAvatar,
                nickname: app.globalData.sysName,
                describeInfo: rel.data.data.list['message'],
                formatUpdate: rel.data.data.list['createtime_str'],
                cnt: parseInt(rel.data.data.list['cnt']),
              }
            )
          }

          this.setData({
            messageList: messageList,
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
            title: rel.data.msg,
            showCancel: false,
            content: rel.data.data.err
          })
        }
      },
      complete: () => {
        
      }
    }
    app.jamasTool.request(params);
  },
  bindCellTapHandler: function (e) {
    console.log(e.detail.tapItem.userid)  
    wx.navigateTo({
      url: '/pages/chat/index?userid=' + e.detail.tapItem.userid,
    })
  },

  bindOperateTapHandler: function (e) {
    let operateName = e.detail.tapItem;
    let index = e.detail.index;
    let group = this.data.messageList[index];

  //  let id = parseInt(group.id);
 //   console.log(id)
 
    if (this.data.msgtype == 4){
      wx.showToast({
        icon: 'none',
        title: '系统信息无法删除和已读',
        duration: 1500,
      });
      return
    }
    let act = "";
    switch (operateName) {
      case "删除":
          act = 'delete'
        break;
      case "已读":
          act = 'mark'
        break;
    }
    if (!act){
      return
    }

    let params = {
      url: 'operate/operaterMsg',
      header: {
        'Content-Type': 'application/json',
        'token': this.data.token
      },
      method: 'post',
      data: {
        act: act,
        user_id: group.userid,
        id: group.id
      },
      needLoadingIndicator: true,
      success: (rel) => {
        if (rel.data.code == "1") {
          console.log(rel)
          let messageList = this.data.messageList
          group
          if (act == 'mark'){
            messageList[index]['cnt'] = 0;
          }else{
            messageList.splice(index, 1);
          }
          this.setData({
            messageList: messageList,
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
            title: rel.data.msg,
            showCancel: false,
            content: rel.data.data.err
          })
        }
      },
      complete: () => {

      }
    }
    app.jamasTool.request(params);
  }
})
