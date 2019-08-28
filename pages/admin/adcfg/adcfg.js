// pages/admin/adcfg/adcfg.js

var util = require('../../../utils/util.js');
var common = require("../../../utils/common.js")

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "...",
    popShow: false,
    time_popShow:false,
    adtype:0,
    adcount:0,
    curPrice:-0.1,
    oldPrice:0.0,
    date_begin:0,
    date_end:0,
    hour_begin:'0',
    hour_end:'0',
    date_begin_f: '0',
    date_end_f: '0',
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 1, 1).getTime(),
    currentDate: new Date().getTime(),
    currentHour: '12:00',
    minHour: 0,
    maxHour: 23,
    dataType: 0, //标记当前操作的是开始时间还是结束时间
  },



  //选择日期与时段
  selectDate: function (e) {
    this.data.dataType = e.currentTarget.dataset.type;
    if (this.data.dataType == 1 || this.data.dataType == 2){
      this.setData({
        popShow: true
      })
    }else{
      this.setData({
        time_popShow: true
      })
    }
  },
  onConfirm: function (e) {
    //console.log("---------onConfirm:" + e.detail);
    if (this.data.dataType == 1) {
      this.setData({
        popShow: false,
        date_begin: e.detail,
        date_begin_f: util.formatTime(new Date(e.detail))
      })
    } else if (this.data.dataType == 2) {
      this.setData({
        popShow: false,
        date_end: e.detail,
        date_end_f: util.formatTime(new Date(e.detail))
      })
    }
    else if (this.data.dataType == 3) {
      this.setData({
        time_popShow: false,
        hour_begin: e.detail
      })
    } else if (this.data.dataType == 4) {
      this.setData({
        time_popShow: false,
        hour_end: e.detail
      })
    }  
  },
  onCancel: function (e) {
    if (this.data.dataType == 1 || this.data.dataType == 2) {
      this.setData({
        popShow: false
      })
    } else {
      this.setData({
        time_popShow: false
      })
    }
  },

  //配置广告类型
  radioChange: function (e) {
    this.data.adtype = e.detail.value;
  },
  //配置广告数量
  onCount: function (e) {
    this.data.adcount = e.detail.value;
  },
  //配置广告价格
  onCurPrice: function (e) {
    this.data.curPrice = e.detail.value;
  },
  //配置广告原价
  onOldPrice: function (e) {
    this.data.oldPrice = e.detail.value;
  },

  //

  //提交配置
  onCommit: function (e) {
    if(this.checkData()){
      common.request({
        method: "POST",
        url: common.BASE_URL + "?function=cfgAd&session_id=" + app.globalData.userInfo.session_id,
        data: {
          'openid': app.globalData.userInfo.ID,
          'type': this.data.adtype,
          'total_count': this.data.adcount,
          'cur_price': this.data.curPrice,
          'old_price': this.data.oldPrice,
          'begin_date': Math.round(this.data.date_begin / 1000),
          'end_date': Math.round(this.data.date_end / 1000),
          'begin_hour': this.data.hour_begin,
          'end_hour': this.data.hour_end
        },
        success: res => {
          console.log("----------- cfgAd:success" + JSON.stringify(res));
          if (res.data.iRet == 0) {
            this.toast("配置广告成功！");
          } else {
            this.toast("配置广告失败！");
          }
        },
        fail: res => {
          this.toast("请检查网络链接！");
        }
      });
    }
  },

  toast: function (msg) {
    wx.showToast({
      title: msg,
      mask: true,
      duration: 2000
    })
  },

  checkData: function () {
    if (this.data.adtype == 0) {
      this.toast("请配置广告类型！");
      return false;
    } else if (this.data.adcount <= 0) {
      this.toast("请配置广告数量！");
      return false;
    } else if (this.data.curPrice < 0) {
      this.toast("请配置广告价格！");
      return false;
    } else if (this.data.date_begin <= 0 || this.data.date_end <= 0) {
      this.toast("请配置广告日期！");
      return false;
    } else if (this.data.adtype == 1 || this.data.adtype == 2){
      if (this.data.hour_begin == '0' || this.data.hour_end == '0'){
        this.toast("请配置广告时段！");
        return false;
      }
    }
    return true;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nickName: app.globalData.userInfo.nickName
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

  }
})