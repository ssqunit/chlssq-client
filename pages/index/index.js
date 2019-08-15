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
      console.log("----------- userInfoReadyCallback:" + JSON.stringify(res));
      this.data.userInfo.nickName = res.userInfo.nickName;
      this.data.userInfo.gender = res.userInfo.gender;
      this.data.userInfo.language = res.userInfo.language;
      this.data.userInfo.city = res.userInfo.city;
      this.data.userInfo.province = res.userInfo.province;
      this.data.userInfo.country = res.userInfo.country;
      this.data.userInfo.avatarUrl = res.userInfo.avatarUrl;
      app.globalData.userInfo = this.data.userInfo;
      this.setData({
        v_nickName: this.data.userInfo.nickName,
        v_avatarUrl: this.data.userInfo.avatarUrl
      })
      this.requestNotice();
    }

  },

  //拉取通知消息
  requestNotice: function (e) {
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'requestNotice'
      },
      success: res => {
        console.log("----------- requestNotice:success" + JSON.stringify(res));
        if (res.data.iRet == 0) {

        } else {
          this.toast("查询公告失败！");
        }
        this.myLogin();
      },
      fail: res => {
        this.myLogin();
      }
    });
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

              this.updateInfo2Svr();
            },
            fail: res => {
              this.toast(res.errMsg);
            }
          })
        } else {
          this.toast('登录失败，请重试');
        }
      },//success
      fail: res => {
        this.toast(res.errMsg);
      },//fail
    })//common.request
  },

  //更新用户信息给服务器
  updateInfo2Svr: function () {
    common.request({
      method:"POST",
      url: common.BASE_URL + '?function=updateUserInfo&session_id=' + this.data.userInfo.session_id,
      data: {
        "openId": this.data.userInfo.ID, 
        "nickName": this.data.userInfo.nickName, 
        "gender": this.data.userInfo.gender, 
        "language": this.data.userInfo.language, 
        "city": this.data.userInfo.city, 
        "province": this.data.userInfo.province, 
        "country": this.data.userInfo.country, 
        "avatarUrl": this.data.userInfo.avatarUrl
      },
      success: res => {
        console.log("----------- updateUserInfo:"+JSON.stringify(res));
        this.getNearbySsqDetail();
      },
      fail: res => {
        console.log("----------- updateUserInfo:" + JSON.stringify(res));
      }
    });
  },

  //获取首页商圈信息
  getNearbySsqDetail:function() {
    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        common.request({
          method: "GET",
          url: common.BASE_URL,
          data: {
            'function': 'getNearbySsqDetail',
            session_id: that.data.userInfo.session_id,
            "latitude": res.latitude,
            "longitude": res.longitude
          },
          success: res => {
            console.log("----------- getNearbySsqDetail:" + JSON.stringify(res));
            if (res.data.iRet == 0) {
            } else {
              that.toast("获取商圈信息失败！");
            }
          },//success
          fail: res => {
            that.toast("获取商圈信息失败！请检查网络或稍后再试。");
          },//fail
        })//common.request
      },
      fail: function () {
      }
    })

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
    wx.navigateTo({
      url: '../shop/shop'
    })
  },

  //个人点击事件
  onPerClick: function (e) {
    console.log("onBusClick,id=" + e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../shop/shop'
    })
  },

  toast: function (title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 3000
    })
  }


})