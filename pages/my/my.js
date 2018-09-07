// pages/my/my.js
const app = getApp()
import requestType from '../../config/app_request_url.js'
const lm = require('../../utils/services/loginManager')
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    openFqa() {
        this.utils.navigateTo('faqList')
    },
    order() {
        this.utils.navigateTo('orderList')
    },
    moveCar() {
        this.utils.navigateTo('nuoList')
    },
    openInvite() {
        this.utils.navigateTo('invite')
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
        this.getNum()
    },
    onLoginFail() {
        //登陆失败
        this.utils.hideLoading()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        new app.globalData.MyUtils()
        lm.instance().addObserver(this)
        let loginData = lm.instance().getUserInfo() || {}
        if (!Object.keys(loginData).length) { //未登录
            this.utils.showLoading('登录中...')
            lm.instance().login(this.user_id)
        } else { //已登录
            this.setData({
                userInfo: app.globalData.userInfo
            })
            this.getNum()
        }
    },
    getNum() {
        let self = this
        let url = requestType['getNum']
        requestType.genPromise({
            url,
            data: {
                openid: self.data.userInfo.openid
            },
            method: 'POST'
        }).then((success) => {
            self.setData({
                ...success.data.data
            })
        }, () => {
            self.utils.toast('生成邮寄订单成功-  去支付')
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        wx.showActionSheet({
            itemList: ['A', 'B', 'C'],
            success: function(res) {
                console.log(res.tapIndex)
            },
            fail: function(res) {
                console.log(res.errMsg)
            }
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})