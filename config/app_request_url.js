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
        getNum: `${host}/api/auth/getNum`,
        ranking: `${host}/api/ranking`, //排行榜
        orderList: `${host}/api/order/list`, //邮寄订单列表
        codeList: `${host}/api/auth/codeList`,
        decryptMobile: `${host}/api/auth/decryptMobile`, //解密手机号码
        CreateOrder: `${host}/api/order/create`, //申请邮寄
        CreateTestOrder: `${host}/api/auth/generateQR`, //创建体验码
        // api/auth/generateQR
        invite: `${host}/api/auth/invite`, //生成&获取邀请码
        myincome: `${host}/api/auth/myincome`, //我的收益
        // income: `${host}/api/auth/income`, //我的收益
        tixian: `${host}/api/auth/tixian`, //提现
        delCode: `${host}/api/auth/delCode`,
        getCodeInfo: `${host}/api/auth/getCodeInfo`,
        bindCode: `${host}/api/auth/bindCode`,
        orderPayAgin: `${host}/api/order/agin`,
        orderCancel: `${host}/api/order/cancel`,
        question: `${host}/api/auth/question`,
        orderInfo: `${host}/api/order/info`,
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