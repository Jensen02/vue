<template>
    <div class="foot">
        <span>©2012 - 2019 陕西智慧科创信息技术有限公司  - 京ICP备12041916号-2  - 京公网安备11010802011662号</span>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            msg: 'footer'
        }
    }
}
</script>

<style scoped>
    .foot {
        width: 100%;
        height: 100px;
        background-color: #fff;
        text-align: center;
        line-height: 100px;
    }
    .foot span {
        font-size: 13px;
    }
</style>
