<!-- 登陆页面 -->
<template>
    <div class="child-vhc wrapper--login">
        <div class="form--login">
            <el-form ref="formLogin" :model="formLogin" :rules="rules">
                <div class="loginheader">荣济科技后台管理系统</div>
                <el-form-item prop="username">
                    <el-input v-model="formLogin.username"></el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input v-model="formLogin.pwd" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitLoginForm">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {mapMutations, mapState, mapActions} from 'vuex'

import {BASE_URL} from '@/public/constant'
import {loginAPI} from '@/api/globalAPI'

export default {
    name: 'HelloWorld',
    data() {
        return {
            codeImg: null,
            formLogin: {
                username: '',
                pwd: '',
                code: ''
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }
                ],
                pwd: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }
                ],
            },
        };
    },
    methods: {

        /**
         * 提交登陆操作
         */
        submitLoginForm() {
            const formLogin = {
                ...this.formLogin
            }
            this.$refs.formLogin.validate(valid => {
                if (valid) {
                    loginAPI(formLogin).then(res => {
                        const {code, data, message} = res.data
                        console.log(res.data)
                        console.log(code)
                        if (code === 200) {
                            var millisecond = new Date().getTime();
                            var expiresTime = new Date(millisecond +60*60 * 1000);
                            // console.log(expiresTime)
                            // Cookies.set('token', 'value', {
                            //     expires: expiresTime,
                            // });
                            // document.cookie = "token="+  data.token + ";expires=" + expiresTime.toGMTString();
                            // sessionStorage.setItem('token', data.token)
                            // localStorage.setItem('tokendate',expiresTime)
                            localStorage.setItem('token', data.token)
                            // localStorage.setItem('rid', data.tid)
                            // localStorage.setItem('username', formLogin.username)

                            this.$message({type: 'success', message: '登陆成功！'})
                            // 改变登录状态为已登录
                            this
                                .$store
                                .commit('moduleLogin/login')
                            // 跳转到应用
                            this
                                .$router
                                .push('/')
                        } else {
                            this.$message({type: 'error', message: message})
                        }
                    })
                }
            })
           
        }
    },
    mounted() {
    }
}
</script>

<style scoped="scoped" lang="less">
    .wrapper--login {
        width: 100%;
        min-height: 500px;
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("../assets/images/bg.jpg") center no-repeat;
        background-size: cover;
    }
    .form--login {
        width: 400px;
        min-height: 200px;
        padding: 30px 20px;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 6px;
    }
    .captcha--wrapper {
        height: 40px;

        img {
            height: 100%;
            background: #fff;
        }
    }
    .loginheader{
        font-size: 30px;
        text-align: center;
        margin: 10px auto;
        color: #fff;
    }
</style>