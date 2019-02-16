//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    limit:6         //下拉刷新次数的限制，初步设为每分钟6次，即10s内只能请求一次
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else { 
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    /*从这里开始编程！ */
    let that=this
    /*获取当前时间戳（精确到秒） */
    let currentTimeStamp=Number.parseInt(new Date().getTime()/1000)
    that.setData({
      currentTimeStamp
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that=this
    let nowTimeStamp=Number.parseInt(new Date().getTime()/1000)
    let currentTimeStamp=that.data.currentTimeStamp
    let limit=that.data.limit
    if((nowTimeStamp-currentTimeStamp)<=(60/limit)){
      wx.showToast({
        title: '亲，您的操作过于频繁哦',
        icon:'none'
      })
    }
    else{
      wx.showToast({
        title: '刷新成功',
      })
      /*将当前时间更新 */
      that.setData({
        currentTimeStamp: nowTimeStamp
      })
    }
  }
})
