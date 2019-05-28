// pages/orderDetail/orderDetail.js
const app = getApp();
const btnInfo = {
  '-1': '发货',
  '0': '送达',
  '1': '完成'
} 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasStepList: true, // 已退单的情况不显示step
    steps: [
      {
        text: '未确认',
      },
      {
        text: '已确认',
      },
      {
        text: '已结束',
      },
    ],
    active: 0,
    btnText: '确认订单',
    showBtn: true,
    orderId: '#456624',
    orderStatus: '未确定',
    conList: [
      {
        conName: '撞色T恤',
        conNum: 1,
        conPrice: 167
      },
      {
        conName: '休闲长裤',
        conNum: 1,
        conPrice: 176
      },
      {
        conName: '港风外套',
        conNum: 1,
        conPrice: 276
      },
    ],
    totalPrice: 0,
    userMess: {
      userName: '路飞',
      userAddress: '西区一栋303',
      userMobile: '13870162847',
      remark: '备注啦'
    }
  },
  formatBtnText: function () {
    if (this.data.active == 0) {
      this.setData({
        btnText: '确认订单'
      })
    } else if (this.data.active == 1) {
      this.setData({
        btnText: '结束订单'
      })
    } else if (this.data.active == 2) {
      this.setData({
        btnText: ''
      })
    }
  },
  toNextStep: function() {
    let currentActive = this.data.active;
    let nextActive = currentActive + parseInt(1);
    if (nextActive == 2) {
      this.setData({
        showBtn: false,
        active: nextActive
      })
    } else {
      this.setData({
        showBtn: true,
        active: nextActive
      })
      if (nextActive == 1) {
        this.setData({
          btnText: '结束订单'
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.formatBtnText();
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    });

    this.setData({
      orderId: options.id,
      openid: app.globalData.openid,
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
    // this.formatBtnText();
    this.setData({
      totalPrice: this.data.conList.reduce((total ,item) => {
        return total + parseFloat(item.conPrice);
      }, 0)
    })
  },

  changeStatus: function (e) {
    const { item, index } = e.target.dataset;

    let status = 1;

    switch(item.status) {
      case -1: status = 0; break;
      case 0: status = 1; break;
    }
  }

})