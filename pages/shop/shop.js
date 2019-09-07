// pages/district/shop/shop.js

var app = getApp();
var common = require("../../utils/common.js")
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo:null,
    shopkm:0
  },


  //
  getMyShopInfo: function (shopid,owner) {
    var that = this;
    wx.showLoading({
      title: '数据加载中...',
      mask:true
    })
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'getMyShopInfo',
        'session_id': app.globalData.userInfo.session_id,
        'openid': owner,
        'shopid': shopid,
        'iself': 0
      },
      success: res => {
        console.log('----------getMyShopInfo:'+JSON.stringify(res));
        if (res.data.iRet == 0) {
          if (res.data.data == null || res.data.data.length <= 0) {
            that.data.shopInfo = null;
          } else {
            var _obj = res.data.data[0];
            _obj['ssqImgUrl'] = common.getImgUrl(app.globalData.userInfo.session_id, _obj.img);
            _obj['ssqCImgUrl'] = common.getImgUrl(app.globalData.userInfo.session_id, _obj.cimg);

            //整理product_list
            var _plist = _obj['product_list'];
            var _hightlight = [];
            if (_plist != null && _plist.length > 0) {
              for (var i = 0; i < _plist.length; i++) {
                var _p = _plist[i];
                //-------img
                var imgids = util.stringToArray(_p['imgarr']);
                var imgUrls = [];
                for (var j = 0; j < imgids.length; j++) {
                  imgUrls.push(common.getImgUrl(app.globalData.userInfo.session_id, imgids[j]));
                }
                _plist[i]["imgUrls"] = imgUrls;

                //-------flags
                var flagids = util.stringToArray(_p['flags']);
                var _flagArr = [];
                if (flagids.length > 0) {
                  for (var f = 0; f < flagids.length; f++) {
                    _flagArr.push({ "id": flagids[f], "name": common.getProductFlagName(flagids[f]) });
                  }
                  _hightlight.push({"productid":_plist[i].productid, "img":_plist[i]['imgUrls'][0]});
                }
                _plist[i]["flagArr"] = _flagArr;

                //short des
                var _short_des = "";
                if (_plist[i]['des'].length > 16) {
                  _short_des = _plist[i]['des'].substring(0, 16) + '......';
                } else {
                  _short_des = _plist[i]['des'];
                }
                _plist[i]['short_des'] = _short_des;

              }
            }
            _obj['product_list'] = _plist;
            _obj['hightlight'] = _hightlight;


            //整理结束
            console.log("-------shopInfo:"+JSON.stringify(_obj));
            that.setData({
              shopInfo: _obj
            })
            that.updateShopInfo();
          }
        } else {
          wx.showToast({
            title: '查询社圈失败！',
          })
        }
        wx.hideLoading();
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({
          title: '请检查网络链接！',
        })
      }
    });
  },

  updateShopInfo: function () {
    var km = util.countDistance(app.globalData.myLocation.latitude, app.globalData.myLocation.longitude,this.data.shopInfo.latitude,this.data.shopInfo.longitude);

    this.setData({
      shopkm: km,
    });
  },

  //打开商家在地图上的位置
  openPosition: function (e) {
    wx.openLocation({
      latitude: Number(this.data.shopInfo.latitude),
      longitude: Number(this.data.shopInfo.longitude),
      scale: 14
    })
  },

  //点击轮播图
  onHightlightImg: function (e) {
    var pid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../my/product/viewer/viewer?productid=' + pid,
    })
  },

  //点击产品
  onCardClick: function (e) {
    var product = e.detail.product;
    wx.navigateTo({
      url: '../my/product/viewer/viewer?productid=' + product.productid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shopid = options.shopid;
    var owner = options.owner;
    this.getMyShopInfo(shopid,owner);
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