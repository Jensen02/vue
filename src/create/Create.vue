<!--
 * @Description: 班课管理组件
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-11 21:51:04
 * @LastEditTime: 2019-03-20 20:52:34
 -->

<template>
    <div class="manage-create">
        <Menu
        :class="'create'"></Menu>
        <router-view></router-view>
    </div>   
</template>

<script>
import Menu from './Menu';

export default {
    name: 'Create',
    data() {
        return {
            classNumber: ''
        }
    },
    created() {
        this.classNumber = this.$route.query.classVal;
    },
    components: {
        Menu
    }
}
</script>

<style scoped>
    h1 {
        height: 50px;
    }
</style>
