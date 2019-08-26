// pages/district/join/join.js
import Toast from '../../../components/vant/toast/toast';
var common = require("../../../utils/common.js")
var util = require('../../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ssqInfo: {}

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
    var that = this;
    var _type = e.currentTarget.dataset.type;
    if(_type == 1){
      common.request({
        method: "POST",
        url: common.BASE_URL + '?function=joinApply&session_id=' + app.globalData.userInfo.session_id,
        data: {
          'ownerid':app.globalData.userInfo.ID,
          'ssqid': this.data.ssqInfo.ssqid,
          'ssqname': this.data.ssqInfo.name,
          'ssqarea': this.data.ssqInfo.area,
          'roletype':_type
        },
        success: res => {
          console.log("----------- joinApply:success" + JSON.stringify(res));
          if (res.data.iRet == 0) {
            Toast('加入成功！请勿重复提交！');
          } else {
            Toast('加入失败！' + res.data.sMsg);
          }
        },
        fail: res => {
          Toast('加入失败！' + res.data.sMsg);
        }
      });

    }else{
      var base = _type == 2 ? '../../district/join/business/business?' : '../../district/join/person/person?';
      wx.navigateTo({
        url: base +
          'ssqid=' + that.data.ssqInfo.ssqid +
          '&ssqimg=' + that.data.ssqInfo.imgid +
          '&ssqname=' + that.data.ssqInfo.name +
          '&ssqarea=' + that.data.ssqInfo.area +
          '&distance=' + that.data.ssqInfo.distance
      })
    }
  },

  //购买商圈广告
  buySsqAD: function (e) {

  },

  //预览图
  previewImage: function (e) {
    var current = e.currentTarget.dataset.src;
    let urls = [current];
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let ssqid = options.ssqid;
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
            Toast('服务器错误！res' + res.data.sMsg);
          }
        },
        fail: res => {
          Toast('网络错误！请检查设备网络');
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