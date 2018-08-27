import appInteriorUrl from '../config/app_interior_url'

function login() {
    return wxGenPromise('login')
}

function pageScrollTo(reqData = {}) {
    return wxGenPromise('pageScrollTo', reqData)
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
    wxlogin: login,
    pageScrollTo: pageScrollTo,
    navigateTo: navigateTo,
    redirectTo: redirectTo,
    reLaunch: reLaunch,
    switchTab: switchTab
}