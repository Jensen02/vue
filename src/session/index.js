export default {
    setUserName(userName) {
        sessionStorage.setItem("userName",userName);
    },
    getUserName() {
        return sessionStorage.getItem("userName");
    },
    clearAllSession() {
        return sessionStorage.clear();
    }
}