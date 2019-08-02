// pages/district/create/create.js

// 在需要使用的js文件中，导入js
var util = require("../../../utils/util.js");
var aList = require("../../../common/area.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    upload_img: "../../../static/custom/defaults/def_ssq.jpg",
    citysData: "",
    areaList:null,
    popShow:false,
    inputText: null,
    positions: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      areaList: aList.default
    });

  },


  //获取输入的商圈名字
  getInput: function (e) {
    // this.data.getInput = e.detail.value;
    this.setData({
      inputText: e.detail.value
    })
  },

  //在地图上标记位置
  onMapMark: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          positions: { "latitude": res.latitude, "longitude": res.longitude },
        })
      },
      fail: function () {
        that.setData({
          positions: { "latitude": "获取位置信息失败！", "longitude": "" }
        })
      }
    })
  },

  //获取当前的位置经纬度
  getCurPosition: function (e) {
    var that = this;
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        that.setData({
          positions: { "latitude": res.latitude, "longitude": res.longitude },
        })
      },
      fail: function () {
        that.setData({
          positions: { "latitude": "获取位置信息失败！", "longitude": "" }
        })
      }
    })
  },

  //选择区域
  choseArea:function(e){
    this.setData({
      popShow:true
    })
  },
  onClose:function(){
    this.setData({popShow:false})
  },
  onAreaCancel:function(){this.onClose();},
  onAreaConfirm:function(values,index){
    // console.log("onAreaConfirm:"+JSON.stringify(values)+values.detail.values[0].name);
    let _info = values.detail.values[0].name + values.detail.values[1].name + values.detail.values[2].name;
    this.setData({
      citysData: _info
    })
    this.onClose();
  },
  onAreaChange:function(values,index){
    // console.log("onAreaChange:"+JSON.stringify(values)+values.detail.values[0].name);
    let _info = values.detail.values[0].name + values.detail.values[1].name + values.detail.values[2].name;
    this.setData({
      citysData:_info
    })
  },


  //
  uploadImg:function(e){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          upload_img : tempFilePaths[0]
        });
        // wx.uploadFile({
        //   url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     'user': 'test'
        //   },
        //   success(res) {
        //     const data = res.data
        //     //do something
        //   }
        // })
      }
    })
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