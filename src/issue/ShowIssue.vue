<!--
 * @Description: 展示任务详情
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-30 13:47:19
 * @LastEditTime: 2019-03-31 21:11:00
 -->

<template>
    <div class="local">
        <div class="add-local">
            <div class="jump">
                <span>当前位置：<a @click="goAdd" href='javascript:void(0)'>任务列表</a> > 任务详情</span>
            </div>
            <div class="net-data">
                <div class="data-detail">
                    <div class="data-title">
                        <h4>任务主题：</h4>
                        <span>{{ title }}</span>
                    </div>
                    <div class="data-author">
                        <h4>发布者：</h4>
                        <span>{{ userName }}</span>
                    </div>
                    <div class="data-time">
                        <h4>发布时间：</h4>
                        <span>{{ time }}</span>
                    </div>
                </div>
                <div class="data-text">
                    <h4>任务详情：</h4>
                    <p>{{ textarea }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'UpIssue',
    data() {
        return {
            title: '',
            textarea: '',
            time: '',
            userName: ''
        }
    },
    created() {
        this.$axios.post('/task/one?tId='+this.$route.query.rId)
        .then(res => {
            this.textarea = res.data.tContent;
            this.title = res.data.tTitle;
            this.userName = res.data.tName;
            this.time = res.data.tTime;
        })
        .catch(error => {
            console.log(error);
        })
    },
    methods: {
        // 取消上传，前往任务发布页面
        goAdd() {
            this.$router.push({
                path: '/home/class-join/issue',
                query: {
                    cl: this.$route.query.cl,
                    classVal: this.$route.query.classVal
                }
            })
        }
    }
}
</script>
    
<style scoped>
    h4 {
        display: inline-block;
        max-width: 100px;
        font-size: 16px;
        color: #ff8000;
    }
    span {
        display: inline-block;
        font-size: 14px;
        color: #666;
        line-height: 20px;
    }
    p {
        text-indent: 35px;
        font-size: 16px;
    }
    .local{
        min-height: 600px;
        background-color: #f5f5f5;
    }
    .add-local {
        width: 980px;
        margin: 0 auto;
    }
    .add-local .jump {
        height: 50px;
        line-height: 50px;
    }
    .add-local .net-data {
        min-height: 500px;
        background-color: #fff;
        padding: 30px 50px 0;
    }
    .data-detail {
        height: 126px;
        padding-bottom: 10px;
        border-bottom: 1px solid #c1c1c1;
    }
    .data-text {
        padding-top: 10px;
    }
    .data-text h4 {
        font-size: 17px;
    }
</style>