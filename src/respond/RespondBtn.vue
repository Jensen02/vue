<!--
 * @Description: 学生抢答
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-21 18:47:26
 * @LastEditTime: 2019-03-31 21:16:59
 -->

<template>
    <div class="sign">
        <div class="sign-list">
            <div class="respond-que">
                <h4>抢答问题：</h4>
                <span>{{ this.question }}</span>
            </div>
            <div class="sign-btn">
                <el-row>
                    <el-button type="primary" plain v-if="success" class="btn-top" @click="goSelfSign">参加抢答</el-button>
                    <el-button type="primary" plain v-else disabled>参加抢答</el-button>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import _session from '@/session/index'

export default {
    name: 'RespondBtn',
    data() {
        return {
            question: '',
            userEmail: '',
            success: true
        }
    },
    methods: {
        // 获取抢答问题
        getQuestion() {
            this.$axios.post('/responder/info?c_id='+this.$route.query.classVal)
            .then(res => {
                this.question = res.data.msg;
            })
            .catch(error => {
                console.log(error);
            });
        },
        
        // 学生抢答
        goSelfSign() {
            this.$axios.post('responder/mutex?c_id='+this.$route.query.classVal+"&uId="+this.userEmail)
            .then(res => {
                if(res.data.msg == "1") {
                    this.success = false;
                    alert("恭喜你，抢答成功~~~");
                } else {
                    alert("抢答失败");
                }
                history.go(0);
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    created() {
        this.userEmail = _session.getUserName();

        // 判断是否有抢答
        this.$axios.post('/responder/have?c_id='+this.$route.query.classVal)
        .then(res => {
            if(res.data.msg == "1") {
                this.getQuestion();
            } else {
                this.success = false;
                alert("老师暂时没有发布抢答");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
}
</script>

<style scoped>
    h4 {
        display: inline-block;
    }
    span {
        color: #666;
    }
    .sign {
        width: 100%;
        padding-bottom: 60px;
        background-color: #f5f5f5;
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
    }
    .sign-list {
        width: 980px;
        min-height: 500px;
        margin: 40px auto 0;
        background-color: #fff;
        padding: 0 20px 30px;
    }
    .sign-btn {
        width: 150px;
        height: 150px;
        margin: 20px;
        padding-top: 10px;
    }
    .respond-que {
        height: 70px;
        padding-top: 15px;
    }
    @keyframes back-btn {
        0% {
            background-color: #f0e84f;
        }
        10% {
            background-color: #87ee3c;
        }
        20% {
            background-color: #57f94f;
        }
        30% {
            background-color: #7beed1;
        }
        40% {
            background-color: #5bb9f0;
        }
        50% {
            background-color: #4b5cfa;
        }
        60% {
            background-color: #8f7af1;
        }
        70% {
            background-color: #ab71f2;
        }
        80% {
            background-color: #da7ef1;
        }
        90% {
            background-color: #e736ad;
        }
        100% {
            background-color: #f92d51;
        }
    }

</style>


