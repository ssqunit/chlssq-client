// pages/my.js

var app = getApp();
var common = require("../../utils/common.js")
var util = require('../../utils/util.js');
var constd = require('../../utils/data/constd.js');


Page({

  /**
   * Page initial data
   */
  data: {
    adShow:false,
    adproduct_id:0,
    myShopInfo:{},
    shop_distance:0.1,
    shop_type:"商家",
    shop_optype:"养生",
    shop_createtime:"2019",


  },

  //打开商圈在地图上的位置
  openPosition: function (e) {
    wx.openLocation({
      latitude: Number(this.data.myShopInfo.latitude),
      longitude: Number(this.data.myShopInfo.longitude),
      scale: 14
    })
  },

  //广告记录
  onADRecord: function(e) {
    wx.navigateTo({
      url: '../ad/record/record',
    })
  },

  //添加产品
  goNew: function (e) {
    wx.navigateTo({
      url: 'product/new/new',
    })
  },

  //编辑产品
  proEdit: function (e) {
    wx.navigateTo({
      url: 'product/edit/edit?id=' + e.currentTarget.dataset.id,
    })
  },

  //点击产品
  onCardClick: function (e) {
    wx.navigateTo({
      url: 'product/viewer/viewer',
    })
  },

  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    let urls = [current];
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls
    })
  },

  //
  onCloseADChoose: function() {
    this.setData({ adShow: false });
  },
  onOpenADChoose: function(e) {
    this.data.adproduct_id = e.currentTarget.dataset.id;
    this.setData({ 
      adShow: true 
    });
  },

  //
  onADText: function (e) {
    this.onCloseADChoose();
    wx.navigateTo({
      url: '../ad/text/text?product_id='+this.data.adproduct_id,
    })
  },

  //
  onADImage: function (e) {
    this.onCloseADChoose();
    wx.navigateTo({
      url: '../ad/image/image',
    })
  },

  //
  getMyShopInfo: function () {
    var that = this;
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'getMyShopInfo',
        'session_id': app.globalData.userInfo.session_id,
        'openid': app.globalData.userInfo.ID
      },
      success: res => {
        console.log('---------getMyShopInfo:res='+JSON.stringify(res));
        if (res.data.iRet == 0) {
          if(res.data.data == null || res.data.data.length <= 0){
            myShopInfo = null;
          }else{
            var _obj = res.data.data[0];
            _obj['ssqImgUrl'] = common.getImgUrl(app.globalData.userInfo.session_id, _obj.img);
            _obj['ssqCImgUrl'] = common.getImgUrl(app.globalData.userInfo.session_id, _obj.cimg);
            that.setData({
              myShopInfo:_obj
            })
            that.updateShopInfo();
          }
        } else {
          wx.showToast({
            title: '查询社圈失败！',
          })
        }
      },
      fail: res => {
        wx.showToast({
          title: '请检查网络链接！',
        })
      }
    });
  },

  updateShopInfo: function () {
    if(!this.data.myShopInfo)return;
    var _type = this.data.myShopInfo.type == 2 ? '商家' : '个人';
    var _optype = "";
    var optypes = constd.OpType;
    for(var i=0;i<optypes.length;i++){
      if(this.data.myShopInfo.optype == optypes[i]['id']){
        _optype = optypes[i]['name'];
      }
    }
    var _createtime = util.formatTime(new Date(this.data.myShopInfo.create_time * 1000));
    var _dis = util.countDistance(app.globalData.myLocation.latitude, app.globalData.myLocation.longitude,this.data.myShopInfo.latitude,this.data.myShopInfo.longitude);
    this.setData({
      shop_type:_type,
      shop_optype:_optype,
      shop_createtime:_createtime,
      shop_distance:_dis
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getMyShopInfo();
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})