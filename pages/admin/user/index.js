// pages/admin/user/index.js


var app = getApp();
var common = require("../../../utils/common.js")
var util = require('../../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    usersTotal: 0,
    indexinTotal: 0,
    usersActivity: 0,
    keywords:"",
    users:null,
    newusers:null,
    usersForCommit:null
  },


  onOneActSelected(evt) {
    let _target = evt.detail;
    let len = this.data.users.length;
    let newlen = this.data.newusers.length;
    for(let i=0;i<newlen;i++){
      if(this.data.newusers[i]['openid'] == _target['openid']){
        this.data.newusers[i]['act_limit'] = _target['act_value'];
      }
    }
    let _tmp = [];
    for(let j=0;j<len;j++){
      for(let k=0;k<newlen;k++){
        if(this.data.users[j]['openid'] == this.data.newusers[k]['openid'] && 
        this.data.users[j]['act_limit'] != this.data.newusers[k]['act_limit']){
          _tmp.push(this.data.newusers[k]);
        }
      }
    }

    this.setData({
      usersForCommit: _tmp
    });

    console.log('------------onOneActSelected: usersForCommit = ' + JSON.stringify(this.data.usersForCommit));

  },

  onSearch: function (e) {
    let searchkeys = this.data.keywords;
    if (searchkeys && typeof (searchkeys) === 'string') {
      searchkeys = searchkeys.replace(/\s+/g, '');
      if (searchkeys != '') {
        this.searchUsers(searchkeys);
      } else {
        wx.showToast({
          title: '请输入搜索关键字！',
          icon: 'none'
        })
      }
    }
  },

  doSearchChange: function (e) {
    this.data.keywords = e.detail;
  },

  dellUsers: function (e) {
    let that = this;
    if(this.data.usersForCommit == null || this.data.usersForCommit.length <= 0){
      wx.showToast({ title: '用户属性没有改变！', icon: "none" });
      return;
    }
    wx.showLoading({ title: '请稍后......' });
    common.request({
      method: "POST",
      url: common.BASE_URL + "?function=dellUsers&session_id=" + app.globalData.userInfo.session_id,
      data: {
        "users": JSON.stringify(this.data.usersForCommit)
      },
      success: res => {
        console.log('-------------dellUsers: res = ' + JSON.stringify(res));
        wx.hideLoading();
        if (res.data.iRet == 0) {
          wx.showToast({ title: '已处理！', icon: "none" });
          this.searchUsers(this.data.keywords);
        } else {
          wx.showToast({ title: '错误：' + res.data.sMsg, icon: "none" });
        }
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({ title: '请检查网络链接！', icon: "none" })
      }
    });
  },

  searchUsers: function (keywords) {
    let that = this;
    wx.showLoading({ title: '请稍后......' });
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'searchUsers',
        'session_id': app.globalData.userInfo.session_id,
        "keywords": keywords
      },
      success: res => {
        console.log('-------------searchUsers: res = ' + JSON.stringify(res));
        wx.hideLoading();
        if (res.data.iRet == 0) {
          let tmpStr = JSON.stringify(res.data.data);
          let _users = JSON.parse(tmpStr);
          let _newusers = JSON.parse(tmpStr);
          that.setData({
            users: _users,
            newusers: _newusers
          });
        } else {
          wx.showToast({ title: '错误：'+res.data.sMsg, icon: "none" });
        }
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({ title: '请检查网络链接！', icon: "none" })
      }
    });
  },


  getUsersSummary: function () {
    let that = this;
    wx.showLoading({ title: '请稍后......' });
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'usersSummary',
        'session_id': app.globalData.userInfo.session_id
      },
      success: res => {
        console.log('-------------getUsersSummary: res = ' + JSON.stringify(res));
        wx.hideLoading();
        if (res.data.iRet == 0) {
          let _usersTotal = res.data.data['userstotal'];
          that.setData({
            usersTotal: _usersTotal
          });
        } else {
          wx.showToast({ title: '错误：' + res.data.sMsg, icon: "none" });
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
    this.setData({
      nickName: app.globalData.userInfo.nickName,
    });
    this.getUsersSummary();
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