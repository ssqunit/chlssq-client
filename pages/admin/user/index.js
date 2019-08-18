// pages/admin/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "locky",
    sumInfo:{
      "userTotal":6454859989,
      "firstpageTotal":98789876,
      "userActivity":7657889,
    },
    users:[
      { "openId": "aaa", "nickName": "张三" },
      { "openId": "bbb", "nickName": "张三四" }
    ]
  },

  onSearch: function (e) {

  },

  //
  radioChange: function (e) {
    console.log("radioChange---:" + e.detail.value + ",openid=" + e.currentTarget.dataset.openid);
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