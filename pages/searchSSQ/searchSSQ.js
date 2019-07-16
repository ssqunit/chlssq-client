// pages/searchSSQ/searchSSQ.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchFlag:true,
    search_status_text : "查找中...",
    search_res:[
      { "dis": "0.01km", "id": "1", "name": "深圳市龙岗区平湖御峰园商业圈", "img_url": "../../images/ssqtmp.jpg" },
      {"dis":"13.8km","id":"1","name":"深圳市龙岗区平湖御峰园商业圈","img_url":"../../images/ssqtmp.jpg"}
    ],
    search_fj_text: "附近的商圈：",
    fj_res: [
      { "dis": "0.01km", "id": "1", "name": "深圳市龙岗区平湖御峰园商业圈", "img_url": "../../images/ssqtmp.jpg" },
      { "dis": "13.8km", "id": "1", "name": "深圳市龙岗区平湖御峰园商业圈", "img_url": "../../images/ssqtmp.jpg" },
      { "dis": "1380km", "id": "1", "name": "深圳市龙岗区平湖御峰园商业圈", "img_url": "../../images/ssqtmp.jpg" }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("searchSSQ-onLoad:" + options.str);
    this.setData({
      searchFlag: options.type == 1? true : false
    });
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