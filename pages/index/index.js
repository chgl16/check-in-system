//index.js
//获取应用实例
const app = getApp()

// 签到flag
var flag = false
var total = 0

function newDay() {
  console.log("新一天来了")
  flag = false
  this.setData({ color: "green" })
}

Page({
  data: {
    check_status: (flag == true? "已签到":"未签到"),
    color: "green",
    money: total,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

 

  // start coding
  check_in: function() {
    var that = this // 坑,使用this再回调函数（消失函数）里会一直报错

    if (flag) {   // 如果签到了
        this.setData({done_tip:"今天已经签到了"})
        // 提示定时消失
        setTimeout(function(){that.setData({ done_tip: "" }) }, 1500)
        console.log("已签过")

      } else {     // 今天没有没有签到 
        console.log("在签到")
        flag = true
        this.setData({success_tip: "签到成功", check_status: "已签到", color:"orange"})

        // 提示定时消失获得提示
        setTimeout(function(){this.setData({ success_tip: ""})}, 1500)
        setTimeout(function(){that.setData({ today_get: "" }) }, 1500)
      
        // 随机获取从1到10的随机整数n，取0的概率极小(ceil向上取整)
        var n = Math.ceil(Math.random() * 10)   
      
        this.setData({today_get: "获得"+n+"元"})
        total += n
        this.setData({money: total})
        
        
      }
  },



  // end coding


  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this

    /* @lin 设置下一天 */
    setInterval(function() {
      console.log("新一天来了")
      flag = false
      that.setData({ check_status: (flag == true ? "已签到" : "未签到"), color: "green", new_day: "新一天到了" })      
      setTimeout(function(){var hh = that; hh.setData({new_day:""})}, 1000)  // 需要继续定义新的this，that不能使用了,而且不能hh = this，也会报错
       // 另外写回调函数使用新定义that也是报错，传参数也报错
    }, 10000)


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
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
