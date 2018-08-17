//index.js
const app = getApp()
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        itemArr: [],
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
        new app.globalData.MyUtils()

        let num = '1555088'
        this.setData({
                itemArr: num.split('')
            })
            // for (let item in num) {
            //     console.log(item)
            //     this.data.itemArr.push(item)
            // }
        console.log(this.data.itemArr)
    },
})