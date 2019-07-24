// pages/my/person/info.js
var app = getApp();
var _userInfo;
Page({

  /**
   * Page initial data
   */
  data: {
    ssqData: [
      { "id": "1", "name": "平湖御峰园", "area":"广东省深圳市龙岗区" },
      { "id": "1", "name": "御峰园", "area": "广东省深圳市龙岗区" },
      { "id": "1", "name": "平湖御峰园", "area": "广东省深圳市龙岗区" },
      { "id": "1", "name": "平湖御峰园", "area": "广东省深圳市龙岗区" }
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let that = this;
    _userInfo = app.globalData.userInfo;
    that.setData({
      _userInfo: _userInfo
    });
  },

  goAbout: function () {
    wx.navigateTo({
      url: '../../about/about'
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