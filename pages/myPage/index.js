const app = getApp();

Page({
  data: {
    userInfo: {},
    order: {
      icon: 'images/order.png',
      text: '我的订单',
      tip: '',
      url: './order-list/index?currentType=0'
    },
    // 收货数量
    orderBadge: {
      unpaid: 0,
      undelivered: 0,
      unreceived: 0
    },
    orderCell: [
      {
        icon: 'images/to-be-delivered.png',
        text: '待发货',
        url: './order-list/index?currentType=1',
        class: 'order-cell-icon-small',
      },
      {
        icon: 'images/to-be-paid.png',
        text: '已完成',
        url: './order-list/index?currentType=2',
        class: 'order-cell-icon-small'
      }, {
        icon: 'images/to-be-received.png',
        text: '已取消',
        url: './order-list/index?currentType=3',
        class: 'order-cell-icon-big'
      }
    ],
    list: [
      {
        icon: 'images/address.png',
        text: '地址管理',
        tip: '',
        cut: true,
        url: './select-address/index'
      }
    ]
  },
  countOrder(orderList) {
    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
    this.orderBadge = { unpaid: 0, undelivered: 0, unreceived: 0 };

    for (let i = orderList.length - 1; i >= 0; i--) {
      switch (orderList[i].order_status) {
      case '待支付': this.orderBadge.unpaid += 1; break;
      case '待发货': this.orderBadge.undelivered += 1; break;
      case '待收货': this.orderBadge.unreceived += 1; break;
      default: break;
      }
    }
    this.data.orderCell[0].count = this.orderBadge.unpaid;
    this.data.orderCell[1].count = this.orderBadge.undelivered;
    this.data.orderCell[2].count = this.orderBadge.unreceived;
    this.setData({
      orderBadge: this.orderBadge,
      orderCell:this.data.orderCell
    });
  },
  //点击触发
  onShow(){
    // resource.fetchOrderList().then((res) => {
    //   const orderList = res.data;
    //   this.countOrder(orderList);
    // });

    // 获取微信个人信息
     this.setData({
      userInfo: app.globalData.userInfo
    });
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: '我的主页'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    // 订单列表
    // resource.fetchOrderList().then((res) => {
    //   console.log(233);
    //   console.log(res);
    //   const orderList = res.data;
    //   this.countOrder(orderList);
    // });
  },
  navigateTo(e) {
    const url = e.currentTarget.dataset.url;
    console.log(url)
    if (e.currentTarget.dataset.urlType) {
      wx.navigateTo({
        url: 'user-info/user-info'
      });
    } else {
      if (url === undefined) {
        wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.tip
        });
      } else {
        wx.navigateTo({
          url
        });
      }
    }
  },
  // getUserInfo(e) {
  //   console.log(e)
  //   const userInfo = e.detail.userInfo
  //   app.globalData.userInfo = userInfo;

  //   this.setData({
  //     userInfo,
  //   })
  // }
});
