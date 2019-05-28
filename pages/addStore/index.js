// pages/addStore/addStore.js
import Toast from '../../static/vant/toast/toast';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    className: '',
    classifies: '',
    classNum: '',
    classPrice: '',
    classPic: '',
    conDetail: '',
    popShow: false,
    popTopShow: false,
    popContent: '',
    columns: [],
    category: [],
    customStyle: 'height: 100rpx; line-height: 100rpx; text-align: center; background: #EE2C2C;color: #ffffff;border-radius:0'
  },
  // 弹出分类框
  selectClassify: function() {
    this.setData({
      popShow: true
    })
  },
  // 获取输入的className
  inputClassName: function (res) {
    this.setData({
      className: res.detail
    })
  },
  // 获取分类classifies
  onConfirm(event) {
    const { picker, value, index } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      popShow: false,
      classifies: value
    });
    console.log(value);
  },
  onCancel() {
    this.setData({
      popShow: false
    })
    Toast('取消');
  },
  // 获取库存信息
  inputClassNum: function (res) {
    this.setData({
      classNum: res.detail
    })
  },
  // 获取价格信息
  inputClassPrice: function (res) {
    this.setData({
      classPrice: res.detail
    })
  },
  // 获取商品介绍
  inputConDetail: function (res) {
    this.setData({
      conDetail: res.detail
    })
  },
  // 关闭遮罩层呢
  onClose: function () {
    this.setData({
      popShow: false
    })
  },
  onCloseWarn: function () {
    this.setData({
      popTopShow: false
    })
  },
  release () {
    let classMess = {
      cmName: this.data.className,
      categoryId: this.data.classifies,
      total: parseInt(this.data.classNum),
      price: parseFloat(this.data.classPrice),
      detail: this.data.conDetail
    }
    if (!classMess.cmName || classMess.cmName === '') {
      this.setData({
        popTopShow: true,
        popContent: '商品名称不能为空!'
      })
    } else if (!classMess.categoryId || classMess.categoryId === '') {
      this.setData({
        popTopShow: true,
        popContent: '商品分类不能为空!'
      })
    } else if (!classMess.total || classMess.classNum === '') {
      this.setData({
        popTopShow: true,
        popContent: '商品数量不能为空!'
      })
    } else if (!/^[0-9]*$/.test((classMess.total))) {
      this.setData({
        popTopShow: true,
        popContent: '商品数量须为整数!'
      })
    } else if (!/^\d+(\.\d+)?$/.test((classMess.total))) {
      this.setData({
        popTopShow: true,
        popContent: '商品数量不能负数!'
      })
    } else if (!classMess.price || classMess.price === '') {
      this.setData({
        popTopShow: true,
        popContent: '商品价格不能为空!'
      })
    } else if (!/^\d+(\.\d+)?$/.test((classMess.price))) {
      this.setData({
        popTopShow: true,
        popContent: '商品价格不能为负数!'
      })
    } else if (!/^[0-9]+(.[0-9])?$/.test((classMess.price))) {
      this.setData({
        popTopShow: true,
        popContent: '商品价格限制为一位小数!'
      })
    }
    setTimeout(this.onCloseWarn, 1000);
    classMess.categoryId = this.data.category.filter(cat => cat.catName === classMess.categoryId)[0].id;
    // let _this = this;
    // setTimeout(() => {
    //   _this.setData({
    //     popTopShow: false
    //   })
    // }, 1500);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '新增商品'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  go: function () {
    wx.switchTab({
      url: '/index'
    })
  }
})