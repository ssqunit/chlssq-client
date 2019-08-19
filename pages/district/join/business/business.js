// pages/district/join/business/business.js

var constd = require("../../../../utils/data/constd.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    actions: constd.OpType,
    opType:{},
    upload_img1: "",
    upload_img2: "",
    positions: null,
    distance: 0.50,
    ssqInfo: { "ID": 0, "name": "御峰园",     upload_img: "",
"area": "广东省深圳市龙岗区", "photo": "../../../../static/custom/defaults/def_ssq.jpg", "busCount": 98, "perCount": 66 }

  },

  selectOpType: function (e) {
    this.setData({
      show:true
    })
    console.log("---------："+this.data.show)
  },
  onSelect: function (e) {
    this.setData({
      opType: e.detail
    })
    console.log("----------:"+JSON.stringify(e))
    this.onClose();
  },
  onClose: function () {
    this.setData({ show: false })
  },

  uploadImg1: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          upload_img1: tempFilePaths[0]
        });
      }
    })
  },

  uploadImg2: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          upload_img2: tempFilePaths[0]
        });
        // wx.uploadFile({
        //   url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     'user': 'test'
        //   },
        //   success(res) {
        //     const data = res.data
        //     //do something
        //   }
        // })
      }
    })
  },

  //在地图上标记位置
  onMapMark: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          positions: { "latitude": res.latitude, "longitude": res.longitude },
        })
      },
      fail: function () {
        that.setData({
          positions: { "latitude": "获取位置信息失败！", "longitude": "" }
        })
      }
    })
  },

  //获取当前的位置经纬度
  getCurPosition: function (e) {
    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        that.setData({
          positions: { "latitude": res.latitude, "longitude": res.longitude },
        })
      },
      fail: function () {
        that.setData({
          positions: { "latitude": "获取位置信息失败！", "longitude": "" }
        })
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