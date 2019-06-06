//index.js
//获取应用实例
const app = getApp();
var formatCdate = require('../../javaScript/common/formatDate.js');

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

    wx.request({
      url: `${app.globalData.host}/userInfo`,
      data: {
        openid: app.globalData.openid,
        ...e.detail.userInfo,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: res => {
        res = res.data;
        if (res.errCode !== 0) {
          wx.showToast({
            title: res.errMsg,
          })
        }
      }
    })
  },
  getcommodityList: function () {
    let _this = this;
    wx.request({
      url: `${app.globalData.host}/commodity`,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        let data = res.data.data;
        _this.setData({
          scrollContent: data.map(item => {
            return {
              id: item.id,
              titleImg: item.imgs[0],
              titleText: item.cmName,
              createDate: item.createDate,
            }
          }).sort((pre, next) => {
            return new Date(next.createDate).getTime() - new Date(pre.createDate).getTime()
          }).slice(0, 10).map(d => {
            return {
              id: d.id,
              titleImg: d.titleImg,
              titleText: _this.formatCname(d.titleText),
              createDate: formatCdate.formatCdate(d.createDate),
            }
          })
        })
      },
      fail: function() {
        // fail
      },
    })
  },
  getStoreList: function () {
    let _this = this;
    wx.request({
      url: `${app.globalData.host}/store`,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        let data = res.data.data;
        _this.setData({
          achieveList: data.map(item => {
            return {
              img: 'http://img4.imgtn.bdimg.com/it/u=1762717572,3438622154&fm=26&gp=0.jpg',
              name: item.stName,
              price: item.incomeTotal
            }
          }).sort((pre, next) => {
            return next.incomeTotal - pre.incomeTotal;
          })
        })
      },
      fail: function() {
        // fail
      },
    })
  },
  formatCname (item) {
    if (item.length > 5) {
      return item.substr(0, 5) + '...'
    } else {
      return item;
    }
  },
  releaseCommodities: function () {
    wx.navigateTo({
      url: '../addStore/addStore'
    })
  },
  sendMess: function () {
    wx.navigateTo({
      url: '../sendMess/sendMess'
    })
  },
  toShopCart: () => {
    wx.navigateTo({
      url: '/pages/shop-cart/index'
    })
  },
  toBrowse: () => {
    wx.navigateTo({
      url: '/pages/classify/index'
    })
  },
  goDetail: (e) => {
    wx.navigateTo({
      url: '/pages/goods-details/index?id=' + e.currentTarget.dataset.id
    })
  }
})
