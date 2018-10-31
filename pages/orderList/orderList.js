//pages/orderList/orderList.js
const app = getApp()
import requestType from '../../config/app_request_url.js'
import Util from '../../utils/util'
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
    orderDetail(event) {
        let iteminfo = event.currentTarget.dataset.iteminfo
        if (iteminfo.status_name === '支付成功') {
            this.utils.navigateTo('orderDetail', { order_num: iteminfo.order_num })
        }

    },
    orderCancel(event) {
        console.log(event.currentTarget.dataset.iteminfo)
        let self = this
        let url = requestType['orderCancel']
        let itemIfo = event.currentTarget.dataset.iteminfo
        wx.showModal({
            // title: '没有数据',
            content: '确定取消支付吗',
            confirmText: '确定',
            cancelText: '取消',
            success: function(obj) {
                if (obj.confirm) {
                    console.log('用户确定取消支付')
                    requestType.genPromise({
                        url,
                        data: {
                            openid: self.data.userInfo.openid,
                            order_num: itemIfo.order_num
                        },
                        method: 'POST'
                    }).then((success) => {
                        self.utils.toast('取消成功', () => {
                            self.getOrderList()
                        })
                    }, () => {
                        console.log('1111')

                    });
                }
            }
        })
    },
    orderPayAgin(event) {
        console.log(event.currentTarget.dataset.iteminfo)
        let self = this
        let url = requestType['orderPayAgin']
        let itemIfo = event.currentTarget.dataset.iteminfo
        requestType.genPromise({
            url,
            data: {
                openid: self.data.userInfo.openid,
                order_num: itemIfo.order_num
            },
            method: 'POST'
        }).then((success) => {
            console.log(success)
            if (!success.data.state) {
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
                self.utils.toast('继续支付失败', () => {

                })
            }
        }, () => {
            self.utils.toast('继续支付失败', () => {

            })
        });
    },
    requestPayment(reqData) {
        let self = this
        Util.requestPayment(reqData).then((res) => {
            self.utils.toast('您已支付成功', () => {
                self.getOrderList()
            })

            // wx.navigateBack()
        }, (fail) => {
            //fail (detail message)	调用支付失败，其中 detail message 为后台返回的详细失败原因
            //fail cancel	用户取消支付
            console.log("用户取消支付-----------")
        })
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