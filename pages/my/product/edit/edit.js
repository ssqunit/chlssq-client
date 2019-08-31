// pages/my/product/edit/edit.js

var util = require('../../../../utils/util.js');
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    popShow: false,
    productInfo:{},//产品的原始对象，不要修改其中任何属性
    imgesArr: [], //修改的图片数组
    des:"",       //修改的描述
    price: 0.0,    //修改的价格
    unit: "",      //修改的单位
    dateType: "1", //修改的产品期限类型
    dateEnd: "",   //修改的产品到期时间
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
    var product = app.globalData.productsForEdit[options.id];
    console.log("---------onLoad: product=" + JSON.stringify(product));
    delete app.globalData.productsForEdit[options.id];
    var tmp = this.data.tags;
    if (product.flagArr != null && product.flagArr.length > 0){
      for (var i = 0; i < tmp.length; i++) {
        for (var j = 0; j < product.flagArr.length; j++){
          if (Number(product.flagArr[j]['id']) == Number(tmp[i]['name'])){
            tmp[i]['checked'] = true;
          }
        }
      }
    }
    var tmpTrad = this.data.tradeType;
    var tradTypes = util.stringToArray(product.tradeway);
    if(tradTypes != null & tradTypes.length > 0){
      for (var i = 0; i < tmpTrad.length; i++) {
        for (var j = 0; j < tradTypes.length; j++) {
          if (Number(tradTypes[j]) == Number(tmpTrad[i]['name'])) {
            tmpTrad[i]['checked'] = true;
          }
        }
      }
    }
    this.setData({
      productInfo: product,
      imgesArr: product.imgUrls,
      dateType: product.datetype,
      dateEnd: product.dateend,
      dateEndFormat: util.formatTime(new Date(Number(product.dateend))),
      tags: tmp,
      tradeType: tmpTrad
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