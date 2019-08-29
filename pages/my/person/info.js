// pages/my/person/info.js
var app = getApp();
var common = require("../../../utils/common.js")
var util = require('../../../utils/util.js');

import Dialog from '../../../components/vant/dialog/dialog';

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo:null,
    ssqData: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    });
    this.myJoinRequest();
  },

  //
  myJoinRequest: function () {
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'getMyJoin',
        'session_id': this.data.userInfo.session_id,
        'openid':this.data.userInfo.ID
      },
      success: res => {
        if (res.data.iRet == 0) {
          this.setData({
            ssqData:res.data.data
          })
        } else {
          wx.showToast({
            title: '查询社圈失败！',
          })
        }
      },
      fail: res => {
        wx.showToast({
          title: '请检查网络链接！',
        })
      }
    });
  },

  goAbout: function () {
    wx.navigateTo({
      url: '../../about/about'
    })
  },

  onQuit: function (e) {
    var _title = "退出社圈";
    var _message = "";
    var dateStr = util.formatTime(new Date(e.currentTarget.dataset.create_time * 1000));
    if (e.currentTarget.dataset.roletype == 1){
      _message = "您于"+dateStr+"加入了该社圈，成为社圈尊贵的一员，谢谢您的陪伴！您确定退出该社圈请按'确定'！";
    }
    else if (e.currentTarget.dataset.roletype == 2){
      _message = "您于" + dateStr + "入驻了该社圈，成为社圈尊贵的商家，谢谢您的付出与陪伴！退出社圈后您的商家信息将不会再出现在该商圈，确定退出请按'确定'！";
    }
    else if (e.currentTarget.dataset.roletype == 3) {
      _message = "您于" + dateStr + "入驻了该社圈，成为社圈尊贵的个人商家，谢谢您的付出与陪伴！退出社圈后您的商家信息将不会再出现在该商圈，确定退出请按'确定'！";
    }
    Dialog.confirm({
      title: _title,
      message: _message
    }).then(() => {
      this.myQuitRequest(e.currentTarget.dataset.ssqid);
    }).catch(() => {
      // on cancel
    });
  },

  //
  myQuitRequest: function (ssqid) {
    var that = this;
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'quitSsq',
        'session_id': this.data.userInfo.session_id,
        'openid': this.data.userInfo.ID,
        'ssqid':ssqid
      },
      success: res => {
        if (res.data.iRet == 0) {
          wx.showToast({
            title: '已退出该社圈！',
          })
          that.myJoinRequest();
        } else {
          wx.showToast({
            title: '退出社圈失败！请稍后再试！',
          })
        }
      },
      fail: res => {
        wx.showToast({
          title: '请检查网络链接！',
        })
      }
    });
  },

  admin: function (e) {
    wx.navigateTo({
      url: '../../admin/index'
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})