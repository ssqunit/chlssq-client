// pages/ad/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scr_h:100,
    count:0,
    recordsInfo:[
      {
        "dateTime":"2019.08.11--20:36",
        "name":"肩颈理疗",
        "type":"首页文字广告",
        "dateSet":"2019.08.11-2019.08.18",
        "timeSet":[
          { "value": "00:00-09:00", "count": 3 },
          { "value": "00:00-09:00", "count": 3 }
        ],
        "price":18,
        "shopName":"双手健康理疗馆",
        "ssqName":"御峰园社圈"
      },
      {
        "dateTime": "2019.08.11--20:36",
        "name": "肩颈理疗",
        "type": "首页文字广告",
        "dateSet": "2019.08.11-2019.08.18",
        "timeSet": [
          { "value": "00:00-09:00", "count": 3 },
          { "value": "00:00-09:00", "count": 3 }
        ],
        "price": 18,
        "shopName": "双手健康理疗馆",
        "ssqName": "御峰园社圈"
      },
      {
        "dateTime": "2019.08.11--20:36",
        "name": "肩颈理疗",
        "type": "首页文字广告",
        "dateSet": "2019.08.11-2019.08.18",
        "timeSet": [
          { "value": "00:00-09:00", "count": 3 },
          { "value": "00:00-09:00", "count": 3 }
        ],
        "price": 18,
        "shopName": "双手健康理疗馆",
        "ssqName": "御峰园社圈"
      },
      {
        "dateTime": "2019.08.11--20:36",
        "name": "肩颈理疗",
        "type": "首页文字广告",
        "dateSet": "2019.08.11-2019.08.18",
        "timeSet": [
          { "value": "00:00-09:00", "count": 3 },
          { "value": "00:00-09:00", "count": 3 }
        ],
        "price": 18,
        "shopName": "双手健康理疗馆",
        "ssqName": "御峰园社圈"
      }
    ]

  },

  //
  getSystemInfo: function () {
    var self = this
    wx.getSystemInfo({
      success: res => {
        self.setData({
          //windowHeight 为屏幕可用高度
          //winHeight: res.windowHeight,
          //screenHeight 为屏幕高度
          scr_h: res.screenHeight - 120
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemInfo();
    this.setData({
      count:this.data.recordsInfo.length
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