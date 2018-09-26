//index.js
const app = getApp()
import requestType from '../../config/app_request_url.js'
Page({
    data: {
        income: null,
        list: [{
            date: "本月",
            income: 0,
            outlay: 0,
            record: []
        }, {
            date: "二月",
            income: 0,
            outlay: 0,
            record: []
        }],
        incomeDetail: {
            date: "本月",
            income: 100,
            outlay: 100,
            record: [{ "name": "百同学", "time": "158895658", "amount": "14.00", "avatarUrl": "https:\/\/www.nuochewang.net\/pppro\/20.jpg" }]
        },
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
    showSheet() {
        let self = this
        let itemList = []
        self.data.list.forEach(element => {
            itemList.push(element.date)
        });
        wx.showActionSheet({
            itemList: itemList,
            success: function(res) {
                console.log(res)
                self.setData({
                    incomeDetail: self.data.list[res.tapIndex]
                })
            }
        })
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
            let list = success.data.data.list && success.data.data.list.length ? success.data.data.list : [{
                date: "本月",
                income: 0,
                outlay: 0,
                record: []
            }]
            self.setData({
                income: income,
                list: list,
                incomeDetail: list[0]
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