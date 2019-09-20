import Toast from '../../components/vant/toast/toast';
import Dialog from '../../components/vant/dialog/dialog';


const app = getApp()

// 在需要使用的js文件中，导入js
var util = require('../../utils/util.js');
var c_userInfo = require("../../utils/data/userInfo.js");
var common = require("../../utils/common.js")

// var QQMapWX = require('../../utils/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
// var qqmapsdk;


Page({
  data: {
    refreshing:false,
    hasSendLogin:false,
    noticeType:0,
    userInfo: c_userInfo.UserInfo,
    kmtext:"当前位置",
    searchKeyword: "",
    ssqInfo: null,
    hideJoinBtn:false,
    defTextADInfo: {"type":1, "shopid": "", "productid": -1, "adtext": "滚动文字轮播，点击了解详细！", "flag": 0, "img": "" },
    textADInfo: [],
    defImgADInfo: {"type":2, "shopid": "", "productid": -1, "adtext": "", "flag": 0, "img": "../../static/custom/defaults/ad_img.jpg" },
    imgADInfo: [],
    defShopADInfo: {"type":3, "shopid": -3, "productid":"", "adtext": "", "flag": 0, "img":"../../../static/custom/defaults/shop_logo.png"},
    shopADInfo: [],
    defPersonADInfo: {"type":4, "shopid": -4, "productid": "", "adtext": "", "flag": 0, "img": "../../../static/custom/defaults/shop_logo.png" },
    personADInfo:[],
  },

  onLoad: function(options) {
    Toast.loading({
      mask: true,
      message: '加载中...'
    });

    // qqmapsdk = new QQMapWX({
    //   key: ''
    // });
    let that = this;
    wx.getUserInfo({
      success: function (res) {
        console.log('--------wx.getUserInfo : res = ' + JSON.stringify(res));
        that.data.userInfo.nickName = res.userInfo.nickName;
        that.data.userInfo.gender = res.userInfo.gender;
        that.data.userInfo.language = res.userInfo.language;
        that.data.userInfo.city = res.userInfo.city;
        that.data.userInfo.province = res.userInfo.province;
        that.data.userInfo.country = res.userInfo.country;
        that.data.userInfo.avatarUrl = res.userInfo.avatarUrl;
        app.globalData.userInfo = that.data.userInfo;
        //this.requestNotice();
        that.myLogin();
      }
    })
  },

  //拉取通知消息
  requestNotice: function (e) {
    var that = this;
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'getNotice',
        session_id: this.data.userInfo.session_id
      },
      success: res => {
        // console.log("----------- requestNotice:success" + JSON.stringify(res));
        if (res.data.iRet == 0) {
          if(res.data.data){
            that.data.noticeType = res.data.data[0].type;
            if (res.data.data[0].type == 1) {
              wx.redirectTo({
                url: '../notice/notice?title=' + res.data.data[0].title
                  + '&content=' + res.data.data[0].content
              })
            } else {
              Dialog({
                title: res.data.data[0].title,
                message: res.data.data[0].content,
                zIndex: 999
              })
            }
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

  myLogin:function(){
    if(this.data.hasSendLogin){
      return;
    }
    this.data.hasSendLogin = true;
    var that = this;
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'login',
        js_code: app.globalData.js_code
      },
      success: res => {
        if (res.data.iRet == 0) {
          that.data.userInfo.ID = res.data.data.openId;
          that.data.userInfo.session_id = res.data.data.session_id;
          app.globalData.userInfo = that.data.userInfo;

          common.request({
            method: "GET",
            url:common.BASE_URL,
            data:{
              "function": "getUserInfo",
              'session_id': that.data.userInfo.session_id
            },
            success: res => {
              // console.log("----------getUserInfo:res="+JSON.stringify(res));
              if(res.data.iRet == 0){
                that.data.userInfo.actLimit = res.data.data.platInfo.act_limit;
                that.data.userInfo.ssqLimit = res.data.data.platInfo.ssq_limit;
                that.data.userInfo.mySsqInfo = res.data.data.mySsqInfo;
                app.globalData.userInfo = that.data.userInfo;
                
              }else{
                Toast("Get user info fail:"+res.data.sMsg);
              }
              that.updateInfo2Svr();
              that.requestNotice();
            },
            fail: res => {
              Toast.fail(res.errMsg);
            }
          })
        } else {
          Toast.fail('登录失败，请重试');
        }
      },//success
      fail: res => {
        Toast.fail(res.errMsg);
      },//fail
    })//common.request
  },

  //更新用户信息给服务器
  updateInfo2Svr: function () {
    let that = this;
    common.request({
      method:"POST",
      url: common.BASE_URL + '?function=updateUserInfo&session_id=' + this.data.userInfo.session_id,
      data: {
        "nickName": this.data.userInfo.nickName, 
        "gender": this.data.userInfo.gender, 
        "language": this.data.userInfo.language, 
        "city": this.data.userInfo.city, 
        "province": this.data.userInfo.province, 
        "country": this.data.userInfo.country, 
        "avatarUrl": this.data.userInfo.avatarUrl
      },
      success: res => {
        // console.log("----------updateUserInfo:res=" + JSON.stringify(res));
        that.getMyPosition();
      },
      fail: res => {
        // console.log("----------- updateUserInfo:" + JSON.stringify(res));
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
        Toast.fail("获取位置信息失败！");
        app.globalData.myLocation.latitude = 0;
        app.globalData.myLocation.longitude = 0;
        that.getNearbySsqDetail(0, 0);
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
        'session_id': that.data.userInfo.session_id,
        "latitude": latitude,
        "longitude": longitude
      },
      success: res => {
        that.onPullDownCompleted();
        console.log("----------getNearbySsqDetail:res=" + JSON.stringify(res));
        if (res.data.iRet == 0) {
          var _ssqInfo = res.data.data;
          var _hideJoinBtn = false;

          if (that.data.userInfo.mySsqInfo != null && _ssqInfo != null) {
            var arr = that.data.userInfo.mySsqInfo;
            if (arr.length > 0) {
              for (var i = 0; i < arr.length; i++) {
                if(_ssqInfo['ssqid'] == arr[i]['ssqid'])
                {
                  _hideJoinBtn = true;
                  break;
                }
              }
            }
          }

          that.setData({
            hideJoinBtn: _hideJoinBtn,
            ssqInfo: _ssqInfo
          });
          
          if(!_ssqInfo){
            return;
          }

          //kmtext
          that.setData({
            kmtext: util.countDistance(
              app.globalData.myLocation.latitude,
              app.globalData.myLocation.longitude,
              that.data.ssqInfo.latitude,
              that.data.ssqInfo.longitude
            ) + 'km'
          });

          //textADInfo
          if (!that.data.ssqInfo.adinfo || !that.data.ssqInfo.adinfo["1"] || that.data.ssqInfo.adinfo["1"].length <= 0) {
            var _textADInfo = [];
            while (_textADInfo.length < 2) {
              _textADInfo.push(that.data.defTextADInfo);
            }
            that.setData({ textADInfo: _textADInfo })
          } else if (that.data.ssqInfo.adinfo["1"]) {
            var _textADInfo = that.data.ssqInfo.adinfo["1"];
            if (_textADInfo.length < 6){
              _textADInfo.push(that.data.defTextADInfo);
            }
            that.setData({ textADInfo: _textADInfo })
          }

          //imgADInfo
          if (!that.data.ssqInfo.adinfo || !that.data.ssqInfo.adinfo["2"] || that.data.ssqInfo.adinfo["2"].length <= 0) {
            var _imgADInfo = [];
            while (_imgADInfo.length < 2) {
              _imgADInfo.push(that.data.defImgADInfo);
            }
            that.setData({ imgADInfo: _imgADInfo })
          } else if (that.data.ssqInfo.adinfo["2"]) {
            var _imgADInfo = that.data.ssqInfo.adinfo["2"];
            for(var i=0;i<_imgADInfo.length;i++){
              _imgADInfo[i]['img'] = common.getImgUrl(that.data.userInfo.session_id, _imgADInfo[i]['imgid']);
            }
            if (_imgADInfo.length < 8) {
              _imgADInfo.push(that.data.defImgADInfo);
            }
            that.setData({ imgADInfo: _imgADInfo })
          }

          //shopADInfo
          if (!that.data.ssqInfo.adinfo || !that.data.ssqInfo.adinfo["3"] || that.data.ssqInfo.adinfo["3"].length <= 0){
            var _shopADInfo = [];
            while(_shopADInfo.length<8){
              _shopADInfo.push(that.data.defShopADInfo);
            }
            that.setData({shopADInfo:_shopADInfo})
          } else if (that.data.ssqInfo.adinfo["3"]){
            let _shopADInfo = [];
            for (let i = 0; i < that.data.ssqInfo.adinfo["3"].length;i++){
              let _oi = that.data.ssqInfo.adinfo["3"][i];
              _oi['img']=common.getImgUrl(app.globalData.userInfo.session_id,_oi['img']);
              _oi['adtext']=_oi['name'];
              if(_oi != null){
                _shopADInfo.push(_oi);
              }
            }
            while (_shopADInfo.length < 8) {
              _shopADInfo.push(that.data.defShopADInfo);
            }
            that.setData({ shopADInfo: _shopADInfo })
          }
          
          //personADInfo
          if (!that.data.ssqInfo.adinfo || !that.data.ssqInfo.adinfo["4"] || that.data.ssqInfo.adinfo["4"].length <= 0) {
            var _personADInfo = [];
            while (_personADInfo.length < 4) {
              _personADInfo.push(that.data.defPersonADInfo);
            }
            that.setData({ personADInfo: _personADInfo })
          } else if (that.data.ssqInfo.adinfo["4"]) {
            let _personADInfo = [];
            for (let i = 0; i < that.data.ssqInfo.adinfo["4"].length; i++) {
              let _oi = that.data.ssqInfo.adinfo["4"][i];
              _oi['img'] = common.getImgUrl(app.globalData.userInfo.session_id, _oi['img']);
              _oi['adtext'] = _oi['name'];
              if (_oi != null) {
                _personADInfo.push(_oi);
              }
            }
            while (_personADInfo.length < 4) {
              _personADInfo.push(that.data.defPersonADInfo);
            }
            that.setData({ personADInfo: _personADInfo })
          } 

        } else {
          Toast.fail("获取商圈信息失败！");
        }
        Toast.clear();
      },//success
      fail: res => {
        that.onPullDownCompleted();
        Toast.fail("获取商圈信息失败！请检查网络或稍后再试。");
      },//fail
    })//common.request
  },

  //打开商圈在地图上的位置
  openPosition: function (e) {
    wx.openLocation({
      latitude: Number(this.data.ssqInfo.latitude),
      longitude: Number(this.data.ssqInfo.longitude),
      scale: 14
    })
  },

  // //跳转-个人详细信息
  // goMyPerson: function(e) {
  //   wx.navigateTo({
  //     url: '../my/person/info'
  //   })
  // },

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
        Toast("请输入搜索关键字！");
      }
    }else{
      wx.navigateTo({
        url: '../district/search/search?type=' + type + "&searchkeys=" + searchkeys
      })
    }
  },
  doSearchChange: function (e) {
    console.log('---------doSearchChange:' + e.detail.value);
    this.setData({
      searchKeyword: e.detail.value
    });
  },
  onClearSearch: function (e) {
    this.setData({
      searchKeyword: ""
    });
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
      url: '../district/detail/detail?tab='+ tab + "&ssqid=" + this.data.ssqInfo.ssqid
    })
  },

  //选择商圈加入方式
  goJoin:function(e){
    wx.navigateTo({
      url: '../district/join/join?ssqid=' + this.data.ssqInfo.ssqid
    })
  },

  //商家点击事件
  onShopClick:function(e){
    // console.log('---------onBusClick:e'+JSON.stringify(e));
    let shopId = e.currentTarget.dataset.id;
    let owner = e.currentTarget.dataset.owner;
    // console.log("---------onBusClick:shopid="+shopId+",owner="+owner);
    if(shopId == -3 || shopId == -4){
      wx.navigateTo({
        url: '../ad/shop/shop?shopid=' + shopId + '&owner=' + owner
      })
    }else{
      // console.log("---------onBusClick:userInfo.ID=" + app.globalData.userInfo.ID);
      if(app.globalData.userInfo.ID == owner){
        wx.switchTab({
          url: '/pages/my/my',
        })
      }else{
        wx.navigateTo({
          url: '../shop/shop?shopid=' + shopId + '&owner=' + owner
        })
      }
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
        url: '../my/product/viewer/viewer?productid='+pId
      })
    }
  },

  onShow: function () {
    if(!this.data.hasSendLogin){
      app.onLaunch();
    }
  },

  onPullDownCompleted: function () {
    this.data.refreshing = false;
    wx.stopPullDownRefresh();
  },
  onPullDownRefresh() {
    // console.log('-------onPullDownRefresh');
    // 上拉刷新
    if (!this.data.refreshing) {
      this.data.refreshing = true;
      this.getMyPosition();
    }
  },

})