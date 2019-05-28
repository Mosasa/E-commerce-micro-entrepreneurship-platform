const app = getApp();

Page({
  data: {
    loading : true
  },
  onShow() {
    this.setData({
      list: [{
        text: '头像',
        tip: '',
        img: true,
        info: app.globalData.userInfo.avatarUrl
      }, {
        text: '昵称',
        tip: '',
        url: 'username-edit/username-edit',
        info: app.globalData.userInfo.nickName
      }, {
        text: '绑定手机号',
        tip: '',
        url: 'tel-bind/tel-bind',
        info: app.globalData.userInfo.mobile || '尚未绑定'
      }]
    });
    console.log(app.globalData.userInfo)
  },
  navigateTo(e) {
    const url = e.currentTarget.dataset.url;
    const that = this;
    if (url === undefined) {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
          console.log(tempFilePaths[0]);
          wx.saveFile({
            tempFilePath: tempFilePaths[0],
            success: (res) => {
              console.log(res)
              app.globalData.userInfo.avatarUrl = res.savedFilePath
              wx.setStorage({
                key: 'user',
                data: app.globalData.userInfo,
                success: () => {
                  console.log(app.globalData.userInfo)
                  this.onShow();
                }
              })
            },
            fail: (res) => {
            }
          })
        }
      });
    } else {
      wx.navigateTo({
        url
      });
    }
  }
});
