import Toast from '../../components/vant/toast/toast';

const app = getApp()

// 在需要使用的js文件中，导入js
var util = require('../../utils/util.js');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    time: "",
    searchKeyword: "",
    postUrls: [
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563866519577&di=7b6bf24aa5b3e7ec54927b3aa829a33a&imgtype=0&src=http%3A%2F%2Fimg.redocn.com%2Fsheji%2F20150127%2Fshejianshangdelvxingmeishihaibaosheji_3895321.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563866519577&di=7b6bf24aa5b3e7ec54927b3aa829a33a&imgtype=0&src=http%3A%2F%2Fimg.redocn.com%2Fsheji%2F20150127%2Fshejianshangdelvxingmeishihaibaosheji_3895321.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563866519577&di=7b6bf24aa5b3e7ec54927b3aa829a33a&imgtype=0&src=http%3A%2F%2Fimg.redocn.com%2Fsheji%2F20150127%2Fshejianshangdelvxingmeishihaibaosheji_3895321.jpg"
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
  },

  onLoad: function(options) {
    var time = util.formatTimeYMD(new Date());
    var weekday = util.getWeekDay(new Date());
    console.debug(time + " - " + weekday)
    this.setData({
      time: time + " - " + weekday
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  },

  //跳转-个人详细信息
  goMyPerson: function(e) {
    wx.navigateTo({
      url: '../my/person/info'
    })
  },

  //跳转搜索商圈页面
  doSearch: function (e) {
    //TODO 
  },

  //跳转创建商圈
  goCreatSsq: function (e) {
    wx.navigateTo({
      url: '../district/create/create'
    })
  },

  //跳转商圈主页
  goSsqInfo: function (e) {
    wx.navigateTo({
      url: '../district/detail/detail'
    })
  },

  //选择商圈加入方式
  goJoin:function(e){
    wx.navigateTo({
      url: '../district/join/join'
    })
  },

  shopShowMore: function () {
    Toast({
      selector: "#van-toast",
      message: '本圈商家 - 查看更多'
    });
  },

  personShowMore: function () {
    Toast({
      selector: "#van-toast",
      message: '本圈个人 - 查看更多'
    });
  },
})