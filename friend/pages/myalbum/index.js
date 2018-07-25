import { $wuxGallery } from '../../utils/wux-components/wux'
var app = getApp();
Page({
	data: {
    token: "",
		urls: [
		],
	},
	onLoad() {

    this.setData({
      token: app.jamasTool.getUserToken()
    })

    let params = {
      url: 'user/getUserAlbum',
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
            urls: rel.data.data.userAlbum
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
		const dataset = e.currentTarget.dataset
		const current = dataset.current
		const urls = this.data.urls

    const _this = this

		$wuxGallery.show({
			current: current, 
			urls: urls, 
			[`delete`](current, urls){

        console.log(urls[current]);
        let albumid = urls[current]['id']

        let params = {
          url: 'user/delUserAlbum',
          header: {
            'Content-Type': 'application/json',
            'token': _this.data.token
          },
          method: 'post',
          data: {
            albumid: albumid
          },
          needLoadingIndicator: true,
          success: (rel) => {

            if (rel.data.code == "1") {
              urls.splice(current, 1)
              _this.setData({
                urls: urls,
              })
            } else if (rel.data.code == "401") {
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: rel.data.msg,
                success: (res) => {
                  _this.redirectToLogin();
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



				return !0
			},
			cancel: () => console.log('Close gallery')
		})
	},
  uploadImg(){

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
          url: app.jamasTool.globalConfig.baseRequestUrl + "user/uploadImg",
          filePath: src,
          name: 'file',
          header: {
            'token': this.data.token
          },
          formData: {},
          success: (res) => {
            let data = (JSON.parse(res.data))
            console.log(data)
            
            if (data.code == "1") {

              let urls = this.data.urls;
              urls.push(data.data.image);
              this.setData({
                urls: urls
              })

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
  redirectToLogin: function () {
    wx.redirectTo({
      url: '../login/index'
    })
  },
})