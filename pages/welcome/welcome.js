// pages/welcome/welcome.js

const app = getApp();

var common = require("../../utils/common.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },


  //
  bindGetUserInfo(e) {
    console.log('-------------:bindGetUserInfo, e=' + JSON.stringify(e));
    if(e.detail.errMsg == 'getUserInfo:ok'){
      //授权成功
      common.applyLocationPermission(this.checkLocationCallBack);
    }else{
      //用户信息授权失败，不允许进入应用
      wx.showToast({
        title: '请授权微信登入！',
        icon: 'none'
      })
    }
  },

  checkLocationCallBack:function(res){
    console.log('---------checkLocationCallBack: res = '+res);
    if(res == "success"){
      app.globalData.locationPermission = true;
      wx.switchTab({
        url: '/pages/index/index'
      })
    }else{
      //位置信息授权失败
      app.globalData.locationPermission = false;
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.userInfoPermissionCallback = res => {
      console.log('------------ userInfoPermissionCallback : res = ' + JSON.stringify(res));
      if(res == 'success'){
        common.applyLocationPermission(that.checkLocationCallBack);
      }
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