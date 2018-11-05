//carCode.js
const app = getApp()
import Util from '../../utils/util'
import requestType from '../../config/app_request_url.js'
const lm = require('../../utils/services/loginManager')
Page({
    data: {
        showAuthorized: false,
        car_no: "",
        code_id: null,
        hidephone: null
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
        if (this.data.showAuthorized) {
            this.utils.toast('授权成功', () => {
                this.utils.navigateTo('getMyCard')
            })
        } else {
            this.getCodeInfo()
        }

    },
    e_scanCode() {
        this.utils.navigateTo('getMyCard')
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
            this.setData({
                userInfo: loginData,
            })
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
            let data = success.data.data
            self.showModal(data)
        }, () => {

        });
    },
    showModal(data) {
        let self = this
        self.setData({
            // "code_id":data.code_id,
            // "is_self":data.is_self,
            // "is_bind":data.is_bind,
            // "car_no":data.car_no,
            // "phone":data.phone,
            // "hidephone":data.hidephone
            ...data
        })
        if (!data.is_bind && !data.code_id) {
            wx.showModal({
                title: '',
                content: '二维码已经过期',
                confirmText: '随便看看',
                showCancel: false,
                success: function() {
                    self.utils.switchTab('index')
                }
            })
        }
        if (!data.is_bind && data.code_id) {
            wx.showModal({
                title: '',
                content: '二维码还没有绑定车辆',
                confirmText: '去绑定',
                showCancel: false,
                success: function() {
                    self.utils.reLaunch('bindCode', { code_id: data.code_id })
                }
            })
        }
        if (data.is_bind && data.is_self) {
            wx.showModal({
                title: '',
                content: '你不能扫描自己的二维码',
                confirmText: '我知道了',
                showCancel: false,
                success: function() {
                    self.utils.switchTab('index')
                }
            })
        }
    },
    bindGetUserInfo(e) {
        console.log(e.detail)
        if (e.detail.errMsg === 'getUserInfo:ok') {
            this.setData({
                showAuthorized: true
            })
            lm.instance().login(this.user_id)
        }
    },
    //点击客服
    makePhoneCall() {
        const that = this
        Util.makePhoneCall(that.data.hidephone)
    }
})