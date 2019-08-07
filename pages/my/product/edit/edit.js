// pages/my/product/edit/edit.js

var util = require('../../../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    popShow: false,
    productInfo:{
      ID:113,
      "name":"肩周调理",
      "images": [
        "../../../../static/custom/defaults/def_ssq.jpg",
        "../../../../static/custom/defaults/def_ssq.jpg",
        "../../../../static/custom/defaults/def_ssq.jpg",
        "../../../../static/custom/defaults/def_ssq.jpg"
      ],
      "des":"这里是产品的描述信息",
      "price":98.99,
      "unit":"次",
      "dateType":"2",
      "dateEnd": 1565000815723,
      "tags":["1"],
      "tradeType":[]
    },
    pName:"",
    des:"",
    price:0.0,
    unit:"",
    dateType: "1",
    dateEnd: "",
    dateEndFormat: "",
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 1, 1).getTime(),
    currentDate: new Date().getTime(),
    tags: [
      { name: '1', value: '推荐', checked: false },
      { name: '2', value: '优惠', checked: false }
    ],
    tradeType: [
      { name: '1', value: '预约', checked: false }
    ],
    imgesArr: []

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
      popShow: true
    })
  },

  onConfirm: function (e) {
    console.log("--------onInput:" + e.detail)
    this.setData({
      popShow: false,
      dateEnd: e.detail,
      dateEndFormat: util.formatTime(new Date(e.detail))
    })
  },
  onCancel: function (e) {
    this.setData({
      popShow: false
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

    //-----------预设页面内容-------
    if (this.data.productInfo.dateType == "2") {
      this.setData({
        dateEndFormat: util.formatTime(new Date(this.data.productInfo.dateEnd))
      })
    }
    this.setData({
      pName: this.data.productInfo.name,
      imgesArr: this.data.productInfo.images,
      des: this.data.productInfo.des,
      price: this.data.productInfo.price,
      unit: this.data.productInfo.unit,
      dateType: this.data.productInfo.dateType,

    })
    let len = this.data.productInfo.tags.length
    let m1 = false
    let m2 = false
    if( len > 0){
      for(var i=0; i<len; i++){
        if (this.data.productInfo.tags[i] == "1") m1 = true
        if (this.data.productInfo.tags[i] == "2") m2 = true
      }
    }
    this.setData({
      tags: [
        { name: '1', value: '推荐', checked: m1 },
        { name: '2', value: '优惠', checked: m2 }
      ]
    })
    if(this.data.productInfo.tradeType.length > 0){
      this.setData({
        tradeType: [
          { name: '1', value: '预约', checked: true }
        ]
      })
    }else{
      this.setData({
        tradeType:[
          { name: '1', value: '预约', checked: false }
        ]
      })
    }
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