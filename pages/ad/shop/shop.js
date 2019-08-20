// pages/ad/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceTotal:0.0,
    defShopADInfo: { "shopId": -1, "productId": "", "text": "", "flag": 0, "img": "../../../static/custom/defaults/shop_logo.png" },
    timeItems:[
      { "id":100, "price": 1.0, "timeStart": "2019-08-20 0:00", "timeEnd": "2019-08-26 23:59", "left":2},
      { "id": 101, "price": 1.0, "timeStart": "2019-08-20 0:00", "timeEnd": "2019-08-26 23:59", "left": 2 }
    ]


  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var that=this;
    var _price = 0;
    var len = e.detail.value.length;
    if(len>0){
      for (var i = 0; i < len; i++) {
        for (var j = 0; j < that.data.timeItems.length; j++) {
          if (e.detail.value[i] == that.data.timeItems[j].id){
            _price += that.data.timeItems[j].price;
          }
      }
      }
    }
    that.setData({
      priceTotal:_price
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