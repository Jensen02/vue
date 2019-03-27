<template>
    <div class="not-find">
        <h1>抱歉,该页面无法找到</h1>
        <h3>404 Not Find</h3>
        <a href="javascript:void(0)" @click="goLogin">返回首页</a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'not find'
        }
    },
    methods: {
        goLogin() {
            this.$router.replace('/home/content');
        }
    }
}
</script>

<style scoped>
    .not-find {
        text-align: center;
        padding-top: 50px;
    }
</style>

