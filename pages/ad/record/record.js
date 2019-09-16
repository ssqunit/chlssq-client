// pages/ad/record/record.js


const app = getApp()

// 在需要使用的js文件中，导入js
var util = require('../../../utils/util.js');
var common = require("../../../utils/common.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopid:"",
    scr_h: 100,
    count: 0,
    popShow: false,
    dateType: 0,
    minDate: new Date(2019, 8, 8).getTime(),
    maxDate: new Date(2029, 1, 1).getTime(),
    currentDate: new Date(2019, 8, 7).getTime(),
    dateStart: "-",
    dateStartMS: 0,//毫秒
    dateEnd: "-",
    dateEndMS: 0,//毫秒
    recordsInfo:null

  },

  //
  getSystemInfo: function () {
    var self = this
    wx.getSystemInfo({
      success: res => {
        self.setData({
          //windowHeight 为屏幕可用高度
          //winHeight: res.windowHeight,
          //screenHeight 为屏幕高度
          scr_h: res.screenHeight - 120
        })
      }
    })
  },

  getADrecord: function (shopid) {
    var that = this;
    wx.showLoading({ title: '请稍后......' });
    let _st = this.data.dateStartMS == 0 ? 0 : Math.round(this.data.dateStartMS / 1000);
    let _et = this.data.dateEndMS == 0 ? 0 : Math.round(this.data.dateEndMS / 1000);
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'getADrecord',
        'session_id': app.globalData.userInfo.session_id,
        'shopid': shopid,
        'start_time': _st,
        'end_time': _et
      },
      success: res => {
        console.log('-----getADrecord, res = ' + JSON.stringify(res));
        wx.hideLoading();
        if (res.data.iRet == 0) {
          let _arr = res.data.data;
          if(_arr && _arr.length>0){
            for(let i=0;i<_arr.length;i++){
              let _one = _arr[i];
              _one['timestr'] = util.formatTime(new Date(Number(_one['create_time'])*1000) );
              let _type = "首页文字广告";
              if (Number(_one['type']) == 2){
                _type = "首页大图广告";
              } else if (Number(_one['type']) == 3) {
                _type = "首页商家位广告";
              } else if (Number(_one['type']) == 4) {
                _type = "首页个人位广告";
              }  
              _one['typestr'] = _type;
              _one['statusstr'] = Number(_one['status']) == 1 ? "已支付" : "未支付";
              let _dateSet = "";
              if(_one['content'] && _one['content'].length>0){
                _dateSet= _one['content'][0]['begin_date'] + '-' + _one['content'][0]['end_date'];
              }
              _one['dateSet'] = _dateSet;
              _arr[i] = _one;
            }
          }
          let _len = 0;
          if(_arr){
            _len = _arr.length;
          }
          that.setData({
            recordsInfo: _arr,
            count: _len
          });
          //wx.showToast({ title: '成功！',icon: 'none' })
        } else {
          wx.showToast({ title: '失败！'+res.data.sMsg, icon: 'none' })
        }
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({ title: '请检查网络链接！', icon: "none" })
      }
    });  
  },


  selectDate: function (e) {
    this.setData({
      popShow: true,
      dateType: Number(e.currentTarget.dataset.type)
    })
  },

  confirmSelect: function (e) {
    if ((this.data.dateStartMS > this.data.dateEndMS && this.data.dateEndMS != 0) || this.data.dateStartMS == 0) {
      wx.showToast({ title: '时间格式错误', icon: 'none' });
    }
    this.getADrecord(this.data.shopid);
  },

  onConfirm: function (e) {
    // console.log("--------onInput:" + e.detail)
    let ms = e.detail;
    let msstr = util.formatTimeYMD(new Date(ms));
    if (this.data.dateType == 0) {
      this.setData({
        popShow: false,
        dateStartMS: ms,
        dateStart: msstr
      });
    } else if (this.data.dateType == 1) {
      this.setData({
        popShow: false,
        dateEndMS: ms,
        dateEnd: msstr
      });
    }
  },
  onCancel: function (e) {
    this.setData({
      popShow: false
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _shopid = options.shopid;
    this.data.shopid = _shopid;
    this.getSystemInfo();
    this.getADrecord(_shopid);
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