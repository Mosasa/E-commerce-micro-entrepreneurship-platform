// pages/order-list/index.js
let app = getApp()
const statusValue = [10, -1, 1, -2];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusType: ["全部", "待发货", "已完成", "已取消"],
    currentType: 10,
    tabClass:["","","","","",""],
    orderList: []
  },
  statusTap(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      currentType: index,
    })
    this.getOrderList(index)
  },
  //支付
  toPayTap(e){
    let id = e.currentTarget.dataset.id
    this.changeStatus(id, 1)
  },

  cancelOrderTap(e){
    let id = e.currentTarget.dataset.id
    let that =this
    wx.showModal({
      title: '确定要取消该订单吗？',
      content: '',
      success:(res)=>{
        if(res.confirm){
          wx.showLoading()
          this.changeStatus(id, -2)
        }
      }
    })
  },
  onLoad: function (option) {
    wx.setNavigationBarTitle({
      title: '订单列表'
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
      currentType: option.currentType
    })

    switch(option.currentType) {
      case '1': this.getOrderList(1); break;
      case '2': this.getOrderList(2); break;
      case '3': this.getOrderList(3); break;
      default: this.getOrderList(10);
    }
  },
  onShow: function () {
    // this.getOrderList();
  },
  getOrderList (statusIdx) {
    const status = statusValue[statusIdx];
    let data = {};
    if (status !== 10) {
      data.status = status
    }
  }
})