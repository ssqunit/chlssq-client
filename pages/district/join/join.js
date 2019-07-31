// pages/district/join/join.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    distance: 0.50,
    ssqInfo: { "ID": 0, "name": "御峰园", "area": "广东省深圳市龙岗区", "photo": "../../../static/custom/defaults/def_ssq.jpg", "busCount": 98, "perCount": 66 }

  },

  //打开商圈在地图上的位置
  openPosition: function (e) {
    wx.openLocation({
      latitude: 21.70915603,
      longitude: 111.35697174,
      scale: 14
    })
  },

  //商圈入驻
  joinApply: function (e) {
    var _type = e.currentTarget.dataset.type;
    if(_type == 1){

    }
    else if(_type == 2){
      wx.navigateTo({
        url: '../../district/join/person/person'
      })
    }
    else if (_type == 3) {
      wx.navigateTo({
        url: '../../district/join/business/business'
      })
    }
  },

  //购买商圈广告
  buySsqAD: function (e) {

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