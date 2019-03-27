<!--
 * @Description: 创建班课组件
 * @Author: Jensene
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-09 15:35:37
 * @LastEditTime: 2019-03-20 21:41:14
 -->

<template>
    <div class="create">
        <div class="create-data">
            <span>当前位置：<router-link to="/home/content">班课列表</router-link> > 创建班课</span>
            <div class="create-class-info">
                <div class="data-class-info">
                    <form id="class-info">
                        <!-- <div class="form-group data-info">
                            <label for="exampleInputEmail1">用户邮箱<span>  *</span></label>
                            <input type="email" v-model="userEmail" class="form-control" id="exampleInputEmail1" placeholder="用户邮箱">
                        </div> -->
                        <div class="form-group data-info">
                            <label for="exampleInputEmail1">班级名称<span>  *</span></label>
                            <input type="text" v-model="className" class="form-control" id="exampleInputEmail1" placeholder="班级名称">
                        </div>
                        <div class="form-group data-info">
                            <label for="exampleInputEmail1">课程名称<span>  *</span></label>
                            <input type="text" v-model="bookName" class="form-control" id="exampleInputEmail1" placeholder="课程名称">
                        </div>

                        <!-- 调用图片上传组件，上传图片 -->
                        <UploadImage @upload-image="getSrc"></UploadImage>
                    </form>
                    <div class="btn-create-class">
                        <button type="button" @click="createClass" class="btn btn-primary">创建</button>
                        <button type="button" @click="destrInfo" class="btn btn-default">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import UploadImage from '@/components/UploadImage'
import _session from '@/session/index'

export default {
    data() {
        return {
            userEmail: '',      // 用户邮箱
            className: '',      // 班级名称
            bookName: '',       // 课程名称
            src: null             // 图片src
        }
    },
    computed: {
        imgUrl: function() {
            return window.URL.createObjectURL(this.src);
        }
    },
    created() {
        this.userEmail = _session.getUserName();
    },
    components: {
        UploadImage
    },
    methods: {
        checkName() {
            if(!this.className) {
                alert("班级名称不能为空");
            }
            if(!this.bookName) {
                alert("课程名不能为空");
            }
            if(!this.src) {
                alert("请上传图片");
            }
        },
        // 获取从子组件穿来的图片src
        getSrc(srcValue) {
            this.src = srcValue;
        },

        // 提交班课信息，创建班课
        createClass() {
            if(this.className && this.bookName && this.src) {
                let param = new FormData();
                param.append('cImg',this.src);
                param.append('user',this.userEmail);
                param.append('cName',this.className);
                param.append('cClass',this.bookName);

                this.$axios.post('/course/add',param).then(res => {
                    if(res.data.msg == "1") {
                        alert("创建班课成功");
                        this.$router.push('./content');
                    }
                }).catch(error => {
                    console.log(error);
                })
            } else {
                alert("请检查班课信息是否填写完整");
            }
        },

        // 取消班课创建
        destrInfo() {
            this.userEmail = '';
            this.className = '';
            this.bookName = '';
            this.src = '';
            this.$router.push('/home/content');
        }
    }
}
</script>

<style scoped>
    .create {
        background-color: #ececec;
        padding-top: 30px;
    }
    .create-data {
        width: 980px;
        margin: 0 auto;
    }
    .data-class-info {
        width: 60%;
        margin: 0 auto;
        text-align: left;
    }
    .create-class-info {
        background-color: #fff;
        margin-top: 20px;
        padding-top: 80px;
        text-align: center;
    }
    .data-info {
        margin-bottom: 40px;
    }
    .data-info span {
        color: red;
        font-size: 14px;
    }
    .create-class-info {
        height: 777px;
    }
    .create {
        height: 940px;
    }
    .btn-create-class {
        text-align: center;
    }
</style>
