<!--
 * @Description: 任务列表组件
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-30 13:47:03
 * @LastEditTime: 2019-03-30 15:40:44
 -->

<template>
    <div class="issue">
        <div class="issue-head">
            <div v-if="!classType" class="issue-list-item">
                <div class="local-item"><a href="javascript:void(0)" @click="goLocal" class="local-img">发布任务</a></div>
            </div>
            <div class="add-warn" v-if="wran">
                <div class="img-warn">
                    <img src="./../../public/class-images/resource-empty.png" alt="点击上方图标上传资源">
                </div>
                <p>快点击上方相应的图标</p>
                <p>为你的班课上传资源，展开教学吧～</p>
                <span>小秘密：上传资源后，你需要将资源发布出去，学生才会看到哦。</span>
            </div>
            <IssueResource :options="resList" v-if="!wran"></IssueResource>
        </div>
    </div>
</template>

<script>
import IssueResource from './IssueResource'

export default {
    name: 'Issue',
    data() {
        return {
            wran: false,
            resList: []     // 保存资源
        }
    },
    created() {
        const loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 获取所有资源列表
        this.$axios.post('/resource/course/list?c_id='+this.$route.query.classVal)
        .then(res => {
            console.log(res);
            this.resList = res.data;
            this.wran = this.resList.length > 0 ? false : true; 
            loading.close();
        })
        .catch(error => {
            console.log(error);
        });
    },
    computed: {
        classType() {
            return this.$route.query.cl == 'join';
        }
    },
    methods: {
        // 跳转至添加本地文件页面
        goLocal() {
            this.$router.push({
                path: '/home/manage-create/up-issue',
                query: {
                    classVal: this.$route.query.classVal
                }
            });
        }
    },
    components: {
        IssueResource
    }
}
</script>

<style scoped>
    ul {
        display: block;
        padding: 0;
        margin: 0;
    }
    .issue {
        width: 100%;
        min-height: 600px;
        padding-bottom: 30px;
        background-color: #f5f5f5;
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
    }
    .issue-head {
        width: 980px;
        min-height: 510px;
        background-color: #fff;
        margin: 40px auto 0;
    }
    .issue-list-item {
        display: flex;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #e1e1e1;
    }
    .local-item {
        width: 100px;
        height: 50px;
        text-align: center;
        margin: 0 10px 0 10px;
        line-height: 50px;
    }
    .local-img {
        display: inline-block;
        width: 80px;
        height: 50px;
        background-repeat: no-repeat;
        background-position: left center;
        text-align: right;
    }
    .local-img {
        background-image: url('./../../public/font-images/create-homework.png');
    }
    .add-warn {
        width: 100%;
        height: 460px;
        padding-top: 85px;
        text-align: center;
    }
    .add-warn .img-warn {
        display: inline-block;
        width: 202px;
        height: 144px;
    }
    span {
        color: #9ba5c3;
    }
    .add-warn p:nth-of-type(1) {
        margin-top: 30px;
    }
    .add-warn p:nth-last-of-type(1) {
        margin-bottom: 50px;
    }
</style>