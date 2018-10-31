// pages/invite/invite.js
const app = getApp()
import requestType from '../../config/app_request_url.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        postData: false,
        clickHidden: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        new app.globalData.MyUtils()
        this.setData({
            userInfo: app.globalData.userInfo
        })
    },
    openActivityRules() {
        this.utils.navigateTo('activityRules')
    },
    openPutForward() {
        this.utils.navigateTo('putForward')
    },
    close() {
        this.setData({
            clickHidden: true
        })
    },
    shoWarpper() {
        // console.log('11111')
        let self = this
        if (!self.data.postData) {
            self.getInvite(false)
        } else {
            console.log('11111')
            self.setData({
                clickHidden: false
            })
        }
    },

    baocun() {
        wx.showLoading({
            title: '保存中...',
            mask: true
        })
        let self = this
        wx.getImageInfo({
            src: self.data.invite,
            success: function(data) {
                console.log(data)
                wx.saveImageToPhotosAlbum({
                    filePath: data.path,
                    success: function() {
                        wx.hideLoading()
                        wx.showModal({
                            title: '保存成功',
                            content: '您可以在发朋友圈时，在微信相册中选择这张图片分享出去',
                            showCancel: false,
                            confirmText: '我知道了'
                        })
                    },
                    fail: function(err) {
                        console.log(err);
                        wx.hideLoading()
                    }
                })


            },
            fail: function(err) {
                console.log(err)
            }
        })

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    getInvite(clickHidden = true) {
        let self = this
        let url = requestType['invite']
        requestType.genPromise({
            url,
            data: {
                openid: self.data.userInfo.openid
            },
            method: 'POST'
        }).then((secc) => {
            console.log(secc)
            this.setData({
                clickHidden: clickHidden,
                postData: true,
                qrcored: secc.data.data.qrcored,
                invite: secc.data.data.invite
            })
        }, () => {
            self.utils.toast('生成邮寄订单成功-  去支付')
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.getInvite()
    },
    //http://www.nuochewang.net/qrcode/d87bd7787a8a0b343de91061d15cb2ac.png
    //http://www.nuochewang.net/qrcode/d87bd7787a8a0b343de91061d15cb2ac.png
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

    onShareAppMessage: function(res) {
        let that = this
        return {
            title: '挪车网、邀请您赚赏金',
            imageUrl: that.data.invite,
            path: '/pages/index/index?user_id=' + that.data.userInfo.userId,
            success: function(success) {
                console.log(success)
            },
            fail: function(fail) {
                console.log(`转发失败fail + ${fail}`)
            },
            complete: function(complete) {
                console.log(`转发回掉成功complete + ${complete}`)

            }
        }
    }
})