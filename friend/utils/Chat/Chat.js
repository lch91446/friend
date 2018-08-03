let app = getApp();

import until from '../util.js';

Component({
    data: {
        height: 0,  //屏幕高度
        isShow: false, //emoji是否显示
        emojiChar: "☺-😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
        //0x1f---
        emoji: [
            "60a", "60b", "60c", "60d", "60f",
            "61b", "61d", "61e", "61f",
            "62a", "62c", "62e",
            "602", "603", "605", "606", "608",
            "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
            "63a", "63b", "63c", "63d", "63e", "63f",
            "64a", "64b", "64f", "681",
            "68a", "68b", "68c",
            "344", "345", "346", "347", "348", "349", "351", "352", "353",
            "414", "415", "416",
            "466", "467", "468", "469", "470", "471", "472", "473",
            "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
        ],
        emojis: [],//qq、微信原始表情
        chatContent: '',
        isFocus: false,
        voices: [],
        speakerUrl:'./img/speak0.png',
        speakerUrlPrefix:'./img/speak',
        speakerUrlSuffix:'.png',
        isSpeaking: false ,
        isChat: true,  
        chatHeight: 0,
        scrollTop: 0,
        src: '',
        isAnd: false,
        touchStart: 0,
        touchMove: 0,
        isCancel: false,
        emojiUnicode: []
    },
    properties: {
        //设置聊天组件的高度
        contentHeight: {
            type: Number,
            value: 100
        },
        //传入用户的uid
        uid: {
            type: Number,
            value: 456881
        },
        // token: "",
        token: {
          type: String,
          value: ""
        },
    },

    ready() {
        let _this = this;
        //样式兼容
        wx.getSystemInfo({
            success(res){
                if(res.screenHeight === 640) {
                    _this.setData({
                        isAnd: true
                    })
                } else {
                    _this.setData({
                        isAnd: false
                    })
                }
            }
        })

        //获取之前的聊天信息
        this.getPreMessage()
        
        //获取屏幕的高度
        wx.getSystemInfo({
            success(res){
                _this.setData({
                    height: res.windowHeight * (_this.data.contentHeight / 100),
                    chatHeight: res.windowHeight * (_this.data.contentHeight / 100) - 49
                })
            }
        })
        //emoji表情
        let em = {}, emChar = this.data.emojiChar.split("-");
        let emojis = []
        this.data.emoji.forEach( (v, i) => {
            em = {
                char: emChar[i],
                emoji: "0x1f" + v
            };;
            emojis.push(em)
        });
        this.setData({
            emojis: emojis
        });

    },
    methods: {
        //通知
        notify: function(name, data) {
            console.log("new msg evnet");
            // 收到notify后，按照seq增量拉新消息
            this.onMeaasge();
        },
        //获取之前的聊天信息
        getPreMessage(){

          console.log(this)
          let params = {
            url: 'Operate/chat',
            header: {
              'Content-Type': 'application/json',
              'token': this.data.token
            },
            method: 'post',
            data: {
              "userid": this.data.uid,
              "action": "fetch_msg",
            },
            needLoadingIndicator: true,
            success: (rel) => {
              console.log(rel)
              if (rel.data.code == "1") {
                let chatLists = rel.data.data.result;
                let len = chatLists.length;//遍历的数组的长度

                if (this.data.uid==0){
                  for(let i = 0; i < len; i++){
                    chatLists[i]['avatar'] = app.globalData.sysAvatar
                    chatLists[i]['nickname'] = app.globalData.sysName
                    chatLists[i]['to_user_id'] = -1
                  }
                  wx.setNavigationBarTitle({
                    title: '与' + app.globalData.sysName + '聊天中',
                  })
                }else{
                  wx.setNavigationBarTitle({
                    title: '与' + rel.data.data.nickname + '聊天中',
                  })
                }

                this.setData({
                  chatLists: until.changeEmoji(chatLists),
                  scrollTop: 1000 * len  // 这里我们的单对话区域最高1000，取了最大值，应该有方法取到精确的
                });
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
        //拉取最新消息
        onMeaasge(){
        },
        //是否显示emoji表情框
        showEmoji(){
            this.setData({
                isShow: !this.data.isShow
            })
        },
        hiddenEmoji() {
          this.setData({
            isShow: false
          })
        },
        //选择emoji表情
        emojiChoose(e){
            let emojiUnicode = this.data.emojiUnicode;
            emojiUnicode.push(`[${e.currentTarget.dataset.oxf}]`)
            this.setData({
                chatContent: this.data.chatContent + `${e.currentTarget.dataset.emoji}`,
                emojiUnicode: emojiUnicode
            })
            console.log(this.data)
        },
        //input聚焦事件
        focus(){
            this.setData({
                isShow: false,
                isFocus: true
            })
        },
        //input输入事件
        bindinput(e){
            this.setData({
                chatContent: e.detail.value
            })
        },
        //提交聊天记录
        submitChat(){
          if(this.data.chatContent === '') {
              return
          }
          if (this.data.uid === 0) {
            wx.showToast({
              title: '暂不支持对话！',
            })
            return
          }
          let param = this.data.chatContent;
          console.log(param)
          let  regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/;
          if(param.match(regRule)) {
              for(let i = 0; i < this.data.emojiUnicode.length; i++) {
                  param = param.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/, this.data.emojiUnicode[i]);
              }
          }

          let params = {
            url: 'Operate/chat',
            header: {
              'Content-Type': 'application/json',
              'token': this.data.token
            },
            method: 'post',
            data: {
              "userid": this.data.uid,
              "action": "send_msg",
              "content": param
            },
            needLoadingIndicator: true,
            success: (rel) => {
              console.log(rel)
              if (rel.data.code == "1") {
                let chatLists = rel.data.data.result;
                let len = chatLists.length;//遍历的数组的长度
                this.setData({
                  chatContent: '',
                  isShow: false,
                  chatLists: until.changeEmoji(chatLists),
                  scrollTop: 1000 * len  // 这里我们的单对话区域最高1000，取了最大值，应该有方法取到精确的
                });
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
    }
})