// pages/my/product/viewer/viewer.js

var util = require('../../../../utils/util.js');
var common = require("../../../../utils/common.js")
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    showOrderDetail:true,
    orderDetaiLabel:"展开详情",
    productInfo:null,
    tmplist: [
      { "productid": "", "owner": "", "name": "昵称nickname", "contact": 15989316305, "count": 3, "date": 15764849992, "sum":"8B1501"},
      { "productid": "", "owner": "", "name": "昵称nickname", "contact": 15989316305, "count": 3, "date": 15764849992, "sum": "8B1501" },
      { "productid": "", "owner": "", "name": "昵称nickname", "contact": 15989316305, "count": 3, "date": 15764849992, "sum": "8B1501" },
      { "productid": "", "owner": "", "name": "昵称nickname", "contact": 15989316305, "count": 3, "date": 15764849992, "sum": "8B1501" },
      { "productid": "", "owner": "", "name": "昵称nickname", "contact": 15989316305, "count": 3, "date": 15764849992, "sum": "8B1501" }
    ]


  },

  //
  onOrderDetail: function (e) {
    let show = !this.data.showOrderDetail;
    let label = show ? "展开详情" : "收起详情";
    console.log("ggggggggg:"+show)
    this.setData({
      showOrderDetail: show,
      orderDetaiLabel:label
    })
  },

  //
  onShop: function (e) {
    console.log("---------onShop----");
    if(this.data.productInfo.shop['owner'] == app.globalData.userInfo.ID){
      console.log("---------onShop----1");
      wx.switchTab({
        url: '/pages/my/my',
      })
    }else{
      console.log("---------onShop----2");
      wx.navigateTo({
        url: '../../../shop/shop?shopid='+this.data.productInfo.shop['shopid'],
      })
    }
  },

  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    let urls = this.data.productInfo.product.images;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls
    })
  },

  sendRequest: function (productid) {
    var that = this;
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': "getProductDetail",
        'session_id': app.globalData.userInfo.session_id,
        'openid': app.globalData.userInfo.ID,
        'productid': productid
      },
      success: res => {
        // console.log("--------getProductDetail:" + JSON.stringify(res));
        if (res.data.iRet == 0) {
          var _info = res.data.data;
          
          //imgurls
          var _imgUrls = [];
          if(_info && _info.product ){
            var imgids = util.stringToArray(_info.product.imgarr);
            if(imgids.length>0){
              for (var i = 0; i < imgids.length; i++) {
                _imgUrls.push(common.getImgUrl(app.globalData.userInfo.session_id, imgids[i]));
              }
            }
          }
          _info.product['images'] = _imgUrls;

          //date
          var _dateText = "";
          if(Number(_info.product.datetype) == 1){
            _dateText = "长期";
          }else{
            _dateText = util.formatTime(new Date(Number(_info.product.dateend)));
          }
          _info.product['datetext'] = _dateText;

          _info['orderinfo'] = {
            'count':8,
            'total':88,
            'list':that.data.tmplist
          }

          that.setData({
            productInfo: _info
          });
        } else {
          wx.showToast({
            title: "拉取数据失败！" + res.data.sMsg,
            icon: 'none'
          })
        }
        wx.hideLoading();
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({
          title: "拉取数据失败！请检查网络。",
          icon: 'none'
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var productid = options.productid;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    this.sendRequest(productid);
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