<template>
  <el-dialog
    title="修改库存信息"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="商品名" prop="name">
        <el-input v-model="dataForm.name"  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="dataForm.price" placeholder="价格"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="amount">
        <el-input v-model="dataForm.amount" placeholder="数量"></el-input>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">已下架</el-radio>
          <el-radio :label="1">上架中</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      var validateAmount = (rule, value, callback) => {
        //非负整数
        if ( !/\S/.test(value)) {
          callback(new Error('数量不能为空'))
        }else if ( !/^\d+$/.test(value)){
          callback(new Error('数量格式错误，仅允许正整数'))
        }
        else {
          callback()
        }
      }
      var validatePrice = (rule, value, callback) => {
        ////非负浮点数（正浮点数 + 0）
        if ( !/\S/.test(value)) {
          callback(new Error('价格不能为空'))
        }else if ( !/^\d+(\.\d+)?$/.test(value)){
          callback(new Error('价格格式错误'))
        }
        else {
          callback()
        }
      }
      return {
        visible: false,
        roleList: [],
        dataForm: {
          skuId: 0,
          goodsId:'',
          name: '',
          price: '',
          amount: '',
          status: 1
        },
        dataRule: {
          amount: [
            { validator: validateAmount, trigger: 'blur' }
          ],
          price: [
            { validator: validatePrice, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.skuId = id || 0
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
        this.$http({
          url: this.$http.adornUrl(`/mall/stock/info/${this.dataForm.skuId}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataForm.skuId = data.stock.skuId
            this.dataForm.goodsId = data.stock.goodsId
            this.dataForm.name = data.stock.name
            this.dataForm.price = data.stock.price
            this.dataForm.amount = data.stock.amount
            this.dataForm.status = data.stock.status
          }
        }).then(() => {
          this.visible = true
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/mall/stock/update'),
              method: 'post',
              data: this.$http.adornData({
                'skuId': this.dataForm.skuId,
                'goodsId': this.dataForm.goodsId,
                'name': this.dataForm.name,
                'status': this.dataForm.status,
                'price': this.dataForm.price,
                'amount': this.dataForm.amount
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
