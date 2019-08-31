// pages/my.js

var app = getApp();
var common = require("../../utils/common.js")
var util = require('../../utils/util.js');
var constd = require('../../utils/data/constd.js');


Page({
  name:"pages.my",

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
    reflashPage: false
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
      url: 'product/new/new?shopid='+this.data.myShopInfo.shopid
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

  //点击产品
  onCardClick: function (e) {
    var product = e.detail.product;
    wx.navigateTo({
      url: 'product/viewer/viewer',
    })
  },

  //上下架
  onSell: function (e) {
    var productid = e.detail.id;
    var onsell = e.detail.onsell;
    var that = this;
    wx.showLoading({ title: '请稍后......' })
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'setOnSell',
        'session_id': app.globalData.userInfo.session_id,
        'productid': productid,
        'onsell': onsell
      },
      success: res => {
        wx.hideLoading();
        if (res.data.iRet == 0) {
          if (e.detail.callback) {
            e.detail.callback(true);
          }
          wx.showToast({ title: '成功！' })
        } else {
          if (e.detail.callback) {
            e.detail.callback(false);
          }
          wx.showToast({ title: '上架失败！', icon: "none" })
        }
      },
      fail: res => {
        wx.hideLoading();
        if (e.detail.callback) {
          e.detail.callback(false);
        }
        wx.showToast({ title: '请检查网络链接！', icon: "none" })
      }
    });
  },

  //做广告
  onCloseADChoose: function() {
    this.setData({ adShow: false });
  },
  onOpenADChoose: function(e) {
    var product = e.detail.product;
    this.setData({ 
      adShow: true 
    });
  },

  //编辑产品
  proEdit: function (e) {
    var product = e.detail.product;
    wx.navigateTo({
      url: 'product/edit/edit?id=' + e.currentTarget.dataset.id,
    })
  },

  //
  proDelete: function (e) {
    var productid = e.detail.id;
    var onsell = e.detail.onsell;
    var update_time = e.detail.update_time;
    if(onsell != 0){
      wx.showToast({ title: '不可以删除上架产品', icon: "none" });
      return;
    }
    var curTime = (new Date()).getTime();
    if(update_time == null || curTime - update_time*1000 > 24*60*60){
      wx.showLoading({ title: '请稍后......' })
      common.request({
        method: "GET",
        url: common.BASE_URL,
        data: {
          'function': 'productDelete',
          'session_id': app.globalData.userInfo.session_id,
          'productid': productid
        },
        success: res => {
          wx.hideLoading();
          if (res.data.iRet == 0) {
            wx.showToast({ title: '成功！' });
            this.getMyShopInfo();
          } else {
            wx.showToast({ title: '删除失败！'+res.data.sMsg, icon: "none" })
          }
        },
        fail: res => {
          wx.hideLoading();
          wx.showToast({ title: '请检查网络链接！', icon: "none" })
        }
      });
    }else{
      wx.showToast({ title: '产品下架24小时后才可以删除！', icon: "none" });
    }
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
            
            //整理product_list
            var _plist = _obj['product_list'];
            if(_plist != null && _plist.length > 0)
            {
              for(var i=0;i<_plist.length;i++){
                var _p = _plist[i];
                //-------img
                var imgids = util.stringToArray(_p['imgarr']);
                var imgUrls = [];
                for(var j=0;j<imgids.length;j++){
                  imgUrls.push(common.getImgUrl(app.globalData.userInfo.session_id, imgids[j]));
                }
                _plist[i]["imgUrls"] = imgUrls;
                
                //-------flags
                var flagids = util.stringToArray(_p['flags']);
                var _flagArr = [];
                if(flagids.length > 0){
                  for(var f=0;f<flagids.length;f++){
                    _flagArr.push({ "id": flagids[f], "name": common.getProductFlagName(flagids[f])});
                  }
                }
                _plist[i]["flagArr"] = _flagArr;

                //-------sellText
                var _sellText = "";
                if(_plist[i]['onsell'] == 0){
                  _sellText = '上架';
                } else if (_plist[i]['onsell'] == 1){
                  _sellText = '下架';
                }
                _plist[i]['sellText'] = _sellText;


              }
            }
            _obj['product_list'] = _plist;


            //整理结束

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
    var reflash = app.globalData.updates[this.name];
    if (reflash)
    {
      this.getMyShopInfo();
      app.globalData.updates[this.name] = false;
    }
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