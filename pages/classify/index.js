// pages/index/index.js
import Toast from '../../static/vant/toast/toast';
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDors: true,
    autoplay: true,
    interval: 4000,
    duration: 500,
    categories: [],
    activeCategoryId: 0
  },
  tabClick: function (e) {

    this.setData({
      activeCategoryId: e.currentTarget.id
    })
    this.getGoodsList(e.currentTarget.id)
    // this.getGoodsList(e.currentTarget.id)
  },
  getGoodsList: function (categoryId) {
    if (categoryId == 0) {
      categoryId = ''
      wx.request({
        url: `${app.globalData.host}/commodity/`,
        method: 'GET',
        success: res => {
          res = res.data;
          if (res.errCode === 0) {
            this.setData({
              goods: res.data
            })
          } else {
            Toast(res.errMsg)
          }
        }
      })
    } else {
      wx.request({
        url: `${app.globalData.host}/commodity/`,
        method: 'GET',
        data: {
          categoryId,
        },
        success: res => {
          res = res.data;
          if (res.errCode === 0) {
            this.setData({
              goods: res.data
            })
          } else {
            Toast(res.errMsg)
          }
        }
      })
    }

  },
  tabDetails(e) {
    wx.navigateTo({
      url: '/pages/goods-details/index?id=' + e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品分类'
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
      url: `${app.globalData.host}/category`,
      method: 'GET',
      success: res => {
        res = res.data;
        if (res.errCode === 0) {
          this.setData({
            categories: [{
              id: 0,
              catName: '全部'
            }, ...res.data],
          })
        }
      }
    })
    this.getGoodsList(0)

    // wx.request({
    //   url: `${app.globalData.host}/commodity`,
    //   method: 'GET', 
    //   success: res => {
    //     res = res.data;
    //   }
    // })
  }
})