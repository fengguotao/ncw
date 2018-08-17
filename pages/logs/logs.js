//logs.js
const app = getApp()
Page({
  data: {
    logs: [2,3,4,5]
  },
  onLoad: function () {
    new app.globalData.MyUtils()
  }
})
