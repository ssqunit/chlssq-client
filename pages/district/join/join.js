// pages/district/join/join.js

var common = require("../../../utils/common.js")
var util = require('../../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ssqInfo: { "ID": 0, "name": "御峰园", "area": "广东省深圳市龙岗区", "photo": "../../../static/custom/defaults/def_ssq.jpg", "busCount": 98, "perCount": 66 }

  },

  //打开商圈在地图上的位置
  openPosition: function (e) {
    wx.openLocation({
      latitude: this.ssqInfo.latitude,
      longitude: this.ssqInfo.longitude,
      scale: 14
    })
  },

  //商圈入驻
  joinApply: function (e) {
    var _type = e.currentTarget.dataset.type;
    if(_type == 1){

    }
    else if(_type == 2){
      wx.navigateTo({
        url: '../../district/join/person/person'
      })
    }
    else if (_type == 3) {
      wx.navigateTo({
        url: '../../district/join/business/business'
      })
    }
  },

  //购买商圈广告
  buySsqAD: function (e) {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let ssqid = options.ssqid;
    console.log("---------onLoad:ssqid="+ssqid);
    if(ssqid > 0)
    {
      common.request({
        method: "GET",
        url: common.BASE_URL,
        data: {
          'function': 'getSsqInfo4JoinPage',
          "session_id": app.globalData.userInfo.session_id,
          "ssqid": ssqid
        },
        success: res => {
          if (res.data.iRet == 0) {
            var resList = res.data.data;
            if (resList && resList.length > 0) {
              resList[0]["distance"] = util.countDistance(
                app.globalData.myLocation.latitude, app.globalData.myLocation.longitude,
                resList[0]["latitude"], resList[0]['longitude']);
              resList[0]['imageUrl'] = common.getImgUrl(app.globalData.userInfo.session_id, resList[0]['imgid']);
              that.setData({
                ssqInfo: resList[0]
              })
            }
          } else {
            wx.showToast({
              title: '服务器错误！res:' + res.sMsg,
              mask: true,
              duration: 2000
            })
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