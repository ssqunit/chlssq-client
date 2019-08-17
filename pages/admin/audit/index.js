// pages/admin/audit/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    nickName: "locky",
    count: 8,
    newSsqList:[
      { "area": "广东省深圳市龙岗区", "name": "茗萃园" },
      { "area": "广东省深圳市龙岗区", "name": "茗萃园" },
      { "area": "广东省深圳市龙岗区", "name": "茗萃园" },
      { "area": "广东省深圳市龙岗区", "name": "茗萃园" },
      { "area": "广东省深圳市龙岗区", "name": "茗萃园" },
      { "area": "广东省深圳市龙岗区", "name": "茗萃园" },
      { "area": "广东省深圳市龙岗区", "name": "茗萃园" },
      { "area": "广东省深圳市龙岗区", "name": "茗萃园" }
    ]

  },

  //
  delSsqApply: function (e) {
    wx.navigateTo({
      url: 'ssqapply/ssqapply',
    })
  },

  //
  delBusApply: function (e) {
    wx.navigateTo({
      url: 'busapply/busapply',
    })
  },

  //
  delPerApply: function (e) {
    wx.navigateTo({
      url: 'perapply/perapply',
    })
  },

  //
  delImgApply: function (e) {
    wx.navigateTo({
      url: 'imgapply/imgapply',
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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