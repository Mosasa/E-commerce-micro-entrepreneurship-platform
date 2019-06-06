// pages/storePage/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomNumber: '',// 寝室号信息
    storeTotal: {
      incomeText: '宿舍店铺总营业额(元)',
      TotalMoney: 1.0,
      orderNum: 1
    },
    perTotal: {
      incomeText: '个人总营业额(元)',
      TotalMoney: 0,
      orderNum: 0,
      borderLeft: '0.5rpx solid #CFCFCF'
    },
    storeManaged: [
      {
        managedImg: '../../images/store-page-icon/store-mess.png',
        backgroundColor: '#000080',
        borderTop: '0.5rpx solid #CFCFCF',
        borderRight: '0.5rpx solid #CFCFCF',
        managedText: '店铺信息'
      },
      {
        managedImg: '../../images/store-page-icon/add-shopping.png',
        backgroundColor: "#6A5ACD",
        borderTop: '0.5rpx solid #CFCFCF',
        borderRight: '0.5rpx solid #CFCFCF',
        managedText: '新增商品'
      },
      {
        managedImg: '../../images/store-page-icon/shopping-managed.png',
        backgroundColor: "#2E8B57",
        borderTop: '0.5rpx solid #CFCFCF',
        borderRight: '0.5rpx solid #CFCFCF',
        managedText: '商品管理'
      },
      {
        managedImg: '../../images/store-page-icon/order-list.png',
        backgroundColor: "#4169E1",
        borderTop: '0.5rpx solid #CFCFCF',
        managedText: '订单管理'
      },
      {
        managedImg: '../../images/store-page-icon/saled-list.png',
        backgroundColor: "#006400",
        borderTop: '0.5rpx solid #CFCFCF',
        borderBottom: '0.5rpx solid #CFCFCF',
        borderRight: '0.5rpx solid #CFCFCF',
        managedText: '今日已售'
      },
      {
        managedImg: '../../images/store-page-icon/cus-list.png',
        backgroundColor: "#CD5555",
        borderTop: '0.5rpx solid #CFCFCF',
        borderBottom: '0.5rpx solid #CFCFCF',
        borderRight: '0.5rpx solid #CFCFCF',
        managedText: '客户列表'
      },
      {
        managedImg: '../../images/store-page-icon/shop-per.png',
        backgroundColor: "#009ACD",
        borderTop: '0.5rpx solid #CFCFCF',
        borderBottom: '0.5rpx solid #CFCFCF',
        borderRight: '0.5rpx solid #CFCFCF',
        managedText: '店员列表'
      },
      {
        managedImg: '../../images/store-page-icon/message.png',
        backgroundColor: "#0000CD",
        borderTop: '0.5rpx solid #CFCFCF',
        borderBottom: '0.5rpx solid #CFCFCF',
        managedText: '消息中心'
      },
    ],
    currentType: 0,
    storeMessage: {
      storeName: '',
      storeAddress: '',
      storeStatus: 0
    }
  },
  selectManaged: function (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      currentType: index
    })
    this.switchTap();
  },
  switchTap: function () {
    console.log(this.data.currentType);
    // let that = this;
    // wx.showLoading();
    if (this.data.currentType == 0){
      // 带店铺参数跳转到店铺详情信息
      wx.navigateTo({
        url: `../storeMessage/storeMessage?storeMess=${JSON.stringify(this.data.storeMessage)}`
      });
    } else if (this.data.currentType == 1) {
      // 新增商品
      wx.navigateTo({
        url: '../addStore/addStore'
      });
    } else if (this.data.currentType == 2) {
      // 商品管理
      wx.navigateTo({
        url: `../shoppingManaged/shoppingManaged?storeId=${app.globalData.userInfo.bedroomId}`
      });
    } else if (this.data.currentType == 3) {
      // 订单管理
      wx.navigateTo({
        url: '../orderList/orderList'
      });
    } else if (this.data.currentType == 4) {
      // 查询当天已售列表
      wx.navigateTo({
        url: '../todayOrder/todayOrder'
      });
    } else if (this.data.currentType == 5) {
      // 查询客户列表
      wx.navigateTo({
        url: '../customerList/customerList'
      });
    } else if (this.data.currentType == 6) {
      // 查询店员列表
      wx.navigateTo({
        url: '../clerkList/clerkList'
      });
    } else if (this.data.currentType == 7) {
      // 消息中心
      wx.navigateTo({
        url: '../messCenter/messCenter'
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '店铺主页'
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.request({
      url: `${app.globalData.host}/store/${app.globalData.userInfo.bedroomId}`,
      method: 'GET',
      success: res => {
        res = res.data;
        console.log(res);
        if (res.errCode === 0) {
          this.setData({
            roomNumber: res.data.bedroomId,
            storeTotal: {
              incomeText: '宿舍店铺总营业额(元)',
              TotalMoney: res.data.incomeTotal,
              orderNum: res.data.orderTotal            
            },
            storeMessage: {
              storeName: res.data.stName,
              storeAddress: res.data.address,
              storeStatus: res.data.status
            }
          })
        }
      }
    })

    this.setData({
      perTotal: {
        incomeText: '个人总营业额(元)',
        TotalMoney: app.globalData.userInfo.income,
        orderNum: app.globalData.userInfo.orderTotal,
        borderLeft: '0.5rpx solid #CFCFCF'
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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