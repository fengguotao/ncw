// import requestType from './config/app_request_url.js'         
import appInteriorUrl from './app_interior_url.js' //app页面内部栈 

function MyUtils() {
    const app = getApp()
    const pages = getCurrentPages()
    const curPage = pages[pages.length - 1]
    this.__page = curPage
    this.__page.showActionSheet = function() {
        wx.showActionSheet({
            itemList: app.globalData.callOut,
            success: function(res) {
                wx.makePhoneCall({
                    phoneNumber: app.globalData.serviceNum //仅为示例，并非真实的电话号码
                })
            },
            fail: function(res) {
                console.log(res.errMsg)
            }
        })
    }
    curPage.utils = this
}
/****************************************************页面栈********************************************************/
/**
 * 按照页面栈返回
 * @param delta [返回页面数量]
 * @returns {*}
 */
MyUtils.prototype.backPage = function(delta = 1) {
        let reqData = {
            delta: delta
        }
        return this.wxGenPromise('navigateBack', reqData)
    }
    /**  页面基本跳转方式
     *  * @param {*跳转wx基本类型} 
    +   * @param {*跳转页面栈简称} 
    +   * @param {*所传参数} object
    +  */
MyUtils.prototype.jumpPage = function(jumpKey, urlkey, skipData) {
        let skipUrl = appInteriorUrl[urlkey]
        let search = ''
        if (skipData) {
            search = '?'
            for (var key in skipData) {
                search += key + "=" + skipData[key] + "&"
            }
        }
        let data = {
            url: skipUrl + search
        }
        console.log(data)
        return this.wxGenPromise(jumpKey, data)
    },
    /**
     * 选择类型页面跳转
     * @param jumpKey [跳转类型]
     * {保留打开, 关闭打开, 关闭所有打开}
     * {navigateTo, redirectTo, reLaunch}
     * @param urlkey [地址简写]
     * @param skipData {object} [传入下一页的srarch]
     */
    MyUtils.prototype.navigateTo = function(urlkey, skipData = null) {
        return this.throttle(this.jumpPage('navigateTo', urlkey, skipData))()
    }
MyUtils.prototype.redirectTo = function(urlkey, skipData = null) {
    return this.throttle(this.jumpPage('redirectTo', urlkey, skipData))()
}
MyUtils.prototype.reLaunch = function(urlkey, skipData = null) {
    return this.throttle(this.jumpPage('reLaunch', urlkey, skipData))()
}

MyUtils.prototype.switchTab = function(urlkey, skipData = null) {
        return this.throttle(this.jumpPage('switchTab', urlkey, skipData))()
    }
    /****************************************************页面栈********************************************************/


/****************************************************loading********************************************************/
/**
 * 弹窗loading
 */
MyUtils.prototype.showLoading = function(data = '加载中...') {
        let reqData = {
            title: data
        }
        return this.wxGenPromise('showLoading', reqData)
    }
    /** 
     * 取消loading
     */
MyUtils.prototype.hideLoading = function() {
        console.log('hideLoading')
        return this.wxGenPromise('hideLoading', {})
    }
    /****************************************************loading********************************************************/



/**  获取当前时间
 * 传入拼接的字符标 
 * @param {*图片url} string 
 */
MyUtils.prototype.getTime = function(type = "/") {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() > 8 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
        let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
        let repDate = ''
        repDate = year + type + month + type + day
        return repDate
    },
    /**
     *  获取定位信息 
     *  @param string [电话号码]
     *  @return {*} [回调函数]
     */
    MyUtils.prototype.getMyLocation = function(data = { type: 'wgs84' }) {
        return this.wxGenPromise('getLocation', data)
    }
MyUtils.prototype.getMyLocationGcj02 = function(data = { type: 'gcj02' }) {
        return this.wxGenPromise('getLocation', data)
    }
    /**
     * 发起网络请求
     * @param url
     * @param data
     * @param callback
     * @param header
     * @param method
     * @returns {*}
     */
MyUtils.prototype.genPromise = function(url, data = {}, method = 'POST', callback = function(data) { console.log(data) }, header = { 'content-type': 'application/json' }) {
        console.log(data, method)
        return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                header: header,
                success: function(res) {
                    console.log('[调用微信请求网络接口成功]')
                    console.log('[请求url]', url)
                    console.log('[请求header]', header)
                    console.log('[请求data]', data)
                    console.log('[返回结果]', res)
                    callback(res);
                    resolve(res)
                },
                fail: function(res) {
                    console.log('[调用微信请求网络接口失败!!!]')
                    console.log('[请求url]', url)
                    console.log('[请求data]', data)
                    console.log('[请求header]', header)
                    console.log('[返回结果]', res)
                    reject(res)
                },
                method: method,
                data: data,
                dataType: 'json'
            })
        })
    }
    /**
     * 发起微信api请求
     * @param apiKey
     * @param reqData
     * @returns {*}
     */
