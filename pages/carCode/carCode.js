//carCode.js
const app = getApp()
Page({
  data: {
    carCode:"京N111111"
  },
  onLoad: function () {
    new app.globalData.MyUtils()
  }
})
