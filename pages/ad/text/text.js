// pages/ad/text/text.js

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
    priceTotal:0.00,
    itemSelected:[],
    adText:"这里输入能突出产品又能吸人眼球的文字",
    adText_real:"",
    productInfo:null,
    ssqid:0,
    textADInfo:null
  },

  //
  onInput: function(e){
    this.setData({ adText: e.detail.value, adText_real: e.detail.value});
  },

  //购买项目选择数改变
  onChange: function(e){
    let len = this.data.itemSelected.length;
    if(len<=0){
      let newobj = { "id": e.currentTarget.dataset.id, "price": e.currentTarget.dataset.price, "count": e.detail}
      this.data.itemSelected.push(newobj);
    }else{
      let found=false;
      for(var i=0;i<len;i++){
        if (this.data.itemSelected[i].id == e.currentTarget.dataset.id){
          this.data.itemSelected[i].count = e.detail;
          found = true;
        }
      }
      if(found == false){
        let newobj = { "id": e.currentTarget.dataset.id, "price": e.currentTarget.dataset.price, "count": e.detail };
        this.data.itemSelected.push(newobj);
      }
    }
    let total = 0.0;
    let newLen = this.data.itemSelected.length;
    for (var i = 0; i < newLen;i++){
      let obj = this.data.itemSelected[i];
      total += obj.price * obj.count;
    }
    this.setData({
      priceTotal:total
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
        'adType': 1
      },
      success: res => {
        if (res.data.iRet == 0) {
          if (res.data.data) {
            var _info = {
              dateStart:res.data.data[0]['begin_date'],
              dateEnd:res.data.data[0]['end_date'],
              list:res.data.data
            }
            that.setData({
              textADInfo:_info
            })
          }else{
            that.setData({
              textADInfo: null
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

  //点击支付按钮
  onPay: function (e) {
    var _adText = this.data.adText_real.replace(/\s+/g, '');
    if (_adText == "") {
      Toast("请输入广告文字！");
      return;
    }
    if (!this.data.itemSelected || this.data.itemSelected.length <= 0){
      Toast("请选择广告时段！");
      return;
    }
    //format content
    var _temArr = [];
    for (var i = 0; i < this.data.itemSelected.length; i++){
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
        'productid': this.data.productInfo.productid,
        'ssqid': this.data.ssqid,
        'shopid': this.data.productInfo.shopid,
        'flags': this.data.productInfo.flags,
        'admoney': this.data.priceTotal,
        'type': 1,
        'adtext': this.data.adText_real,
        'content':_content
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
        } else if (res.data.iRet == -4002) {
          var sarr = res.data.sMsg;
          var msg="";
          if(sarr && sarr.length>0){
            for(var i=0;i<sarr.length;i++){
              msg += sarr[i]['begin_hour']+'-'+sarr[i]['end_hour']+","
            }
          }
          Toast('下单失败！重复购买了：' + msg)
        }  else {
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
    // console.log("---------onLoad: product=" + JSON.stringify(product));
    delete app.globalData.productsForAD[options.ssqid];
    this.setData({
      ssqid:options.ssqid,
      productInfo:product
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