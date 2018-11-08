// pages/orderDetail/orderDetail.js
const app = getApp()
import requestType from '../../config/app_request_url.js'
import Util from '../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderInfo: {},
        test: {
            "order_num": "100046",
            "status_name": "支付成功",
            "photo_url": "http://img.nuochewang.net/123.png",
            "buy_num": "1",
            "contact_phone": "15885258525",
            "address": "北京市朝阳区三里河",
            "remak": null,
            "create_time": "2018-10-17 22:22",
            "send_status": "已发货",
            "send_time": "1970-01-01 08:00",
            "pay_time": "1970-01-01 08:00",
            "delivery_name": "申通",
            "phone": '12122',
            price: 1212,
            "number": "3378736873687",
            "delivery": [{
                    "AcceptStation": "浙江永康公司-何俊男(13486997617,)-已收件",
                    "AcceptTime": "2018-10-07 22:22:40"
                },
                {
                    "AcceptStation": "浙江永康公司-已进行装车扫描",
                    "AcceptTime": "2018-10-07 23:43:16"
                },
                {
                    "AcceptStation": "浙江永康公司-已发往-山东临沂公司",
                    "AcceptTime": "2018-10-07 23:43:16"
                },
                {
                    "AcceptStation": "已到达-山东临沂中转部",
                    "AcceptTime": "2018-10-08 13:50:46"
                },
                {
                    "AcceptStation": "山东临沂中转部-已发往-山东菏泽集散中心",
                    "AcceptTime": "2018-10-08 14:20:12"
                },
                {
                    "AcceptStation": "已到达-山东菏泽集散中心",
                    "AcceptTime": "2018-10-09 04:21:17"
                },
                {
                    "AcceptStation": "山东菏泽集散中心-已发往-山东菏泽公司",
                    "AcceptTime": "2018-10-09 04:50:43"
                },
                {
                    "AcceptStation": "已到达-山东菏泽公司",
                    "AcceptTime": "2018-10-09 07:25:10"
                },
                {
                    "AcceptStation": "山东菏泽公司-陈斌(15753002201,)-派件中",
                    "AcceptTime": "2018-10-09 12:57:55"
                },
                {
                    "AcceptStation": "药店-已签收",
                    "AcceptTime": "2018-10-09 20:25:36"
                }
            ]
        }
    },
    // orderInfo
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        new app.globalData.MyUtils()
        this.setData({
            userInfo: app.globalData.userInfo
        })
        this.getOrderDetail(options.order_num)
    },
    getOrderDetail(order_num) {
        let self = this
        let url = requestType['orderInfo']
        requestType.genPromise({
            url,
            data: {
                openid: self.data.userInfo.openid,
                order_num: order_num
            },
            method: 'GET'
        }).then((success) => {
            let data = success.data.data
            console.log(data)
            self.setData({
                orderInfo: data.order_info
            })
        }, () => {
            console.log('1111')

        });
    },
    //点击客服
    makePhoneCall() {
        const that = this
        Util.makePhoneCall(that.data.orderInfo['phone'])
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