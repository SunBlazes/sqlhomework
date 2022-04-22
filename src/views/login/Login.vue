<template>
  <div class="login">
    <el-form
      ref="form"
      :model="form"
      label-width="90px"
      class="form"
      label-position="left"
      :rules="rules"
      :status-icon="true"
    >
      <h1 class="header">LOGIN</h1>
      <el-form-item label="用户名" prop="user_name">
        <el-input v-model="form.user_name" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="user_pwd">
        <el-input v-model="form.user_pwd" clearable type="password"></el-input>
      </el-form-item>
      <div class="submit-btn" @click="onSubmit">
        SUBMIT
      </div>
      <router-link to="/register" class="jump_register">
        REGISTER
      </router-link>
    </el-form>
  </div>
</template>

<script lang="ts">
import Login from "./Login";
export default Login;
</script>
<style lang="less" scoped>
@import "./Login.less";
</style>
