<template>
  <div class="container">
    <div id="login" class="form">
      <div class="form-item">
        <!-- <span class="form-label">用户名</span> -->
        <input v-model="username" type="text" class="form-input" placeholder="用户名">
      </div>
      <div class="form-item">
        <!-- <span class="form-label">密码</span> -->
        <input v-model="password" type="password" class="form-input" placeholder="密码">
      </div>
      <div class="form-item">
        <button class="button-login" @click="handleLogin">
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  layout: 'default',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async handleLogin () {
      try {
        const _username = this.username
        const _password = window.btoa(this.password)
        const res = await this.$axios.$post('/api/user/login', {
          username: _username,
          password: _password
        })
        if (res.code === 200) {
          // 登录成功
        } else {
          console.log(res.message)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/color.scss';
.container {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    .form-item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      width: 300px;
      .form-label {
        width: 60px;
        text-align: right;
        margin-right: 12px;
        color: $color-title;
      }
      .form-input {
        flex: 1;
        border: none;
        font-size: 14px;
        padding: 8px 12px;
        background-color: transparent;
        border-bottom: 1px solid $color-border;
        color: $color-text;
        transition: transform 0.2s linear;
        &::placeholder {
          color: $color-text;
        }
        &:focus {
          color: $color-main;
          border-bottom: 1px solid $color-main;
          &::placeholder {
            color: $color-main;
          }
          transform: scale(1.05)
        }
      }
      .button-login {
        flex: 1;
        margin-top: 18px;
        height: 32px;
        border: none;
        background-color: $color-main;
        border-radius: 4px;
        color: #fff;
        font-size: 15px;
        font-weight: 400;
        &:hover {
          opacity: 0.95;
        }
        &:active {
          opacity: 0.85;
        }
      }
    }
  }
}
</style>
