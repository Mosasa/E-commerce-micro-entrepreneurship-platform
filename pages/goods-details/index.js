import Toast from "../../static/vant/toast/toast";

// pages/goods-details/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // hideShopPopup: true, //规格弹出框
    indicatorDors: true,
    autoplay: true,
    interval: 4000,
    duration: 500,
    goodsDetail:{}, //商品详情对象
    shopNum: 0, // 购物车商品数量
    shopCarInfo: {},//设置在缓存的购物车信息
    canSubmit: false,//是否能添加到购物车,
    isBuy: false
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onShow: function () {
    const that = this;
    //加载缓存，取得购物车信息
    wx.getStorage({
      key: 'shopCarInfo',
      success:(res) => {
        that.setData({
          shopCarInfo: res.data,
          shopNum: res.data.shopNum
        })
      }
    })
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品详情'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    var that = this

    let id = options.id;
    wx.request({
      url: `${app.globalData.host}/commodity/${id}`,
      method: 'GET', 
      success: function(res){
        res = res.data;
        if (res.errCode === 0) {
          let data = res.data;
          that.setData({
            goodsDetail: data,
          })
        } else {
          Toast(res.errMsg);
        }
      }
    })
  },

  addShopCar: function() {
    const shopCarMap = {};
    const { goodsDetail } = this.data;
    shopCarMap.goodsId = goodsDetail.id
    shopCarMap.pic = goodsDetail.imgs
    shopCarMap.name = goodsDetail.cmName
    shopCarMap.price = goodsDetail.price
    shopCarMap.storeId = goodsDetail.storeId
    shopCarMap.active = true
    shopCarMap.number = 1

    var shopCarInfo = this.data.shopCarInfo
    if (!shopCarInfo.shopNum){
      shopCarInfo.shopNum = 0
    }
    if(!shopCarInfo.shoplist){
      shopCarInfo.shoplist= {}
    }

    if (shopCarInfo.shoplist[shopCarMap.storeId]) {
      const list = shopCarInfo.shoplist[shopCarMap.storeId];
      for (let i = 0; i < list.length; i++){
        const tamShopCarMap = list[i];
        if (tamShopCarMap.goodsId === goodsDetail.id){
          list[i].number += 1;
          break;
        } else {
          list.push(shopCarMap);
          break;
        }
      }

      shopCarInfo.shoplist[shopCarMap.storeId] = list;
    } else {
      shopCarInfo.shoplist[goodsDetail.storeId] = [shopCarMap];
    }
    shopCarInfo.shopNum = shopCarInfo.shopNum + 1
    this.setData({
      shopCarInfo: shopCarInfo,
      shopNum: shopCarInfo.shopNum
    })
    this.closePopupTap()
    wx.showToast({
      title: '加入购物车成功',
      icon: 'sucess',
      duration: 2000
    })
    wx.setStorage({
      key: 'shopCarInfo',
      data: shopCarInfo
    })
  },

  bindGuiGeTap(){
    this.setData({
      hideShopPopup: false
    })
  },
  closePopupTap(){
    this.setData({
      hideShopPopup: true
    })
  },
  numJiaTap(){
    let buyNumber = this.data.buyNumber
    if (buyNumber < this.data.buyNumMax){
       buyNumber++
    }
    console.log(buyNumber)
    this.setData({
      buyNumber: buyNumber
    })
  },
  numJianTap() {
    let buyNumber = this.data.buyNumber
    if (buyNumber > this.data.buyNumMin) {
      buyNumber--
    }
    this.setData({
      buyNumber: buyNumber
    })
  },
  //选择框
  labelItemTap(e){
    let propertyindex = e.currentTarget.dataset.propertyindex
    let that = this
    let propertiesArr = this.data.goodsDetail.properties
    let curProperties = propertiesArr[propertyindex]
    let curProperties_childs = curProperties.childsCurGoods
    for (let i = 0; i < curProperties_childs.length;i++){
      curProperties_childs[i].active = false
    }
    curProperties_childs[e.currentTarget.dataset.propertyid].active = true
    let needSelectNum = propertiesArr.length
    let curSelectNum = 0
    let propertyChildIds = ''
    let propertyChildNames =''
    let canSubmit = false
    for (let i = 0; i < propertiesArr.length;i++){
      curSelectNum++
      let properties_childs = propertiesArr[i].childsCurGoods
      for (let j = 0; j < properties_childs.length; j++){
        if (properties_childs[j].active){
          propertyChildIds += propertiesArr[i].id + ':' + properties_childs[j].id+','
          // propertyChildIds += propertiesArr[i].id + ':' + properties_childs[j].id + ','
          propertyChildNames += propertiesArr[i].name + ':' + properties_childs[j].name + ' '
        }
      }
    }
    if (needSelectNum == curSelectNum){
      canSubmit = true
    }

    that.setData({
      selectSizePrice: curProperties_childs[e.currentTarget.dataset.propertyid].price,
      buyNumMax: 1000,
      propertyChildIds: propertyChildIds,
      propertyChildNames: propertyChildNames,
      buyNumber: 1
    })

    // wx.request({
    //   url: 'https://api.it120.cc/' + app.globalData.urlName + '/shop/goods/price',
    //   data: {
    //     goodsId: that.data.goodsDetail.basicInfo.id,
    //     propertyChildIds: propertyChildIds
    //   },
    //   success:function(res){
    //     if(res.data.code == 405){
    //         return
    //     }
    //     that.setData({
    //       selectSizePrice: res.data.data.price,
    //       buyNumMax: res.data.data.stores,
    //       propertyChildIds: propertyChildIds,
    //       propertyChildNames: propertyChildNames,
    //       buyNumber: res.data.data.stores >0 ? 1 : 0
    //     })
    //   }
    // })
    this.setData({
      goodsDetail: this.data.goodsDetail,
      canSubmit: canSubmit
    })
  },
  goShopCar() {
    wx.navigateTo({
      url: '../shop-cart/index'
    })
  },
  tobuy(){
    // if (this.data.goodsDetail.properties && !this.data.canSubmit){
    //   this.bindGuiGeTap()
    //   this.setData({
    //     isBuy: true
    //   })
    //   return
    // }
    if ((this.data.goodsDetail.total - this.data.goodsDetail.sellNum) < 1){
      wx.showModal({
        title: '提示',
        concent:'暂时缺货哦~',
        showCancel:false
      })
      return
    }
    const shopCarMap = {};
    shopCarMap.goodsId = this.data.goodsDetail.id
    shopCarMap.pic = this.data.goodsDetail.imgs
    shopCarMap.name = this.data.goodsDetail.cmName
    shopCarMap.price = this.data.goodsDetail.price
    shopCarMap.active = true
    shopCarMap.number = 1
    shopCarMap.storeId = this.data.goodsDetail.storeId

    wx.navigateTo({
      url: `../to-pay-order/index?detail=${JSON.stringify(shopCarMap)}`,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    // this.addShopCar()
    // this.goShopCar()
  }
})