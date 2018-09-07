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
            let data = success.data.data
            if (data.order_list && data.order_list.length) {
                self.setData({
                    orderList: data.order_list
                })
            } else {
                wx.showModal({
                    title: '没有数据',
                    content: '没有查询到数据列表',
                    confirmText: '我知道了',
                    showCancel: false,
                    success: function() {
                        self.utils.backPage()
                    }
                })
            }
        }, () => {
            console.log('1111')

        });
    }
})