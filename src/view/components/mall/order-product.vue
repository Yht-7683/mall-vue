<template>
  <el-dialog
    title="订单详情"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form  ref="dataForm"  label-width="80px">
      <el-form-item label="订单编号">
        <span>{{orderId}}</span>
      </el-form-item>
    <el-table
      :data="dataList"
      border
      style="width: 100%;">
      <el-table-column
        prop="goodsName"
        header-align="center"
        align="center"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="goodsAmount"
        header-align="center"
        align="center"
        label="购买数量">
      </el-table-column>
      <el-table-column
        prop="goodsPrice"
        header-align="center"
        align="center"
        label="单价">
      </el-table-column>
    </el-table>
      <el-form-item label="合计">
        <span>{{totalPrice}}</span>
      </el-form-item>
    </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="visible = false">看完了</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataList: [],
        orderId: 0,
        totalPrice: 0,
      }
    },
    methods: {
      init (id,price) {
        this.orderId = id
        this.totalPrice = price
        this.$http({
          url: this.$http.adornUrl(`/mall/order/product/list/${this.orderId}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          console.log(data)
          if (data && data.code === 0) {
            this.dataList = data.list
          }
        }).then(() => {
          this.visible = true
        })
      }
    }
  }
</script>
