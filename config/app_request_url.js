/**
 * 小程序网络请求配置文件
 */

const host = 'https://www.nuochewang.net' // 
    // 测试环境 
const appRequest = {
        AppID: 'wx9eaa37645a723075',
        AppSecret: 'd0e07b64d62c369882b23f7b594e90f5',
        /*接口------------------------------------------------ */
        login: `${host}/api/auth/login`, //登陆接口

        ranking: `${host}/api/ranking`, //排行榜
        orderList: `${host}/api/order/list`, //创建邮寄订单
        CreateTestOrder: `${host}/api/order/createTestOrder`, //创建体验码
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
                        let statusCode = res.statusCode;
                        if (statusCode == 200) {
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