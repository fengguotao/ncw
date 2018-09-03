//pages/orderList/orderList.js
const app = getApp()
import requestType from '../../config/app_request_url.js'
Page({
    data: {
        orderList: []
    },
    onLoad: function() {
        new app.globalData.MyUtils()
        this.setData({
            userInfo: app.globalData.userInfo
        })
        this.getOrderList()
    },
    getOrderList() {
        let self = this
        let url = requestType['orderList']
        requestType.genPromise({
            url,
            data: {
                openid: self.data.userInfo.openid
            },
            method: 'POST'
        }).then((success) => {
            let orderList = success.data.data.order_list
            self.setData({
                orderList: orderList
            })
        }, () => {
            console.log('1111')

        });
    }
})