// pages/district/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    active_chi: 0,
    distance: 0.50,
    ssqInfo:{"ID":0,"name":"御峰园","area":"广东省深圳市龙岗区","photo":"../../../static/custom/defaults/def_ssq.jpg","busCount":98,"perCount":66},
    ssqBpInfo:{
      "bInfo": [
        { "optype": 0, "opname": "全部",
          "members": [
            { "id": 0, "optype": 1, "name": "商家名字1", "photo": "../../../static/icons/home_r.png" },
            { "id": 0, "optype": 2, "name": "商家名字2", "photo": "../../../static/icons/home_r.png" },
            { "id": 0, "optype": 1, "name": "商家名字1", "photo": "../../../static/icons/home_r.png" },
            { "id": 0, "optype": 2, "name": "商家名字2", "photo": "../../../static/icons/home_r.png" },
            { "id": 0, "optype": 1, "name": "商家名字1", "photo": "../../../static/icons/home_r.png" },
            { "id": 0, "optype": 2, "name": "商家名字2", "photo": "../../../static/icons/home_r.png" },
            { "id": 0, "optype": 1, "name": "商家名字1", "photo": "../../../static/icons/home_r.png" },
            { "id": 0, "optype": 2, "name": "商家名字2", "photo": "../../../static/icons/home_r.png" },
            { "id": 0, "optype": 1, "name": "商家名字1", "photo": "../../../static/icons/home_r.png" },
            { "id": 0, "optype": 2, "name": "商家名字2", "photo": "../../../static/icons/home_r.png" },
            { "id": 0, "optype": 1, "name": "商家名字1", "photo": "../../../static/icons/home_r.png" },
            { "id": 0, "optype": 2, "name": "商家名字2", "photo": "../../../static/icons/home_r.png" },
            { "id": 0, "optype": 1, "name": "商家名字1", "photo": "../../../static/icons/home_r.png" }
          ]
        },
        { "optype": 1, "opname":"健康养生",
          "members": [
            { "id": 0, "optype": 1, "name": "商家名字1", "photo": "../../../static/icons/home_r.png" },
            { "id": 0, "optype": 1, "name": "商家名字1", "photo": "../../../static/icons/home_r.png" },
            { "id": 0, "optype": 1, "name": "商家名字1", "photo": "../../../static/icons/home_r.png" }
          ]
        },
        { "optype": 2, "opname": "培训辅导",
          "members": [
            { "id": 0, "optype": 2, "name": "商家名字2", "photo": "../../../static/icons/home_r.png" }
          ]
        },
        { "optype": 3, "opname": "家装报修",
          "members": [
            { "id": 0, "optype": 3, "name": "商家名字3", "photo": "../../../static/icons/home_r.png" }
          ]
        },
        { "optype": 4, "opname": "中介服务",
          "members": [
            { "id": 0, "optype": 4, "name": "商家名字4", "photo": "../../../static/icons/home_r.png" }
          ]
        },
        { "optype": 5, "opname": "悠闲娱乐",
          "members": [
            { "id": 0, "optype": 5, "name": "商家名字5", "photo": "../../../static/icons/home_r.png" }
          ]
        },
        { "optype": 6, "opname": "果蔬鲜花",
          "members": [
            { "id": 0, "optype": 6, "name": "商家名字6", "photo": "../../../static/icons/home_r.png" }
          ]
        },
        { "optype": 7, "opname": "饮食",
          "members": [
            { "id": 0, "optype": 7, "name": "商家名字7", "photo": "../../../static/icons/home_r.png" }
          ]
        },
        { "optype": 8, "opname": "其它",
          "members": [
            { "id": 0, "optype": 8, "name": "商家名字8", "photo": "../../../static/icons/home_r.png" }
          ]
        }
        ],
        "pInfo":[
          {"id": 0, "name": "个人商家名字0", "photo": "../../../static/icons/account_r.png"},
          { "id": 1, "name": "个人商家名字1", "photo": "../../../static/icons/account_r.png" },
          { "id": 3, "name": "个人商家名字3", "photo": "../../../static/icons/account_r.png" },
          { "id": 4, "name": "个人商家名字4", "photo": "../../../static/icons/account_r.png" },
          { "id": 2, "name": "个人商家名字2", "photo": "../../../static/icons/account_r.png" },
          { "id": 5, "name": "个人商家名字5", "photo": "../../../static/icons/account_r.png" },
          { "id": 6, "name": "个人商家名字6", "photo": "../../../static/icons/account_r.png" },
          { "id": 9, "name": "个人商家名字9", "photo": "../../../static/icons/account_r.png" },
          { "id": 8, "name": "个人商家名字8", "photo": "../../../static/icons/account_r.png" },
          { "id": 7, "name": "个人商家名字7", "photo": "../../../static/icons/account_r.png" },
          { "id": 12, "name": "个人商家名字12", "photo": "../../../static/icons/account_r.png" },
          { "id": 10, "name": "个人商家名字10", "photo": "../../../static/icons/account_r.png" },
          { "id": 11, "name": "个人商家名字11", "photo": "../../../static/icons/account_r.png" }
        ]
      }
  },

  //打开商圈在地图上的位置
  openPosition:function(e){
    wx.openLocation({
      latitude:21.70915603,
      longitude:111.35697174,
      scale:14})
  },

  //选择商圈加入方式
  goJoin: function (e) {
    wx.navigateTo({
      url: '../../district/join/join'
    })
  },

  //
  onItemClick:function(e){
    console.log("eeeeeeeee:" + e.currentTarget.dataset.id);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tab = options.tab;
    this.setData({
      active: tab
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
    this.setData({
      active: this.data.active == 0 ? 0 : 1 //这里重复设置是为了修复选中样式不执行的问题
    })

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