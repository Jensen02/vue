<!--
 * @Description: 发布签到组件
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-18 23:21:36
 * @LastEditTime: 2019-03-24 21:55:05
 -->

<template>
    <div class="sign">
        <div class="sign-list">
            <div class="sign-btn">
                <el-row class="btn-top">
                    <el-button v-if="!showSign" type="primary" @click="goSign">前往发布签到</el-button>
                    <el-button v-else type="primary" @click="goSelfSign">参加签到</el-button>
                </el-row>
            </div>
            <ul class="list-items">
                <li class="resource-item"
                v-for="item in options"
                :key="item.sId"
                @click="goStudent(item.sId)">
                    <a href="javascript:void(0)" class="res-data">
                        <div class="resource-img">
                            <img src="./../../public/class-images/icon_cc_cover1@2x.png" alt="资源项">
                        </div>
                        <div class="resource-info">
                            <div class="title">
                                <p>签到描述：{{ item.des }}</p>
                            </div>
                            <div class="time"><p>发布签到时间：<span>{{ item.time }}</span></p></div>
                        </div>
                        <div class="del-resource" v-if="!showSign">
                            <a href="javascript:void(0)" @click.stop="delSign(item.sId)">删除</a>
                        </div>
                        <div class="sign-info" v-if="showSign">
                            <div class="sign-is">
                                <span v-if="item.sign == '1'" class="com-yes">已签到</span>
                                <span v-else class="com-no">未签到</span>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import _session from '@/session/index'

export default {
    name: 'SignList',
    data() {
        return {
            options: []
        }
    },
    created() {
        let loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let userName = _session.getUserName();
        // 获取班课所有的签到信息
        let url = this.$route.query.cl == 'join' ? '/signer/info?u_email='+userName+'&c_id=' : '/sign/find?c_id=' ;

        this.$axios.post(url+this.$route.query.classVal)
        .then(res => {
            this.options = res.data;
            loading.close();
        })
        .catch(error => {
            console.log(error);
        });
    },
    computed: {
        showSign() {
            return this.$route.query.cl == 'join';
        }
    },
    methods: {
        // 前往发布签到页面
        goSign() {
            this.$router.push({
                path: '/home/manage-create/sign',
                query: {
                    classVal: this.$route.query.classVal
                }
            });
        },
        // 前往签到页面
        goSelfSign() {
            this.$axios.post('/signer/judge?c_id='+this.$route.query.classVal)
            .then(res => {
                if(res.data.msg == '1') {
                    this.$router.push({
                        path: '/home/class-join/go-sign',
                        query: {
                            cl: this.$route.query.cl,
                            classVal: this.$route.query.classVal
                        }
                    });
                } else {
                    alert("该班课暂无签到");
                }
            })
            .catch(error => {
                console.log(error);
            })
        },
        // 查看签到学生
        goStudent(signId) {
            if(this.$route.query.cl != 'join') {
                this.$router.push({
                    path: '/home/manage-create/students',
                    query: {
                        classVal: this.$route.query.classVal,
                        sign: signId
                    }
                });
            } else {
                alert("不可查看签到学生信息");
            }
        },
        // 删除签到信息
        delSign(signVal) {
            this.$axios.post('/sign/del?s_id='+signVal+'&c_id='+this.$route.query.classVal)
            .then(res => {
                if(res.data.msg == "1") {
                    history.go(0);
                    // this.$router.push({
                    //     path: '/home/manage-create/sign-list',
                    //     query: {
                    //         classVal: this.$route.query.classVal
                    //     }
                    // });
                }
            })
            .catch(error => {
                console.log(error);
            })
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
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    span {
        color: #666;
    }
    .sign {
        width: 100%;
        padding-bottom: 60px;
        background-color: #f5f5f5;
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
    }
    .sign-list {
        width: 980px;
        min-height: 500px;
        margin: 40px auto 0;
        background-color: #fff;
        padding: 0 20px 30px;
    }
    .sign-btn {
        margin: 20px;
        padding-top: 10px;

    }
    .list-items {
        width: 100%;
        height: 100%;
    }
    .list-items li {
        width: 940px;
        height: 100px;
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
        width: 60px;
        height: 60px;
        /* border-radius: 50%; */
        margin-right: 19px;
    }
    .resource-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 400px;
        overflow: hidden;
    }
    .del-resource {
        margin-left: auto;
    }
    .del-resource a:hover {
        color: orangered;
    }
    .sign-info {
        position: relative;
        width: 100px;
        height: 60px;
        margin-left: auto;
    }
    .sign-is {
        position: absolute;
        top: 0;
    }
    .com-no {
        color: #ff0000;
    }
    .com-yes {
        color: #00ff40;
    }
</style>
