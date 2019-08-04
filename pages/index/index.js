import Toast from '../../components/vant/toast/toast';


const app = getApp()

// 在需要使用的js文件中，导入js
var util = require('../../utils/util.js');
var c_userInfo = require("../../utils/data/userInfo.js");
var common = require("../../utils/common.js")

Page({
  data: {
    userInfo: c_userInfo.UserInfo,
    v_nickName:"",
    v_avatarUrl:"",
    time: "",
    searchKeyword: "",
    postTexts: [
      { "text": "这里最多能显示多少个字好吧这里最多能显示多23" },
      { "text": "这里最多能显示多少个字？-》good$￥# 好吧！" },
      { "text": "这里最多能显示多少个字好吧这里最多能显示多少23" },
      { "text": "这里最多能显示多少个字好吧这里最多能显示多" },
      { "text": "这里最多能显示多少个字？-》good$￥# 好吧！" }
    ],
    postImgs: [
      { "url": "../../static/custom/defaults/def_ssq.jpg" , "text": "针对图片的描述"},
      { "url": "../../static/custom/defaults/def_ssq.jpg", "text": "" },
      { "url": "../../static/custom/defaults/def_ssq.jpg", "text": "针对图片的描述" },
      { "url": "../../static/custom/defaults/def_ssq.jpg", "text": "" },
      { "url": "../../static/custom/defaults/def_ssq.jpg", "text": "针对图片的描述" },
      { "url": "../../static/custom/defaults/def_ssq.jpg", "text": "针对图片的描述" },
      { "url": "../../static/custom/defaults/def_ssq.jpg", "text": "" }
    ],
    busPosData: [
      { "id": "101", "name": "双手理疗馆", "tag": "1", "img": "../../../static/custom/defaults/def_ssq.jpg" },
      { "id": "102", "name": "健康养生馆", "tag": "1", "img": "../../../static/custom/defaults/def_ssq.jpg" },
      { "id": "103", "name": "一凡超市", "tag": "0", "img": "../../../static/custom/icons/icon_pos_b.png" },
      { "id": "104", "name": "美丽美发馆", "tag": "1", "img": "../../../static/custom/banners/banner_0.png" },
      { "id": "105", "name": "生鲜超市", "tag": "1", "img": "../../../static/custom/code.jpg" },
      { "id": "106", "name": "水果王", "tag": "1", "img": "../../../static/custom/defaults/def_ssq.jpg" },
      { "id": "107", "name": "美丽美发馆", "tag": "1", "img": "../../../static/custom/defaults/def_ssq.jpg" },
      { "id": "108", "name": "黄金展示位", "tag": "0", "img": "../../../static/custom/defaults/def_ssq.jpg" }
    ],
    perPosData: [
      { "id": "105", "name": "生鲜超市", "tag": "1", "img": "../../../static/custom/code.jpg" },
      { "id": "106", "name": "水果王", "tag": "1", "img": "../../../static/custom/code.jpg" },
      { "id": "107", "name": "美丽美发馆", "tag": "1", "img": "../../../static/custom/code.jpg" },
      { "id": "108", "name": "黄金展示位", "tag": "0", "img": "../../../static/custom/code.jpg" }
    ],

  },

  onLoad: function(options) {
    var time = util.formatTimeYMD(new Date());
    var weekday = util.getWeekDay(new Date());
    console.debug(time + " - " + weekday)
    this.setData({
      time: time + " - " + weekday
    })

    app.userInfoReadyCallback = res => {
      console.log("----------- get user info callback:" + JSON.stringify(res))

      this.data.userInfo.nickName = res.userInfo.nickName;
      this.data.userInfo.gender = res.userInfo.gender;
      this.data.userInfo.language = res.userInfo.language;
      this.data.userInfo.city = res.userInfo.city;
      this.data.userInfo.province = res.userInfo.province;
      this.data.userInfo.country = res.userInfo.country;
      this.data.userInfo.avatarUrl = res.userInfo.avatarUrl;
      app.globalData.userInfo = this.data.userInfo;
      this.myLogin();
    }

  },

  myLogin:function(){
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'login',
        js_code: app.globalData.js_code
      },
      success: res => {
        if (res.data.iRet == 0) {
          this.data.userInfo.ID = res.data.data.openId;
          this.data.userInfo.session_id = res.data.data.session_id;
          app.globalData.userInfo = this.data.userInfo;

          common.request({
            method: "GET",
            url:common.BASE_URL,
            data:{
              "function": "getUserInfo",
              session_id: this.data.userInfo.session_id
            },
            success: res => {
              this.data.userInfo.actLimit = res.data.data.actlimit;
              this.data.userInfo.ssqLimit = res.data.data.ssqLimit;
              this.data.userInfo.mySsqInfo = res.data.data.mySsqInfo;
              app.globalData.userInfo = this.data.userInfo;

              this.setData({
                v_nickName:this.data.userInfo.nickName,
                v_avatarUrl:this.data.userInfo.avatarUrl
              })
            },
            fail: res => {
              //getUserInfo fail
            }
          })
              // common.request({
              //   method: "POST",
              //   url: "/user/wx/user_info/update",
              //   data: {
              //     nickName: res.userInfo.nickName,
              //     avatarUrl: res.userInfo.avatarUrl,
              //     gender: res.userInfo.gender,
              //     city: res.userInfo.city,
              //     province: res.userInfo.province,
              //     country: res.userInfo.country,
              //   },
              //   success: res => { }
              // })
        } else {
              wx.showToast({
                title: '登录失败，请重试',
                icon: 'none',
                duration: 2000
              })
        }
      },//success
      fail: res => {
        wx.showToast({
          title: res.errMsg,
            icon: 'none',
            duration: 2000
        })
      },//fail

    })//common.request

  },

  //打开商圈在地图上的位置
  openPosition: function (e) {
    wx.openLocation({
      latitude: 21.70915603,
      longitude: 111.35697174,
      scale: 14
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
    let type = e.currentTarget.dataset.type;
    let searchkeys = this.data.searchKeyword;
    wx.navigateTo({
      url: '../district/search/search?type=' + type + "&searchkeys=" + searchkeys
    })
  },
  doSearchChange: function (e) {
    this.data.searchKeyword = e.detail;
  },

  //跳转创建商圈
  goCreatSsq: function (e) {
    wx.navigateTo({
      url: '../district/create/create'
    })
  },

  //跳转商圈主页
  goSsqInfo: function (e) {
    let tab = e.currentTarget.dataset.tab;
    wx.navigateTo({
      url: '../district/detail/detail?tab='+ tab
    })
  },

  //选择商圈加入方式
  goJoin:function(e){
    wx.navigateTo({
      url: '../district/join/join'
    })
  },

  //商家点击事件
  onBusClick:function(e){
    console.log("onBusClick,id="+e.currentTarget.dataset.id);
  },

  //个人点击事件
  onPerClick: function (e) {
    console.log("onBusClick,id=" + e.currentTarget.dataset.id);
  }


})