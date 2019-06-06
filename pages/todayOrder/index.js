// pages/todayOrder/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: false,
    selectedDay: '今日',
    saledProfit: [
      {
        incomeText: '销售总额(元)',
        profitMoney: 100
      },
      {
        incomeText: '毛利润(元)',
        profitMoney: 100
      }
    ],
    dateMess: '',
    incomeMess: 100,
    dateIncomeList: [
      {
        saledTime: '17:22',
        storingName: '啦啦啦啦啦',
        storingNum: 1,
        saledMoney: 20
      },
      {
        saledTime: '17:22',
        storingName: '啦啦啦啦啦',
        storingNum: 1,
        saledMoney: 20
      },
      {
        saledTime: '17:22',
        storingName: '啦啦啦啦啦',
        storingNum: 1,
        saledMoney: 20
      },
      {
        saledTime: '17:22',
        storingName: '啦啦啦啦啦',
        storingNum: 1,
        saledMoney: 20
      },
      {
        saledTime: '17:22',
        storingName: '啦啦啦啦啦',
        storingNum: 1,
        saledMoney: 20
      },
    ]
  },
  showSelect: function() {
    this.setData({
      selected:!this.data.selected
    });
  },
  selectday: function (res) {
    this.setData({
      selectedDay: res.currentTarget.dataset.name,
      selected: false
    })
    let dateMess = '';
    if (res.currentTarget.dataset.name == '今日') {
      dateMess = this.formatDate(new Date())
    } else {
      dateMess = this.GetDateStr(-1);
    }

    this.getOrders(dateMess);
  },
  /**
   * 格式化日期
   * @param {}
   * @return {undefined}
   * @author wumengsha
   */
  formatDate: function (date) {
    let myyear = date.getFullYear();
    let mymonth = date.getMonth() + 1;
    let myweekday = date.getDate();

    if (mymonth < 10) {
      mymonth = '0' + mymonth;
    }
    if (myweekday < 10) {
      myweekday = '0' + myweekday;
    }
    return (myyear + '-' + mymonth + '-' + myweekday);
  },
  /**
   * 获取“今日”前后的日期
   * @param {}
   * @return {undefined}
   * @author wumengsha
   */
  GetDateStr: function (AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    return y+"-"+m+"-"+d;
  },
  fnW: function(str){
    var num;
    str>10?num=str:num="0"+str;
    return num;
  },
  /**
   * 格式化当前时间
   * @param {}
   * @return {undefined}
   * @author wumengsha
   */
  formatMinutes: function () {
    var hours = date.getHours();//小时
    var minute = date.getMinutes();//分
    var time = this.fnW(hours) + ":" + this.fnW(minute);
    return time;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '销售信息'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    const date = this.formatDate(new Date());

    this.getOrders(date)
  },

  getOrders: function(date) {
    wx.request({
      url: `${app.globalData.host}/storeOrder`,
      method: 'GET',
      data: {
        uploadId: app.globalData.openid,
        createDate: date,
      },
      success: res => {
        res = res.data;
        if (res.errCode === 0) {
          const total = res.data.reduce((total, current) => total + current.total, 0);
          this.setData({
            dateMess: date,
            dateIncomeList: res.data.map(d => ({
              saledTime: this.getTime(d.createDate),
              storingName: d.cmName,
              storingNum: d.sellNum,
              saledMoney: d.total
            })),
            incomeMess: total,
            saledProfit: [
              {
                incomeText: '销售总额(元)',
                profitMoney: total,
              },
              {
                incomeText: '毛利润(元)',
                profitMoney: total,
              }
            ],
          })
        }
      }
    })
  },

  getTime: function (date) {
    date = new Date(date);
    const h = date.getHours();
    const m = date.getMinutes();
    return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`;
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

  }
})