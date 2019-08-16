// pages/district/create/create.js

// 在需要使用的js文件中，导入js
var util = require("../../../utils/util.js");
var aList = require("../../../common/area.js");
var common = require("../../../utils/common.js");

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    upload_img: "../../../static/custom/defaults/def_ssq.jpg",
    loadImage:false,
    areaList:null,
    popShow:false,
    imgId:"",   //上传后返回的图片ID
    citysData: "",//区域
    inputText: "",//社圈名称
    positions: null, //社圈位置
    markText:"未标记"
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
          markText: "已标记"
        })
      },
      fail: function () {
        that.setData({
          positions: null,
          markText: "未标记"
        })
      }
    })
  },

  //获取当前的位置经纬度
  getCurPosition: function (e) {
    var that = this;
    wx.showLoading({
      title: '正在获取当前位置...',
      mask: true
    })
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        wx.hideLoading();
        that.setData({
          positions: { "latitude": res.latitude, "longitude": res.longitude },
          markText: "已标记"
        })
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '获取位置信息失败！',
          icon : 'none',
          duration : 2000
        })
        that.setData({
          positions: null,
          markText: "未标记"
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


  //加载本地图片
  loadImg:function(e){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        that.setData({
          upload_img : tempFilePaths[0],
          loadImage:true
        });

      }
    })
  },

  uploadImages:function(obj){
    console.log("uploadImg:" + app.globalData.userInfo.session_id + "," + this.data.upload_img);
    const uploadTask = common.uploadFile({
      url: common.BASE_URL,
      filePath: this.data.upload_img,
      name: 'file',
      header: { "Content-Type": "multipart/form-data" },
      formData: {
        'function': 'upload',
        session_id: app.globalData.userInfo.session_id
      },
      success(res) {
        if (obj.uploadSuccess){
          obj.uploadSuccess(res);
        }
      },
      fail(res) {
        if (obj.uploadFail) {
          obj.uploadFail(res);
        }
      },
      complete(res) {
        console.log("wx.uploadFile : complete - " + JSON.stringify(res));
      }
    })

    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })
  },

  //提交申请
  onCommit:function(e){
    var that = this;
    var ck = that.check();
    if(ck == ""){
      wx.showLoading({
        title: '提交中，请稍后...',
        mask: true
      })
      this.uploadImages({
        uploadSuccess(res) {
          console.log("wx.uploadFile : success - " + JSON.stringify(res));

          common.request({
            method: "GET",
            url: common.BASE_URL,
            data: {
              'function': 'ssqCreateApply',
              imgid: that.data.imgId,
              area: that.data.citysData,
              name: that.data.inputText,
              position: that.data.positions
            },
            success: res => {
              wx.hideLoading();
              //todo
            },
            fail: res => {
              wx.hideLoading();
              //todo
            }
          });

        },
        uploadFail(res) {
          console.log("wx.uploadFile : fail - " + JSON.stringify(res));
          wx.hideLoading();

        }
      });
    }else{
      wx.showToast({
        title: ck,
        icon: 'none',
        duration: 2000
      })
    }
  },

  check: function() {
    if(this.data.upload_img.length <= 20 || !this.data.loadImage){
      return "请选择上传社圈展示图！";
    } else if (this.data.citysData.length <=2){
      return "请选择社圈所在的区域";
    } else if (this.data.inputText.length == "") {
      return "请输入社圈名字";
    } else if (this.data.positions == null) {
      return "请标记社圈位置";
    } else {
      return "";
    } 
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