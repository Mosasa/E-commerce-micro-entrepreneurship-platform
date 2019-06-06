// pages/user/index.js
import Toast from '../../static/vant/toast/toast';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    showNameWarn: false,
    warnText: '',
    userName: '',
    mobile: '',
    dormitoryNumber: '',
    customStyle: 'background: #ff5151; height: 100rpx; line-height: 100rpx; border-radius: 0; text-align: center'
  },
  onClose: function () {
    this.setData({
      show: false
    })
  },
  onCloseWarn: function () {
    this.setData({
      showNameWarn: false
    })
  },
  toMyPage: function() {
    wx.navigateTo({
      url: '../myPage/myPage'
    });
  },
  toStorePage: function() {
    if (app.globalData.userInfo && app.globalData.userInfo.bedroomId) {
      wx.navigateTo({
        url: '../storePage/storePage'
      });
    } else {
      this.setData({
        show: true
      })
    }
  },
  bindNameInput: function (e) {
    this.setData({
      userName: e.detail.value.trim()
    })
  },
  bindNumberInput: function (e) {
    this.setData({
      dormitoryNumber: e.detail.value.trim()
    })
  },
  bindMobileInput: function (e) {
    this.setData({
      mobile: e.detail.value.trim()
    })
  },
  cancel: function () {
    this.setData({
      show: false
    })
  },
  confirm: function() {
    if (this.data.userName === '') {
      this.setData({
        showNameWarn: true,
        warnText: '用户名不能为空!'
      })
    } else if (this.data.userName.length > 8) {
      this.setData({
        showNameWarn: true,
        warnText: '用户名长度不可超过8!'
      })
    } else if (this.data.dormitoryNumber === '') {
      this.setData({
        showNameWarn: true,
        warnText: '寝室号不能为空!'
      })
    } else if (/^[\u4e00-\u9fa5]{0,}$/.test((this.data.dormitoryNumber)) && /^[A-Za-z0-9]+$/.test((this.data.dormitoryNumber))) {
      this.setData({
        showNameWarn: true,
        warnText: '寝室号只支持汉字、英文及数字!'
      })
    } else {
      const data = {
        nickName: this.data.userName,
        bedroomId: this.data.dormitoryNumber,
        mobile: this.data.mobile
      }
      wx.request({
        url: `${app.globalData.host}/userInfo/${app.globalData.openid}`,
        data,
        method: 'PUT', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: (res) => {
          res = res.data;
          if (res.errCode === 0) {
            this.setData({
              show: false,
            })
            app.globalData.userInfo = {
              ...app.globalData.userInfo,
              ...data,
            }
            wx.request({
              url: `${app.globalData.host}/store`,
              data: {
                bedroomId: data.bedroomId,
                stName: data.bedroomId,
              },
              method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              // header: {}, // 设置请求的 header
              success: res => {
                res = res.data;
                if (res.errCode === 0) {
                  Toast.success('注册成功!');
                } else if (res.errCode === 1) {
                  Toast.success('加入成功!');
                }
              }
            })
            // Toast.success('注册成功!');
          } else {
            this.setData({
              show: false,
            })
            Toast.fail('注册失败!');
          }
        }
      })
      // this.setData({
      //   show: false,
      // })
      // Toast.success('注册成功!');
    }
    setTimeout(this.onCloseWarn, 2000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.request({
      url: `${app.globalData.host}/userInfo/${app.globalData.openid}`,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: res => {
        res = res.data;
        if (res.errCode === 0) {
          app.globalData.userInfo = res.data;
        } else {
          wx.showToast({
            title: res.errMsg,
          })
        }
      }
    })
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

  }
})