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
        console.log(userInfo)
            //登陆成功
        this.utils.hideLoading()

        let num = String(userInfo.used)
        this.setData({
            itemArr: num.split(''),
            userInfo: userInfo
        })

    },
    onLoginFail() {
        //登陆失败
        this.utils.hideLoading()
    },
    onLoad: function(opt) {
        new app.globalData.MyUtils()
        lm.instance().addObserver(this)
        let loginData = lm.instance().getUserInfo() || {}
        if (!Object.keys(loginData).length) { //未登录
            this.utils.showLoading('登录中...')
            lm.instance().login(opt.scene)
        } else { //已登录
            let num = this.data.userInfo.used
            this.setData({
                itemArr: num.split('')
            })
        }
    },
    getPhoneNumber(e) {
        let _this = this
        Util.wxlogin().then((loginres) => {
            app.userFastLogin(e, {
                suc: function(res) {
                    console.log(res)
                    res.code = loginres.code
                    res.openid = _this.data.userInfo.openid
                    _this.getWxBindMobile(res)
                },
                fail: function(type) {
                    console.log('-------' + type)
                }
            }, _this)
        }, (fail) => {
            console.log(fail)
        })
    },
    getWxBindMobile(data) {
        let url = requestType['CreateTestOrder']
        requestType.genPromise({
            url,
            data: data,
            method: 'POST'
        }).then((success) => {
            console.log(success)
            this.utils.navigateTo('getMyTrial', { phone: '122323' })
        }, () => {
            this.utils.toast('手机号码授权失败')
            this.utils.navigateTo('getMyTrial', { phone: '122323' })
        });
    }
})