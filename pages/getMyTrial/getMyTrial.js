// pages/getMyTrial/getMyTrial.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        item1: ["京", "津", "渝", "沪", "冀", "晋", "辽", "吉"],
        item2: ["黑", "苏", "浙", "皖", "闽", "赣", "鲁", "豫"],
        item3: ["鄂", "湘", "粤", "琼", "川", "贵", "云", "陕"],
        item4: ["甘", "青", "蒙", "桂", "宁", "新", "藏", "使"],
        item5: ["领", "警", "学", "港", "澳"],
        itemHidden: true,
        carNo: '京',
        oldPhone: '13522259154',
        newPhone: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        new app.globalData.MyUtils()
    },
    changeCarNo() {
        this.setData({
            itemHidden: this.data.itemHidden ? false : true
        })
    },
    pitchOn(e) {
        // console.log(e.currentTarget.id)
        // console.log(e.target.id)
        this.setData({
            carNo: e.target.id
        })
    },

    e_online() {
        this.utils.navigateTo('testSancode')
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