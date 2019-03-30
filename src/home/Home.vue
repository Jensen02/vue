<template>
    <div>
        <NavTop :userName="userName"></NavTop>
        <router-view></router-view>
        <Footer/>
    </div>
</template>

<script>

import NavTop from './NavTop'
import Footer from '@/components/Footer'
import _title from '@/settitle/index'
import _session from '@/session/index'

export default {
    data() {
        return {
            msg: 'hello home',
            userName: ''
        }
    },
    created() {
        _title.setTitle("我的班课");
        // this.$router.push('/home/content');
        let userId = _session.getUserName();
        if(userId) {
                this.$axios.post('/user/name?id='+userId).then(res => {
                this.userName = res.data.msg;
                _session.setUser(this.userName);
            })
        } else {
            alert("请登录");
            this.$router.replace("/login");
        }
    },
    methods: {
        show(value) {
            console.log(value);
        }
    },
    components: {
        NavTop,
        Footer
    }
}
</script>

<style>
    h1 {
        margin: 0;
    }
</style>
