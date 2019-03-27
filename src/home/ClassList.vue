<!--
 * @Description: 渲染班课组件，根据父组件传来的班课列表动态渲染每个班课信息
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-06 21:24:43
 * @LastEditTime: 2019-03-21 20:54:31
 -->

<template>
    <div class="class-list">
        <div class="no-class" v-if="showWarn">
            <h3>目前没有该课程</h3>
        </div>
        <div class="class-item" @click="showClass(item.cId)" v-for="(item) in items" :key="item.cId">
            <div class="data-class-img">
                <img :src='item.cImg'>
            </div>
            <div class="data-class-info">
                <span class="class-info-num">{{ item.cClass}}</span>
                <span class="class-info-name">{{ item.cName}}</span>
                <span class="class-info-key">{{ item.cId}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ClassList',
    props: {
        // items属性用于接收并存储从父组件传来的班课列表
        items: {
            type: Array,
            required: true
        },
        classType: {
            type: String
        }
    },
    computed: {
        // 判断该班课列表是否为空，若为空，则显示提示信息
        showWarn: function() {
            return this.items.length > 0 ? false : true;
        }
    },
    methods: {
        showClass(val) {
            if(this.classType == 'join') {
                this.$router.push({
                    path: '/home/class-join/add',
                    query: {
                        cl: 'join',
                        classVal: val
                    }
                });
            } else {
                this.$router.push({
                    path: '/home/manage-create/add',
                    query: {
                        classVal: val
                    }
                });
            }
        }
    }
}
</script>

<style>
    .class-list {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 30px;
    }
    .class-list .no-class {
        height: 330px;
    }
    .class-list .class-item {
        width: 230px;
        height: 330px;
        margin: 30px 20px 0 0;
        cursor: pointer;
        background-color: #fff;
    }
    .class-item:nth-child(4n) {
        margin-right: 0;
    }
    .class-item .data-class-img {
        width: 220px;
        height: 220px;
        overflow: hidden;
        margin: 5px;
    }
    .class-item .data-class-img img {
        width: 100%;
        height: 100%;
    }
    .class-item .data-class-info {
        margin-top: 24px;
        /* background-color: aquamarine; */
    }
    .class-item .data-class-info span {
        display: block;
        height: 25px;
        padding-left: 10px;
    }
    .class-item .data-class-info .class-info-name {
        font-size: 12px;
    }
    .class-item .data-class-info .class-info-key {
        font-style: italic;
        color: #3d51de;
    }
</style>
