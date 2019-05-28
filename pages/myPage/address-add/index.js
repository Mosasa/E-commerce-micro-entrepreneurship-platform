// pages/order-list/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    linkMan: '',
    mobile: '',
    address: ''
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '新增收货地址'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    if (options.id) {
      this.setData({
        id: options.id
      })
    }
  },
  // 取消按钮
  bindCancel: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 保存和更新
  bindSave: function (e) {
    const params = {
      recipient: e.detail.value.linkMan,
      address: e.detail.value.address,
      mobile: e.detail.value.mobile,
      creatorId: app.globalData.openid,
    }
    if (params.recipient == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    if (params.mobile == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人手机',
        showCancel: false
      })
      return
    }
    if (params.address == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人地址',
        showCancel: false
      })
      return
    }
  },
})