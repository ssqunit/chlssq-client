// pages/admin/announcement/publish.js

var util = require('../../../utils/util.js');
var common = require("../../../utils/common.js")

const app = getApp()


Page({

  /**
   * Page initial data
   */
  data: {
    nickName: "...",
    popShow:false,
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 1, 1).getTime(),
    type:0,
    title:"系统公告:",
    content:"",
    currentDate: new Date().getTime(),
    dataType:0, //标记当前操作的是开始时间还是结束时间
    dateStart:"",
    dateStartFormat: "",
    dateEnd: "",
    dateEndFormat: "",
  },

  //选择公告类型
  radioChange: function (e) {
    console.log("radioChange---:" + e.detail.value);
    this.data.type = e.detail.value;
  },

  //输入的文字内容
  onText: function (e) {
    console.log("onText---:" + e.detail.value);
    this.data.content = e.detail.value;
  },

  //选择公告时间段
  selectDate: function (e) {
    this.data.dataType = e.currentTarget.dataset.type;
    this.setData({
      popShow: true
    })
  },
  onConfirm: function (e) {
    console.log("--------onInput:" + e.detail)
    if(this.data.dataType == 1){
      this.setData({
        popShow: false,
        dateStart: e.detail,
        dateStartFormat: util.formatTime(new Date(e.detail))
      })
    } else if (this.data.dataType == 2){
      this.setData({
        popShow: false,
        dateEnd: e.detail,
        dateEndFormat: util.formatTime(new Date(e.detail))
      })
    }
  },
  onCancel: function (e) {
    this.setData({
      popShow: false
    })
  },

  toast: function(msg){
    wx.showToast({
      title: msg,
      mask:true,
      duration:2000
    })
  },

  checkData: function (){
    if(this.data.type==0){
      this.toast("请选择公告类型！");
      return false;
    } else if (this.data.content == "" || this.data.content.length < 5){
      this.toast("请输入公告内容！长度大于5！");
      return false;
    } else if (this.data.dateStart == "" || this.data.dateEnd == ""){
      this.toast("请选择公告时间段！");
      return false;
    }
    return true;
  },

  //提交
  onCommit: function (e) {
    var check = this.checkData();
    if(check){
      common.request({
        method: "GET",
        url: common.BASE_URL,
        data: {
          'function': 'createNotice',
          session_id: app.globalData.userInfo.session_id,
          'openid': app.globalData.userInfo.ID,
          'type':this.data.type,
          'title':this.data.title,
          'content':this.data.content,
          'start_time':Math.round(this.data.dateStart/1000),
          'end_time':Math.round(this.data.dateEnd/1000)
        },
        success: res => {
          console.log("----------- createNotice:success" + JSON.stringify(res));
          if (res.data.iRet == 0) {
            this.toast("插入公告成功！");
          } else {
            this.toast("插入公告失败！");
          }
        },
        fail: res => {
          this.toast("请检查网络链接！");
        }
      });
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      nickName: app.globalData.userInfo.nickName
    })
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