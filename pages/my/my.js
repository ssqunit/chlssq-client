// pages/my.js
Page({

  /**
   * Page initial data
   */
  data: {
    pick_name:"御峰园",
    ssqList:[
      { "ID": 101, "name": "御峰园", "area": "广东省深圳市龙岗区", "myRole": "成员" },
      { "ID": 101, "name": "御峰园01", "area": "广东省深圳市龙岗区", "myRole": "成员" },
      { "ID": 101, "name": "御峰园02", "area": "广东省深圳市龙岗区", "myRole": "成员" },
      { "ID": 101, "name": "御峰园03", "area": "广东省深圳市龙岗区", "myRole": "成员" }
    ],
    mySsqInfo:{
      name:"双手健康理疗馆",
      ssqImgUrl:"../../static/custom/defaults/def_ssq.jpg",
      adCount: 8,
      productList: [
        { "ID": "108", "name": "产品名称", "des": "产品的描述信息", "count": 1, "price": 18.00, "tags": [1], "images": ["https://img.yzcdn.cn/vant/t-thirt.jpg"] },
        { "ID": "108", "name": "产品名称", "des": "产品的描述信息", "count": 1, "price": 18.00, "tags": [1], "images": ["https://img.yzcdn.cn/vant/t-thirt.jpg"] },
        { "ID": "108", "name": "产品名称", "des": "产品的描述信息", "count": 1, "price": 18.00, "tags": [1], "images": ["https://img.yzcdn.cn/vant/t-thirt.jpg"] },
        { "ID": "108", "name": "产品名称", "des": "产品的描述信息", "count": 1, "price": 18.00, "tags": [1], "images": ["https://img.yzcdn.cn/vant/t-thirt.jpg"] },
        { "ID": "108", "name": "产品名称", "des": "产品的描述信息", "count": 1, "price": 18.00, "tags": [1], "images": ["https://img.yzcdn.cn/vant/t-thirt.jpg"] },
        { "ID": "108", "name": "产品名称", "des": "产品的描述信息", "count": 1, "price": 18.00, "tags": [1], "images": ["https://img.yzcdn.cn/vant/t-thirt.jpg"] },
        { "ID": "108", "name": "产品名称", "des": "产品的描述信息", "count": 1, "price": 18.00, "tags": [1], "images": ["https://img.yzcdn.cn/vant/t-thirt.jpg"] }
      ]
    },

  },


  onChange(event) {
    console.log("tttttttt:"+JSON.stringify(event));
    this.setData({
      pick_name: event.detail
    });
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