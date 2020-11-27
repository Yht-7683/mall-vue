<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  *{
    box-sizing: border-box;
  }
  body {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 14px;
    line-height: 1.15;
    color: #303133;
    background-color: #fff;
    padding: 0;
    margin: 0;
  }
  img {
    vertical-align: middle;
  }
</style>
