// pages/admin/audit/imgapply/imgapply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "locky",
    imgChangeInfo: {
      "user": {
        "openId": "",
        "nickName": "风一样的男人",
      },
      "des": "为什么要改图描述",
      "newImage": "",
      "oldImage":"",
      "ssq": {
        'ID': "",
        'name': "茗萃园",
        'area': "广东省深圳市龙岗区",
        'position': { 'latitude': 14.989, 'longitude': 14.989 }
      }
    }
  },

  //
  showOnMap: function (e) {
    wx.openLocation({
      latitude: e.currentTarget.dataset.latitude,
      longitude: e.currentTarget.dataset.longitude,
      scale: 14
    })
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