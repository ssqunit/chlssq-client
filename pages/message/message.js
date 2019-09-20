// pages/message.js
import Dialog from '../../components/vant/dialog/dialog';

var common = require("../../utils/common.js")
var util = require('../../utils/util.js');

const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    msgList:null,
    refreshing: false
  },

  pageRequest: function () {
    let that = this;
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'getMsg',
        'session_id': app.globalData.userInfo.session_id
      },
      success: res => {
        that.onPullDownCompleted();
        //console.log("----------- getMsg:success" + JSON.stringify(res));
        if (res.data.iRet == 0) {
          var list = res.data.data;
          if (list && list.length > 0) {
            list.sort(that.compare("create_time"));
            for (var i = 0; i < list.length; i++) {
              var ms = Number(list[i]['create_time']) * 1000;
              list[i]['date'] = util.formatTime(new Date(ms));
              try {
                var value = wx.getStorageSync(String(list[i]['id']))
                list[i]['status'] = value == 1 ? 1 : 0;
              } catch (e) {
                list[i]['status'] = 0;
              }
            }
            that.setData({
              msgList: list
            });
          } else {
            wx.showToast({
              title: '没有消息！',
              icon: 'none'
            })
          }
        } else {
          wx.showToast({
            title: '查询公告失败！',
            icon: 'none'
          })
        }
      },
      fail: res => {
        that.onPullDownCompleted();
        wx.showToast({
          title: '请检查网络链接！',
          icon: 'none'
        })
      }
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.pageRequest();
  },

  compare: function (property) {

    return function (a, b) {

      var value1 = a[property];

      var value2 = b[property];

      return value2 - value1;

    }

  },


  onPullDownCompleted: function () {
    this.data.refreshing = false;
    wx.stopPullDownRefresh();
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
    console.log('-------onPullDownRefresh');
    // 上拉刷新
    if (!this.data.refreshing) {
      this.data.refreshing = true;
      this.pageRequest();
    }
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