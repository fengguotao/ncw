const wxApi = require('../wx_api.js')
import requestType from '../../config/app_request_url.js'
const app = getApp()
const ERR = '[LOGIN ERR]: '
const WARN = '[LOGIN WARN]: '
const INFO = '[LOGIN INFO]: '


// singleton
var instance = (function() {

    /** @private **/
    var _observers = []
    var _obj = null // 单例对象

    var _userInfo = {}
        /**
         * 触发观察者的方法
         */
    function _triggerSuccessObserver() {
        _observers.forEach(page => {
            if (typeof page.onLoginSuccess === 'function') {
                page.onLoginSuccess(_userInfo)
            } else {
                console.warn(WARN + page + ' 没有注册成功回调')
            }
        })
    }

    function _triggerFailObserver() {
        _observers.forEach(page => {
            if (typeof page.onLoginFail === 'function') {
                page.onLoginFail()
            } else {
                console.warn(WARN + page + ' 没有注册失败回调')
            }
        })
    }

    function _getUserInfo(scene) {
        wxApi.wxlogin().then((res) => { //获取微信code  
            if (res.errMsg === "login:ok") { //获取code成功，获取用户信息
                _gmsLogin({
                    wxCode: res.code,
                    scene: scene
                })
            } else {
                _triggerFailObserver()
            }
        }, () => {
            _triggerFailObserver()
        })
    }

    function _gmsLogin(loginData) {

        let url = requestType['login']
        requestType.genPromise({
            url,
            data: loginData,
            method: 'POST'
        }).then((success) => {
            const wxappLoginResData = success.data
            console.log('1111' + wxappLoginResData)
            if (wxappLoginResData.state == 0) {
                _userInfo = wxappLoginResData.data
                app.globalData.userInfo = wxappLoginResData.data
                _triggerSuccessObserver()
            } else {
                console.log('1111')
                _triggerFailObserver()
            }
        }, () => {
            console.log('1111')
            _triggerFailObserver()
        });
    }
    /** @public **/
    function LoginManager() {
        /**
         * 添加观察者
         */
        this.addObserver = function(page) {
            if (_observers.indexOf(page) === -1) {
                _observers.push(page)
            } else {
                console.warn(WARN + page + ' is already exists as an observer')
            }
        }

        /**
         * 移除观察者
         */
        this.removeObserver = function(page) {
            let idx = _observers.indexOf(page)
            if (idx > -1) {
                _observers.splice(idx, 1)
            } else {
                console.warn(WARN + page + ' is not an observer')
            }
        }
        this.login = function(scene) {
            _getUserInfo(scene)
        }

        this.getUserInfo = function() {
            return _userInfo
        }

        // this.getAccessToken = function() {
        //     try {
        //         return _userInfo.access_token
        //     } catch (err) {
        //         return ''
        //     }
        // }

        // this.getUserId = function() {
        //     try {
        //         return _userInfo.user_id
        //     } catch (err) {
        //         return ''
        //     }
        // }
    }

    return function() {
        if (!_obj) {
            _obj = new LoginManager()
        }
        return _obj
    }
})()

module.exports = {
    instance: instance
}