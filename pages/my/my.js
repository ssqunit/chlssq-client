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

  //社圈选择
  onChange(event) {
    console.log("tttttttt:"+JSON.stringify(event));
    this.setData({
      pick_name: event.detail
    });
  },

  //添加产品
  goNew: function (e) {
    wx.navigateTo({
      url: 'product/new/new',
    })
  },

  //编辑产品
  proEdit: function (e) {
    wx.navigateTo({
      url: 'product/edit/edit?id=' + e.currentTarget.dataset.id,
    })
  },

  //点击产品
  onCardClick: function (e) {
    wx.navigateTo({
      url: 'product/viewer/viewer',
    })
  },

  //
  previewImage: function (e) {
    var current = e.target.dataset.src;
    let urls = ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563987445492&di=e4a77db74d89feebc12b5e653246bbfb&imgtype=0&src=http%3A%2F%2Fimg01.cztv.com%2F201603%2F21%2Fb984b787fc6f3a61de5d3847975bfc2a.jpg"];
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls
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