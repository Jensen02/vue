<!--
 * @Description: 班课管理菜单组件
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-16 15:21:55
 * @LastEditTime: 2019-03-30 13:55:56
 -->

<template>
    <div class="menu">
        <div class="menu-img">
            <div class="user-info">
                <div class="user-img">
                    <div class="img-box"><img :src="src" alt="班课首页"></div>
                </div>
                <div class="class-info">
                    <p>{{ this.className }}</p>
                    <span>{{ this.bookName }}</span>
                </div>
            </div>
        </div>
        <div class="menu-list">
            <div class="data-list">
                <ul class="list-item">
                    <li 
                    @click="updataClass('classA','add')"
                    :class="cl.classA ? 'class-a' : 'class-b' "><span>资源</span></li>
                    <li
                    @click="updataClass('classB','all-students')"
                    :class="cl.classB ? 'class-a' : 'class-b' "><span>成员</span></li>
                    <li @click="updataClass('classC','sign-list')"
                    :class="cl.classC ? 'class-a' : 'class-b' "><span v-text="classType == 'join'?'参加签到':'发布签到'"></span></li>
                    <li
                    @click="updataClass('classD','qiangda')"
                    :class="cl.classD ? 'class-a' : 'class-b' "><span v-text="classType == 'join'?'参与抢答':'发布抢答'"></span></li>
                    <li
                    @click="updataClass('classF','issue')"
                    :class="cl.classF ? 'class-a' : 'class-b' "><span>发布任务</span></li>
                    <li
                    @click="goTalk"
                    :class="cl.classE ? 'class-a' : 'class-b' "><span>讨论室</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import _session from '@/session/index'

export default {
    name: 'Menu',
    props: {
        classType: {
            type: String
        }
    },
    data() {
        return {
            src: '',            // 班课页面地址
            className: '',      //班级名称
            bookName: '',        //班课名称
            cl: {
                classA: true,
                classB: false,
                classC: false,
                classD: false,
                classE: false,
                classF: false
            },
        }
    },
    created() {
        // 获取班课信息
        this.$axios.post('/course/get/one?c_id='+this.$route.query.classVal)
        .then(res => {
            this.src = res.data.cImg;
            this.className = res.data.cName;
            this.bookName = res.data.cClass;
        })
        .catch(error => {
            console.log(error);
        });
        if(this.classType != 'join') {
            this.$router.push({
                path: '/home/manage-create/add',
                query: {
                    classVal: this.$route.query.classVal
                }
            });
        } else {
            this.$router.push({
                path: '/home/class-join/add',
                query: {
                    cl: this.$route.query.cl,
                    classVal: this.$route.query.classVal
                }
            });
        }
    },
    methods: {
        // 更新按钮样式并跳转页面
        updataClass(claName,url) {
            for(let item in this.cl) {
                if(item != claName) {
                    this.cl[item] = false;
                }
            }
            this.cl[claName] = true;
            let urlPr = this.classType == "join" ? '/home/class-join/' : '/home/manage-create/';
            let query = this.classType == 'join' ? {cl: 'join',classVal: this.$route.query.classVal} : {classVal: this.$route.query.classVal};
            this.$router.push({
                path: urlPr+url,
                query
            })
        },
        goTalk() {
            let email = _session.getUserName();
            window.open("/talk.html?c_id="+this.$route.query.classVal+"&uEmail="+email);
        }
    }
}
</script>

<style scoped>
    p {
        font-size: 16px;
    }
    ul {
        padding: 0;
        margin: 0;
    }
    .menu {
        width: 100%;
        height: 170px;
        border-bottom: 1px solid #e1e1e1;
    }
    .menu-img {
        width: 100%;
        height: 120px;
        background-image: linear-gradient(to right,#c9be8f 0%,#929a3e 100%);
    }
    .menu-list {
        width: 100%;
        height: 50px;
        background-color: #fff;
    }
    .menu-img .user-info {
        position: relative;
        width: 980px;
        height: 100%;
        margin: 0 auto;
        border-top: 1px solid transparent;
        background-image: url('./../../public/class-images/bg-2.png');
    }
    .user-info .class-info {
        position: absolute;
        top: 20px;
        left: 170px;
        padding-top: 27px;
        width: 160px;
        height: 80px;
    }
    .menu-list .data-list {
        width: 980px;
        height: 100%;
        padding-left: 1px;
        margin: 0 auto;
    }
    .menu-list .list-item {
        display: flex;
        margin-left: 150px;
    }
    li {
        width: 90px;
        height: 50px;
        margin-right: 30px;
        text-align: center;
        font-size: 14px;
        line-height: 50px;
        cursor: pointer;
        border-bottom: 2px solid transparent;
    }
    .class-a {
        color: #00bddf;
        border-bottom-color: #00bddf;
    }
    .class-b {
        color: #666;
        border-bottom-color: transparent;
    }
    li:hover {
        color: #00bddf;
        border-bottom-color: #00bddf;
    }
    .menu-img .user-img {
        width: 140px;
        height: 140px;
        padding: 4px;
        margin-top: 20px;
        border-radius: 3px;
        border: 1px solid #e1e1e1;
        background-color: #fff;
    }
    .menu-img .user-img .img-box {
        width: 100%;
        height: 100%;
        border-radius: 3px;
        overflow: hidden;
    }
</style>
