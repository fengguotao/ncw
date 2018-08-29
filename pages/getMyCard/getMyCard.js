// pages/getMyCard/getMyCard.js
const app = getApp()
import Util from '../../utils/util'
import requestType from '../../config/app_request_url.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        fullName: 1,
        postJosn: {
            CarNum: 1,
            CarNo: null,
            persoName: null,
            address: null,
            phone: null,
            remak: null
        },
        unitPrice: 19.8,
        totalPrices: 19.8,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        new app.globalData.MyUtils()
        this.calculate()
    },
    bindCarNum(event) {
        let content = event.detail.value
        console.log(content, typeof content)
        this.setData({
            'postJosn.CarNum': content,
        })
        this.calculate()
    },
    minusNum() {
        this.setData({
            'postJosn.CarNum': this.data.postJosn.CarNum - 1 ? this.data.postJosn.CarNum - 1 : 1,
        })
        this.calculate()
    },
    plusNum() {
        this.setData({
            'postJosn.CarNum': this.data.postJosn.CarNum + 1,
        })
        this.calculate()
    },
    bindCarNo(event) {
        let content = event.detail.value
        this.setData({
            'postJosn.CarNo': content,
        })
    },
    bindPersoName(event) {
        let content = event.detail.value
        this.setData({
            'postJosn.persoName': content,
        })
    },
    bindAddress(event) {
        let content = event.detail.value
        this.setData({
            'postJosn.address': content,
        })
    },
    bindPhone(event) {
        let content = event.detail.value
        this.setData({
            'postJosn.phone': content,
        })
    },
    bindRemak(event) {
        let content = event.detail.value
        this.setData({
            'postJosn.remak': content,
        })
    },
    calculate() {
        this.setData({
            totalPrices: (this.data.unitPrice * this.data.postJosn.CarNum).toFixed(2)
        })
        console.log(this.data.totalPrices)
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
    giveMyCard() {
        let self = this
        let url = requestType['CreateMailOrder']
        let data = self.data.postJosn
        data.totalPrices = self.data.totalPrices
        requestType.genPromise({
            url,
            data: data,
            method: 'POST'
        }).then((success) => {
            console.log(success)
        }, () => {
            self.utils.toast('生成邮寄订单成功-  去支付')
        });
        console.log(self.data.postJosn)
    },
    requestPayment() {
        Util.requestPayment({}).then((res) => {
            self.utils.toast('您已充值成功')
                // self.utils.insideSkip('balance', {})
            wx.navigateBack()
        }, (fail) => {
            //fail (detail message)	调用支付失败，其中 detail message 为后台返回的详细失败原因
            //fail cancel	用户取消支付
            console.log("用户取消支付-----------")
        })
    }

})