//app.js ****
const MyUtils = require('/config/Base.js')
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    userFastLogin: function(e, { fail, suc }, _this) {
        if (-1 !== e.detail.errMsg.indexOf('fail')) {
            fail('reject')
        } else {
            suc(e.detail)
        }
    },
    globalData: {
        userInfo: null,
        MyUtils,
        serviceNum: '13522259154',
        callOut: ['13522259154', '呼叫']
    }
})