// pages/getMyTrial/getMyTrial.js
const app = getApp()
import requestType from '../../config/app_request_url.js'
import Util from '../../utils/util.js'
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
        carNum: '',
        oldPhone: '',
        newPhone: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        new app.globalData.MyUtils()
        this.setData({
            userInfo: app.globalData.userInfo,
            oldPhone: options.phone
        })
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
    bindcarNumInput(event) {
        let content = event.detail.value
        this.setData({
            carNum: content,
        })
    },
    updatePhoneInput(event) {
        let content = event.detail.value
        this.setData({
            newPhone: content,
        })
    },
    e_online() {
        let self = this
        let data = {
            openid: self.data.userInfo.openid
        }
        if (!self.data.carNum) {
            self.utils.toast('请完善您的车辆信')
            return
        }

        data.carNo = `${self.data.carNo}${self.data.carNum}`
        if (!Util.isLicenseNo(data.carNo)) {
            self.utils.toast('车牌号码格式不正确')
            return
        }
        if (!self.data.newPhone && !self.data.oldPhone) {
            self.utils.toast('输入电话号码')
            return
        }
        if (!self.data.newPhone) {
            data.phone = self.data.oldPhone
        } else {
            data.phone = self.data.newPhone
        }
        if (!Util.regExpPhoneNum(data.phone)) {
            self.utils.toast('电话号码格式不正确！')
            return
        }
        wx.showModal({
            title: '是否把手机号和车牌号绑定',
            content: `手机号${data.phone}\r\n车牌号${self.data.carNum}`,

            success: function(res) {

                if (res.confirm) {
                    let url = requestType['CreateTestOrder']
                    requestType.genPromise({
                        url,
                        data: data,
                        method: 'POST'
                    }).then((success) => {
                        console.log(success)
                        if (success.data.state === 0) {
                            self.utils.navigateTo('testSancode', success.data.data)
                        } else {
                            self.utils.toast('生成体验码失败')
                        }
                    }, () => {
                        self.utils.toast('生成体验码失败')
                    });
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }
})