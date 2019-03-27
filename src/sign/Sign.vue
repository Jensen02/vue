<template>
    <div class="sign">
        <div class="sign-data">
            <div class="form-group">
                <input type="text" v-model="input" class="form-control sign-num" id="exampleInputEmail1" placeholder="请输入签到码进行签到">
            </div>
            
            <el-row class="btn-top">
                <el-button type="primary" @click="signSelf">点击签到</el-button>
                <el-button @click="goResource">取消签到</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
import _formCheck from '@/validate/index'
import _session from '@/session/index'

export default {
    data() {
        return {
            input: '',
            userEmail: ''
        }
    },
    created() {
        this.userEmail = _session.getUserName();
    },
    methods: {
        signSelf() {
            if(_formCheck.signCheck(this.input)) {
                this.$axios.post('/signer/update?mark='+this.input+"&u_email="+this.userEmail+"&c_id="+this.$route.query.classVal)
                .then(res => {
                    console.log(res.data);
                    if(res.data.msg == "1") {
                        alert("恭喜你，签到成功");
                    } else {
                        alert("签到失败");
                    }
                    this.$router.push({
                        path: '/home/class-join/sign-list',
                            query: {
                                cl: this.$route.query.cl,
                                classVal: this.$route.query.classVal
                            }
                    });
                    // if(res.data.msg == "1") {
                    //     alert("恭喜你，签到成功");
                    //     console.log(res);
                    //     this.$router.push({
                    //         path: '/home/class-join/sign-list',
                    //             query: {
                    //                 cl: this.$route.query.cl,
                    //                 classVal: this.$route.query.classVal
                    //             }
                    //     });
                    //     console.log("24431");
                    // }
                })
                .catch(error => {
                    console.log(error);
                });
            } else {
                alert("请检查签到码是否输入错误");
            }
        },
        goResource() {
            this.$router.push({
                path: '/home/class-join/sign-list',
                    query: {
                        cl: this.$route.query.cl,
                        classVal: this.$route.query.classVal
                    }
            });
        }
    }
}
</script>

<style scoped>
    .sign {
        width: 100%;
        height: 600px;
        padding-bottom: 30px;
        background-color: #f5f5f5;
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
    }
    .sign-data {
        width: 980px;
        height: 500px;
        padding: 60px 240px 0;
        background-color: #fff;
        text-align: center;
        margin: 40px auto 0;
    }
    .sign-num {
        text-align: center;
        margin-bottom: 45px;
    }
    .btn-top {
        margin-top: 80px;
        text-align: center;
    }
    .sign-text {
        margin-bottom: 60px;
    }
</style>
