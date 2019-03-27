<!--
 * @Description: 输入签到信息
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-18 19:58:20
 * @LastEditTime: 2019-03-21 18:38:25
 -->

<template>
    <div class="sign">
        <div class="sign-data">
            <div class="form-group">
                <input type="text" v-model="input" @change="checkSign" class="form-control sign-num" id="exampleInputEmail1" placeholder="请输入由4位数字组成的签到码">
            </div>
            <el-input
            class="sign-text"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入签到描述"
            @change="checkText"
            v-model="textarea">
            </el-input>
            <el-select v-model="value" clearable placeholder="请选择签到时常">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-row class="btn-top">
                <el-button type="primary" @click="issueSign">发布签到</el-button>
                <el-button @click="goResouce">取消发布</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
import _formCheck from '@/validate/index'

export default {
    data() {
        return {
            input: '',
            options: [{
                value: '2',
                label: '2分钟'
                }, {
                value: '3',
                label: '3分钟'
                }, {
                value: '4',
                label: '4分钟'
                }, {
                value: '5',
                label: '5分钟'
                }],
            value: '',
            textarea: ''
        }
    },
    methods: {
        checkSign() {
            if(!_formCheck.signCheck(this.input)) {
                alert("签到码输入错误，请重新输入4位由数字组成的签到码");
            }
        },
        checkText() {
            if(!_formCheck.signText(this.textarea)) {
                alert("签到描述输入错误，请重新输入2~30位由中文、数字、字母组成的签到签到描述");
            }
        },
        // 点击发布签到按钮，发布签到
        issueSign() {
            if(this.value && _formCheck.signCheck(this.input) && _formCheck.signText(this.textarea)) {
                this.$axios.post('/sign/add?mark='+this.input+"&time="+this.value+"&desc="+this.textarea+"&c_id="+this.$route.query.classVal)
                .then(res => {
                    if(res.data.msg == "1") {
                        alert("签到发布成功");
                        this.$router.push({
                            path: '/home/manage-create/sign-list',
                            query: {
                                classVal: this.$route.query.classVal
                            }
                        });
                    } else if(res.data.msg == "请等待上一签到结束或结束上一签到") {
                        alert("请等待上一签到结束或删除上一签到");
                        this.$router.push({
                            path: '/home/manage-create/sign-list',
                            query: {
                                classVal: this.$route.query.classVal
                            }
                        });
                    } else {
                        alert("签到发布失败");
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            } else {
                alert("请检查签到码、签到时常、签到描述是否输入错误");
            }
        },
        // 取消签到发布，前往资源列表页面
        goResouce() {
            this.$router.push({
                path: '/home/manage-create/add',
                query: {
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
