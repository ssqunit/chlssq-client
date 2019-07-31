// pages/district/join/person/person.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    upload_img:"",
    distance: 0.50,
    ssqInfo: { "ID": 0, "name": "御峰园", "area": "广东省深圳市龙岗区", "photo": "../../../../static/custom/defaults/def_ssq.jpg", "busCount": 98, "perCount": 66 }

  },

  uploadImg: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          upload_img: tempFilePaths[0]
        });
      }
    })
  },

  commitApply:function(e){
    var that = this;
    wx.uploadFile({
      url: 'https://ssqunit.com/index.php?function=upload',
      filePath: that.data.upload_img,
      name: 'file',
      formData: {
        'user': 'test'
      },
      session_id: "app.globalData.userInfo",
      success(res) {
        console.log("ssssssssssssssssssssssss");
        const data = res.data
        //do something
      },
      fail(res){
        console.log("fffffffffffffffffffff");
      }
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