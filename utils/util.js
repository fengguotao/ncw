import wxApi from 'wx_api'
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
        n = n.toString()
        return n[1] ? n : '0' + n
    }
    //正则表达式验证
function regExp(target, fmt) {
    return fmt.test(target)
}

function regExpPhoneNum(pNum) {
    return regExp(pNum, /^1[3-9]\d{9}$/)
}

function isLicenseNo(str) {
    return regExp(str, /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/);
}


module.exports = {
    formatTime: formatTime,
    regExpPhoneNum: regExpPhoneNum,
    isLicenseNo: isLicenseNo,
    wxlogin: wxApi.wxlogin,
    makePhoneCall: wxApi.makePhoneCall,
    requestPayment: wxApi.requestPayment
}