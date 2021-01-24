<template>
  <div class="mod-user">
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
      border
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column
        prop="orderId"
        header-align="center"
        align="center"
        width="80"
        label="订单编号">
      </el-table-column>
      <el-table-column
        prop="username"
        header-align="center"
        align="center"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="下单时间">
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        header-align="center"
        align="center"
        label="商品总价格">
      </el-table-column>
      <el-table-column
        prop="freight"
        header-align="center"
        align="center"
        label="运费">
      </el-table-column>
      <el-table-column
        prop="pay"
        header-align="center"
        align="center"
        label="支付状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.pay === 0" size="small" type="danger">未支付</el-tag>
          <el-tag v-else size="small" type="success">已支付</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="订单状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" size="small" type="danger">已取消</el-tag>
          <el-tag v-else size="small" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="other"
        header-align="center"
        align="center"
        label="其他原因">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="详情">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="updateHandle(scope.row.orderId,scope.row.totalPrice)">查看</el-button>
        </template>
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
    <!-- 查看详情-->
    <order-product v-if="updateVisible" ref="OrderProduct" @refreshDataList="getDataList"></order-product>
  </div>
</template>

<script>
  import OrderProduct from './order-product'
  export default {
    data () {
      return {
        dataForm: {
          username: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        updateVisible: false
      }
    },
    components: {
      OrderProduct
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/mall/order/list'),
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
      },
      // 查看详情
      updateHandle (id,price) {
        this.updateVisible = true
        this.$nextTick(() => {
          this.$refs.OrderProduct.init(id,price)
        })
      },
    }
  }
</script>
<style>

</style>
