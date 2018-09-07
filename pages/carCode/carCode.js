//carCode.js
const app = getApp()
import Util from '../../utils/util'
import requestType from '../../config/app_request_url.js'
const lm = require('../../utils/services/loginManager')
Page({
    data: {
        carCode: "京N111111"
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
        this.getCodeInfo()
    },
    user_id: null,
    onLoginFail() {
        //登陆失败
        this.utils.hideLoading()
    },
    onLoad: function(opt) {
        console.log(opt)
        this.code_id = opt.code_id ? opt.code_id : null
        new app.globalData.MyUtils()
        lm.instance().addObserver(this)
        let loginData = lm.instance().getUserInfo() || {}
        if (!Object.keys(loginData).length) { //未登录
            this.utils.showLoading('登录中...')
            lm.instance().login()
        } else { //已登录
            this.getCodeInfo()
        }
    },
    getCodeInfo() {
        let self = this
        let url = requestType['getCodeInfo']
        requestType.genPromise({
            url,
            data: {
                openid: self.data.userInfo.openid,
                code_id: this.code_id
            },
            method: 'POST'
        }).then((success) => {
            console.log(success)

        }, () => {

        });
    }
})