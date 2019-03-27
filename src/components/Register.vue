<template>
    <div class="login-bg">
        <div class="register form-horizontal">
            <h2>用户注册</h2>
            <div class="form-group has-feedback">
                <label class="control-label col-sm-3" for="inputSuccess3">用户名</label>
                <div class="col-sm-9">
                    <input type="text" v-model="userName" class="form-control" id="inputSuccess3" @change="userNameCheck" placeholder="请输入5~20位由中文、字母、数字组成的用户名" aria-describedby="inputSuccess3Status">
                    <span class="glyphicon glyphicon-remove form-control-feedback" 
                    v-show="!reg.userName" aria-hidden="true"></span>
                </div>
                <div class="col-sm-9 warn-msg">
                    <span v-show="!reg.userName">用户名格式错误</span>
                </div>
            </div>

            <div class="form-group has-feedback">
                <label class="control-label col-sm-3" for="inputSuccess3">邮箱</label>
                <div class="col-sm-9">
                    <input type="email" v-model="email" class="form-control" id="inputSuccess3" @change="emailCheck" placeholder="请输入邮箱地址" aria-describedby="inputSuccess3Status">
                    <span class="glyphicon glyphicon-remove form-control-feedback" v-show="!reg.email" aria-hidden="true"></span>
                </div>
                <div class="col-sm-9 warn-msg">
                    <span v-show="!reg.email">邮箱格式错误</span>
                </div>
            </div>

            <div class="form-group has-feedback">
                <label class="control-label col-sm-3" for="inputSuccess3">密码</label>
                <div class="col-sm-9">
                    <input type="password" v-model="password" placeholder="请输入8~20位由数字和字母组成的密码" class="form-control" id="inputSuccess3" @change="passwordCheck" aria-describedby="inputSuccess3Status">
                    <span class="glyphicon glyphicon-remove form-control-feedback" v-show="!reg.password" aria-hidden="true"></span>
                </div>
                <div class="col-sm-9 warn-msg">
                    <span v-show="!reg.password">密码长度太短或格式错误</span>
                </div>
            </div>

            <div class="form-group has-feedback">
                <label class="control-label col-sm-3" for="inputSuccess3">再次输入密码</label>
                <div class="col-sm-9">
                    <input type="password" class="form-control" id="inputSuccess3" v-model="secpass" @change="secPass" aria-describedby="inputSuccess3Status">
                    <span class="glyphicon glyphicon-remove form-control-feedback" v-show="!reg.secpass" aria-hidden="true"></span>
                </div>
                <div class="col-sm-9 warn-msg">
                    <span v-show="!reg.secpass">两次输入密码不同，请重新输入</span>
                </div>
            </div>

            <div class="form-group has-feedback">
                <label class="control-label col-sm-3" for="inputSuccess3">验证码</label>
                <div class="col-sm-9">
                    <input type="text" v-model="code" class="form-control security-code" id="inputSuccess3" aria-describedby="inputSuccess3Status">
                    <button type="button" @click="getCode" class="btn btn-primary">获取验证码</button>
                </div>
            </div>

            <div class="submit">
                <button type="button" @click="jump" class="btn btn-primary">登录</button>
                <button type="button" @click="onSubmit" class="btn btn-primary">注册</button>
            </div>
        </div>
    </div>
</template>

<script>
    import FormCheck from '@/validate/index'

    export default {
        name: 'Register',
        data() {
            return {
                userName: '',       // 保存用户名
                email: '',          // 保存用户邮箱
                password: '',       // 保存用户输入密码
                secpass: '',        // 保存第二次输入密码，用于和第一次输入密码比对，看是否相同
                code: '',           // 保存验证码
                
                // 同来判断用户输入的信息是否通过校验
                reg: {
                    userName: true,
                    email: true,
                    password: true,
                    secpass: true
                }
            }
        },
        methods: {
            // 点击注册按钮,注册个人信息
            onSubmit() {

                this.$axios.post('/user/add?uEmail='+this.email+'&uName='+this.userName+'&uPassword='+this.password+'&code='+this.code).then(res => {
                    if(res.data.msg == "注册成功") {
                        this.$router.replace('/login');
                    } else {
                        alert("邮箱或验证码错误");
                    }
                }).catch(error => {
                    console.log(error);
                });
            },

            // 跳转至登录页面
            jump() {
                this.$router.push('/login');
            },

            // 获取验证码
            getCode() {
                this.$axios.post('/user/validate?uEmail='+this.email).then(res => {
                    alert(res.data.msg);
                }).catch(error => {
                    console.log(error);
                });
            },

            // 校验用户名
            userNameCheck() {
                this.reg.userName = FormCheck.userNameCheck(this.userName);
            },

            // 校验密码
            passwordCheck() {
                this.reg.password = FormCheck.passwordCheck(this.password);
            },

            // 校验邮箱
            emailCheck() {
                this.reg.email = FormCheck.checkEmail(this.email);
            },

            // 检测与第一次输入密码是否相同
            secPass() {
                this.reg.secpass = (this.password == this.secpass ? true : false);
            }
        }
    }   
</script>

<style>
    .login,.register {
        width: 580px;
        border: 1px silver solid;
        box-shadow: 0 0 10px silver;
        margin: 50px auto 0 510px;
        padding: 15px 20px;
        border-radius: 5px;
        background-color: #fff;
    }
    .submit {
        padding-top: 30px;
        text-align: center;
    }
    .warn-msg {
        float: right;
        height: 30px;
        padding-top: 10px;
        color: red; 
    }
    /* .warn-msg span {
        display: none;
    } */
    .security-code {
        display: inline-block;
        width: 60%;
    }
</style>
