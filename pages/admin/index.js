// pages/admin/index.js

var common = require("../../utils/common.js")
const app = getApp()


Page({

  /**
   * Page initial data
   */
  data: {
    nickName:"locky",
    count:8,
    sqltext:""

  },

  //
  goAudit: function (e) {
    wx.navigateTo({
      url: 'audit/index',
    })
  },

  //
  goUsers: function (e) {
    wx.navigateTo({
      url: 'user/index',
    })
  },

  //
  goSsq: function (e) {
    wx.navigateTo({
      url: 'ssq/index',
    })
  },

  //
  goPublish: function (e) {
    wx.navigateTo({
      url: 'announcement/publish',
    })
  },

  //
  goADcfg: function (e) {
    wx.navigateTo({
      url: 'adcfg/adcfg',
    })
  },

  //test function
  onInput:function(e){
    this.setData({
      sqltext:e.detail.value
    })
  },
  //test function
  goGodHelp:function(e){
    var that = this;
    common.request({
      method: "POST",
      url: common.BASE_URL + "?function=godHelp&session_id=" + app.globalData.userInfo.session_id,
      data: {
        'sqlstr': this.data.sqltext
      },
      success: res => {
        console.log("---------goGodHelp:"+JSON.stringify(res));
        if (res.data.iRet == 0) {
          that.toast("成功！");
        } else {
          that.toast("失败！");
        }
      },
      fail: res => {
        that.toast("提交失败！请检查您的网络。");
      }
    });
  },
  //test function
  toast: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      nickName: app.globalData.userInfo.nickName
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})