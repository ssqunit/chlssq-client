// pages/ad/image/image.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceTotal: 0.00,
    itemSelected: [],
    adImage: "https://img.yzcdn.cn/vant/t-thirt.jpg",
    adText:"",
    productInfo: { "ID": "108", "name": "肩周调理", "des": "产品的描述信息,产品的描述信息,产品的描述信息,产品的描述信息", "count": 1, "price": 18.00, "tags": [1], "images": ["https://img.yzcdn.cn/vant/t-thirt.jpg", "../../../static/custom/defaults/def_ssq.jpg", "https://img.yzcdn.cn/vant/t-thirt.jpg", "https://img.yzcdn.cn/vant/t-thirt.jpg"] },
    imageADInfo: {
      dateStart: 1565478,
      dateEnd: 15343748,
      list: [
        { "id": 1, "time": "0:00-9:00", "price": 14.00, "left": 5 },
        { "id": 2, "time": "9:00-13:00", "price": 28.00, "left": 4 },
        { "id": 3, "time": "13:00-17:00", "price": 28.00, "left": 3 },
        { "id": 4, "time": "17:00-21:00", "price": 56.00, "left": 1 },
        { "id": 5, "time": "21:00-24:00", "price": 42.00, "left": 0 }
      ]
    }

  },

  //
  radioChange: function (e) {
    this.setData({adImage: e.detail.value});
  },
  onInput: function (e) {
    this.setData({ adText: e.detail.value });
  },

  //购买项目选择数改变
  onChange: function (e) {
    console.log(JSON.stringify(e));
    let len = this.data.itemSelected.length;
    if (len <= 0) {
      let newobj = { "id": e.currentTarget.dataset.id, "price": e.currentTarget.dataset.price, "count": e.detail }
      this.data.itemSelected.push(newobj);
    } else {
      let found = false;
      for (var i = 0; i < len; i++) {
        if (this.data.itemSelected[i].id == e.currentTarget.dataset.id) {
          this.data.itemSelected[i].count = e.detail;
          found = true;
        }
      }
      if (found == false) {
        let newobj = { "id": e.currentTarget.dataset.id, "price": e.currentTarget.dataset.price, "count": e.detail };
        this.data.itemSelected.push(newobj);
      }
    }
    let total = 0.0;
    let newLen = this.data.itemSelected.length;
    for (var i = 0; i < newLen; i++) {
      let obj = this.data.itemSelected[i];
      total += obj.price * obj.count;
    }
    this.setData({
      priceTotal: total
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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