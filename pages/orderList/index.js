// pages/orderList/orderList.js
const app = getApp();
const statusArr = {
  '-1': '待发货',
  '0': '已发货',
  '1': '已完成',
  '-2': '已退单'
}
const colorArr = {
  '-1': '#FF7F24',
  '0': '#3CB371',
  '1': '#BEBEBE',
  '-2': '#FF0000'
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [
      {
        id: 0,
        tradeName: '啦啦啦啦啦',
        customerName: 'mosa',
        orderTime: '2019-03-01 16:32',
        orderStatus: 0,
        statusText: '待确认',
        statusColor: '#FF7F24'
      },
      {
        id: 1,
        tradeName: '啦啦啦啦啦',
        customerName: '黄大宝',
        orderTime: '2019-03-01 16:32',
        orderStatus: 1,
        statusText: '已确认',
        statusColor: '#3CB371'
      },
      {
        id: 2,
        tradeName: '啦啦啦啦啦',
        customerName: '黄大宝',
        orderTime: '2019-03-01 16:32',
        orderStatus: 2,
        statusText: '已结束',
        statusColor: '#BEBEBE'
      },
      {
        id: 3,
        tradeName: '啦啦啦啦啦',
        customerName: '黄大宝',
        orderTime: '2019-03-01 16:32',
        orderStatus: 3,
        statusText: '已退单',
        statusColor: '#FF0000'
      },
    ],
    detailList: {}
  },
  // formatStatusColor: function () {
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单管理'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },
  toOrderDetail: function (e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../orderDetail/orderDetail?id=${id}`
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  formatOrderTime (d) {
    return d;
  },
  formatTradeName (d) {
    if (d.length > 8) {
      return d.slice(0, 6) + '...'
    } else {
      return d;
    }
  },
  formatCustomerName (d) {
    if (d.length > 10) {
      return d.slice(0, 10) + '...'
    } else {
      return d;
    }
  },  
  formatStatusText (d) {
    if (d === -1) {
      return '未确认';
    }else if (d === 1) {
      return '已确认';
    } else if (d === 2) {
      return '已结束';
    } else if (d === 3) {
      return '已退单'
    }
  },
  formatStatusColor (d) {
    if (d === -1) {
      return '#FF7F24';
    }else if (d === 1) {
      return '#3CB371';
    } else if (d === 2) {
      return '#BEBEBE';
    } else if (d === 3) {
      return '#FF0000'
    }
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