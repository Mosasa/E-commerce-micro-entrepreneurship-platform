const app = getApp();

Page({
  data: {},
  onLoad() {
    this.setData({
      username: app.globalData.userInfo.nickName
    });
  },
  clearText() {
    this.setData({
      username: '',
      display: 'display-none',
      disabled: true,
      class: 'disabled'
    });
  },
  changeStatus(e) {
    if (e.detail.value.length > 0) {
      this.setData({
        display: '',
        disabled: false,
        class: '',
        username: e.detail.value
      });
    } else {
      this.setData({
        display: 'display-none',
        disabled: true,
        class: 'disabled'
      });
    }
  },
  updataInfo(e) {
    app.globalData.userInfo.nickName = e.currentTarget.dataset.nickname
    wx.setStorage({
      key: 'user',
      data: app.globalData.userInfo,
      success: (res) => {
        wx.navigateBack({
          delta: 1
        });
      }
    })
  }
});
