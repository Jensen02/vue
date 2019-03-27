<!--
 * @Description: 导航栏组件
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-04 19:02:17
 * @LastEditTime: 2019-03-21 23:09:46
 -->

<template>
    <div class="nav-head">
        <div class="navtop">
            <div class="logo" @click="goHome">
                <div class="img">
                    <img src="./../../public/logo.jpg" alt="logo">
                </div>
                <span>我的课堂</span>
            </div>
            <div class="nav-list">
                <div class="left-float">
                    <a href="javascript:void(0)" class="task-btn">任务中心</a>
                </div>
                <div class="left-float vertical-bar"></div>
                <div class="left-float">
                    <a href="javascript:void(0)" class="ccp-btn">教学包</a>
                </div>
                <div class="left-float vertical-bar"></div>
                <div class="left-float">
                    <a href="javascript:void(0)" class="manager-btn">库管理</a>
                </div>
                <div class="left-float vertical-bar"></div>
                <div class="left-float">
                    <a href="javascript:void(0)" class="quiz-btn">我的题库</a>
                </div>
            </div>
            <div class="user">
                <div class="user-img"><img src="./../../public/1.jpg" alt=""></div>
                <div class="user-name">
                    <span>{{ this.userName }}</span>
                </div>
                <div class="login-out">
                    <a href="javascript:void(0)" @click="loginOut">退出</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _session from '@/session/index'
export default {
    props: {
        // 保存用户名
        userName: {
            type: String
        }
    },
    methods: {
        // 用户退出
        loginOut() {
            alert("再见，亲爱的  "+this.userName+"  用户");
            _session.clearAllSession();
            this.$router.replace('/login');
        },

        // 返回班课列表页
        goHome() {
            this.$router.push('/home/content');
        }
    },   
}
</script>

<style>
    .nav-head {
        border-bottom: 1px #a39ca7 solid;
        padding-bottom: 5px;
        box-shadow: 0 1px 5px #919191;
    }
    .navtop {
        display: flex;
        width: 980px;
        height: 50px;
        margin: 0 auto;
        background-color: #fff;
    }
    .logo,.nav-list,.img {
        display: inline-block;
        height: 100%;
        line-height: 50px;
    }
    .nav-list {
        width: 500px;
    }
    .logo {
        width: 130px;
        margin-right: 50px;
        cursor: pointer;
    }
    .logo .img {
        width: 50px;
        height: 50px;
    }
    .logo span {
        font-size: 17px;
    }
    img {
        width: 100%;
        height: 100%;
    }
    .left-float {
        display: inline-block;
        height: 100%;
        font-size: 17px;
        margin-left: 20px;
    }
    .task-btn,.ccp-btn,.manager-btn,.quiz-btn {
        display: inline-block;
        width: 84px;;
        height: 100%;
        background-repeat: no-repeat;
        background-position: left center;
        font-size: 14px;
        text-align: right;
    }
    .task-btn {
        background-image: url('./../../public/font-images/taskcenter_icon.png');
    }
    .ccp-btn {
        background-image: url('./../../public/font-images/header-ccp-normal.png');
    }
    .manager-btn {
        background-image: url('./../../public/font-images/icon-manager.png');
    }
    .quiz-btn {
        background-image: url('./../../public/font-images/icon-question.png');
    }
    .vertical-bar {
        width: 0;
        height: 15px;
        border-right: silver 1px solid;
    }
    .user {
        display: flex;
        width: 260px;
        height: 100%;
        line-height: 50px;
        margin-left: 40px;
    }
    .user .user-img {
        width: 40px;
        height: 40px;
        margin-top: 5px;
        border-radius: 50%;
        overflow: hidden;
    }
    .user .user-img img {
        vertical-align: top;
    }
    .user .user-name {
        width: 150px;
        height: 100%;
        line-height: 50px;
        margin-left: 10px;
        color: orangered;
        font-size: 16px;
    }
    .user .login-out {
        font-size: 16px;
    }
</style>
