<template>
    <div class="content">
        <div class="content-class">
            <div class="add-class">
                <div class="add-btn" @click="showItem">
                    <div class="up-down"></div>
                    <div class="left-right"></div>
                </div>
                <div class="add-list">
                    <div v-show="showListItem" class="show-tran">
                        <div class="add-tri" ></div>
                        <ul class="list-item">
                            <li><router-link :to="{path: '/home/create',query: {isCurrentComponent: 'create'}}">创建班课</router-link></li>
                            <li><router-link :to="{path: '/home/join',query: {isCurrentComponent: 'join'}}">加入班课</router-link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- 已加入的班课 -->
            <div class="join-class">
                <div class="data-class">
                    <div class="class-name">已加入的班课</div>
                    <div class="class-number">{{ joinNumber }}个已加入的班课</div>
                </div>
                <ClassList
                :classType="'join'"
                :items="joinClassItems"></ClassList>
            </div>

            <!-- 已创建的班课 -->
            <div class="create-class">
                <div class="data-class">
                    <div class="class-name">已创建的班课</div>
                    <div class="class-number">{{ createNumber }}个已创建的班课</div>
                </div>
                <ClassList
                :classType="'create'"
                :items="createClassItems"></ClassList>
            </div>

        </div>
    </div>
</template>

<script>

import ClassList from './ClassList'
import _session from '@/session/index'

export default {
    name: 'ContentText',
    data() {
        return {
            msg: 'hello',
            showListItem: false,
            loading: '',
            joinNumber: 0,
            createNumber: 0,
            joinClassItems: [],      // 存储加入的班课列表
            createClassItems: []       // 存储创建的班课列表
        }
    },
    created() {
        this.loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let userEmail = _session.getUserName();     // 从cookie获取用户邮箱
        if(!userEmail) {
            alert("请登录");
            this.$router.push('./login');
        } else {
            this.getJoinClassInfo(userEmail);
            this.getCreateClassInfo(userEmail);
        }
    },
    methods: {
        // 获取已加入的班课
        getJoinClassInfo(userEmail) {
            this.$axios.post('/user/find/course/join?u_id=' + userEmail).then(res => {
                this.joinClassItems = res.data;
                this.joinNumber = this.joinClassItems.length;
                this.loading.close();
            }).catch(error => {
                console.log(error);
            })
        },
        
        // 获取已创建的班课
        getCreateClassInfo(userEmail) {
            this.$axios.post('/user/find/course/create?u_id=' + userEmail).then(res => {
                this.createClassItems = res.data;
                this.createNumber = this.createClassItems.length;
                this.loading.close();
            }).catch(error => {
                console.log(error);
            })
        },

        showItem() {
            this.showListItem = this.showListItem ? false : true;
        },

        jump() {
            this.$router.push({
                path: '/home',
                query: {
                    isCurrentComponent: 'ComponentText'
                }
            })
        }
    },
    components: {
        ClassList
    }    
}
</script>

<style scoped>
    .content {
        background-color: #ececec;
        padding-top: 30px;
    }
    .content-class {
        width: 980px;
        margin: 0 auto;
    }
    .add-class {
        display: flex;
        height: 80px;
    }
    .add-btn {
        position: relative;
        width: 40px;
        height: 40px;
        border: 1px #379ce8 solid;
        text-align: center;
        padding: 6px;
        border-radius: 50%;
    }
    .add-btn .up-down {
        display: inline-block;
        border-left: 2px #379ce8 solid;
        height: 26px;
    }
    .add-btn .left-right {
        position: absolute;
        top: 17px;
        border-top: 2px #379ce8 solid;
        width: 26px;
        height: 2px;
    }
    .show-tran {
        transition: .4s;
    }
    .add-list {
        position: relative;
    }
    .add-list .list-item {
        display: block;
        margin: 0 0 0 22px;
        width: 100px;
        padding: 10px 0;
        text-align: center;
        border-radius: 10px;
        box-shadow: 0 0 3px 1px #c3c3c3;
        background-color: #fff;
    }
    .add-list .list-item li {
        height: 30px;
        line-height: 30px;
    }
    .add-list .list-item li:hover {
        background-color: #ececec;
        cursor: pointer;
        transition: .7s;
    }
    .add-list .add-tri {
        position: absolute;
        top: 10px;
        width: 0;
        height: 0;
        border-top: 10px transparent solid;
        border-right: 10px #fff solid;
        border-bottom: 10px transparent solid;
        border-left: 10px transparent solid;
    }
    .join-class,.create-class {
        margin-top: 50px;
    }
    .data-class {
        display: flex;
        height: 30px;
        justify-content: space-between;
        border-bottom: 1px #a39ca7 solid;
    }
</style>
