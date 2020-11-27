<template>
  <main class="site-content">
    <!-- 带标签的 主入口标签页start-->
    <el-tabs
      class="tabs"
      v-if="$route.meta.isTab"
      v-model="mainTabsActiveName"
      :closable="true"
      @tab-click="selectedTabHandle"
      @tab-remove="removeTabHandle">
      <el-dropdown class="site-tabs__tools" :show-timeout="0">
        <i class="el-icon-arrow-down el-icon--right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签页</el-dropdown-item>
          <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签页</el-dropdown-item>
          <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签页</el-dropdown-item>
          <el-dropdown-item @click.native="refresh()">刷新当前标签页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tab-pane
        v-for="item in mainTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name">
        <!--路由带标签组件(user等)-->
        <el-card :body-style="siteContentViewHeight" class="card-main-tabs" shadow="hover">
          <iframe
            v-if="item.type === 'iframe'"
            :src="item.iframeUrl"
            width="100%" height="100%" frameborder="0" scrolling="yes">
          </iframe>
          <keep-alive v-else>
            <router-view v-if="item.name === mainTabsActiveName" />
          </keep-alive>
        </el-card>
        <!--路由带标签的组件-->
      </el-tab-pane>
    </el-tabs>
    <!-- 主入口标签页end -->
    <!--不带标签的home页start-->
    <el-card  class="card-main" shadow="always"
              v-else :body-style="siteContentViewHeight">
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-card>
    <!--home页end-->
  </main>
</template>

<script>
  import { isURL } from '@/utils/validate'
  export default {
    inject: ['refresh'],
    data () {
      return {
      }
    },
    computed: {
      documentClientHeight: {
        get () { return this.$store.state.common.documentClientHeight }
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
      },
      siteContentViewHeight () {
        var height = this.documentClientHeight - 60 -40
        if (this.$route.meta.isTab) {
          height -= 40
          return isURL(this.$route.meta.iframeUrl) ? { height: height + 'px' } : { minHeight: height + 'px' }
        }
        return { minHeight: height + 'px' }
      }
    },
    methods: {
      // tabs, 选中tab
      selectedTabHandle (tab) {
        tab = this.mainTabs.filter(item => item.name === tab.name)
        if (tab.length >= 1) {
          this.$router.push({ name: tab[0].name, query: tab[0].query, params: tab[0].params })
        }
      },
      // tabs, 删除tab
      removeTabHandle (tabName) {
        this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
        if (this.mainTabs.length >= 1) {
          // 当前选中tab被删除
          if (tabName === this.mainTabsActiveName) {
            var tab = this.mainTabs[this.mainTabs.length - 1]
            this.$router.push({ name: tab.name, query: tab.query, params: tab.params }, () => {
              this.mainTabsActiveName = this.$route.name
            })
          }
        } else {
          this.menuActiveName = ''
          this.$router.push({ name: 'home' })
        }
      },
      // tabs, 关闭当前
      tabsCloseCurrentHandle () {
        this.removeTabHandle(this.mainTabsActiveName)
      },
      // tabs, 关闭其它
      tabsCloseOtherHandle () {
        this.mainTabs = this.mainTabs.filter(item => item.name === this.mainTabsActiveName)
      },
      // tabs, 关闭全部
      tabsCloseAllHandle () {
        this.mainTabs = []
        this.menuActiveName = ''
        this.$router.push({ name: 'home' })
      },
      // tabs, 刷新当前
      tabsRefreshCurrentHandle () {
        var tab = this.$route
        this.removeTabHandle(tab.name)
        this.$nextTick(() => {
          this.$router.push({ name: tab.name, query: tab.query, params: tab.params })
        })
      }
    }
  }
</script>
<style>
  .site-content {
    position: relative;
    padding: 15px;
  }
  .site-tabs__tools {
    position: fixed;
    top: 60px;
    right: 0px;
    height: 40px;
    padding: 0 10px;
    font-size: 16px;
    line-height: 40px;
    background-color: #F1F4F5;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    z-index: 931;
    cursor: pointer;
  }
  .el-icon {
    margin-left: 0;
  }
  .el-tabs__header {
    position: fixed;
    top: 60px;
    left: 230px;
    right: 0;
    z-index: 930;
    padding: 0 55px 0 15px;
    margin-right: 0;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    background-color: #ffffff;
  }
.card-main{
  position: relative;
  margin-top: 60px;
}
.card-main-tabs{
  margin-top: 100px;
  /*padding: 5px;*/
  /*background-color: blue;*/
  /*box-shadow: 0 4px 8px 0 #afb1b2, 0 0 8px 0 #b7b9ba;*/
}
.el-form{
  min-height: 80%;

}
</style>

