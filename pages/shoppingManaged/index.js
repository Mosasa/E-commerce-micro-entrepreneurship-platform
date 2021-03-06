// pages/shoppingManaged/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeList: []
  },
  // 右滑商品下架功能
  downShift () {
     console.log('下架商品')
  },
  // 跳转商品详情
  toStoreDetail (e) {
    const id = e.detail.id
    wx.navigateTo({
      url: `../storeDetail/storeDetail?id=${id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品管理'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

    let _this = this;
    let storeId = options.storeId;
    wx.request({
      url: `${app.globalData.host}/storeCommodity?storeId=${storeId}`,
      method: 'GET', 
      success: function(res){
        let data = res.data.data;
        _this.setData({
          storeList: data.map(item => {
            return {
              id: item.id,
              img: item.imgs[0],
              name: item.cmName,
              number: '库存：' + (item.total - item.sellNum),
              price: item.price,
              moreIcon: '../../images/more.png',
              createDate: item.createDate
            }
          }).sort((pre, next) => {
            return new Date(next.createDate).getTime() - new Date(pre.createDate).getTime()
          })
        })
      },
      fail: function() {
        // fail
      },
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