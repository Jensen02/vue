export default {
    setUserName(userName) {
        sessionStorage.setItem("userName",userName);
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