//index.js
//获取应用实例
const app = getApp()

// 在需要使用的js文件中，导入js
var util = require('../../utils/util.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    time:"",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    img_ssqnew: "../../images/SSQ_new.png",
    icon_pos: "../../images/icon_pos.png",
    banner_img:"../../images/banners/banner_0.png"
  },
  // ---------- 事件处理函数 ---------start
  //跳转-个人详细信息
  goSelfDetail:function(){
    wx.navigateTo({
      url: '../selfDetail/selfDetail'
    })
  },

  //跳转商圈搜索页面
  goSearchPage:function(){
    wx.navigateTo({
      url: '../searchSSQ/searchSSQ?type=1'
    })
  },

  //跳转搜索商圈页面
  doSearch: function (event) {
    wx.navigateTo({
      url: '../searchSSQ/searchSSQ?type=1&str='+event.detail._value
    })
  },

  //跳转附近的商圈页面
  gofjssqPage: function () {
    wx.navigateTo({
      url: '../searchSSQ/searchSSQ?type=0'
    })
  },

  //跳转创建商圈页面
  goCreatSSQ: function (event) {
    wx.navigateTo({
      url: '../creatSSQ/creatSSQ'
    })
  },

  // ---------- 事件处理函数 ---------end


  onLoad: function () {

    var time = util.formatTimeYMD(new Date());
    var weekday = util.getWeekDay(new Date());
    this.setData({
      time:time +" - "+ weekday
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
