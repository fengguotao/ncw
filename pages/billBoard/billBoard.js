// pages/billBoard/billBoard.js
const app = getApp()
    // import Util from '../../utils/util'
import requestType from '../../config/app_request_url.js'
const lm = require('../../utils/services/loginManager')
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoginSuccess(userInfo) {
        console.log(userInfo)
            //登陆成功
        this.utils.hideLoading()
        this.getRanking()
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
            this.getRanking()
        }
    },
    getRanking() {
        let self = this
        let url = requestType['ranking']
        requestType.genPromise({
            url,
            data: {},
            method: 'POST'
        }).then((success) => {
            let rank_list = success.data.data.rank_list
            self.setData({
                rank_list: rank_list
            })
        }, () => {
            console.log('1111')

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