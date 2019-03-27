<template>
    <div class="man-join">
        <Menu :classType="'join'"></Menu>
        <router-view></router-view>
        <!-- <h1>msg</h1> -->
    </div>   
</template>

<script>
import Menu from '@/create/Menu';

export default {
    name: 'Join',
    data() {
        return {
            mas: 'hello'
        }
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