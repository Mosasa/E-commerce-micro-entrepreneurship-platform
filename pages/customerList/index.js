// pages/customerList/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customerList: [
      {
        img: '../../images/user.png',
        name: 'Mosa',
        number: '电话：'+'1234567890'
      },
      {
        img: '../../images/user.png',
        name: 'Mosa',
        number: '电话：'+'1234567890'
      },
      {
        img: '../../images/user.png',
        name: 'Mosa',
        number: '电话：'+'1234567890'
      },
      {
        img: '../../images/user.png',
        name: 'Mosa',
        number: '电话：'+'1234567890'
      },
      {
        img: '../../images/user.png',
        name: 'Mosa',
        number: '电话：'+'1234567890'
      },
      {
        img: '../../images/user.png',
        name: 'Mosa',
        number: '电话：'+'1234567890'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '客户列表'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

    wx.request({
      url: `${app.globalData.host}/store/getCustomers/${app.globalData.openid}`,
      success: res => {
        res = res.data;

        if (res.errCode === 0) {
          this.setData({
            customerList: res.data.map(d => ({
              name: d.nickName,
              number: `电话：${d.mobile}`,
              img: d.avatarUrl || '../../images/user.png',
            }))
          })
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