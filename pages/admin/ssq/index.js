// pages/admin/ssq/index.js

var aList = require("../../../common/area.js");

var app = getApp();
var common = require("../../../utils/common.js")
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    ssqTotal:0,
    citysData: "",//区域
    areaSsqTotal:0,
    popShow: false,
    areaList: null,
    type1:false,
    type2: false,
    type3: true,
    currentType:3,
    ssqList:null,
    keywords:"",
    searchList:null,
    targetSsq:{
      "ID":"",
      "name":"茗萃园",
      "area":"广东省深圳市龙岗区",
      "photo":"",
      "position":{},
      "creator":{},
      "busCount":98,
      "perCount":89,
      "memCount":998,
      "block":0
    }
  },

  //选择区域
  choseArea: function (e) {
    let type = e.currentTarget.dataset.type;
    let t1 = type == 1 ? false : true;
    let t2 = type == 2 ? false : true;
    let t3 = type == 3 ? false : true;
    // console.log("--------"+t1+t2+t3)
    this.setData({
      popShow: true,
      type1: t1,
      type2: t2,
      type3: t3,
      currentType: type
    })
    
  },
  onClose: function () {
    this.setData({ popShow: false })
  },
  onAreaCancel: function () { this.onClose(); },
  onAreaConfirm: function (values, index) {
    let _info = "";
    for(var i=0;i<this.data.currentType;i++){
      _info += values.detail.values[i].name;
    }
    this.setData({
      citysData: _info
    })
    this.onClose();
    console.log('onAreaConfirm, citysData = '+ _info);
    this.getSsqInfoByArea(_info);
  },
  onAreaChange: function (values, index) {
    let _info = "";
    for (var i = 0; i < this.data.currentType; i++) {
      _info += values.detail.values[i].name;
    }
    this.setData({
      citysData: _info
    })
    console.log('onAreaChange, citysData = ' + _info);
  },

  //
  showOnMap: function (e) {
    wx.openLocation({
      latitude: e.currentTarget.dataset.latitude,
      longitude: e.currentTarget.dataset.longitude,
      scale: 14
    })
  },

  //
  radioChange: function (e) {
    console.log("radioChange---:" + e.detail.value + ",openid=" + e.currentTarget.dataset.openid);
  },

  onSearch: function (e) {
    let searchkeys = this.data.keywords;
    if (searchkeys && typeof (searchkeys) === 'string') {
      searchkeys = searchkeys.replace(/\s+/g, '');
      if (searchkeys != '') {
        this.searchSsq_admin(searchkeys);
      } else {
        wx.showToast({
          title: '请输入搜索关键字！',
          icon: 'none'
        })
      }
    }
  },

  doSearchChange: function (e) {
    this.data.keywords = e.detail;
  },

  searchSsq_admin:function(keywords){
    let that = this;
    wx.showLoading({ title: '请稍后......' });
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        "function": "searchSsq_admin",
        "session_id": app.globalData.userInfo.session_id,
        "keywords": keywords
      },
      success: res => {
        console.log('-------------searchSsq_admin: res = ' + JSON.stringify(res));
        wx.hideLoading();
        if (res.data.iRet == 0) {
          let _info = res.data.data;
          that.setData({
            searchList: _info
          });
        } else {
          wx.showToast({ title: '错误：' + res.data.sMsg, icon: "none" });
        }
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({ title: '请检查网络链接！', icon: "none" })
      }
    });
  },

  getSsqInfoByArea:function(area){
    let that = this;
    wx.showLoading({ title: '请稍后......' });
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        "function": "getSsqInfoByArea",
        "session_id": app.globalData.userInfo.session_id,
        "area": area
      },
      success: res => {
        console.log('-------------getSsqInfoByArea: res = ' + JSON.stringify(res));
        wx.hideLoading();
        if (res.data.iRet == 0) {
          let _info = res.data.data;
          let _total = _info["total"];
          let _list = _info['list'];
          if(area == "area"){
            that.setData({
              ssqTotal: _total,
              nickName: app.globalData.userInfo.nickName
            });
          }else{
            that.setData({
              areaSsqTotal: _total,
              ssqList: _list
            });
          }
        } else {
          wx.showToast({ title: '错误：' + res.data.sMsg, icon: "none" });
        }
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({ title: '请检查网络链接！', icon: "none" })
      }
    });
  },

  onDell: function (e) {
    let _type = e.currentTarget.dataset.type;
    let _ssqid = e.currentTarget.dataset.ssqid;
    let _ssqinfo = null;
    let _list = _type == 1 ? this.data.ssqList : this.data.searchList;
    if (_list && _list.length > 0){
      for(let i=0;i<_list.length;i++){
        if(_list[i]['ssqid'] == _ssqid){
          _ssqinfo = _list[i];
        }
      }
    }
    console.log('---onDell, ssqinfo = ' + JSON.stringify(_ssqinfo));
    this.setData({
      targetSsq: _ssqinfo
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      areaList: aList.default
    });
    this.getSsqInfoByArea("area");
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