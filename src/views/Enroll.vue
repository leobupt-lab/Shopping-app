<template>
<div class="wrapper">
    <img src="../assets/login.png" alt="" class="wrapper__img">
    <div class="wrapper__input">
        <input class="content1" placeholder="请输入账号" v-model="username"/>
    </div>
    <div class="wrapper__input">
        <input type="password" class="content2" placeholder="请输入密码" v-model="password"/>
    </div>
    <div class="wrapper__input">
        <input type="password" class="content3" placeholder="请确认密码" v-model="ensurepass"/>
    </div>
    <div class="login" @click = "handleEnroll">注册</div>
    <div class="enroll" @click = "toLogin">已有账号，去登陆</div>
    <Toast v-if="showToast" :message="toastMessage"/>
</div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import Toast, { useToastEffect } from './Toast.vue'
import { post } from '../utills/request.js'

export default {
  name: 'Login',
  components: { Toast },
  setup () {
    const router = useRouter()
    const data = reactive({
      username: '',
      password: '',
      ensurepass: ''
    })

    const { showToast, show, toastMessage } = useToastEffect()

    const handleEnroll = async () => {
      try {
        const res = await post('/api/user/register', {
          username: data.username,
          password: data.password,
          ensurepass: data.ensurepass
        })
        if (res?.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          show('注册失败')
        }
      } catch (e) {
        show('请求失败')
      }
    }
    const toLogin = () => {
      router.push({ name: 'Login' })
    }

    const { username, password, ensurepass } = toRefs(data)
    return { handleEnroll, toLogin, username, password, ensurepass, showToast, show, toastMessage }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    &__img {
        display: block;
        margin: 0 auto 40px auto;
        width: 66px;
        height: 66px;
    }
    &__input {
        height: 48px;
        margin: 0 40px 16px 40px;
        background: #F9F9F9;
        border: 1px solid rgba(0,0,0,0.10);
        border-radius: 6px;
        border-radius: 6px;
        .content1{
            position: absolute;
            top: 106px;
            left: 65px;
            line-height: 48px;
            font-size: 16px;
            border: none;
            outline: none;
            width: 100%;
            background:none;
            &::placeholder {
                color: rgba(0,0,0,0.50)
            }
        }
        .content2 {
            position: absolute;
            top: 172px;
            left: 65px;
            line-height: 48px;
            font-size: 16px;
            border: none;
            outline: none;
            width: 100%;
            background:none;
            &::placeholder {
                color: rgba(0,0,0,0.50)
            }
        }
        .content3 {
            position: absolute;
            top: 237px;
            left: 65px;
            line-height: 48px;
            font-size: 16px;
            border: none;
            outline: none;
            width: 100%;
            background:none;
            &::placeholder {
                color: rgba(0,0,0,0.50)
            }
        }
    }
    .login {
        text-align: center;
        line-height: 48px;
        margin: 32px auto 0 auto;
        width: 295px;
        height: 48px;
        background-color: #0091FF;
        box-shadow:0 4px 8px 0 rgba(0,145,255,0.32);
        font-size: 16px;
        border-radius: 4px;
        color: #FFFFFF ;
    }
    .enroll {
        text-align: center;
        font-size: 14px;
        color: #000000 ;
        opacity: 50%;
        margin: 16px auto auto auto;
    }
}
</style>
