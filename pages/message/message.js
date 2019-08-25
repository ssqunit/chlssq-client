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
    msgList:[
      { "id": 100, "title": "消息标题", "date": 154673677274, "status": 1, "content":"消息内容，消息内容，消息内容，消息内容，消息内容，消息内容"},
      { "id": 100, "title": "消息标题", "date": 154673677274, "status": 1, "content": "消息内容，消息内容，消息内容，消息内容，消息内容，消息内容" },
      { "id": 100, "title": "消息标题", "date": 154673677274, "status": 0, "content": "消息内容，消息内容，消息内容，消息内容，消息内容，消息内容" },
      { "id": 100, "title": "消息标题", "date": 154673677274, "status": 0, "content": "消息内容，消息内容，消息内容，消息内容，消息内容，消息内容" }
    ]
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let that = this;
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'getMsg',
        session_id: app.globalData.userInfo.session_id,
        'openid': app.globalData.userInfo.ID
      },
      success: res => {
        console.log("----------- getMsg:success" + JSON.stringify(res));
        if (res.data.iRet == 0) {
          var list = res.data.data;
          if(list && list.length>0){
            for(var i=0;i<list.length;i++){
              var ms = Number(list[i]['create_time'])*1000;
              list[i]['date'] = util.formatTime(new Date(ms));
              list[i]['status'] = 1;
            }
            that.setData({
              msgList:list
            });
          }else{
            Toast("没有消息！");
          }
        } else {
          Toast.fail("查询公告失败！");
        }
      },
      fail: res => {
        Toast.fail("请检查网络链接！");
      }
    });


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