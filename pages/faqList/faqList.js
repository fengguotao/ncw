// pages/faqList/faqList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        FQAList: [{
            id: '1',
            question: '如何发起“请客”？',
            chack: true,
            answer: '1. 进入【每日优鲜便利购】小程序，点击“请客”banner或右下角浮窗；2. 填写请客人数，系统会自动为您推荐商品，不喜欢的商品可以点击“换一换”，当然您也可以主动“选择商品”，然后选择“去支付”；3. 完成支付后，选择推荐券片和寄语（寄语可自定义），点击“立即赠送”，选择赠送多个微信好友/微信群，完成请客流程。支付成功后未及时分享？'
        }, {
            id: '2',
            question: '支付成功后未及时分享？',
            chack: true,
            answer: '1、在请客首页，点击底部“赠送记录”，可查看红包发放信息及好友领取记录，支付成功未及时分享的红包会显示“红包未发放”，您可以选择“继续赠送”'
        }, {
            id: '3',
            question: '未领取的商品如何处理？',
            chack: true,
            answer: '24小时内未被领取的商品，其金额将在24小时后原路退回至请客人的微信支付账户'
        }, {
            id: '4',
            question: '如何使用“商品兑换券”？',
            chack: true,
            answer: '1、“抢”到商品兑换券后，可点击“立即用券”进入小程序;2、将兑换商品加入购物车结算，选择需兑换的“商品兑换券”，进行支付兑换;3、每单仅限使用1张商品兑换券;4、“商品兑换券”未在有效期（一个月）内使用，将退回到余额'
        }, {
            id: '5',
            question: '如何查看“商品兑换券”？',
            chack: true,
            answer: '未使用的“商品兑换券”在小程序的【我的】>【优惠券】中查看'
        }, {
            id: '6',
            question: '还遇到了其他问题？',
            chack: true,
            answer: '1、直接拨打 10106099 或点击小程序【我的】>【在线客服】中进行在线咨询;2、若在请客活动中使用优惠券，在红包过期、兑换券到期退款时，优惠券均不退款。'
        }]
    },
    openFqa: function(e) {
        console.log(e)
            // let self = this
            // self.data.FQAList.forEach((item, index) => {
            //     if (item.id === e.target.id) {
            //         item.chack = !item.chack
            //     } else {
            //         item.chack = false
            //     }
            // })
            // self.setData({
            //     FQAList: self.data.FQAList
            // })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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