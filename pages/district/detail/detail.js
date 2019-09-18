// pages/district/detail/detail.js

var app = getApp();
var common = require("../../../utils/common.js")
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ssqInfo:null,
    shopsInfo:null,
    active: 0,
    active_chi: 0,
    distance: 0.50,
    shopCount:0,
    personCount:0,
    zans:[],
    hideJoinBtn:false
  },

  //打开商圈在地图上的位置
  openPosition:function(e){
    wx.openLocation({
      latitude:Number(this.data.ssqInfo.latitude),
      longitude:Number(this.data.ssqInfo.longitude),
      scale:14})
  },

  //选择商圈加入方式
  goJoin: function (e) {
    wx.navigateTo({
      url: '../../district/join/join?ssqid=' + this.data.ssqInfo.ssqid
    })
  },

  //
  onShopItemClick:function(e){
    console.log("shopid:" + e.detail);
    let shopId = e.detail.shopinfo.shopid;
    let owner = e.detail.shopinfo.owner;
    if (app.globalData.userInfo.ID == owner) {
      wx.switchTab({
        url: '/pages/my/my',
      })
    } else {
      wx.navigateTo({
        url: '../shop/shop?shopid=' + shopId + '&owner=' + owner
      })
    }
  },

  checkZans:function(shopid){
    for(let i=0;i<this.data.zans.length;i++){
      if(this.data.zans[i] == shopid){
        return false;
      }
    }
    return true;
  },

  onShopZanClick:function(e){
    let shopId = e.detail.shopinfo.shopid;
    let owner = e.detail.shopinfo.owner;
    var that = this;
    if(!this.checkZans(shopId)){
      wx.showToast({title: '赞了',icon: "none",duration:500})
      return;
    }
    wx.showLoading({
      title: '请稍后...',
      mask: true
    })
    common.request({
      method: "POST",
      url: common.BASE_URL + "?function=shopZan&session_id=" + app.globalData.userInfo.session_id,
      data: {
        'shopid': shopId,
        'ssqid': this.data.ssqInfo.ssqid
      },
      success: res => {
        // console.log('----------shopZan:' + JSON.stringify(res));
        let msg = "已赞"
        if (res.data.iRet == 0) {
          this.data.zans.push(shopId);
        } else {
          if(res.data.iRet == -5002){
            this.data.zans.push(shopId);
            msg = "已赞！"
          }else if(res.data.iRet == -5001){
            msg = "已达上限！"
          }else{
            msg = res.data.sMsg;
          }
        }
        wx.showToast({
          title: msg,
          icon: "none"
        })
        wx.hideLoading();
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({
          title: '请检查网络链接！',
          icon: "none"
        })
      }
    });
  },

  //
  getSsqInfo: function (ssqid) {
    var that = this;
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    common.request({
      method: "GET",
      url: common.BASE_URL,
      data: {
        'function': 'getSsqInfo',
        'session_id': app.globalData.userInfo.session_id,
        'ssqid':ssqid
      },
      success: res => {
        console.log('----------getSsqInfo:' + JSON.stringify(res));
        if (res.data.iRet == 0) {
          let _ssqinfo = res.data.data['ssqinfo'];
          _ssqinfo['img'] = common.getImgUrl(app.globalData.userInfo.session_id, _ssqinfo['imgid']);
          _ssqinfo['dis'] = util.countDistance(app.globalData.myLocation.latitude,app.globalData.myLocation.longitude,_ssqinfo['latitude'],_ssqinfo['longitude']);

          let _shopinfo = res.data.data['shopinfo'];
          let _bCount = 0;
          let _pCount = 0;
          let _bbInfo = [];
          let _bInfo = [
            { "optype": 0, "opname": "全部", "members": [] },
            { "optype": 1, "opname": "健康养生", "members": [] },
            { "optype": 2, "opname": "培训辅导", "members": [] },
            { "optype": 3, "opname": "家装报修", "members": [] },
            { "optype": 4, "opname": "中介服务", "members": [] },
            { "optype": 5, "opname": "悠闲娱乐", "members": [] },
            { "optype": 6, "opname": "果蔬鲜花", "members": [] },
            { "optype": 7, "opname": "饮食", "members": [] },
            { "optype": 8, "opname": "其它", "members": [] }
          ];
          let _pInfo = [];
          if(_shopinfo && _shopinfo.length > 0){
            for(let i=0;i<_shopinfo.length;i++)
            {
              let one = _shopinfo[i];
              one['imgurl'] = common.getImgUrl(app.globalData.userInfo.session_id, one['img']);

              //set starinfo to each shop
              let _starinfo = res.data.data['starinfo'];
              let _settedStars = false;
              if (_starinfo && _starinfo.length>0)
              {
                for (let j = 0; j < _starinfo.length; j++){
                  if (_starinfo[j][one['shopid']]){
                    one['stars'] = _starinfo[j][one['shopid']];
                    _settedStars = true;
                  }
                }
              }
              if(!_settedStars){
                one['stars'] = ['b', 'b', 'b', 'b', 'b'];
              }

              //--商家归类
              if(one['type'] == 2){
                let optype = one['optype'];
                for (let j = 0; j < _bInfo.length;j++){
                  if(Number(optype) == _bInfo[j]['optype']){
                    _bInfo[j]['members'].push(one);
                    _bInfo[j]['color'] = "black";
                  }
                }
                _bInfo[0]['members'].push(one);
                _bInfo[0]['color'] = "red";
                _bCount ++;

                //clear no members obj
                for(let k=0;k<_bInfo.length;k++){
                  if(_bInfo[k]['members'].length>0){
                    _bbInfo.push(_bInfo[k]);
                  }
                }

              //--个人商家
              } else if (one['type'] == 3){
                _pInfo.push(one);
                _pCount ++;
              }
            }
          }

          let _shopsInfo = { "bInfo": _bbInfo, "pInfo": _pInfo };
          console.log('----------getSsqInfo: _shopsInfo= ' + JSON.stringify(_shopsInfo));
          that.setData({
            ssqInfo: _ssqinfo,
            shopsInfo: _shopsInfo,
            shopCount: _bCount,
            personCount: _pCount
          });
        } else {
          wx.showToast({
            title: '获取社圈信息失败！',
            icon: "none"
          })
        }
        wx.hideLoading();
      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({
          title: '请检查网络链接！',
          icon: "none"
        })
      }
    });
  },

  checkForJoinBtn: function(ssqid) {
    let arr = app.globalData.userInfo.mySsqInfo;
    let _hideJoinBtn = false;
    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        if (ssqid == arr[i]['ssqid']) {
          _hideJoinBtn = true;
          break;
        }
      }
    }
    this.setData({
      hideJoinBtn: _hideJoinBtn
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tab = options.tab;
    let ssqid = options.ssqid;
    this.checkForJoinBtn(ssqid);
    this.setData({
      active: tab
    })
    this.getSsqInfo(ssqid);
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