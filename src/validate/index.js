/**
 * 表单校验
 */

export default {

    // 邮箱校验
    checkEmail(emailValue) {
        let reg = new RegExp("[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?");

        return reg.test(emailValue);
    },

    // 密码验证
    passwordCheck(passwordValue) {
        let reg = new RegExp("^[A-Za-z0-9]{8,20}$");

        return reg.test(passwordValue);
    },

    // 用户名验证
    userNameCheck(userNameValue) {
        let reg = new RegExp("^[\u4E00-\u9FA5A-Za-z0-9]{5,20}$");

        return reg.test(userNameValue);
    },

    // 签到码校验
    signCheck(signNum) {
        let reg = new RegExp("^\\d{4}$");
        return reg.test(signNum);
    },

    // 签到描述符校验
    signText(signValue) {
        let reg = new RegExp("^[\u4E00-\u9FA5A-Za-z0-9，]{2,30}$");
        return reg.test(signValue);
    },

    // 域名校验
    urlCheck(urlVal) {
        let reg = new RegExp("^((http|https?|ftp|file)://)|[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$");
        return reg.test(urlVal);
    }
}