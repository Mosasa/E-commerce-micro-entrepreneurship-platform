
// pages/to-pay-order/index.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:{},
    goodKeys: [],
    isNeedLogistics: 1,
    curAddressData:false,
    yunPrice: 0,
    remark: {},
    allGoodsAndYunPrice:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.detail) {
      const detail = JSON.parse(options.detail);
      this.setData({
        goodsList: {
          [detail.storeId]: [detail],
        },
        goodKeys: [detail.storeId],
        allGoodsAndYunPrice: detail.price,
        notCart: true,
      })
    } else {
      wx.getStorage({
        key:'shopCarInfo',
        success: (res) => {
          //console.log(res.data)
          const goodsList = res.data.shoplist;
          const goodKeys = [];
          let total = 0;
          for (const key in goodsList) {
            if (goodsList.hasOwnProperty(key)) {
              const storeCommodities = goodsList[key].filter(commodity => {
                if (commodity.active) {
                  total += commodity.number * commodity.price;
                }
                return commodity.active;
              });
  
              if (storeCommodities.length > 0) {
                goodsList[key] = storeCommodities;
                goodKeys.push(key);
              }
            }
          }

          this.setData({
            goodsList,
            goodKeys,
            allGoodsAndYunPrice: total
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '提交订单'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    this.initShippingAddress()
  },

  onRemarkChange: function (e) {
    const { value } = e.detail;
    const { key } = e.target.dataset;

    this.setData({
      remark: {
        ...this.data.remark,
        [key]: value
      }
    })
  },

  getDistrictId(obj, id){
    if (!obj){
      return ''
    }
    if(!id){
      return ""
    }
    return id
  },
  addAddress(){
    wx.navigateTo({
      url: '/pages/myPage/address-add/index',
    })
  },
  selectAddress(){
    wx.navigateTo({
      url: '/pages/myPage/select-address/index'
    })
  }
})