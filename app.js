//app.js
// var common = require("/utils/common.js")

App({

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.globalData.js_code = res.code;

        //检测是否授权获取用户信息，如果已经授权，获取并更新用户信息到服务器上
        wx.getSetting({
          success: (res) => {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (res) {
                  if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(res)
                  }
                }
              })
            }
          }
        })

      }//success
    })//wx.login
  },//onLaunch
  globalData: {
    userInfo: null,
    js_code:"",
    myLocation:{"latitude":0.0,"longitude":0.0},
    updates:{},    //这里存储页面是否需要更新的数据
    productsForEdit: {},   //用于存储需要编辑的产品对象，取出时请删除该产品对象
    productsForAD: {}   //用于存储需要做广告的产品对象，取出时请删除该产品对象
  },
})