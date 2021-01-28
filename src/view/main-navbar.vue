<template>
  <nav class="site-navbar">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
        商城后台管理系统
      </h1>
    </div>
    <div class="site-navbar__body">
      <el-menu
        class="site-navbar__menu--right"
        mode="horizontal">
        <el-menu-item index="2">
            <a href="https://github.com/Yht-7683/" target="_blank">个人github</a>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">github源码</template>
          <el-menu-item index="3-1"><a href="https://github.com/Yht-7683/mall-vue" target="_blank" style="color: #A3A5A6">管理系统前端</a></el-menu-item>
          <el-menu-item index="3-2"><a href="https://github.com/Yht-7683/mall-vue" target="_blank" style="color: #A3A5A6">商城前端</a></el-menu-item>
          <el-menu-item index="3-3"><a href="https://github.com/Yht-7683/mall_back" target="_blank" style="color: #A3A5A6">商城后端</a></el-menu-item>
        </el-submenu>
        <el-menu-item class="site-navbar__avatar" index="3">
          <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
                <img src="~@/assets/img/1.jpg" :alt="userName">{{ userName }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </nav>
</template>

<script>
  import UpdatePassword from './main-navbar-update-password'
  import { clearLoginInfo } from '@/utils'
  export default {
    data () {
      return {
        updatePassowrdVisible: false
      }
    },
    components: {
      UpdatePassword
    },
    computed: {
      userName: {
        get () { return this.$store.state.user.name }
      }
    },
    methods: {
      // 修改密码
      updatePasswordHandle () {
        this.updatePassowrdVisible = true
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init()
        })
      },
      // 退出
      logoutHandle () {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/logout'),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 0) {
              clearLoginInfo()
              this.$router.push({ name: 'login' })
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>
<style>
  .site-navbar {
    position: fixed;
    /*display: block;*/
    top: 0;
    right: 0;
    left: 0;
    z-index: 1028;
    height: 60px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .08);
    background-color:#F57215;
  }

  .site-navbar__menu--right{
    float: right;
    top: 0px;
    margin-right: 20px;
    height: 100%;
  }
  .site-navbar__body{
    position: relative;
    margin-left: 230px;
    margin-right: 0;
    padding-right: 15px;
    top: 0px;
    height: 60px;
    background-color: #fff;
  }

  .site-navbar__header {
    position: relative;
    float: left;
    width: 220px;
    height: 60px;
    overflow: hidden;
  }
  .site-navbar__brand {
    display: table-cell;
    vertical-align: middle;
    width: 230px;
    height: 50px;
    margin: 0;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;
    color: #fff;
  }
  a{
    text-decoration: none;
  }
 .el-dropdown-link img {
    vertical-align: middle;
    width: 40px;
    border-radius: 25px;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
  }
</style>

