// pages/storeDetail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    className: 'lalala',
    classifies:'类别一',
    classNum: 10,
    classPrice: 30,
    classDetail: 'balabalabalabalabala',
    readonly: true
  },
  onChange: function ({detail}) {
    this.setData ({
      checked: detail
    })

    wx.request({
      url: `${app.globalData.host}/commodity/${this.data.commodityId}`,
      method: 'PUT',
      data: {
        bedroomId: app.globalData.userInfo.bedroomId,
        openid: app.globalData.openid,
        status: detail ? 1 : -1
      },
      success: res => {
        res = res.data;
        if (res.errCode !== 0) {
          // 提示错误
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品详情'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

    this.setData({
      commodityId: options.id,
    })

    wx.request({
      url: `${app.globalData.host}/commodity/${options.id}`,
      method: 'GET',
      success: res => {
        res = res.data;
        if (res.errCode === 0) {
          this.setData({
            checked: res.data.status === 1 ,
            className: res.data.cmName,
            classifies: res.data.categoryId,
            classNum: res.data.total - res.data.sellNum,
            classPrice: res.data.price,
            classDetail: res.data.detail,
            readonly: res.data.creatorId !== app.globalData.openid,
          })
        } else {
          // 提示错误
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})