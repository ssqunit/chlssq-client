// pages/admin/audit/index.js


var app = getApp();
var common = require("../../../utils/common.js")
var util = require('../../../utils/util.js');


Page({

  /**
   * Page initial data
   */
  data: {
    nickName: "",
    ssqinfo:null,
    shopinfo:null,
    personinfo:null,
    dirtyObj:null
  },

  //
  delSsqApply: function (e) {
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'ssqapply/ssqapply?ssqid='+id,
    })
  },

  //
  delBusApply: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'busapply/busapply?shopid='+id,
    })
  },

  //
  delPerApply: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'perapply/perapply?shopid='+id,
    })
  },

  //
  delImgApply: function (e) {
    wx.navigateTo({
      url: 'imgapply/imgapply',
    })
  },

  onReflash: function (e) {
    this.data.dirtyObj = null;
    this.query();
  },

  query: function (){
    let that = this;
    wx.showLoading({ title: '请稍后......' });
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'queryAudits',
        'session_id': app.globalData.userInfo.session_id
      },
      success: res => {
        console.log('-------------queryAudits: res = ' + JSON.stringify(res));
        wx.hideLoading();
        if (res.data.iRet == 0) {
          that.setData({
            nickName: app.globalData.userInfo.nickName,
            ssqinfo: res.data.data.ssqinfo,
            shopinfo: res.data.data.shopinfo,
            personinfo: res.data.data.personinfo
          });
        } else {
        }
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({ title: '请检查网络链接！', icon: "none" })
      }
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.query();
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
    if(this.data.dirtyObj){
      if(this.data.dirtyObj['ssqinfo']){
        let _ssqinfo = this.data.ssqinfo;
        if(_ssqinfo && _ssqinfo.length>0){
          let _tmp = [];
          for(let i=0;i<_ssqinfo.length;i++){
            if(_ssqinfo[i]['ssqid'] != this.data.dirtyObj['ssqinfo'] ){
              _tmp.push(_ssqinfo[i]);
            }
          }
          this.setData({
            ssqinfo : _tmp
          });
        }
      }
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