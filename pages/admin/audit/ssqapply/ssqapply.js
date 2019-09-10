// pages/admin/audit/ssqapply/ssqapply.js

var app = getApp();
var common = require("../../../../utils/common.js")
var util = require('../../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    des:"",
    applySsqInfo:null,
    nearbySsq:null
  },

  //
  showOnMap: function (e) {
    wx.openLocation({
      latitude: Number(e.currentTarget.dataset.latitude),
      longitude: Number(e.currentTarget.dataset.longitude),
      scale: 14
    })
  },

  onDes: function (e) {
    this.data.des = e.detail.value;
  },

  onDell: function (e) {
    let type = e.currentTarget.dataset.type;
    let _pass = type;
    wx.showLoading({ title: '请稍后......' });
    common.request({
      method: "POST",
      url: common.BASE_URL + '?function=passSsq&session_id=' + app.globalData.userInfo.session_id,
      data: {
        'ssqid': this.data.applySsqInfo.ssqid,
        'name': this.data.applySsqInfo.name,
        'owner': this.data.applySsqInfo.owner,
        'ispass': _pass,
        'des': this.data.des
      },
      success: res => {
        console.log('-------------passSsq: res = ' + JSON.stringify(res));
        wx.hideLoading();
        if (res.data.iRet == 0) {
          wx.showModal({
            title: '处理结果',
            content: '成功！',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.navigateBack();
              }
            }
          })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ssqid = options.ssqid;
    let that = this;
    wx.showLoading({ title: '请稍后......' });
    common.request({
      method: "GET",
      url: common.BASE_URL + '?function=querySsqForAudit&session_id=' + app.globalData.userInfo.session_id,
      data: {
        'ssqid': ssqid,
      },
      success: res => {
        console.log('-------------querySsqForAudit: res = ' + JSON.stringify(res));
        wx.hideLoading();
        if (res.data.iRet == 0) {
          let _ssqinfo = res.data.data['ssqinfo'];
          _ssqinfo['img'] = common.getImgUrl(app.globalData.userInfo.session_id, _ssqinfo['imgid']);
          let _nearbyssq = res.data.data['nearbyssq'];
          if(_nearbyssq && _nearbyssq.length>0){
            for(let i=0;i<_nearbyssq.length;i++){
              let one = _nearbyssq[i];
              _nearbyssq[i]['dis'] = util.countDistance(_ssqinfo['latitude'], _ssqinfo['longitude'], one['latitude'], one['longitude']);
            }
          }

          that.setData({
            nickName: app.globalData.userInfo.nickName,
            applySsqInfo: _ssqinfo, 
            nearbySsq: _nearbyssq           
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