// pages/shop-cart/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: {
      saveHidden: true,
      totalPrice: 0,
      allSelect: false,
      noSelect: false,
      list: {},
      listKeys: [],
    },
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initEleWidth();
    this.cartShow()
  },
  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);  //以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '购物车'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })

    let shoplist = {};
    // 获取购物车数据
    var shopCarInfoMem = wx.getStorageSync('shopCarInfo')
    if (shopCarInfoMem && shopCarInfoMem.shoplist) {
      shoplist = shopCarInfoMem.shoplist
    }
    this.setGoodsList(true, 0, false, true, shoplist);
    // this.initEleWidth();
    // this.onshow()
  },
  cartShow:function() {
    let shoplist = {};
    // 获取购物车数据
    var shopCarInfoMem = wx.getStorageSync('shopCarInfo')
    if (shopCarInfoMem && shopCarInfoMem.shoplist) {
      shoplist = shopCarInfoMem.shoplist
    }
    this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), shoplist);
  },
  getSaveHide: function () {
    var saveHidden = this.data.goodsList.saveHidden;
    return saveHidden;
  },
  allSelect:function() {
    const { listKeys, list } = this.data.goodsList;
    let allSelect = true;

    listKeys.map(key => {
      list[key].map(item => {
        if (!item.active) {
          allSelect = false;
        }
      })
    })

    return allSelect
  },
  noSelect: function(){
    const { listKeys, list } = this.data.goodsList;
    let noSelect = true

    listKeys.map(key => {
      list[key].map(item => {
        if (item.active) {
          noSelect = false;
        }
      })
    })
    return noSelect
    /*return list.forEach((item) => {
      if (item.active) {
        return false
      } else {
        return true
      }
    })*/
  },
  totalPrice: function () {
    const {list, listKeys} = this.data.goodsList;
    let total = 0;
    listKeys.map(key => {
      total += list[key].filter(item => item.active).reduce((preValue, currentItem) => {
        return preValue + currentItem.price * currentItem.number;
      }, 0)
    });

    return total;
  },
  toPayOrder(total) {
    this.setData({
      totalPrice: total
    })
  },
  selectTap(e) {
    const {list} = this.data.goodsList;
    let {index, storeid} = e.currentTarget.dataset;
    if (index!=='' && index!==null){
      list[storeid][index].active = !list[storeid][index].active
      this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list)
    }
  },
  bindAllSelect() {
    const { listKeys, list } = this.data.goodsList;
    var currentAllSelect = this.data.goodsList.allSelect
    if (currentAllSelect) {
      listKeys.forEach((key) => {
        list[key].forEach(item => item.active = false)
      })
    } else {
      listKeys.forEach((key) => {
        list[key].forEach(item => item.active = true)
      })
    }
    this.setGoodsList(this.getSaveHide(), this.totalPrice(), !currentAllSelect, this.noSelect(), list);
  },
  saveHidden:function() {
    return this.data.goodsList.saveHidden
  },
  setGoodsList: function (saveHidden, total, allSelect, noSelect, list) {
    let listKeys = Object.keys(list);
    let shoplist = {};
    let tempNumber = 0;

    listKeys.map(key => {
      if (list[key].length > 0) {
        list[key].map(item => {
          tempNumber += item.number;
        });

        shoplist[key] = list[key];
      } else {
        delete list[key];
        listKeys = Object.keys(list);
      }
    })

    wx.setStorage({
      key: "shopCarInfo",
      data: {
        shoplist,
        shopNum: tempNumber
      }
    })

    this.setData({
      goodsList: {
        saveHidden: saveHidden,
        totalPrice: total,
        allSelect: allSelect,
        noSelect: noSelect,
        list: shoplist,
        listKeys,
      }
    });
  },
  jiaBtnTap(e){
    const { list } = this.data.goodsList;
    const index = parseInt(e.currentTarget.dataset.index)
    const storeId = e.currentTarget.dataset.storeid
    if (index!==null && index !== '')
      if (list[storeId][index].number<10) {
      list[storeId][index].number++
      this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
    }
  },
  jianBtnTap(e){
    const { list } = this.data.goodsList;
    const index = parseInt(e.currentTarget.dataset.index)
    const storeId = e.currentTarget.dataset.storeid
    if (index!==null && index !== '')
      if (list[storeId][index].number > 1) {
      list[storeId][index].number--
      this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
    }
  },
  touchS(e) {
    if (e.touches.length == 1){
      this.setData({
        startX: e.touches[0].clientX
      })
    }
  },
  touchM(e) {
    var index = parseInt(e.currentTarget.dataset.index)
    var left = ''
    if(e.touches.length == 1){
      var moveX = e.touches[0].clientX
     var disX = this.data.startX - moveX
     var btnWidth = 120
     if (disX <= 0){
        left = 0
     } else if (disX>0 ){
       left = `-${disX}rpx`
       if (disX>=btnWidth){
         left = `-${btnWidth}rpx`
       }
     }
     var list = this.data.goodsList.list
     if (index !== '' && index!==null){
       list[index].left = left 
       this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
     }
    }
  },
  touchE(e) {
    var left = ''
    var index = parseInt(e.currentTarget.dataset.index)
    if (e.changedTouches.length == 1){
      var endX = e.changedTouches[0].clientX
      var disX = this.data.startX - endX
      var btnWidth = 120
      disX >= btnWidth/2 ? left = `-${btnWidth}rpx` : left = 0
    }
    var list = this.data.goodsList.list
    if (index !== '' && index !== null) {
      list[index].left = left
      this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
    }
  },
  delItem(e) {
    const { listKeys, list } = this.data.goodsList;
    const {index, storeid} = e.currentTarget.dataset;
    list[storeid].splice(index,1)
    this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list); 
  },
  editTap(){
    const { listKeys, list } = this.data.goodsList;
    listKeys.forEach((key)=>{
      list[key].forEach(item => item.active = false)
    })
    this.setGoodsList(!this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list); 
  },
  saveTap(){
    const { listKeys, list } = this.data.goodsList;
    listKeys.forEach((key)=>{
      list[key].forEach(item => item.active = true)
    })
    this.setGoodsList(!this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list); 
  },
  deleteSelected(){
    const { listKeys, list } = this.data.goodsList;
    var newList = {}
    listKeys.forEach((key) => {
      newList[key] = [];
      list[key].forEach(item => {
        if (!item.active) {
          newList[key].push(item)
        }
      })
    })
    this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), newList); 
  },
  toPayOrder(){
    let that = this
    wx.showLoading()
    if (this.data.goodsList.noSelect){
      return
    }
    that.navToPayOrder()
  },
  navToPayOrder() {
    wx.hideLoading()
    wx.navigateTo({
      url: "/pages/to-pay-order/index",
    })
  },
  toIndexPage () {
    wx.redirectTo({
      url: "/pages/classify/index"
    })
  }
})