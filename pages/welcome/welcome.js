// pages/welcome/welcome.js

const app = getApp()

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
      wx.switchTab({
        url: '/pages/index/index'
      })
    }else{
      //授权失败
      wx.showToast({
        title: '请授权微信登入！',
        icon: 'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.userInfoPermissionCallback = res => {
      console.log('------------ userInfoPermissionCallback : res = ' + JSON.stringify(res));
      if(res == 'success'){
        wx.switchTab({
          url: '/pages/index/index'
        })
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