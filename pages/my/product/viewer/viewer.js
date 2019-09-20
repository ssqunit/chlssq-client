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
    orderDetaiLabel:"预约详情-展开",
    productInfo:null,
    hideBespeak:false,
    hideBespeakBtn:false,
    bespeakType:0, //1-取消预约，0-预约
    hideInput:false,
    contact:"",
    count:0,
    summary:"",
    dateStart:"-",
    dateStartMS: 0,//毫秒
    dateEnd: "-",
    dateEndMS: 0,//毫秒
    popShow:false,
    dateType:0,
    minDate: new Date(2019, 8, 8).getTime(),
    maxDate: new Date(2029, 1, 1).getTime(),
    currentDate: new Date(2019, 8, 7).getTime(),
    targetList:null
  },

  //
  onOrderDetail: function (e) {
    let show = !this.data.showOrderDetail;
    let label = show ? "预约详情-展开" : "预约详情-收起";
    this.setData({
      showOrderDetail: show,
      orderDetaiLabel:label
    })
  },

  //
  onShop: function (e) {
    // console.log("---------onShop----");
    if(this.data.productInfo.shop['owner'] == app.globalData.userInfo.ID){
      // console.log("---------onShop----1");
      wx.switchTab({
        url: '/pages/my/my',
      })
    }else{
      // console.log("---------onShop----2");
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


  selectDate: function (e) {
    this.data.dateType = Number(e.currentTarget.dataset.type);
    this.setData({
      popShow: true
    })
  },

  confirmSelect: function (e) {
    if((this.data.dateStartMS > this.data.dateEndMS && this.data.dateEndMS!=0) || this.data.dateStartMS == 0){
      wx.showToast({title: '时间格式错误', icon: 'none'});
    }
    // console.log('confirmSelect:startms='+this.data.dateStartMS+",endms="+this.data.dateEndMS);
    if (this.data.productInfo.bespeak.list && this.data.productInfo.bespeak.list.length>0){
      let tmpList = [];
      let list = this.data.productInfo.bespeak.list;
      for(let i=0;i<list.length;i++){
        // console.log('confirmSelect:listtime=' + list[i]['create_time'] * 1000);

        if(this.data.dateStartMS <= list[i]['create_time']*1000){
          if(this.data.dateEndMS == 0){
            tmpList.push(list[i]);
          }else{
            if(list[i]['create_time']*1000 <= this.data.dateEndMS){
              tmpList.push(list[i]);
            }
          }
        }
      }//end for
      this.setData({targetList: tmpList});
    }

  },

  onConfirm: function (e) {
    // console.log("--------onInput:" + e.detail)
    let ms = e.detail;
    let msstr = util.formatTimeYMD(new Date(ms));
    if(this.data.dateType == 0){
      this.setData({
        popShow: false,
        dateStartMS: ms,
        dateStart:msstr
      });
    }else if(this.data.dateType == 1){
      this.setData({
        popShow: false,
        dateEndMS: ms,
        dateEnd:msstr
      });
    }
  },
  onCancel: function (e) {
    this.setData({
      popShow: false
    })
  },

  //预约或取消预约
  onBespeak: function (e) {
    let _hideInput = true;
    let _type = 0;
    if(this.data.bespeakType == 1){ //取消预约
      _type = 0;
    }else{  //预约
      _type = 1;
      _hideInput = false;
    }
    // console.log('------------------onBespeak, type='+_type);
    this.setData({
      hideInput: _hideInput,
      bespeakType: _type
    });
    if(_type == 0){
      this.sendBespeakRequest(_type);
    }
  },

  onInput: function (e) {
    let dtype = e.currentTarget.dataset.dtype;
    let _value = e.detail.value;
    //console.log('---------onInput: dtype = ' + dtype + ", value = " + e.detail.value);
    if(dtype == 1){
      this.data.contact = _value;
    }else if(dtype == 2){
      this.data.count = _value;
    }else if(dtype == 3){
      this.data.summary = _value;
    }
  },

  //提交预约
  onCommit: function (e) {
    let tips = this.check();
    if(tips.length > 0){
      wx.showToast({title: tips,icon: 'none'});
      return;
    }
    this.sendBespeakRequest(1);
  },

  check: function(){
    let _contact = this.data.contact.replace(/\s+/g, '');
    if (_contact == "" || _contact.length < 6) {
      return "请输入正确的联系方式";
    }
    if(Number(this.data.count) <= 0){
      return "请输入预约数量";
    }
    return "";
  },

  sendBespeakRequest: function(actionType){
    let that = this;
    let _actionType = actionType;
    wx.showLoading({
      title: '请稍后...',
      mask: true
    });
    common.request({
      method: "POST",
      url: common.BASE_URL + '?function=bespeakRequest&session_id=' + app.globalData.userInfo.session_id,
      data: {
        'action': _actionType,
        'productid': this.data.productInfo.product.productid,
        'name': app.globalData.userInfo.nickName,
        'contact':this.data.contact,
        'count':Number(this.data.count),
        'summary':this.data.summary
      },
      success: res => {
        // console.log("--------sendBespeakRequest:" + JSON.stringify(res));
        if (res.data.iRet == 0) {
          let msg = "";
          if (_actionType == 1){ //预约成功
            msg = "预约成功";
          }else{ //取消成功
            msg = "取消成功";
          }
          wx.showToast({
            title: msg,
            icon: 'none'
          })
          that.setData({
            hideInput: true,
            bespeakType: _actionType
          });
          that.sendRequest(that.data.productInfo.product.productid);
        } else {
          wx.showToast({
            title: "操作失败！" + res.data.sMsg,
            icon: 'none'
          })
        }
        wx.hideLoading();
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({
          title: "操作失败！请检查网络。",
          icon: 'none'
        })
      }
    });
  },


  sendRequest: function (productid) {
    // console.log('-------sendRequest, productid = ' + productid);
    var that = this;
    wx.showLoading({
      title: '请稍后...',
      mask:true
    });
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

          //处理预约信息
          let tradeArr = util.arrayToString(_info.product['tradeway']);
          let _hideBespeak = true;
          if(tradeArr && tradeArr.length > 0){
            for(let i=0;i<tradeArr.length;i++){
              if(tradeArr[i] == 1){
                _hideBespeak = false;
              }
            }
          }
          let _hideInput=false;
          let _hidebtn=false;
          let _type=0;
          _info.bespeak.self = 0;
          if(_info.bespeak){
            _hideInput = true;
            if (_info.bespeak.self == 1) {
              _hidebtn = true;
            } else {
              _hidebtn = false;
              _type = _info.bespeak.hasbespeak;
            }
          }else{
            _hide = true;
          }
          let _targetList = [];
          if(_info.bespeak.list && _info.bespeak.list.length > 0){
            _targetList = _info.bespeak.list;
            for(let j=0;j<_info.bespeak.list.length;j++){
              _info.bespeak.list[j]['time'] = util.formatTime(new Date(_info.bespeak.list[j]['create_time'] * 1000));
            }
          }

          that.setData({
            productInfo: _info,
            targetList: _targetList,
            hideInput: _hideInput,
            hideBespeakBtn: _hidebtn,
            bespeakType: _type,
            hideBespeak: _hideBespeak
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