MyUtils.prototype.wxGenPromise = function(apiKey, reqData) {

        return new Promise((resolve, reject) => {
            reqData['success'] = function(res) {
                console.debug('[调用微信', apiKey, '接口成功]')
                console.debug('[请求数据]', reqData)
                console.debug('[返回结果]', res)
                resolve(res)
            }
            reqData['fail'] = function(res) {
                console.debug('[调用微信', apiKey, '接口失败!!!]')
                console.debug('[请求数据]', reqData)
                console.debug('[返回结果]', res)
                reject(res)
            }
            if (apiKey === 'navigateTo' || apiKey === 'redirectTo') {
                let tarPage = reqData.url.split('?')[0]
                let currPages = getCurrentPages()
                let currPage = currPages[currPages.length - 1].route.split('?')[0]
                if (tarPage == currPage) {
                    return
                }
            }
            wx[apiKey](reqData)
        })
    }
    /**
     *  扫码 
     *  @param object 
     *  @return {*}
     */
MyUtils.prototype.getQrcode = function(data = { onlyFromCamera: true }) {
        return this.wxGenPromise('scanCode', data)
    }
    /**
     *  弹窗 
     *  @param object 
     *  @return {*}
     */
MyUtils.prototype.getShowModel = function(reqData) {
        return this.wxGenPromise('showModal', reqData)
    }
    /**
     *  拍照 
     *  @param object 
     *  @return {*}
     */
MyUtils.prototype.takePhoto = function(data = { count: 1, sizeType: ['original', 'compressed'], sourceType: ['camera'] }) {
        return this.wxGenPromise('chooseImage', data)
    }
    /**
     * 显示toast
     * @param {*内容} string 
     */
MyUtils.prototype.toast = function(txt, complete) {
        this.showToast({
            title: txt,
            duration: 1500,
            success: typeof complete === 'function' ? complete : null
        })
    }
    /**
     *  toast提醒
     *  @param str [弹窗内容] 
     */
MyUtils.prototype.showToast = function(data) {
        try {
            if (!data) {
                this.hide()
            } else {
                this.show(data)
            }
        } catch (err) {
            console.error(err)
            data && typeof data.fail === 'function' && data.fail(data)
        } finally {
            data && typeof data.complete === 'function' && data.complete(data)
        }
    }
    //显示
MyUtils.prototype.show = function(data) {
    let page = this.__page
    clearTimeout(this.__timeout)
        //display需要先设置为block之后，才能执行动画
    page.setData({
        '__wetoast__.reveal': true
    })
    setTimeout(() => {
        let animation = wx.createAnimation()
        animation.opacity(1).step()
        data.animationData = animation.export()
        data.reveal = true
        page.setData({
            __wetoast__: data
        })
    }, 30)
    if (data.duration === 0) {
        setTimeout(() => {
            typeof data.success === 'function' && data.success(data)
        }, 430)
    } else {
        this.__timeout = setTimeout(() => {
            this.showToast()
            typeof data.success === 'function' && data.success(data)
        }, (data.duration || 1500) + 400)
    }
}

//隐藏
MyUtils.prototype.hide = function() {
        let page = this.__page

        clearTimeout(this.__timeout)

        if (!page.data.__wetoast__.reveal) {
            return
        }

        let animation = wx.createAnimation()
        animation.opacity(0).step()
        page.setData({
            '__wetoast__.animationData': animation.export()
        })

        setTimeout(() => {
            page.setData({
                __wetoast__: {
                    reveal: false
                }
            })
            console.log(page.data)
        }, 400)
    }
    /**
     * 存储本地缓存的方法对象
     * @param object/string 
     *  @return {*}
     */
MyUtils.prototype.myStorage = {
    /**
     * 设置本地缓存的方法
     * @param object
     * @return {*}
     */
    setData: function(data) {
        return new Promise((resolve, reject) => {
            let keyArr = []
            let valueArr = []
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    keyArr.push(key)
                    valueArr.push(element)
                }
            }
            let len = keyArr.length
            if (len <= 0) {
                return
            } else {
                for (var i = 0; i < len; i++) {
                    wx.setStorage({
                        key: keyArr[i],
                        data: valueArr[i],
                        success: function() {
                            if (i - 0 + 1 == len) {
                                // resolve()
                            }
                        },
                        fail: function() {
                            if (i - 0 + 1 == len) {
                                // reject()
                            }
                        },
                    })
                }
            }
        })
    },
    /**
     * 获取本地缓存的方法
     * @param Array
     * @param string
     * @return {*}
     */
    getData: function(key) {
        return new Promise((resolve, reject) => {
            if (typeof key == 'string') {
                wx.getStorage({
                    key: key,
                    success: function(res) {
                        resolve(res)
                    },
                    fail: function(fail) {
                        reject(fail)
                    },
                })
            } else if (typeof key == 'object' && key instanceof Array) {
                let _arr = []
                let len = key.length
                key.forEach((element, index) => {
                    wx.getStorage({
                        key: element,
                        success: function(res) {
                            if (res.errMsg === 'getStorage:ok') {
                                _arr.push(res.data)
                            }
                            if (index - 0 + 1 == len) {
                                resolve(_arr)
                            }
                        },
                        fail: function(fail) {
                            if (index - 0 + 1 == len) {
                                if (_arr.length >= 1) {
                                    resolve(_arr)
                                } else {
                                    reject(_arr)
                                }
                            }

                        },
                    })
                })
            }
        })
    }
}

MyUtils.prototype.throttle = function(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
        gapTime = 1500
    }

    let _lastTime = null
    return function() {
        let _nowTime = new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            typeof fn === 'function' ? fn() : fn
            _lastTime = _nowTime
        }
    }
}
module.exports = MyUtils