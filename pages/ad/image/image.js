// pages/ad/image/image.js

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
    priceTotal: 0.00,
    itemSelected: [],
    adImage: "",
    imgid:"",
    adText:"",
    ssqid:0,
    productInfo: null,
    imageADInfo: null

  },

  //
  radioChange: function (e) {
    var fullUrl = e.detail.value;
    var realImgid = "";
    var imgArr = util.stringToArray(this.data.productInfo.imgarr);
    for(var i=0;i<imgArr.length;i++){
      if(fullUrl.indexOf(imgArr[i]) >= 0){
        realImgid = imgArr[i];
        break;
      }
    }
    this.setData({ adImage: fullUrl, imgid: realImgid});
  },
  onInput: function (e) {
    this.setData({ adText: e.detail.value });
  },

  //购买项目选择数改变
  onChange: function (e) {
    console.log(JSON.stringify(e));
    let len = this.data.itemSelected.length;
    if (len <= 0) {
      let newobj = { "id": e.currentTarget.dataset.id, "price": e.currentTarget.dataset.price, "count": e.detail }
      this.data.itemSelected.push(newobj);
    } else {
      let found = false;
      for (var i = 0; i < len; i++) {
        if (this.data.itemSelected[i].id == e.currentTarget.dataset.id) {
          this.data.itemSelected[i].count = e.detail;
          found = true;
        }
      }
      if (found == false) {
        let newobj = { "id": e.currentTarget.dataset.id, "price": e.currentTarget.dataset.price, "count": e.detail };
        this.data.itemSelected.push(newobj);
      }
    }
    let total = 0.0;
    let newLen = this.data.itemSelected.length;
    for (var i = 0; i < newLen; i++) {
      let obj = this.data.itemSelected[i];
      total += obj.price * obj.count;
    }
    this.setData({
      priceTotal: total
    })
  },


  //获取服务器配置
  getAdCfg: function () {
    var that = this;
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'getAdCfg',
        'session_id': app.globalData.userInfo.session_id,
        'adType': 2
      },
      success: res => {
        if (res.data.iRet == 0) {
          if (res.data.data) {
            var _info = {
              dateStart: res.data.data[0]['begin_date'],
              dateEnd: res.data.data[0]['end_date'],
              list: res.data.data
            }
            that.setData({
              imageADInfo: _info
            })
          } else {
            that.setData({
              imageADInfo: null
            })
          }
        } else {
          Toast("查询广告失败！");
        }
      },
      fail: res => {
        Toast.fail("请检查网络链接！");
      }
    });
  },

  onPay: function (e) {
    if (this.data.imgid == "") {
      Toast("请选择一张产品图作为广告图！");
      return;
    }
    if (!this.data.itemSelected || this.data.itemSelected.length <= 0) {
      Toast("请选择广告时段！");
      return;
    }
    //format content
    var _temArr = [];
    for (var i = 0; i < this.data.itemSelected.length; i++) {
      var _objstr = this.data.itemSelected[i].id + "," + this.data.itemSelected[i].count;
      _temArr.push(_objstr);
    }
    var _content = util.arrayToString(_temArr);
    //下单
    wx.showLoading({ title: '请稍后......' })
    common.request({
      method: "POST",
      url: common.BASE_URL + "?function=adOrder&session_id=" + app.globalData.userInfo.session_id,
      data: {
        'openid': app.globalData.userInfo.ID,
        'productid': this.data.productInfo.productid,
        'ssqid': this.data.ssqid,
        'shopid': this.data.productInfo.shopid,
        'flags': this.data.productInfo.flags,
        'admoney': this.data.priceTotal,
        'type': 2,
        'imgid': this.data.imgid,
        'adtext': this.data.adText,
        'content': _content
      },
      success: res => {
        console.log("----------- adOrder:success" + JSON.stringify(res));
        wx.hideLoading();
        if (res.data.iRet == 0) {
          Dialog.alert({
            title: '提示',
            message: '下单成功！返回上一页。'
          }).then(() => {
            wx.navigateBack({
              //可回传参数
            })
          });
        } else {
          Toast('下单失败！' + res.data.sMsg)
        }
      },
      fail: res => {
        wx.hideLoading();
        Toast('请检查网络链接！')
      }
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var product = app.globalData.productsForAD[options.ssqid];
    console.log("---------onLoad: product=" + JSON.stringify(product));
    delete app.globalData.productsForAD[options.ssqid];
    this.setData({
      ssqid: options.ssqid,
      productInfo: product,
      adImage: product['imgUrls'][0]
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