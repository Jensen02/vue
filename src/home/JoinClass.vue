<!--
 * @Description: 加入班课组件
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-09 15:35:24
 * @LastEditTime: 2019-03-20 21:41:17
 -->

<template>
    <div class="join">
        <div class='join-data'>
            <span>当前位置：<router-link to="/home/content">班课列表</router-link> > 加入班课</span>
            <div class="join-class-number">
                <div class="form-group">
                    <label for="exampleInputEmail1">请输入班课号</label>
                    <input type="text" v-model="classNumber" class="form-control in-class-num" id="exampleInputEmail1" placeholder="请输入要加入的班课号">
                </div>
                <div class="btn-join-class">
                    <button type="button" @click="joinClass" class="btn btn-primary">加入班课</button>
                    <button type="button" @click="reset" class="btn btn-default">取消加入</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import _title from '@/settitle/index'
import _session from '@/session/index'

export default {
    name: 'JoinClass',
    data() {
        return {
            classNumber: ''
        }
    },
    created() {
        console.log(this.$route.query.isCurrentComponent);
        _title.setTitle("加入班课");
    },
    methods: {
        joinClass() {
            let userEmail = _session.getUserName();
            if(userEmail) {
                this.$axios.post('/user/join/course?u_id='+userEmail+'&c_id='+this.classNumber).then(res => {
                    // console.log(res);
                    if(res.data.msg === '1') {
                        alert("成功加入班课");
                        this.$router.push('/home/content');
                    } else {
                        alert("该班课不存在或你已加入,请重新输入");
                    }
                }).catch(error => {
                    console.log(error);
                });
            } else {
                alert("请登录");
                this.$router.replace('./login');
            }
        },
        reset() {
            this.$router.push('/home/content');
        }
    }    
}
</script>

<style scoped>
    .join {
        height: 500px;
        background-color: #ececec;
        padding-top: 30px;
    }
    .join-data {
        width: 980px;
        margin: 0 auto;
    }
    .join-class-number {
        background-color: #fff;
        margin-top: 20px;
        padding-top: 80px;
        text-align: center;
    }
    .join-class-number {
        height: 350px;
    }
    .in-class-num {
        margin: 60px auto 0;
        width: 60%;
    }
    .btn-join-class {
        padding-top: 50px;
    }
</style>
