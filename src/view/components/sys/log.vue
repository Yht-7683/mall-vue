<template>
  <div class="log">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
    <el-form-item>
      <el-input v-model="dataForm.username" placeholder="用户名" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="getDataList()">查询</el-button>
    </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      row-key="id"
      border
      v-loading="dataListLoading"
      style="width: 100%; ">
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        min-width="60"
        label="id" >
      </el-table-column>
      <el-table-column
        prop="username"
        header-align="center"
        align="center"
        width="120"
        label="操作用户">
      </el-table-column>
      <el-table-column
        prop="operation"
        header-align="center"
        align="center"
        label="操作">
      </el-table-column>
      <el-table-column
        prop="createDate"
        header-align="center"
        align="center"
        min-width="120"
        label="创建时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
     </div>
</template>
<script>
    export default {
      name: "log",
      data() {
        return {
          dataForm: {
            username: ''
          },
          dataList: [],
          dataListLoading: false,
          pageIndex: 1,
          pageSize: 10,
          totalPage: 0,
        }
      },
      activated() {
        this.getDataList()
      },
      methods: {
        // 获取数据列表
        getDataList() {
          this.dataListLoading = true
          this.$http({
            url: this.$http.adornUrl('/sys/log/list'),
            method: 'get',
            params: this.$http.adornParams({
              'page': this.pageIndex,
              'limit': this.pageSize,
              'username': this.dataForm.username
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataList = data.page.list
              this.totalPage = data.page.totalCount
            } else {
              this.dataList = []
              this.totalPage = 0
            }
            this.dataListLoading = false
          })
        },
        // 每页数
        sizeChangeHandle (val) {
          this.pageSize = val
          this.pageIndex = 1
          this.getDataList()
        },
        // 当前页
        currentChangeHandle (val) {
          this.pageIndex = val
          this.getDataList()
        }
      }
    }

</script>

<style scoped>

</style>
