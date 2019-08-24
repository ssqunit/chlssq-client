// pages/district/search/search.js

var common = require("../../../utils/common.js")
var util = require('../../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openType:0,
    searchResNotNull:true,
    nearbyResNotNull:true,
    searchList:null,
    nearbyList: null,

  },

  //搜索社圈
  sendSearchRequest: function(keys){
    var that = this;
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'searchSsq',
        "session_id": app.globalData.userInfo.session_id,
        "keywords":keys
      },
      success: res => {

        if (res.data.iRet == 0) {
          var resList = res.data.data;
          if (!resList || resList.length == 0) {
            that.setData({ searchResNotNull: false })
          } else {
            for (var i = 0; i < resList.length; i++) {
              resList[i]["distance"] = util.countDistance(
                app.globalData.myLocation.latitude, app.globalData.myLocation.longitude,
                resList[i]["latitude"], resList[i]['longitude']);
              resList[i]['imageUrl'] = common.getImgUrl(app.globalData.userInfo.session_id, resList[i]['imgid']);
            }
            that.setData({ 
              searchList: resList,
              searchResNotNull: true
            })
          }

        } else {
          wx.showToast({
            title: '服务器错误！res:' + res.sMsg,
            mask: true,
            duration: 2000
          })
          that.setData({ searchResNotNull:false })
        }
      },
      fail: res => {
        wx.showToast({
          title: '网络错误！请检查设备网络。',
          mask: true,
          duration: 2000
        })
      }
    });
  },

  //拉取附近商圈
  sendNearbyRequest: function(){
    var that = this;
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'getNearbySsq',
        "session_id": app.globalData.userInfo.session_id,
        "latitude":app.globalData.myLocation.latitude,
        "longitude":app.globalData.myLocation.longitude
      },
      success: res => {
        if(res.data.iRet==0){
          var resList = res.data.data;
          if(!resList || resList.length==0){
            that.setData({ nearbyResNotNull : false})
          }else{
            for(var i=0;i<resList.length;i++){
              resList[i]["distance"] = util.countDistance(
                app.globalData.myLocation.latitude,app.globalData.myLocation.longitude,
                resList[i]["latitude"],resList[i]['longitude']);
              resList[i]['imageUrl'] = common.getImgUrl(app.globalData.userInfo.session_id,resList[i]['imgid']); 
            }
            that.setData({ 
              nearbyList: resList,
              nearbyResNotNull:true
            })
          }
        }else{
          wx.showToast({
            title: '服务器错误！res:'+res.sMsg,
            mask: true,
            duration: 2000
          })
          that.setData({ nearbyResNotNull: false })
        }
      },
      fail: res => {
        wx.showToast({
          title: '网络错误！请检查设备网络。',
          mask:true,
          duration:2000
        })
      }
    });
  },

  //打开商圈在地图上的位置
  openPosition: function (e) {
    wx.openLocation({
      latitude: Number(e.currentTarget.dataset.latitude),
      longitude: Number(e.currentTarget.dataset.longitude),
      scale: 14
    })
  },

  //跳转商圈主页
  goSsqInfo: function (e) {
    let tab = e.currentTarget.dataset.tab;
    wx.navigateTo({
      url: '../detail/detail?tab=' + tab
    })
  },

  //选择商圈加入方式
  goJoin: function (e) {
    wx.navigateTo({
      url: '../join/join?ssqid=' + e.currentTarget.dataset.ssqid
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type;
    this.setData({
      openType: type
    })
    
    if(type == 0){
      let searchkeys = options.searchkeys;
      this.sendSearchRequest(searchkeys);
    }
    this.sendNearbyRequest();

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