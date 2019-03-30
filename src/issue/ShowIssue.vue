<!--
 * @Description: 展示任务详情
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-30 13:47:19
 * @LastEditTime: 2019-03-30 16:16:57
 -->

<template>
    <div class="local">
        <div class="add-local">
            <div class="jump">
                <span>当前位置：<a @click="goAdd" href='javascript:void(0)'>任务列表</a> > 任务详情</span>
            </div>
            <div class="net-data">
                <div class="form-group">
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