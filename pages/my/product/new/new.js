// pages/my/product/new/new.js

var util = require('../../../../utils/util.js');
var common = require("../../../../utils/common.js")
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    popShow: false,
    dateType:"1",
    dateEnd:0,
    dateEndFormat:"",
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 1, 1).getTime(),
    currentDate: new Date().getTime(),
    tags: [
      { name: '1', value: '推荐' },
      { name: '2', value: '优惠' }
    ],
    tradeType: [
      { name: '1', value: '预约' }
    ],
    imgesArr:[
      "../../../../static/custom/defaults/def_ssq.jpg",
      "../../../../static/custom/defaults/def_ssq.jpg",
      "../../../../static/custom/defaults/def_ssq.jpg",
      "../../../../static/custom/defaults/def_ssq.jpg"
    ],
    resImgids:[],
    shopid : 0,
    p_name:"",
    p_des:"",
    p_price:0,
    p_unit:"",
    p_flags:[],
    p_tradeway:[],
    commited: []

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
    this.data.p_flags = e.detail.value;
  },

  //交易方式选择
  tradeTypeChange: function (e) {
    this.data.p_tradeway = e.detail.value;
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

  onNameInput: function (e) {
    this.data.p_name = e.detail.value;
    this.onDataChange();
  },
  onDesInput: function (e) {
    this.data.p_des = e.detail.value;
  },
  onPriceInput: function (e) {
    this.data.p_price = e.detail.value;
  },
  onUnitInput: function (e) {
    this.data.p_unit = e.detail.value;
  },

  onSave: function (e) {
    var suc = this.successed(this.data.p_name);
    if (suc) {
      this.toast("已提交了申请，切勿重复提交！")
      return;
    }
    if(this.checkData() != ""){
      this.toast(this.checkData());
      return;
    }
    wx.showLoading({
      title: '提交中，请稍后...',
      mask: true
    })
    var resImgs = [];
    common.uploadFiles(this.data.imgesArr, 0, resImgs, this.uploadCallBack, app.globalData.userInfo.session_id);

  },

  uploadCallBack: function (res) {
    console.log("--------uploadCallBack:" + JSON.stringify(res));
    if (res && res.length > 0) {
      this.data.resImgids = res;
      this.sendCommit();
    } else {
      wx.hideLoading();
      this.toast("图片上传失败！");
    }
  },
  sendCommit: function () {
    var that = this;
    common.request({
      method: "POST",
      url: common.BASE_URL + "?function=addProduct&session_id=" + app.globalData.userInfo.session_id,
      data: {
        'openid': app.globalData.userInfo.ID,
        'shopid': this.data.shopid,
        'p_name': this.data.p_name,
        'p_imgarr': util.arrayToString(this.data.resImgids),
        'p_des': this.data.p_des,
        'p_price': this.data.p_price,
        'p_unit': this.data.p_unit,
        'p_datetype': this.data.dateType,
        'p_dateend': this.data.dateEnd,
        'p_flags': util.arrayToString(this.data.p_flags),
        "p_tradeway": util.arrayToString(this.data.p_tradeway)
      },
      success: res => {
        console.log("--------addProduct:" + JSON.stringify(res));
        wx.hideLoading();
        if (res.data.iRet == 0) {
          that.toast("已成功提交申请！请勿重复提交！");
          that.data.commited.push({ "name": that.data.p_name });
          that.onDataChange();
        } else {
          that.toast("提交失败！请稍后再试。");
        }
      },
      fail: res => {
        wx.hideLoading();
        that.toast("提交失败！请检查您的网络。");
      }
    });
  },

  onDataChange: function() {
    app.globalData.updates['pages.my']=true;
  },

  checkData: function(){
    var _name = this.data.p_name.replace(/\s+/g, '');
    if (_name == "") { return "请输入产品名字！"; }
    var _des = this.data.p_des.replace(/\s+/g, '');
    if (_des == "") { return "请输入产品描述！"; }
    var _price = this.data.p_price.replace(/\s+/g, '');
    if (_price == "") { return "请输入产品名字！"; }
    var _unit = this.data.p_unit.replace(/\s+/g, '');
    if (_unit == "") { return "请输入产品单位！"; }
    if (this.data.dateType == 2 && this.data.dateEnd == 0){
      return "请选择产品到期时间！";
    }
    if (this.data.imgesArr == null || this.data.imgesArr.length <= 0)
    {
      return "请上传至少一张产品图片";
    }
    return "";
  },

  //检查是否已经成功提交了申请
  successed: function (name) {
    let len = this.data.commited.length;
    var got = false;
    if (len > 0) {
      for (var i = 0; i < len; i++) {
        if (name == this.data.commited[i]) {
          got = true;
        }
      }
      return got;
    } else {
      return false;
    }
  },

  toast: function(msg){
    wx.showToast({
      title: msg,
      icon:'none'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.shopid = options.shopid;
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