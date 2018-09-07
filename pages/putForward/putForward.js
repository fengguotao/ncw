//index.js
const app = getApp()
import requestType from '../../config/app_request_url.js'
Page({
    data: {
        income: null,
        money: "250.00"
    },
    onLoad: function() {
        new app.globalData.MyUtils()
        this.setData({
            userInfo: app.globalData.userInfo
        })
    },
    onShow() {
        this.getMyincome()
    },
    getMyincome() {
        let self = this
        let url = requestType['myincome']
        requestType.genPromise({
            url,
            data: {
                openid: self.data.userInfo.openid
            },
            method: 'POST'
        }).then((success) => {
            let income = success.data.data.income ? success.data.data.income : '0.00'
            self.setData({
                income: income
            })
        }, () => {
            self.utils.toast('生成邮寄订单成功-  去支付')
        });
    },
    tixian() {
        let self = this
        if (self.data.income === '0.00') {
            return
        }
        self.utils.navigateTo('drawCash')
            // let url = requestType['tixian']
            // let data = {
            //     openid: self.data.userInfo.openid,
            //     amount: self.data.income
            // }
            // requestType.genPromise({
            //     url,
            //     data: data,
            //     method: 'POST'
            // }).then((success) => {
            //     console.log(success)
            // }, () => {
            //     self.utils.toast('生成邮寄订单成功-  去支付')
            // });
    }
})