<!--
 * @Description: 发布任务组件
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-30 13:49:12
 * @LastEditTime: 2019-03-30 15:41:16
 -->

<template>
    <div class="local">
        <div class="add-local">
            <div class="jump">
                <span>当前位置：<a @click="goAdd" href='javascript:void(0)'>任务列表</a> > 发布任务</span>
            </div>
            <div class="net-data">
                <span>发布任务</span>
                <div class="form-group">
                    <label for="exampleInputEmail1">任务名称</label>
                    <input type="text" v-model="title" class="form-control" id="exampleInputEmail1" placeholder="任务名称">
                </div>
                <el-input
                type="textarea"
                :rows="4"
                resize="none"
                placeholder="请输入具体的任务描述"
                @change="checkIssue"
                v-model="textarea3">
                </el-input>
                <div class="net-btn">
                    <button type="button" @click="submitLocal" class="btn btn-primary">发布任务</button>
                    <button type="button" @click="goAdd" class="btn btn-default">取消发布</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _validate from '@/validate/index'
import _session from '@/session/index'

export default {
    name: 'UpIssue',
    data() {
        return {
            title: '',
            textarea3: '',
            userName: ''
        }
    },
    created() {
        this.userName = _session.getUser();
    },
    methods: {
        checkIssue() {
            if(!_validate.issueText(this.textarea3)) {
                alert("任务描述输入错误，请重新输入3~50位字符的任务描述");
            }
        },
        // 发布任务
        submitLocal() {
            if(_validate.issueText(this.textarea3) && this.title && this.userName) {
                this.$axios.post('/task/add?cId='+this.$route.query.classVal+"&tTitle="+this.title+"&tContent="+this.textarea3+"&tName="+this.userName)
                .then(res => {
                    console.log(res);
                    if(res.data.msg == "1") {
                        alert("任务发布成功,即跳转至任务列表页");
                        this.$router.push({
                            path: '/home/manage-create/issue',
                            query: {
                                classVal: this.$route.query.classVal
                            }
                        });
                    } else {
                        alert("任务发布失败");
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            } else {
                alert("请检查任务信息是否填写完整");
            }
        },
        // 取消上传，前往任务发布页面
        goAdd() {
            this.$router.push({
                path: '/home/manage-create/issue',
                query: {
                    classVal: this.$route.query.classVal
                }
            })
        }
    }
}
</script>

<style scoped>
    .local{
        width: 100%;
        min-height: 700px;
        background-color: #f5f5f5;
    }
    .add-local {
        width: 980px;
        margin: 0 auto;
    }
    .add-local .jump {
        width: 100%;
        height: 50px;
        line-height: 50px;
    }
    .add-local .net-data {
        width: 100%;
        height: 600px;
        background-color: #fff;
        padding: 80px 190px 0;
    }
    .add-local .net-data span {
        display: inline-block;
        margin-bottom: 30px;
    }
    .form-group {
        margin-bottom: 30px;
    }
    .net-btn {
        margin-top: 90px;
        text-align: center;
    }
    .up-file {
        margin-top: 80px;
    }
</style>