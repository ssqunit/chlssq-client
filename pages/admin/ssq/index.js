// pages/admin/ssq/index.js

var aList = require("../../../common/area.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "locky",
    popShow: false,
    areaList: null,
    type1:false,
    type2: false,
    type3: true,
    currentType:3,
    citysData: "",//区域
    areaSsqTotal:0,
    sumInfo: {
      "ssqTotal": 64548
    },
    ssqList:[
      { "ID": "", "name": "茗萃园", "area": "广东省深圳市龙岗区" },
      { "ID": "", "name": "茗萃园", "area": "广东省深圳市龙岗区" },
      { "ID": "", "name": "茗萃园", "area": "广东省深圳市龙岗区" },
      { "ID": "", "name": "茗萃园", "area": "广东省深圳市龙岗区" },
      { "ID": "", "name": "茗萃园", "area": "广东省深圳市龙岗区" },
      { "ID": "", "name": "茗萃园", "area": "广东省深圳市龙岗区" }
    ],
    searchList: [
      { "ID": "", "name": "茗萃园", "area": "广东省深圳市龙岗区" },
      { "ID": "", "name": "茗萃园", "area": "广东省深圳市龙岗区" },
      { "ID": "", "name": "茗萃园", "area": "广东省深圳市龙岗区" },
      { "ID": "", "name": "茗萃园", "area": "广东省深圳市龙岗区" },
      { "ID": "", "name": "茗萃园", "area": "广东省深圳市龙岗区" },
      { "ID": "", "name": "茗萃园", "area": "广东省深圳市龙岗区" }
    ],
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
  },
  onAreaChange: function (values, index) {
    let _info = "";
    for (var i = 0; i < this.data.currentType; i++) {
      _info += values.detail.values[i].name;
    }
    this.setData({
      citysData: _info
    })
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
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      areaList: aList.default
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