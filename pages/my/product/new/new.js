// pages/my/product/new/new.js

var util = require('../../../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    popShow: false,
    dateType:"1",
    dateEnd:"",
    dateEndFormat:"",
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 1, 1).getTime(),
    currentDate: new Date().getTime(),
    tags: [
      { name: '1', value: '推荐' },
      { name: '2', value: '优惠', checked: 'true' }
    ],
    tradeType: [
      { name: '1', value: '预约', checked: 'true' }
    ],
    imgesArr:[
      "../../../../static/custom/defaults/def_ssq.jpg",
      "../../../../static/custom/defaults/def_ssq.jpg",
      "../../../../static/custom/defaults/def_ssq.jpg",
      "../../../../static/custom/defaults/def_ssq.jpg"
    ]

  },

  //选择产品图片，最多4张
  loadImg: function (e) {
    var that = this;
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          imgesArr: tempFilePaths
        });
      }
    })
  },

  selectDate: function (e) {
    this.setData({
      popShow:true
    })
  },

  onConfirm: function(e) {
    console.log("--------onInput:" + e.detail)
    this.setData({
      popShow: false,
      dateEnd: e.detail,
      dateEndFormat: util.formatTime(new Date(e.detail))
    })
  },
  onCancel: function(e) {
    this.setData({
      popShow:false
    })
  },

  //选择日期类型
  onChangeDateType(event) {
    this.setData({
      dateType: event.detail
    });
  },

  //标签选择
  tagsChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  //交易方式选择
  tradeTypeChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    let urls = this.data.imgesArr;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls
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