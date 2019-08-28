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
    adtype:0,
    adcount:0,
    curPrice:0.0,
    oldPrice:0.0,
    date_begin:0,
    date_end:0,
    hour_begin:0,
    hour_end:0,
    date_begin_f: '0',
    date_end_f: '0',
    hour_begin_f: '0',
    hour_end_f: '0',
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 1, 1).getTime(),
    currentDate: new Date().getTime(),
    dataType: 0, //标记当前操作的是开始时间还是结束时间
  },



  //选择时间段
  selectDate: function (e) {
    this.data.dataType = e.currentTarget.dataset.type;
    this.setData({
      popShow: true
    })
  },
  onConfirm: function (e) {
    console.log("--------onInput:" + e.detail)
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
    } else if (this.data.dataType == 3) {
      this.setData({
        popShow: false,
        hour_begin: e.detail,
        hour_begin_f: util.formatTime(new Date(e.detail))
      })
    } else if (this.data.dataType == 4) {
      this.setData({
        popShow: false,
        hour_end: e.detail,
        hour_end_f: util.formatTime(new Date(e.detail))
      })
    }
  },
  onCancel: function (e) {
    this.setData({
      popShow: false
    })
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