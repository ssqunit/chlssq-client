// pages/ad/text/text.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adText:"生命周期函数--监听页面初次渲染完成",
    productInfo: { "ID": "108", "name": "肩周调理", "des": "产品的描述信息,产品的描述信息,产品的描述信息,产品的描述信息", "count": 1, "price": 18.00, "tags": [1], "images": ["https://img.yzcdn.cn/vant/t-thirt.jpg"]},

  },

  //
  onInput: function(e){
    this.setData({adText:e.detail.value});
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