//index.js
const app = getApp()
Page({
  data: {
    money:"250.00"
  },  
  onLoad: function () {
    new app.globalData.MyUtils()
  },
})