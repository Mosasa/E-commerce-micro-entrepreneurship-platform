
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

  createOrder(e){
    const { curAddressData, remark, goodsList, goodKeys } = this.data;
    const commonParam = {
      address: curAddressData.address,
      username: curAddressData.recipient,
      mobile: curAddressData.mobile,
      creatorId: app.globalData.openid,
    }

    const params = goodKeys.map(key => {
      return {
        ...commonParam,
        storeId: key,
        remark: remark[key],
        commodities: goodsList[key].map(commodity => ({
          commodityId: commodity.goodsId,
          sellNum: commodity.number,
          total: commodity.number * commodity.price
        }))
      }
    })

    wx.request({
      url: `${app.globalData.host}/order`,
      method: 'POST',
      data: params,
      success: res => {
        res = res.data;
        
        if (res.errCode === 0) {
          wx.showToast({
            title: '下单成功',
          });

          // 清空已购买的商品
          setTimeout(() => {
            if (!this.data.notCart) {
              const { shoplist } = wx.getStorageSync('shopCarInfo');
              let shopNum = 0
              goodKeys.map(key => {
                shoplist[key] = shoplist[key].filter(commodity => {
                  if (!commodity.active) shopNum += commodity.number;
                  return !commodity.active
                });
              })
        
              wx.setStorage({
                key: 'shopCarInfo',
                data: {
                  shoplist,
                  shopNum,
                }
              })
            }
      
            wx.navigateBack({
              delta: 1
            })
          }, 1500);
        }
      }
    })
  },

  initShippingAddress() {
    // 获取默认地址
    wx.request({
      url: `${app.globalData.host}/address`,
      method: 'GET',
      data: {
        creatorId: app.globalData.openid,
        isDefault: true,
      },
      success: res => {
        res = res.data;
        if (res.errCode === 0) {
          this.setData({
            curAddressData: res.data.length > 0 ? res.data[0] : null
          })
        } else {
          // 提示错误
        }
      }
    })
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