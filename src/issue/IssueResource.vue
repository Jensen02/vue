<!--
 * @Description: 展示任务列表
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-30 15:36:55
 * @LastEditTime: 2019-03-31 20:21:16
 -->

<template>
    <div class="resource-list">
        <ul class="list-items">
            <li class="resource-item" v-for="item in options" v-bind:key="item.tId">
                <a href="javascript:void(0)" @click="lookResource(item.tId)" class="res-data">
                    <div class="resource-img">
                        <img src="./../../public/class-images/icon_res_website@2x.png" alt="资源项">
                    </div>
                    <div class="resource-info">
                        <div class="title">
                            <p>{{ item.tTitle }}</p>
                        </div>
                        <div class="issue-text"><p>任务描述：</p><span>{{ item.tContent }}</span></div>
                        <div class="time">
                            <p>发布者：</p><span>{{ item.tName }}</span>
                            <span>&emsp;&emsp;&emsp;{{ item.tTime }}</span>
                        </div>
                    </div>
                    <div v-if="!classType" class="del-resource">
                        <a href="javascript:void(0)" @click="delRes(item.tId)">删除</a>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import _session from '@/session/index'

export default {
    name: 'IssueResource',
    props: {
        options: {
            type: Array
        }
    },
    data() {
        return {
            userEmail: ''
        }
    },
    created() {
        this.userEmail = _session.getUserName();
    },
    computed: {
        // 判断该班课是否为自己加入的班课
        classType() {
            return this.$route.query.cl == 'join';
        }
    },
    methods: {
        // 删除已发布的任务
        delRes(keyVal) {
            this.$axios.post('/task/del?id='+keyVal)
            .then(res => {
                if(res.data.msg == '1') {
                    alert("删除任务成功");
                    history.go(0);
                } else {
                    alert("删除任务失败");
                }
            })
            .catch(error => {
                console.log(error);
            })
        },

        // 查看任务详情
        lookResource(rId) {
            if(this.classType) {
                this.$router.push({
                    path: '/home/class-join/detail',
                    query: {
                        cl: this.$route.query.cl,
                        rId: rId,
                        classVal: this.$route.query.classVal
                    }
                });
            }
        }
    }
}
</script>

<style scoped>
    ul {
        display: block;
        padding: 0;
        margin: 0;
    }
    p {
        color: #000;
        margin: 0;
    }
    span {
        color: #666;
    }
    .resource-list {
        width: 100%;
        min-height: 460px;
        padding: 0 20px 0;
    }
    .list-items {
        width: 100%;
        height: 100%;
    }
    .list-items li {
        width: 940px;
        height: 120px;
        border: 1px solid transparent;
        border-bottom-color: #ccc;
    }
    .list-items li:hover {
        border-color: #00bddf;
    }
    .list-items .res-data {
        display: flex;
        height: 100%;
        padding: 19px;
    }
    .resource-item .resource-img {
        width: 80px;
        height: 80px;
        align-self: center;
        margin-right: 19px;
    }
    .resource-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 450px;
        overflow: hidden;
    }
    .issue-text {
        display: flex;
    }
    .issue-text p,.time p {
        display: inline-block;
        min-width: 70px;
        font-size: 14px;
    }
    .issue-text span {
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;

    }
    .del-resource {
        margin-left: auto;
    }
    .del-resource a:hover {
        color: orangered;
    }
</style>