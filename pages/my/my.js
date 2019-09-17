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
    myShopInfo:{},
    shop_distance:0.1,
    shop_type:"商家",
    shop_optype:"养生",
    shop_createtime:"2019",
    reflashPage: false,
    proCount: 0,
    proCount_flag: 0,
    ssqnametext_color:"",
    ssqnametext:""
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
      url: '../ad/record/record?shopid=' + this.data.myShopInfo.shopid
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
    if(product.onsell != 1)
    {
      wx.showToast({ title: '产品未上架！', icon: "none" });
      return;
    }
    wx.navigateTo({
      url: 'product/viewer/viewer?productid='+product.productid,
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
          wx.showModal({
            title: '操作失败',
            content: '广告中的产品不可以下架！',
            showCancel: false
          })
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
    this.setData({ 
      adShow: false
    });
  },
  onOpenADChoose: function(e) {
    var product = e.detail.product;
    if (product.onsell != 1) {
      wx.showToast({ title: '产品未上架！', icon: "none" });
      return;
    }
    app.globalData.productsForAD[this.data.myShopInfo.ssqid] = product;
    this.setData({ 
      adShow: true 
    });
  },

  //编辑产品
  proEdit: function (e) {
    var product = e.detail.product;
    app.globalData.productsForEdit[product.productid]=product;
    var onsell = product.onsell;
    if (onsell != 0) {
      wx.showToast({ title: '不可编辑上架产品', icon: "none" });
      return;
    }
    var curTime = (new Date()).getTime();
    var update_time = product.update_time;
    if (update_time == null || curTime - update_time * 1000 > 24 * 60 * 60 * 1000) {
      wx.navigateTo({
        url: 'product/edit/edit?id=' + product.productid,
      })
    } else {
      var hmObj = util.getHM(24*60*60*1000 - curTime + update_time * 1000);
      var msg = hmObj['h'] + "小时 "+ hmObj['m'] + "分钟后可以编辑该产品";
      wx.showToast({ title: msg, icon: "none" });
    }
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
    if(update_time == null || curTime - update_time*1000 > 24*60*60*1000){
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
      var hmObj = util.getHM(24 * 60 * 60 * 1000 - curTime + update_time * 1000);
      var msg = hmObj['h'] + "小时 " + hmObj['m'] + "分钟后可以删除该产品";
      wx.showToast({ title: msg, icon: "none" });
    }
  },

  //
  onADText: function (e) {
    this.onCloseADChoose();
    wx.navigateTo({
      url: '../ad/text/text?ssqid=' + this.data.myShopInfo.ssqid
    })
  },

  //
  onADImage: function (e) {
    this.onCloseADChoose();
    wx.navigateTo({
      url: '../ad/image/image?ssqid=' + this.data.myShopInfo.ssqid
    })
  },

  //
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
        'iself':1
      },
      success: res => {
        wx.hideLoading();
        //console.log('---------getMyShopInfo, res = ' + JSON.stringify(res));
        if (res.data.iRet == 0) {
          if(res.data.data == null || res.data.data.length <= 0){
            that.setData({
              myShopInfo: null
            })
          }else{
            var _obj = res.data.data[0];
            _obj['ssqImgUrl'] = common.getImgUrl(app.globalData.userInfo.session_id, _obj.img);
            _obj['ssqCImgUrl'] = common.getImgUrl(app.globalData.userInfo.session_id, _obj.cimg);
            if (_obj['starinfo'] && _obj['starinfo'][0] && _obj['starinfo'][0][_obj['shopid']]){
              _obj['stars'] = _obj['starinfo'][0][_obj['shopid']];
            }else{
              _obj['stars'] = ['b', 'b', 'b', 'b', 'b']
            }

            
            //整理product_list
            var _plist = _obj['product_list'];
            if(_plist != null && _plist.length > 0)
            {
              let _proCount = _plist.length;
              let _proCount_flag = 0;
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
                  _proCount_flag ++;
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

                //short des
                var _short_des = "";
                if(_plist[i]['des'].length > 16){
                  _short_des = _plist[i]['des'].substring(0,16) + '......';
                }else{
                  _short_des = _plist[i]['des'];
                }
                _plist[i]['short_des'] = _short_des;
              }
              that.setData({
                proCount: _proCount,
                proCount_flag: _proCount_flag
              });
            }
            _obj['product_list'] = _plist;


            //整理结束

            that.setData({
              myShopInfo:_obj
            })
            that.updateShopInfo();
          }
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '查询社圈失败！',
          })
        }
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

    //商家状态
    let _color="black";
    let _text = "";
    if (this.data.myShopInfo.status == 0){
      _color = 'red';
      if (this.data.myShopInfo.ssqid == 0){
        _text = "没有加入社圈，本商家及产品不会展示给用户";
      }else{
        _text = "入驻审核中";
      }
    } else if (this.data.myShopInfo.status == 2){
      _color = 'red';
      _text = "入驻审核:入驻失败";
    } else if (this.data.myShopInfo.status == 3) {
      _color = 'red';
      _text = "商家冻结中";
    }else{
      if (this.data.myShopInfo.ssqinfo[0]){
        _text = this.data.myShopInfo.ssqinfo[0].area + this.data.myShopInfo.ssqinfo[0].name + '社圈';
      }
    }

    this.setData({
      shop_type:_type,
      shop_optype:_optype,
      shop_createtime:_createtime,
      shop_distance:_dis,
      ssqnametext_color:_color,
      ssqnametext:_text
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    if (!app || !app.globalData || !app.globalData.userInfo) {
      wx.switchTab({
        url: '/pages/index/index',
      })
      return;
    }

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