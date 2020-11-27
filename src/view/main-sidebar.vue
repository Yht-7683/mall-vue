<template>
  <aside class="site-sidebar" width="200px">
    <div class="site-sidebar__inner" style=" background-color:#263238">
      <el-menu
        :default-active="menuActiveName || 'home'"
        :collapseTransition="false"
        class="site-sidebar__menu"
        background-color="#263238"
        text-color="#8a979e"
        active-text-color="#ffff"
      >
        <el-menu-item index="home" @click="$router.push({ name: 'home' })">
          <span slot="title">首页</span>
        </el-menu-item>
        <sub-menu
          v-for="menu in menuList"
          :key="menu.menuId"
          :menu="menu"
          :dynamicMenuRoutes="dynamicMenuRoutes">
        </sub-menu>
      </el-menu>
    </div>
  </aside>
</template>

<script>
  import SubMenu from './main-sidebar-sub-menu'
  import {isURL} from "../utils/validate";
  export default {
    data () {
      return {
        dynamicMenuRoutes: []
      }
    },
    components: {
      SubMenu
    },
    computed: {
      menuList: {
        get () { return this.$store.state.common.menuList },
        set (val) { this.$store.commit('common/updateMenuList', val) }
      },
      menuActiveName: {
        get () { return this.$store.state.common.menuActiveName },
        set (val) { this.$store.commit('common/updateMenuActiveName', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      mainTabsActiveName: {
        get () { return this.$store.state.common.mainTabsActiveName },
        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      }
    },
    watch: {
      $route: 'routeHandle'
    },
    created () {
      this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
      this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
      this.routeHandle(this.$route)
    },
    methods: {
      // 路由操作
      routeHandle (route) {
        if (route.meta.isTab) {
          // tab选中, 不存在先添加
          var tab = this.mainTabs.filter(item => item.name === route.name)[0]
          if (!tab) {
            if (route.meta.isDynamic) {
              route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
              if (!route) {
                return console.error('未能找到可用标签页!')
              }
            }
            tab = {
              menuId: route.meta.menuId || route.name,
              name: route.name,
              title: route.meta.title,
              type: isURL(route.meta.iframeUrl) ? 'iframe' : 'module',
              iframeUrl: route.meta.iframeUrl || '',
              params: route.params,
              query: route.query
            }
            this.mainTabs = this.mainTabs.concat(tab)
          }
          this.menuActiveName = tab.menuId + ''
          this.mainTabsActiveName = tab.name
        }
      }
    }
  }
</script>
<style>
  .site-sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    z-index: 1020;
    width: 230px;
    overflow: hidden;
  }
  .site-sidebar__inner {
    overflow: initial;
    position: relative;
    z-index: 1;
    width: 250px;
    height: 100%;
    padding-bottom: 15px;
    overflow-y: scroll;
    text-align: left;
  }
  .site-sidebar__menu {
    width: 230px;
    border-right: 0;
  }
</style>
