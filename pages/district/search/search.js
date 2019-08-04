// pages/district/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openType:0,
    searchList:[
      { "ID": 199, "name": "御峰园", "position": { latitude: 0.1, longitude: 0.1 }, "distance": 18.9, "area": "广东省深圳市龙岗区", "imageUrl": "../../../static/custom/defaults/def_ssq.jpg", "myRole": 0 },
      { "ID": 199, "name": "御峰园", "position": { latitude: 0.1, longitude: 0.1 }, "distance": 18.9, "area": "广东省深圳市龙岗区", "imageUrl": "../../../static/custom/defaults/def_ssq.jpg", "myRole": 0 }
    ],
    nearbyList: [
      { "ID": 199, "name": "御峰园", "position": { latitude: 0.1, longitude: 0.1 }, "distance": 18.9, "area": "广东省深圳市龙岗区", "imageUrl": "../../../static/custom/defaults/def_ssq.jpg", "myRole": 0 },
      { "ID": 199, "name": "御峰园", "position": { latitude: 0.1, longitude: 0.1 }, "distance": 18.9, "area": "广东省深圳市龙岗区", "imageUrl": "../../../static/custom/defaults/def_ssq.jpg", "myRole": 0 }
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type;
    let searchkeys = options.searchkeys;
    this.setData({
      openType: type
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