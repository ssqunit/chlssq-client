// pages/admin/audit/perapply/perapply.js

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
    perJoinInfo: null,
    joinSsqInfo: null
  },

  //
  showOnMap: function (e) {
    wx.openLocation({
      latitude: Number(e.currentTarget.dataset.latitude),
      longitude: Number(e.currentTarget.dataset.longitude),
      scale: 14
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

  onDes: function (e) {
    this.data.des = e.detail.value;
  },

  onDell: function (e) {
    let that = this;
    let type = e.currentTarget.dataset.type;
    if (type == 2) {
      var _des = this.data.des.replace(/\s+/g, '');
      if (_des == "") {
        wx.showModal({
          title: '提示',
          content: '请输入拒绝原因！',
          showCancel: false,
          success(res) {
          }
        });
        return;
      }
    }
    let _pass = type;
    wx.showLoading({ title: '请稍后......' });
    common.request({
      method: "POST",
      url: common.BASE_URL + '?function=passShop&session_id=' + app.globalData.userInfo.session_id,
      data: {
        'shopid': this.data.perJoinInfo.shopid,
        'name': this.data.perJoinInfo.name,
        'owner': this.data.perJoinInfo.owner,
        'ispass': _pass,
        'des': this.data.des
      },
      success: res => {
        console.log('-------------passShop: res = ' + JSON.stringify(res));
        wx.hideLoading();
        if (res.data.iRet == 0) {
          wx.showModal({
            title: '处理结果',
            content: '成功！',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                that.setDellResAndBack();
              }
            }
          })
        } else {
          wx.showToast({ title: '处理失败！', icon: "none" })
        }
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({ title: '请检查网络链接！', icon: "none" })
      }
    });
  },

  setDellResAndBack: function () {
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];   //当前页面
    let prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      dirtyObj: { 'personinfo': this.data.perJoinInfo.shopid }
    });
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let shopid = options.shopid;
    let that = this;
    wx.showLoading({ title: '请稍后......' });
    common.request({
      method: "GET",
      url: common.BASE_URL + '?function=queryShopForAudit&session_id=' + app.globalData.userInfo.session_id,
      data: {
        'shopid': shopid,
      },
      success: res => {
        console.log('-------------queryShopForAudit: res = ' + JSON.stringify(res));
        wx.hideLoading();
        if (res.data.iRet == 0) {
          let _shopinfo = res.data.data['shopinfo'];
          _shopinfo['img'] = common.getImgUrl(app.globalData.userInfo.session_id, _shopinfo['img']);
          _shopinfo['cimg'] = common.getImgUrl(app.globalData.userInfo.session_id, _shopinfo['cimg']);
          let _joinssq = res.data.data['joinssq'][0];

          that.setData({
            nickName: app.globalData.userInfo.nickName,
            perJoinInfo: _shopinfo,
            joinSsqInfo: _joinssq
          });
        } else {
          wx.showToast({ title: '拉取数据失败！'+res.data.sMsg, icon: "none" })
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