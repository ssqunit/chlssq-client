// pages/district/join/business/business.js

var constd = require("../../../../utils/data/constd.js");
var common = require("../../../../utils/common.js")
var util = require('../../../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    actions: constd.OpType,
    opType:null,
    upload_img1: "",
    upload_img2: "",
    uploadPaths:[],
    resImgids:[],
    positions: null,
    ssqInfo: {},
    shopname:"",
    shopOpText:"",
    addrText:"",
    contactText:"",
    markText:"未标记",
    commited:[]

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
          markText: "已标记"
        })
      },
      fail: function () {
        that.setData({
          positions: null,
          markText: "未标记"
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
          markText: "已标记"
        })
      },
      fail: function () {
        that.setData({
          positions: null,
          markText: "未标记"
        })
      }
    })
  },

  //提交申请
  onCommit: function (e) {
    var that = this;
    var suc = that.successed(that.data.shopname);
    if (suc) {
      that.toast("已提交了申请，切勿重复提交！")
      return;
    }
    var ck = that.check();
    if (ck == "") {
      wx.showLoading({
        title: '提交中，请稍后...',
        mask: true
      })
      that.data.uploadPaths = [that.data.upload_img1, that.data.upload_img2];
      var resImgs = [];
      common.uploadFiles(imgPaths, 0, resImgs, this.uploadCallBack, app.globalData.userInfo.session_id);

    } else {
      that.toast(ck);
    }  
  },

  uploadCallBack:function(res){
    console.log("--------uploadCallBack:"+JSON.stringify(res));
    if(res && res.length>0){
      this.data.resImgids = res;
      this.sendCommit();
    }else{
      wx.hideLoading();
      this.toast("图片上传失败！");
    }
  },

  sendCommit: function () {
          // common.request({
          //   method: "POST",
          //   url: common.BASE_URL + "?function=createSsq&session_id=" + app.globalData.userInfo.session_id,
          //   data: {
          //     "imgId": that.data.imgId,
          //     "area": that.data.citysData,
          //     "name": that.data.inputText,
          //     "latitude": Math.round(that.data.positions.latitude * 100000) / 100000,
          //     "longitude": Math.round(that.data.positions.longitude * 100000) / 100000
          //   },
          //   success: res => {
          //     if (res.data.iRet == 0) {
          //       wx.hideLoading();
          //       that.toast("已成功提交申请！请勿重复提交！");
          //       that.data.commited.push({ "name": that.data.inputText });
          //     } else {
          //       wx.hideLoading();
          //       that.toast("提交失败！请稍后再试。");
          //     }
          //   },
          //   fail: res => {
          //     wx.hideLoading();
          //     that.toast("提交失败！请检查您的网络。");
          //   }
          // });
  },

  onNameInfo: function (e) {
    this.setData({ shopname: e.detail.value })
  },
  onOpTextInfo: function (e) {
    this.setData({ shopOpText: e.detail.value })
  },
  selectOpType: function (e) {
    this.setData({ show: true })
  },
  onSelect: function (e) {
    this.setData({ opType: e.detail })
    this.onClose();
  },
  onClose: function () {
    this.setData({ show: false })
  },
  onAddrInfo: function (e) {
    this.setData({ addrText: e.detail.value })
  },
  onContactInfo: function (e) {
    this.setData({ contactText: e.detail.value })
  },

  check: function () {
    var _name = this.data.shopname.replace(/\s+/g, '');
    if (_name == "") { return "请输入商家名字！";}
    var _opt = this.data.shopOpText.replace(/\s+/g, '');
    if (_opt == "") { return "请输入商家经营信息！"; }
    if(this.data.opType == null){ return "请选择商家类别！"; }
    var _addrt = this.data.addrText.replace(/\s+/g, '');
    if (_addrt == "") { return "请输入商家地址！"; }
    var _conT = this.data.contactText.replace(/\s+/g, '');
    if (_conT == "") { return "请输入商家联系信息！"; }
    if (this.data.positions == null){ return "请标记商家位置"; }
    if (this.data.upload_img1 == ""){ return "请上传营业执照！"; }
    if (this.data.upload_img2 == "") { return "请上传商家形象照！"; }
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

  toast: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _info = {
      "ID":options.ssqid, 
      "imgid":options.ssqimg, 
      "name":options.ssqname, 
      "area":options.ssqarea,
      "distance":options.distance,
      "photo": common.getImgUrl(app.globalData.userInfo.session_id, options.ssqimg)
      }
    this.setData({
      ssqInfo:_info
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