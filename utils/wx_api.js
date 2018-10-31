import appInteriorUrl from '../config/app_interior_url'

function wxApi(key) {
    return wxGenPromise(key, {})
}

function login() {
    return wxGenPromise('login')
}

function pageScrollTo(reqData = {}) {
    return wxGenPromise('pageScrollTo', reqData)
}

function makePhoneCall(phoneNumber) {
    let reqData = {
        phoneNumber: phoneNumber
    }
    return wxGenPromise('makePhoneCall', reqData)
}

function requestPayment(reqData = {}) {
    // let reqData = {
    //     //小程序appid
    //     appId: appId,
    //     //时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
    //     timeStamp: timeStamp,
    //     //随机字符串，长度为32个字符以下。
    //     nonceStr: nonceStr,
    //     //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
    //     package: prepay_id,
    //     //签名算法，暂支持 MD5
    //     signType: 'MD5',
    //     //签名
    //     paySign: sign,
    // }
    console.log("requestPayment", reqData)
    return wxGenPromise('requestPayment', reqData)
}
/**
 * 发起微信api请求
 * @param apiKey
 * @param reqData
 * @returns {*}
 */
function wxGenPromise(apiKey, reqData = {}) {
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
        wx[apiKey](reqData)
    })
}



function navigateTo(urlkey, skipData = null) {
    return throttle(jumpPage('navigateTo', urlkey, skipData))()
}

function redirectTo(urlkey, skipData = null) {
    return throttle(jumpPage('redirectTo', urlkey, skipData))()
}

function reLaunch(urlkey, skipData = null) {
    return throttle(jumpPage('reLaunch', urlkey, skipData))()
}

function switchTab(urlkey, skipData = null) {
    return throttle(jumpPage('switchTab', urlkey, skipData))()
}
/**内部方法 - 无需暴露str */
function throttle(fn, gapTime) {
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

function jumpPage(jumpKey, urlkey, skipData) {
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
    return wxGenPromise(jumpKey, data)
}
/**内部方法 - 无需暴露end */
module.exports = {
    wxApi: wxApi,
    wxlogin: login,
    pageScrollTo: pageScrollTo,
    requestPayment: requestPayment,
    makePhoneCall: makePhoneCall,
    navigateTo: navigateTo,
    redirectTo: redirectTo,
    reLaunch: reLaunch,
    switchTab: switchTab
}