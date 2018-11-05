const app = getApp()
import requestType from '../../config/app_request_url.js'
Page({
    data: {
        loadingHidden: true,
        modalHidden: true,
        blackListWin: true,
        blg_price: '10.00',
        isWrongTip: false,
        isTrue: false,
        inputMoney: '',
        lowPrice: 10,
        tip: '单次最低提现金额为¥10.00，最高提现金额为¥2000.00',
        highPrice: 2000,
        loadingTxt: '',
        isSetPayPwd: false,
        mryxPwd: '',
        withdrawOrderNo: '', // 交易流水号（订单号）
        mryxPayHidden: false,
        phoneCall: '10106099',
        isShowTipWin: false,
        isShowVipWin: false,
        focusing: false,
        isAndroid: false,
        amount: 0,
        drawTime: ''
    },

    onLoad(opt) {
        new app.globalData.MyUtils()
        this.setData({
            userInfo: app.globalData.userInfo
        })
        this.getUserBalance()
    },

    onShow() {},
    rechargeTip() {
        this.setData({
            modalHidden: !this.data.modalHidden
        })
    },

    phoneConcat() {
        thirdApi.makePhoneCall(this.data.phoneCall)
    },

    closeBlackWin() {
        this.setData({
            isShowTipWin: false,
            isShowVipWin: false,
            withdrawOrderNo: ''
        })
    },

    drawAllCash() {
        this.setData({
            inputMoney: this.data.blg_price
        })
        this.showTip(this.data.inputMoney)
    },

    getInputing(e) {
        e.detail.value = e.detail.value.replace(/\.{2,}/g, ".")
        e.detail.value = e.detail.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
        let _val = e.detail.value;
        this.setData({
            inputMoney: _val
        })
        this.showTip(this.data.inputMoney)
    },

    onMryxPwdInput: function(event) { //每日优鲜余额支付输入密码
        let pwd = event.detail.value
        this.setData({
            mryxPwd: pwd,
        })
        if (pwd.length == 6) {
            this.withDraw(this.data.mryxPwd)
        }
    },

    withDraw(e) {
        let _url = serviceUtils.getRequestApiUrl('withdraw'),
            _data = {
                access_token: this.getAccessToken(),
                amount: this.data.inputMoney,
                payPassword: this.data.mryxPwd
            };
        // console.log('订单号:'+this.data.withdrawOrderNo)
        if (this.data.withdrawOrderNo === '') {
            this.sendDrawUrl(_url, _data)
                // console.log(_data)
        } else { // 密码验证失败，重试提交
            _data.withdrawOrderNo = this.data.withdrawOrderNo;
            // console.log(_data)
            this.sendDrawUrl(_url, _data)

        }
    },

    sendDrawUrl(u, d) {
        serviceUtils.genPromise(u, 'POST', d)
            .then((res) => {
                let _data = res.data,
                    _validateResult = _data.data.validateResult,
                    _withdrawOrderNo = _data.data.withdrawOrder;
                switch (_validateResult.code) {
                    case 0: // success
                        this.setData({
                            mryxPayHidden: false,
                            amount: _withdrawOrderNo.amount,
                            drawTime: _withdrawOrderNo.exchangeTime,
                            withdrawOrderNo: _withdrawOrderNo.withdrawOrderNo,
                            loadingHidden: false,
                            mryxPwd: '' // 清空
                        })
                        serviceUtils.wxGenPromise('redirectTo', {
                            url: serviceUtils.getAppInteriorUrl('drawCashExplain') + '?amount=' + this.data.amount + '&drawTime=' + this.data.drawTime + '&orderNo=' + this.data.withdrawOrderNo
                        })
                        break;
                        // case 2000: // 支付密码错误
                        //     this.toast(_validateResult.message)
                        //     this.setData({
                        //         mryxPwd: '',
                        //         withdrawOrderNo: _withdrawOrderNo.withdrawOrderNo
                        //     })
                        //     break;
                    default:
                        this.setData({
                            mryxPwd: '',
                            withdrawOrderNo: _withdrawOrderNo.withdrawOrderNo
                        })
                        this.toast(_validateResult.message)
                        break;
                }
            })
    },

    closeDrawing() {
        this.setData({
            withdrawOrderNo: '',
            mryxPayHidden: false
        })
    },

    goToDraw() {
        let self = this
        let url = requestType['tixian']
        let data = {
            openid: self.data.userInfo.openid,
            amount: self.data.inputMoney
        }
        requestType.genPromise({
            url,
            data: data,
            method: 'POST'
        }).then(() => {
            self.utils.toast('申请提现成功', () => {
                self.utils.backPage()
            })

        }, () => {
            self.utils.toast('生成邮寄订单成功-  去支付')
        });
    },

    getUserBalance() {
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
            self.setData({
                blg_price: income
            })
        }, () => {
            self.utils.toast('生成邮寄订单成功-  去支付')
        });
    },

    drawDetail() { // 提现明细
        serviceUtils.wxGenPromise('navigateTo', {
            url: serviceUtils.getAppInteriorUrl('drawCashList')
        })
    },

    showTip(n) {
        switch (true) {
            case (n === ''):
                this.setData({
                    tip: '提现金额不能为空或负数',
                    isWrongTip: true,
                    isTrue: false
                })
                break;
            case ((Number(n) < this.data.lowPrice) || n[0] === '0' || n[0] === '.'):
                this.setData({
                    tip: '提现金额必须大于' + this.data.lowPrice + '元',
                    isWrongTip: true,
                    isTrue: false
                })
                break;
            case (Number(n) > Number(this.data.blg_price)):
                this.setData({
                    tip: '金额已超过可提现金额',
                    isWrongTip: true,
                    isTrue: false
                })
                break;
            case (Number(n) > this.data.highPrice):
                this.setData({
                    tip: '单次提现金额不能超出' + this.data.highPrice + '元',
                    isWrongTip: true,
                    isTrue: false
                })
                break;
            default:
                this.setData({
                    tip: '单次最低提现金额为¥10.00，最高提现金额为¥2000.00',
                    isWrongTip: false,
                    isTrue: true
                })
                break;
        }
    },

    goToVip() {
        serviceUtils.wxGenPromise('redirectTo', {
            url: serviceUtils.getAppInteriorUrl('vipInterests')
        })
    },

    modifyPayNum() { // 忘记密码
        serviceUtils.wxGenPromise('redirectTo', {
            url: serviceUtils.getAppInteriorUrl('bindPayMethod')
        })
    },

    getAccessToken() {
        return app.globalData.wxappLogin && app.globalData.wxappLogin.access_token || ''
    },

    calcPrice(n) {
        return parseFloat(n / 100).toFixed(2)
    },

    toast(txt, complete) {
        this.wetoast.toast({
            title: txt,
            duration: 1500,
            success: typeof complete === 'function' ? complete : null
        })
    }

})