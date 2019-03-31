<!--
 * @Description: 登录组件
 * @Author: Jensen
 * @LastEditors: Please set LastEditors
 * @Date: 2019-02-20 19:24:36
 * @LastEditTime: 2019-03-19 22:55:43
 -->

<template>
    <div class="login-bg">
        <div class="login form-horizontal">
            <h2>账号登录</h2>
            <div class="form-group has-feedback">
                <label class="control-label col-sm-3" for="inputSuccess3">邮箱</label>           <div class="col-sm-9">
                    <input type="email" v-model="email" class="form-control" id="inputSuccess3"  @change="emailCheck" aria-describedby="inputSuccess3Status">
                    <span class="glyphicon glyphicon-remove form-control-feedback" 
                    v-show="!reg.email" aria-hidden="true"></span>
                </div>
                <div class="col-sm-9 warn-msg">
                    <span v-show="!reg.email">邮箱错误</span>
                </div>
            </div>

            <div class="form-group has-feedback">
                <label class="control-label col-sm-3" for="inputSuccess3">密码</label>
                <div class="col-sm-9">
                    <input type="password" v-model="password" class="form-control" id="inputSuccess3" @change="passwordCheck" @keyup.enter="userLogin" placeholder="请输入8~20位由数字和字母组成的密码" aria-describedby="inputSuccess3Status">
                    <span class="glyphicon glyphicon-remove form-control-feedback" v-show="!reg.password" aria-hidden="true"></span>
                </div>
                <div class="col-sm-9 warn-msg">
                    <span v-show="!reg.password">密码输入错误</span>
                </div>
            </div>

            <button type="button" @click="userLogin" class="btn btn-primary btn-lg btn-block ">登    录</button>
            <ul class="btn-jump">
                <li class="left"><router-link to="/register">账号注册</router-link></li>
                <li class="right"><router-link to="/change">找回密码</router-link></li>
            </ul>
        </div>
    </div>    
</template>

<script>

    import FormCheck from '@/validate/index'
    import _session from '@/session/index'
    import _title from '@/settitle/index'

    export default {
        data() {
            return {
                password: '',
                email: '',
                reg: {
                    email: true,
                    password: true 
                }
            }
        },
        created() {
            _title.setTitle("用户登录");
        },
        methods: {
            // 用户登录
            userLogin() {
                if(this.reg.email && this.reg.password && this.email && this.password) {
                    this.$axios.post('/user/login?uEmail='+this.email+'&uPassword='+this.password).then(res => {
                        if(res.data.msg == "1") {
                            _session.setUserName(this.email);
                            this.$router.replace('/home/content');
                        } else {
                            alert("账号或密码不正确，请重新输入");
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                } else if(this.reg.email && !this.reg.password) {
                    alert("密码校验未通过,请输入正确的密码");
                } else if(!this.reg.email && this.reg.password) {
                    alert("邮箱校验未通过,请输入正确的邮箱地址");
                } else {
                    alert("邮箱和密码校验未通过,请输入正确的邮箱和密码");
                }
            },
            emailCheck() {
                this.reg.email = FormCheck.checkEmail(this.email);
            },
            passwordCheck() {
                this.reg.password = FormCheck.passwordCheck(this.password);
            }
        }
    }
</script>

<style>
    h2 {
        width: 120px;
        margin: 0 auto 30px;
    }
    ul {
        display: flex;
        position: relative;
        list-style: none;
        padding: 0;
        margin-top: 80px;
        margin-bottom: 30px;
    }
    .left,.right {
        position: absolute;
    }
    .left {
        left: 20px;
    }
    .right {
        right: 20px;
    }
    .login-bg {
        background-image: url('./../../public/323448.jpg');
        background-repeat: no-repeat;
        padding-top: 20px;
        height: 700px;
    }
</style>
