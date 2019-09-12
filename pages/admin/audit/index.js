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
    console.log('--------onShow: obj = ' + JSON.stringify(this.data.dirtyObj));
    if(this.data.dirtyObj){
      //ssqinfo
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
            ssqinfo : _tmp,
            dirtyObj: null
          });
        }
      }
      //shopinfo
      if (this.data.dirtyObj['shopinfo']) {
        let _shopinfo = this.data.shopinfo;
        if (_shopinfo && _shopinfo.length > 0) {
          let _tmp = [];
          for (let i = 0; i < _shopinfo.length; i++) {
            if (_shopinfo[i]['shopid'] != this.data.dirtyObj['shopinfo']) {
              _tmp.push(_shopinfo[i]);
            }
          }
          this.setData({
            shopinfo: _tmp,
            dirtyObj: null
          });
        }
      }
      //persioninfo
      if (this.data.dirtyObj['personinfo']) {
        let _personinfo = this.data.personinfo;
        if (_personinfo && _personinfo.length > 0) {
          let _tmp = [];
          for (let i = 0; i < _personinfo.length; i++) {
            if (_personinfo[i]['shopid'] != this.data.dirtyObj['personinfo']) {
              _tmp.push(_personinfo[i]);
            }
          }
          this.setData({
            personinfo: _tmp,
            dirtyObj: null
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