// pages/testSancode/testSancode.js
const app = getApp()
import requestType from '../../config/app_request_url.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        qr_code: null,
        qr_code_id: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        new app.globalData.MyUtils()
        this.setData({
            userInfo: app.globalData.userInfo,
            qr_code: options.qr_code,
            qr_code_id: options.qr_code_id
        })
    },
    e_scanCode() {
        this.utils.navigateTo('getMyCard')
    },
    delCode() {
        let self = this
        let url = requestType['delCode']
        requestType.genPromise({
            url,
            data: {
                openid: self.data.userInfo.openid,
                qr_id: self.data.qr_code_id
            },
            method: 'POST'
        }).then((success) => {
            if (success.data.state === 0) {
                self.utils.toast('删除体验码成功', () => {
                    self.utils.backPage()
                })
            } else {
                self.utils.toast(success.data.data.msg)
            }

        }, () => {
            self.utils.toast('删除体验码失败')
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