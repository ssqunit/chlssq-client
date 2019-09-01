// pages/my/product/edit/edit.js

var util = require('../../../../utils/util.js');
var common = require("../../../../utils/common.js")
var app = getApp();

import Dialog from '../../../../components/vant/dialog/dialog';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnDisabled: true,
    popShow: false,
    productInfo: {}, //产品的原始对象，不要修改其中任何属性
    imgesArr: [], //修改的图片数组
    resImgids: [],
    des: "", //修改的描述
    price: 0.0, //修改的价格
    unit: "", //修改的单位
    dateType: "1", //修改的产品期限类型
    dateEnd: "", //修改的产品到期时间
    dateEndFormat: "",
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 1, 1).getTime(),
    currentDate: new Date().getTime(),
    flags: [],
    tags: [{
        name: '1',
        value: '推荐',
        checked: false
      },
      {
        name: '2',
        value: '优惠',
        checked: false
      }
    ],
    tradeType: [{
      name: '1',
      value: '预约',
      checked: false
    }],

  },

  //选择产品图片，最多4张
  loadImg: function(e) {
    var that = this;
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          imgesArr: tempFilePaths
        });
        that.setBtnEnabled();
      }
    })
  },

  onDes: function(e) {
    this.data.des = e.detail.value;
    this.setBtnEnabled();
  },
  onPrice: function(e) {
    var _price = util.moneyValue(e.detail.value);
    this.setData({
      price: _price,
    })
    this.setBtnEnabled();
  },
  onUnit: function(e) {
    this.data.unit = e.detail.value;
    this.setBtnEnabled();
  },


  selectDate: function(e) {
    this.setData({
      popShow: true
    })
  },

  onConfirm: function(e) {
    console.log("--------onInput:" + e.detail)
    this.setData({
      popShow: false,
      dateEnd: e.detail,
      dateEndFormat: util.formatTime(new Date(e.detail))
    })
    this.setBtnEnabled();
  },
  onCancel: function(e) {
    this.setData({
      popShow: false
    })
  },

  //选择日期类型
  onChangeDateType(event) {
    this.setData({
      dateType: event.detail
    });
    this.setBtnEnabled();
  },

  //标签选择
  tagsChange: function(e) {
    var tmp = e.detail.value;
    tmp.sort();
    this.data.flags = tmp;
    this.setBtnEnabled();
  },

  //交易方式选择
  tradeTypeChange: function(e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  //预览图片
  previewImage: function(e) {
    var current = e.target.dataset.src;
    let urls = this.data.imgesArr;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls
    })
  },

  onCommit: function(e) {
    wx.showLoading({
      title: '提交中，请稍后...',
      mask: true
    })
    if (!(this.data.imgesArr[0] == this.data.productInfo.imgUrls[0])) {
      var resImgs = [];
      common.uploadFiles(this.data.imgesArr, 0, resImgs, this.uploadCallBack, app.globalData.userInfo.session_id);
    } else {
      this.sendCommit();
    }
  },

  uploadCallBack: function(res) {
    console.log("--------uploadCallBack:" + JSON.stringify(res));
    if (res && res.length > 0) {
      this.data.resImgids = res;
      this.sendCommit();
    } else {
      wx.hideLoading();
      this.toast("图片上传失败！");
    }
  },

  //
  sendCommit: function() {
    var that = this;
    common.request({
      method: "POST",
      url: common.BASE_URL + "?function=updateProduct&session_id=" + app.globalData.userInfo.session_id,
      data: {
        'openid': app.globalData.userInfo.ID,
        'productid': this.data.productInfo.productid,
        'p_imgarr': util.arrayToString(this.data.resImgids),
        'p_des': this.data.des,
        'p_price': this.data.price,
        'p_unit': this.data.unit,
        'p_datetype': this.data.dateType,
        'p_dateend': this.data.dateEnd,
        'p_flags': util.arrayToString(this.data.flags)
      },
      success: res => {
        console.log("--------updateProduct:" + JSON.stringify(res));
        wx.hideLoading();
        if (res.data.iRet == 0) {
          that.onDataChange();
          Dialog.alert({
            title: '提示',
            message: '修改提交成功！返回上一页。'
          }).then(() => {
            wx.navigateBack({
              //可回传参数
            })
          });
        } else {
          Dialog.alert({
            title: '提示',
            message: '提交失败！请检查修改内容。'+res.data.sMsg
          }).then(() => {
            //do nothing
          });
        }
      },
      fail: res => {
        wx.hideLoading();
        that.toast("提交失败！请检查您的网络。");
      }
    });
  },

  onDataChange: function() {
    app.globalData.updates['pages.my'] = true;
  },

  setBtnEnabled: function() {
    var hasChange = this.checkChange();
    this.setData({
      btnDisabled: !hasChange
    })
  },

  checkChange: function() {
    if (!(this.data.imgesArr[0] == this.data.productInfo.imgUrls[0])) {
      return true;
    }
    if (!(this.data.des == this.data.productInfo.des)) {
      return true;
    }
    if (!(String(this.data.price) == String(this.data.productInfo.price))) {
      return true;
    }
    if (!(String(this.data.unit) == String(this.data.productInfo.unit))) {
      return true;
    }
    if (!(Number(this.data.dateType) == Number(this.data.productInfo.datetype))) {
      return true;
    } else {
      if (!(Number(this.data.dateEnd) == Number(this.data.productInfo.dateend))) {
        return true;
      }
    }
    var _flags = util.stringToArray(this.data.productInfo.flags);
    if (_flags.length != this.data.flags.length) {
      return true;
    } else {
      if (_flags.length != 0) {
        _flags.sort();
        for (var i = 0; i < _flags.length; i++) {
          if (Number(_flags[i]) != Number(this.data.flags[i])) {
            return true;
          }
        }
      }
    }
    console.log("--------onCommit: 9");
    return false;
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var product = app.globalData.productsForEdit[options.id];
    console.log("---------onLoad: product=" + JSON.stringify(product));
    delete app.globalData.productsForEdit[options.id];
    var tmp = this.data.tags;
    if (product.flagArr != null && product.flagArr.length > 0) {
      for (var i = 0; i < tmp.length; i++) {
        for (var j = 0; j < product.flagArr.length; j++) {
          if (Number(product.flagArr[j]['id']) == Number(tmp[i]['name'])) {
            tmp[i]['checked'] = true;
          }
        }
      }
    }
    var tmpTrad = this.data.tradeType;
    var tradTypes = util.stringToArray(product.tradeway);
    if (tradTypes != null & tradTypes.length > 0) {
      for (var i = 0; i < tmpTrad.length; i++) {
        for (var j = 0; j < tradTypes.length; j++) {
          if (Number(tradTypes[j]) == Number(tmpTrad[i]['name'])) {
            tmpTrad[i]['checked'] = true;
          }
        }
      }
    }
    this.setData({
      productInfo: product,
      imgesArr: product.imgUrls,
      des: product.des,
      price: product.price,
      unit: product.unit,
      dateType: product.datetype,
      dateEnd: product.dateend,
      dateEndFormat: util.formatTime(new Date(Number(product.dateend))),
      tags: tmp,
      flags: util.stringToArray(product.flags),
      tradeType: tmpTrad
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})