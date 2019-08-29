// pages/ad/text/text.js

const app = getApp()

// 在需要使用的js文件中，导入js
var util = require('../../../utils/util.js');
var common = require("../../../utils/common.js")

import Toast from '../../../components/vant/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceTotal:0.00,
    itemSelected:[],
    adText:"这里输入能突出产品又能吸人眼球的文字",
    productInfo: { "ID": "108", "name": "肩周调理", "des": "产品的描述信息,产品的描述信息,产品的描述信息,产品的描述信息", "count": 1, "price": 18.00, "tags": [1], "images": ["https://img.yzcdn.cn/vant/t-thirt.jpg"]},
    textADInfo:{
      dateStart:0,
      dateEnd:0,
      list:[]
    }

  },

  //
  onInput: function(e){
    this.setData({adText:e.detail.value});
  },

  //购买项目选择数改变
  onChange: function(e){
    console.log(JSON.stringify(e));
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

  //
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
        console.log("----------- getAdCfg:success" + JSON.stringify(res));
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



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('----------onLoad:product_id='+options.product_id);
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