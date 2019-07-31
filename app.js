//app.js
var common = require("/utils/common.js")

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
        common.request({
          method: "GET",
          url: common.BASE_URL,
          data: {
            'function': 'login',
            js_code: res.code
          },
          success: res => {
            if (res.data.iRet == 0) {
              that.globalData.userInfo = res.data.data

              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }

              //检测是否授权获取用户信息，如果已经授权，获取并更新用户信息到服务器上
              wx.getSetting({
                success: (res) => {
                  if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                      success: function (res) {
                        common.request({
                          method: "POST",
                          url: "/user/wx/user_info/update",
                          data: {
                            nickName: res.userInfo.nickName,
                            avatarUrl: res.userInfo.avatarUrl,
                            gender: res.userInfo.gender,
                            city: res.userInfo.city,
                            province: res.userInfo.province,
                            country: res.userInfo.country,
                          },
                          success: res => { }
                        })
                      }
                    })
                  }
                }
              })
            } else {
              wx.showToast({
                title: '登录失败，请重试',
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail: res => {
            wx.showToast({
              title: res.errMsg,
              icon: 'none',
              duration: 2000
            })
          },
        })
      }
    })
  },
  globalData: {
    userInfo: null,
  },
})