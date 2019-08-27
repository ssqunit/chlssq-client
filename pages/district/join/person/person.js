// pages/district/join/person/person.js
var common = require("../../../../utils/common.js")
var util = require('../../../../utils/util.js');

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopOpText:"",
    addrText:"",
    contactText:"",
    upload_img: "",
    resImgids:[],
    ssqInfo: {},
    commited: []


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
  onOpTextInfo: function (e) {
    this.setData({ shopOpText: e.detail.value })
  },
  onAddrInfo: function (e) {
    this.setData({ addrText: e.detail.value })
  },
  onContactInfo: function (e) {
    this.setData({ contactText: e.detail.value })
  },

  commitApply:function(e){
    var that = this;
    var suc = that.successed(app.globalData.userInfo.nickName);
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
      that.data.uploadPaths = [that.data.upload_img];
      var resImgs = [];
      common.uploadFiles(that.data.uploadPaths, 0, resImgs, this.uploadCallBack, app.globalData.userInfo.session_id);

    } else {
      that.toast(ck);
    }  
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
      url: common.BASE_URL + "?function=joinApply&session_id=" + app.globalData.userInfo.session_id,
      data: {
        'ownerid': app.globalData.userInfo.ID,
        'ssqid': this.data.ssqInfo.ssqid,
        'ssqname': this.data.ssqInfo.name,
        'ssqarea': this.data.ssqInfo.area,
        'roletype': 3,

        "shopname": "username",
        "shopimg": "userphoto",
        "shopcimg": this.data.resImgids[0],
        "shopoptext": this.data.shopOpText,
        "shopaddr": this.data.addrText,
        "shopcontact": this.data.contactText
      },
      success: res => {
        wx.hideLoading();
        if (res.data.iRet == 0) {
          that.toast("已成功提交申请！请勿重复提交！");
          that.data.commited.push({ "name": app.globalData.userInfo.nickName });
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

  check: function () {
    var _opt = this.data.shopOpText.replace(/\s+/g, '');
    if (_opt == "") { return "请输入商家经营信息！"; }
    var _addrt = this.data.addrText.replace(/\s+/g, '');
    if (_addrt == "") { return "请输入商家地址！"; }
    var _conT = this.data.contactText.replace(/\s+/g, '');
    if (_conT == "") { return "请输入商家联系信息！"; }
    if (this.data.upload_img == "") { return "请上传手持身份证照！"; }
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
      "ssqid": options.ssqid,
      "imgid": options.ssqimg,
      "name": options.ssqname,
      "area": options.ssqarea,
      "distance": options.distance,
      "photo": common.getImgUrl(app.globalData.userInfo.session_id, options.ssqimg)
    }
    this.setData({
      ssqInfo: _info
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