<template>
    <div class="resource-list">
        <ul class="list-items">
            <li class="resource-item" v-for="item in options" v-bind:key="item.rId">
                <a href="javascript:void(0)" @click="lookResource(item.rUrl,item.rScore,item.rId)" class="res-data">
                    <div class="resource-img">
                        <img src="./../../public/class-images/icon_res_link@2x.png" alt="资源项">
                    </div>
                    <div class="resource-info">
                        <div class="title">
                            <p>{{ item.rName }}</p>
                        </div>
                        <div class="time"><span>{{ item.rCreatetime }}</span></div>
                    </div>
                    <div v-if="!classType" class="del-resource">
                        <a href="javascript:void(0)" @click="delRes(item.rId)">删除</a>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import _session from '@/session/index'

export default {
    name: 'Resource',
    props: {
        options: {
            type: Array
        }
    },
    data() {
        return {
            userEmail: ''
        }
    },
    created() {
        this.userEmail = _session.getUserName();
    },
    computed: {
        // 判断该班课是否为自己加入的班课
        classType() {
            return this.$route.query.cl == 'join';
        }
    },
    methods: {
        // 删除已添加的资源
        delRes(keyVal) {
            this.$axios.post('/resource/del?r_id='+keyVal)
            .then(res => {
                if(res.data.msg == '1') {
                    alert("删除资源成功");
                    history.go(0);
                } else {
                    alert("删除资源失败");
                }
            })
            .catch(error => {
                console.log(error);
            })
        },

        // 查看资源
        lookResource(urlVal,scoreVal,rId) {
            if(this.classType) {
                if(urlVal.search("www.") != -1 || urlVal.search("http") != -1) {
                    let url = urlVal.substring(0,4) == "http" ? urlVal : "http://"+urlVal;
                    this.$axios.post('/resource/download?url='+urlVal+"&num="+scoreVal+"&c_id="+this.$route.query.classVal+"&u_id="+this.userEmail+"&r_id="+rId)
                    .then(res => {
                        console.log(res);
                        window.open(url);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                } else {
                    window.open("http://47.102.195.147/resource/download?url="+urlVal+"&num="+scoreVal+"&c_id="+this.$route.query.classVal+"&u_id="+this.userEmail+"&r_id="+rId);
                }
            }
        }
    }
}
</script>

<style scoped>
    ul {
        display: block;
        padding: 0;
        margin: 0;
    }
    p {
        color: #000;
    }
    span {
        color: #666;
    }
    .resource-list {
        width: 100%;
        min-height: 460px;
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
    }
</style>
