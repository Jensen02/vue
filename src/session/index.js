export default {
    setUserName(userName) {
        sessionStorage.setItem("username",userName);
    },
    getUserName() {
        return sessionStorage.getItem("userName");
    },
    setUser(userVal) {
        sessionStorage.setItem("user",userVal);
    },
    getUser() {
        return sessionStorage.getItem("user");
    },
    clearAllSession() {
        return sessionStorage.clear();
    }
}