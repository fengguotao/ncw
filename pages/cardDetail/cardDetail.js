// pages/testSancode/testSancode.js
const app = getApp()
import Util from '../../utils/util'
import requestType from '../../config/app_request_url.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        totalPrices: 9.8,
        userInfo: null,
        qr_code: null,
        qr_code_id: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        new app.globalData.MyUtils()
            // end_time=2019-07-09
            // qr_code=http://img.nuochewang.net/qrcode/1d0e94cc9c8b7151cb61507374788727.png
            // qr_code_id=2358
            // start_time=1970-01-01
            // tiyan=体验码
        this.setData({
            userInfo: app.globalData.userInfo,
            qr_code: options.qr_code,
            qr_code_id: options.qr_code_id,
            start_time: options.start_time,
            end_time: options.end_time
        })
    },
    calculate() {
        let self = this
        let url = requestType['getPrice']
        requestType.genPromise({
            url,
            data: { CarNum: 1, type: 2 },
            method: 'POST'
        }).then((success) => {
            console.log(success)
            let data = success.data.data
            self.setData({
                totalPrices: data.price.toFixed(2)
            })
        }, () => {
            self.utils.toast('生成邮寄订单失败')
        });

        // console.log(this.data.totalPrices)
    },
    e_scanCode() {
        // this.utils.navigateTo('getMyCard')resetCode
        let self = this
        let url = requestType['renewal']
        requestType.genPromise({
            url,
            data: {
                openid: self.data.userInfo.openid,
                qr_id: self.data.qr_code_id
            },
            method: 'POST'
        }).then((success) => {
            if (success.data.state === 0) {
                console.log(success)
                let data = success.data.data
                let reqData = {
                    timeStamp: data.timeStamp + '',
                    nonceStr: data.nonceStr,
                    package: data.package,
                    signType: data.signType,
                    paySign: data.paySign,
                    appId: data.appId
                }
                self.requestPayment(reqData)
            } else {
                self.utils.toast(success.data.data.msg)
            }

        }, () => {
            self.utils.toast('删除体验码失败')
        });
    },
    requestPayment(reqData) {
        let self = this
        Util.requestPayment(reqData).then((res) => {
            self.utils.toast('您已支付成功', () => {
                self.utils.backPage(1)
            })

            // wx.navigateBack()
        }, (fail) => {
            //fail (detail message)	调用支付失败，其中 detail message 为后台返回的详细失败原因
            //fail cancel	用户取消支付
            console.log("用户取消支付-----------")
        })
    },
    delCode() {
        let self = this
        let url = requestType['resetCode']
        requestType.genPromise({
            url,
            data: {
                openid: self.data.userInfo.openid,
                qr_id: self.data.qr_code_id
            },
            method: 'POST'
        }).then((success) => {
            if (success.data.state === 0) {
                self.utils.toast('重置绑定信息成功', () => {
                    self.utils.navigateTo('bindCode', { code_id: self.data.qr_code_id })
                })
            } else {
                self.utils.toast(success.data.data.msg)
            }

        }, () => {
            self.utils.toast('重置绑定信息失败')
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
        this.calculate()
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