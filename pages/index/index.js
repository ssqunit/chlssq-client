import Toast from '../../components/vant/toast/toast';


const app = getApp()

// 在需要使用的js文件中，导入js
var util = require('../../utils/util.js');
var c_userInfo = require("../../utils/data/userInfo.js");
var common = require("../../utils/common.js")

// var QQMapWX = require('../../utils/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
// var qqmapsdk;


Page({
  data: {
    userInfo: c_userInfo.UserInfo,
    v_nickName:"",
    v_avatarUrl:"",
    time: "",
    searchKeyword: "",
    ssqInfo: null,
    defTextADInfo: { "shopId": "", "productId": -1, "text": "滚动文字轮播，点击了解详细！", "flag": 0, "img": "" },
    textADInfo: [],
    defImgADInfo: { "shopId": "", "productId": -1, "text": "", "flag": 0, "img": "../../static/custom/defaults/ad_img.jpg" },
    imgADInfo: [],
    defShopADInfo: { "shopId": -1, "productId":"", "text": "", "flag": 0, "img":"../../../static/custom/defaults/shop_logo.png"},
    shopADInfo: [],
    defPersonADInfo: { "shopId": -1, "productId": "", "text": "", "flag": 0, "img": "../../../static/custom/defaults/shop_logo.png" },
    personADInfo:[],
  },

  onLoad: function(options) {
    var time = util.formatTimeYMD(new Date());
    var weekday = util.getWeekDay(new Date());
    console.debug(time + " - " + weekday)
    this.setData({
      time: time + " - " + weekday
    })
    wx.showLoading({
      title: '加载中...',
      mask:true
    })

    // qqmapsdk = new QQMapWX({
    //   key: ''
    // });

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
        this.getMyPosition();
      },
      fail: res => {
        console.log("----------- updateUserInfo:" + JSON.stringify(res));
      }
    });
  },

  // 获取当前地理位置
  // getLocal: function (latitude, longitude) {
  //   let vm = this;
  //   qqmapsdk.reverseGeocoder({
  //     location: {
  //       latitude: latitude,
  //       longitude: longitude
  //     },
  //     success: function (res) {
  //       console.log("--------getLocal:"+JSON.stringify(res));

  //     },
  //     fail: function (res) {
  //       console.log(res);
  //     },
  //     complete: function (res) {
  //       // console.log(res);
  //     }
  //   });
  // },

  //获取我的位置信息
  getMyPosition:function() {
    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        app.globalData.myLocation.latitude = res.latitude;
        app.globalData.myLocation.longitude = res.longitude;
        that.getNearbySsqDetail(res.latitude, res.longitude);
        // that.getLocal(res.latitude, res.longitude);
      },
      fail: function () {
        that.toast("获取位置信息失败！");
        //that.getNearbySsqDetail(0, 0);
      }
    })
  },

  //获取首页商圈信息
  getNearbySsqDetail: function(latitude,longitude){
    var that = this;
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'getNearbySsqDetail',
        session_id: that.data.userInfo.session_id,
        "latitude": latitude,
        "longitude": longitude
      },
      success: res => {
        wx.hideLoading();
        console.log("----------- getNearbySsqDetail:" + JSON.stringify(res));
        if (res.data.iRet == 0) {
          that.setData({
            ssqInfo: res.data.data
          });
          
          //textADInfo
          if (!that.data.ssqInfo.textADInfo) {
            var _textADInfo = [];
            while (_textADInfo.length < 2) {
              _textADInfo.push(that.data.defTextADInfo);
            }
            that.setData({ textADInfo: _textADInfo })
          } else if (that.data.ssqInfo.textADInfo.length < 6) {
            var _textADInfo = that.data.ssqInfo.textADInfo;
            _textADInfo.push(that.data.defTextADInfo);
            that.setData({ textADInfo: _textADInfo })
          }

          //imgADInfo
          if (!that.data.ssqInfo.imgADInfo) {
            var _imgADInfo = [];
            while (_imgADInfo.length < 2) {
              _imgADInfo.push(that.data.defImgADInfo);
            }
            that.setData({ imgADInfo: _imgADInfo })
          } else if (that.data.ssqInfo.imgADInfo.length < 8) {
            var _imgADInfo = that.data.ssqInfo.imgADInfo;
            _imgADInfo.push(that.data.defImgADInfo);
            that.setData({ imgADInfo: _imgADInfo })
          }

          //shopADInfo
          if(!that.data.ssqInfo.shopADInfo){
            var _shopADInfo = [];
            while(_shopADInfo.length<8){
              _shopADInfo.push(that.data.defShopADInfo);
            }
            that.setData({shopADInfo:_shopADInfo})
          } else if (that.data.ssqInfo.shopADInfo.length<8){
            var _shopADInfo = that.data.ssqInfo.shopADInfo;
            while (_shopADInfo.length < 8) {
              _shopADInfo.push(that.data.defShopADInfo);
            }
            that.setData({ shopADInfo: _shopADInfo })
          }else{
            that.setData({ shopADInfo: that.data.ssqInfo.shopADInfo })
          }
          //personADInfo
          if (!that.data.ssqInfo.personADInfo) {
            var _personADInfo = [];
            while (_personADInfo.length < 4) {
              _personADInfo.push(that.data.defPersonADInfo);
            }
            that.setData({ personADInfo: _personADInfo })
          } else if (that.data.ssqInfo.personADInfo.length < 4) {
            var _personADInfo = that.data.ssqInfo.personADInfo;
            while (_personADInfo.length < 4) {
              _personADInfo.push(that.data.defPersonADInfo);
            }
            that.setData({ personADInfo: _personADInfo })
          } else {
            that.setData({ personADInfo: that.data.ssqInfo.personADInfo })
          }
        } else {
          that.toast("获取商圈信息失败！");
        }
      },//success
      fail: res => {
        that.toast("获取商圈信息失败！请检查网络或稍后再试。");
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
    if(type == 0){
      if (searchkeys && typeof (searchkeys) == String) {
        searchkeys = searchkeys.replace(/\s+/g, '');
      }
      if (searchkeys && searchkeys.length > 0) {
        wx.navigateTo({
          url: '../district/search/search?type=' + type + "&searchkeys=" + searchkeys
        })
      } else {
        this.toast("请输入搜索关键字！");
      }
    }else{
      wx.navigateTo({
        url: '../district/search/search?type=' + type + "&searchkeys=" + searchkeys
      })
    }
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
    var shopId = e.currentTarget.dataset.id;
    if(shopId == -1){
      wx.navigateTo({
        url: '../ad/shop/shop'
      })
    }else{
      wx.navigateTo({
        url: '../shop/shop'
      })
    }
  },

  //个人点击事件
  onPerClick: function (e) {
    var shopId = e.currentTarget.dataset.id;
    if (shopId == -1) {
      wx.navigateTo({
        url: '../ad/shop/shop'
      })
    } else {
      wx.navigateTo({
        url: '../shop/shop'
      })
    }
  },

  //点击文字或大图广告
  onSwiperAD: function(e){
    var pId = e.currentTarget.dataset.pid;
    if (pId == -1) {
      wx.navigateTo({
        url: '../help/ad/ad'
      })
    } else {
      wx.navigateTo({
        url: '../my/product/viewer/viewer'
      })
    }
  },

  toast: function (title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 3000
    })
  }


})