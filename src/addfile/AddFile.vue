<!--
 * @Description: 显示发布的所有资源
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-16 17:23:11
 * @LastEditTime: 2019-03-24 19:37:21
 -->

<template>
    <div class="add">
        <div class="add-head">
            <div v-if="!classType" class="add-list-item">
                <div class="local-item"><a href="javascript:void(0)" @click="goLocal" class="local-img">本地文件</a></div>
                <div class="net-item"><a href="javascript:void(0)" @click="goNet" class="net-img">网页链接</a></div>
            </div>
            <div class="add-warn" v-if="wran">
                <div class="img-warn">
                    <img src="./../../public/class-images/resource-empty.png" alt="点击上方图标上传资源">
                </div>
                <p>快点击上方相应的图标</p>
                <p>为你的班课上传资源，展开教学吧～</p>
                <span>小秘密：上传资源后，你需要将资源发布出去，学生才会看到哦。</span>
            </div>
            <Resource :options="resList" v-if="!wran"></Resource>
        </div>
    </div>
</template>

<script>
import Resource from '@/create/Resource'

export default {
    name: 'AddFile',
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
                path: '/home/manage-create/local',
                query: {
                    classVal: this.$route.query.classVal
                }
            });
        },
        // 跳转至添加网页链接页面
        goNet() {
            this.$router.push({
                path: '/home/manage-create/net',
                query: {
                    classVal: this.$route.query.classVal
                }
            });
        }
    },
    components: {
        Resource
    }
}
</script>

<style scoped>
    ul {
        display: block;
        padding: 0;
        margin: 0;
    }
    .add {
        width: 100%;
        min-height: 600px;
        padding-bottom: 30px;
        background-color: #f5f5f5;
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
    }
    .add-head {
        width: 980px;
        min-height: 510px;
        background-color: #fff;
        margin: 40px auto 0;
    }
    .add-list-item {
        display: flex;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #e1e1e1;
    }
    .local-item,.net-item {
        width: 100px;
        height: 50px;
        text-align: center;
        margin: 0 10px 0 10px;
        line-height: 50px;
    }
    .local-img,.net-img {
        display: inline-block;
        width: 80px;
        height: 50px;
        background-repeat: no-repeat;
        background-position: left center;
        text-align: right;
    }
    .local-img {
        background-image: url('./../../public/font-images/res-file.png');
    }
    .net-img {
        background-image: url('./../../public/font-images/res-link.png');
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
    /* .resource-list {
        width: 100%;
        height: 460px;
        padding: 0 20px 0;
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
    } */
</style>
