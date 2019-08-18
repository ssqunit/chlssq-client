// pages/admin/announcement/publish.js

var util = require('../../../utils/util.js');

Page({

  /**
   * Page initial data
   */
  data: {
    nickName: "locky",
    popShow:false,
    minDate: new Date().getTime(),
    maxDate: new Date(2029, 1, 1).getTime(),
    currentDate: new Date().getTime(),
    dataType:0,
    dateStart:"",
    dateStartFormat: "",
    dateEnd: "",
    dateEndFormat: "",
  },

  //选择公告类型
  radioChange: function (e) {
    console.log("radioChange---:" + e.detail.value);
  },

  //输入的文字内容
  onText: function (e) {
    console.log("onText---:" + e.detail.value);
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

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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