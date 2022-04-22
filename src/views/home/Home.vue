<template>
  <el-container class="home">
    <el-header>
      <h1>Welcome {{ user_name }}</h1>
      <router-link to="/user/home/setting" class="tosetting">设置</router-link>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <el-menu
          :default-active="menu.defaultActive"
          :collapse="menu.isCollapsed"
          background-color="rgba(170,75,107,.2)"
          active-text-color="#fff"
          router
          :default-openeds="menu.defaultOpeneds"
        >
          <el-submenu :index="menu.indexArr[0]">
            <template slot="title">
              <i class="el-icon-user-solid title_icon"></i>
              <span slot="title" class="title_text ">
                MY
              </span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/user/home/my">我的音乐</el-menu-item>
              <el-menu-item index="/user/home/upload">上传音乐</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu :index="menu.indexArr[1]">
            <template slot="title">
              <i class="el-icon-s-data title_icon"></i>
              <span slot="title" class="title_text ">
                Bank
              </span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/user/home/music_bank">音乐库</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer><my-audio /></el-footer>
    <play-bg />
  </el-container>
</template>

<script lang="ts">
import Home from "./Home";
export default Home;
</script>

<style scoped lang="less">
@import "./Home.less";
</style>
