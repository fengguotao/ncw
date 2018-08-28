/**
 * 小程序网络请求配置文件
 */

const host = 'http://10.12.0.11:8080' // 
    // 测试环境 
const appRequest = {
        AppID: 'wxddde6f6e9b273be2',
        AppSecret: '7b890599d941f0b7c3182117f7ef3aba',
        /*接口------------------------------------------------ */
        login: `${host}/api/user/login`, //登陆接口
        getWxBindMobile: `${host}/api/user/wxBindMobile`, //解密微信绑定手机号
        genPromise(map) {
            if (!map || (typeof map === "object" && !map.url)) {
                return
            }
            let data = {
                url: typeof map == 'string' ? map : map.url,
                data: map.data || {},
                method: map.method || 'POST',
                header: map.header || { 'content-type': 'application/json;charset=UTF-8' }
            }
            return new Promise((resolve, reject) => {
                const requestBody = {
                    url: data.url,
                    header: data.header,
                    success: function(res) {
                        console.log('[调用微信请求网络接口成功]')
                        console.log('[请求url]', data.url)
                        console.log('[请求header]', data.header)
                        console.log('[请求data]', data.data)
                        console.log('[返回结果]', res)
                        let code = res.data.code;
                        let statusCode = res.statusCode;
                        if (statusCode == 200 && code == 0) {
                            resolve(res)
                        } else {
                            reject(res)
                        }
                    },
                    fail: function(res) {
                        console.log('[调用微信请求网络接口失败!!!]')
                        console.log('[请求url]', data.url)
                        console.log('[请求data]', data.data)
                        console.log('[请求header]', data.header)
                        console.log('[返回结果]', res)
                        reject(res)
                    },
                    method: data.method,
                    data: data.data,
                    dataType: 'json'
                }
                wx.request(requestBody)
            })
        }
    }
    //admin manager
module.exports = appRequest