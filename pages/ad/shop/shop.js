// pages/ad/shop/shop.js

const app = getApp()

// 在需要使用的js文件中，导入js
var util = require('../../../utils/util.js');
var common = require("../../../utils/common.js")

import Toast from '../../../components/vant/toast/toast';
import Dialog from '../../../components/vant/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    adType:3,
    myShopInfo:null,
    adInfo:null,
    priceTotal:0.0

  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let _price = 0;
    let len = e.detail.value.length;
    if(len>0){
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < this.data.adInfo.length; j++) {
          if (e.detail.value[i] == this.data.adInfo[j].ad_period_id){
            _price += this.data.adInfo[j].cur_price;
          }
      }
      }
    }
    this.setData({
      priceTotal:Number(_price)
    })
  },

  getMyShopInfo: function () {
    var that = this;
    wx.showLoading({
      title: '加载中，请稍后...',
    })
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'getMyShopInfo',
        'session_id': app.globalData.userInfo.session_id,
        'openid': app.globalData.userInfo.ID,
        'iself': 1
      },
      success: res => {
        wx.hideLoading();
        // console.log('---------getMyShopInfo, res = ' + JSON.stringify(res));
        if (res.data.iRet == 0) {
          if (res.data.data == null || res.data.data.length <= 0) {
            that.setData({
              myShopInfo: null
            })
          } else {
            var _obj = res.data.data[0];
            _obj['img'] = common.getImgUrl(app.globalData.userInfo.session_id, _obj.img);
            _obj['adtext'] = _obj.name;

            that.setData({
              myShopInfo: _obj
            })
          }
          that.onRQCompleted();
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '查询社商失败！',
          })
          that.onRQCompleted();
        }
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({
          title: '请检查网络链接！',
        })
        that.onRQCompleted();
      }
    });
  },

  //获取服务器配置
  getAdCfg: function () {
    var that = this;
    wx.showLoading({
      title: '加载中，请稍后...',
    })
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'getAdCfg',
        'session_id': app.globalData.userInfo.session_id,
        'adType': this.data.adType
      },
      success: res => {
        wx.hideLoading();
        // console.log('-------getAdCfg: res = ' + JSON.stringify(res));
        if (res.data.iRet == 0) {
          if (res.data.data) {
            let _info = res.data.data;
            that.setData({
              adInfo: _info
            })
            that.getMyShopInfo();
          } else {
            that.setData({
              adInfo: null
            })
            that.onRQCompleted();
          }
        } else {
          Toast("查询广告失败！");
          that.onRQCompleted();
        }
      },
      fail: res => {
        wx.hideLoading();
        Toast.fail("请检查网络链接！");
        that.onRQCompleted();
      }
    });
  },

  onRQCompleted: function () {
    // console.log('-----------onRQCompleted------');
    if(!this.data.adInfo){
      Dialog.alert({title: '提示',message: '还没开售！返回上一页。'
      }).then(() => {
        wx.navigateBack({
          //可回传参数
        })
      });
      return;
    }
    if(!this.data.myShopInfo){
      Dialog.alert({
        title: '提示', message: '您还不是商家，请先入驻为商家！返回上一页。'
      }).then(() => {
        wx.navigateBack({
          //可回传参数
        })
      });
      return;
    }
    if (this.data.adType == 3){
      if(this.data.myShopInfo.type != 2){
        Dialog.alert({
          title: '提示', message: '您是个人商家，请抢购个人展位！返回上一页。'
        }).then(() => {
          wx.navigateBack({
            //可回传参数
          })
        });

      }
    } else if (this.data.adType == 4){
      if (this.data.myShopInfo.type != 3) {
        Dialog.alert({
          title: '提示', message: '您是商家，请抢购商家展位！返回上一页。'
        }).then(() => {
          wx.navigateBack({
            //可回传参数
          })
        });
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _shopid = options.shopid;
    //console.log('-------onLoad, shopid = ' + _shopid);
    this.setData({
      adType: Math.abs(_shopid)
    });
    this.getAdCfg();
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