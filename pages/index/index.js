//index.js
const app = getApp()
import Util from '../../utils/util'
import requestType from '../../config/app_request_url.js'
const lm = require('../../utils/services/loginManager')
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        itemArr: [],
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    e_scanCode() {
        this.utils.navigateTo('getMyCard')
    },
    e_online() {
        this.utils.navigateTo('getMyTrial')
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoginSuccess(userInfo) {
        //登陆成功
        this.utils.hideLoading()
        this.setData({
            userInfo: userInfo
        })

    },
    onLoginFail() {
        //登陆失败
        this.utils.hideLoading()
        let num = '1555088'
        this.setData({
            itemArr: num.split('')
        })
    },
    onLoad: function(opt) {
        new app.globalData.MyUtils()
        lm.instance().addObserver(this)
        let loginData = lm.instance().getUserInfo() || {}
        if (!Object.keys(loginData).length) { //未登录
            this.utils.showLoading('登录中...')
            lm.instance().login(opt.scene)
        } else { //已登录
            let num = '1555088'
            this.setData({
                itemArr: num.split('')
            })
        }
    },
    getPhoneNumber: function(e) {
        let _this = this
        Util.wxlogin().then((res) => {
            app.userFastLogin(e, {
                suc: function(res) {
                    console.log(res)
                },
                fail: function(type) {
                    console.log('-------' + type)
                }

            }, _this)
        }, (fail) => {
            console.log(fail)
        })
    }
})