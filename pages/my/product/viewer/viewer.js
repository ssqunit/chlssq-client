// pages/my/product/viewer/viewer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productInfo:{
      bopInfo:{"ID":198,"name":"双手健康理疗馆","position":{latitude:0.0,longitude:0.0}},
      "owner":true,//是否是产品拥有者
      "name":"肩颈理疗",
      "images":[],
      "des":"产品描述产品描述产品描述,产品描述产品描述产品描述,产品描述产品描述产品描述,产品描述产品描述产品描述",
      "price":99.09,
      "unit":"次",
      "dateType":1,
      "dateEnd":15676868900,
      "orderInfo":{
        "status":0, //0未预约，1已预约
        "detail":{
          "count":98,
          "total":998,
          "list":[
            {"id":"","name":"jjjjjjjjj","tel":15989316305,"count":3,"date":15764849992}
          ]
        }
      }

    }

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