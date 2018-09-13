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
        let str = String(userInfo.used)
        this.setItemArr(str)
        this.setData({
            userInfo: userInfo
        })

    },
    setItemArr(str) {
        let len = str.length
        switch (len) {
            case 1:
                str = '000000' + str
                break;
            case 2:
                str = '00000' + str
                break;
            case 3:
                str = '0000' + str
                break;
            case 4:
                str = '000' + str
                break;
            case 5:
                str = '00' + str
                break;
            case 6:
                str = '0' + str
                break;
            default:
                str = str
        }
        this.setData({
            itemArr: str.split('')
        })
    },
    user_id: null,
    onLoginFail() {
        //登陆失败
        this.utils.hideLoading()
    },
    onLoad: function(opt) {
        console.log(opt)
        this.user_id = opt.user_id ? opt.user_id : null
        new app.globalData.MyUtils()
        lm.instance().addObserver(this)
        let loginData = lm.instance().getUserInfo() || {}
        console.log(loginData)
        if (!Object.keys(loginData).length) { //未登录
            this.utils.showLoading('登录中...')
            lm.instance().login(this.user_id)
        } else { //已登录
            this.setItemArr(String(loginData.used))
            this.setData({
                userInfo: loginData,
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
        let url = requestType['decryptMobile']
        requestType.genPromise({
            url,
            data: data,
            method: 'POST'
        }).then((success) => {
            let phoneNumber = success.data.data.phoneNumber
            this.utils.navigateTo('getMyTrial', { phone: phoneNumber })
        }, () => {
            this.utils.toast('手机号码授权失败')
        });
    }
})