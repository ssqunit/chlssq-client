// pages/district/create/create.js

// 在需要使用的js文件中，导入js
var cityInfo = require('../../../common/cityArray.js');
var arrays = cityInfo.getAreaInfo();
var util = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    upload_img: "../../../static/custom/defaults/def_ssq.jpg",
    citysIndex: [0, 0, 0], //给一个初始值索引，因为有三列，所以3个0,
    citysData: "",
    inputText: null,
    positions: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (wx.getStorageSync('global_cityData')) {
      var cityArray = wx.getStorageSync('global_cityData');
    } else {
      //定义三列空数组
      var cityArray = [
        [],
        [],
        [],
      ];
      for (let i = 0, len = arrays.length; i < len; i++) {
        switch (arrays[i]['level']) {
          case 1:
            //第一列
            cityArray[0].push(arrays[i]["name"]);
            break;
          case 2:
            //第二列(默认由第一列第一个关联)
            if (arrays[i]['sheng'] == arrays[0]['sheng']) {
              cityArray[1].push(arrays[i]["name"]);
            }
            break;
          case 3:
            //第三列(默认第一列第一个、第二列第一个关联)
            if (arrays[i]['sheng'] == arrays[0]['sheng'] && arrays[i]['di'] == arrays[1]['di']) {
              cityArray[2].push(arrays[i]["name"]);
            }
            break;
        }
      }
      wx.setStorageSync('global_cityData', cityArray);
    }

    that.setData({
      cityArray: cityArray
    });

  },

  func_changeCitysChange: function (e) {
    var that = this;
    var cityArray = that.data.cityArray;

    var address = '';
    if (that.data.ssq == undefined) {
      //下面方法中没有设置ssq，应该给它默认值 ，此时citysIndex相当于[0,0,0]
      var citysIndex = that.data.citysIndex;
      for (let i in citysIndex) {
        address += cityArray[i][citysIndex[i]]
      }
    } else {
      address = that.data.ssq;
    }

    that.setData({
      citysData: address
    })
  },

  func_changeCitysChangeColumn: function (e) {
    var that = this;
    var cityArray = that.data.cityArray;

    var list1 = []; //存放第二列数据，即市的列
    var list2 = []; //存放第三列数据，即区的列

    var citysIndex = [];
    //主要是注意地址文件中的字段关系，省、市、区关联的字段有 sheng、di、level
    switch (e.detail.column) {
      case 0:
        //滑动左列
        for (let i = 0, len = arrays.length; i < len; i++) {
          if (arrays[i]['name'] == cityArray[0][e.detail.value]) {
            var sheng = arrays[i]['sheng'];
          }
          if (arrays[i]['sheng'] == sheng && arrays[i]['level'] == 2) {
            list1.push(arrays[i]['name']);
          }
          if (arrays[i]['sheng'] == sheng && arrays[i]['level'] == 3 && arrays[i]['di'] == arrays[1]['di']) {
            list2.push(arrays[i]['name']);
          }
        }

        citysIndex = [e.detail.value, 0, 0];
        var ssq = cityArray[0][e.detail.value] + list1[0] + list2[0] + '';

        that.setData({
          global_sheng: sheng
        });
        break;
      case 1:
        //滑动中列
        var di;
        var sheng = that.data.global_sheng;
        list1 = cityArray[1];
        for (let i = 0, len = arrays.length; i < len; i++) {
          if (arrays[i]['name'] == cityArray[1][e.detail.value]) {
            di = arrays[i]['di'];
          }
        }
        for (let i = 0, len = arrays.length; i < len; i++) {
          if (arrays[i]['sheng'] == sheng && arrays[i]['level'] == 3 && arrays[i]['di'] == di) {
            list2.push(arrays[i]['name']);
          }
        }
        citysIndex = [that.data.citysIndex[0], e.detail.value, 0];

        var ssq = cityArray[0][that.data.citysIndex[0]] + list1[e.detail.value] + list2[0] + '';

        break;
      case 2:
        //滑动右列
        list1 = cityArray[1];
        list2 = cityArray[2];
        citysIndex = [that.data.citysIndex[0], that.data.citysIndex[1], e.detail.value];

        var ssq = cityArray[0][that.data.citysIndex[0]] + list1[that.data.citysIndex[1]] + list2[e.detail.value] + '';
        break;
    }

    that.setData({
      "cityArray[1]": list1,//重新赋值中列数组，即联动了市
      "cityArray[2]": list2,//重新赋值右列数组，即联动了区
      citysIndex: citysIndex,//更新索引
      ssq: ssq,//获取选中的省市区
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

  //

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