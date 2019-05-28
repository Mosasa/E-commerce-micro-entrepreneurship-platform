//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    isScroll: true,
    maskShow: false,
    // noticeText: 'mosa发布消息：想买一副二手网球拍lalalalalalala',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    scrollContent: [],
    achieveList: [
      {
        img: 'http://img4.imgtn.bdimg.com/it/u=1762717572,3438622154&fm=26&gp=0.jpg',
        name: '',
        price: 300
      }
    ]
  },
  //事件处理函数
  toMessInfo: function() {
    console.log('去消息中心!')
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '首页'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    setTimeout(() => {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true,
          maskShow: false
        })
      } else {
        this.setData({
          hasUserInfo: false,
          maskShow: true
        })
      }
    }, 1000)
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true,
    //     maskShow: false
    //   })
    // } else {
    //   this.setData({
    //     hasUserInfo: false,
    //     maskShow: true
    //   })
    // }
  },
  onShow: function () {
    this.getStoreList();
    this.getcommodityList();
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      maskShow: false
    })

    console.log('app.globalData.openid', app.globalData.openid);
  },
  formatCname (item) {
    if (item.length > 5) {
      return item.substr(0, 5) + '...'
    } else {
      return item;
    }
  },
})
