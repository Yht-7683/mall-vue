<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="商品名" prop="name">
        <el-input v-model="dataForm.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="类别" prop="classification">
        <el-select v-model="dataForm.classification" placeholder="请选择新的类别">
          <el-option
            v-for="item in classificationItem"
            :key="item.classificationId"
            :label="item.classificationName"
            :value="item.classificationId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片" prop="img">
        <el-upload
          class="avatar-uploader"
          action="proxyApi/mall/goods/fileUpload"
          :headers="this.token"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="详细说明" prop="details">
        <el-input v-model="dataForm.details" placeholder="商品介绍"></el-input>
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
      return {
        token:'',
        visible: false,
        imageUrl: '',
        dialogVisible: false,
        disabled: false,
        classificationItem: [],
        dataForm: {
          id: 0,
          name: '',
          classification: '',
          classificationName: '',
          details: ''
        },
        dataRule: {
          name: [
            { required: true, message: '商品名不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.token =  localStorage.getItem('token') // 要保证取到
        this.visible = true
        this.$http({
          url: this.$http.adornUrl('mall/class/list'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.classificationItem = data && data.code === 0 ? data.list : []
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`mall/goods/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.goods.name
                this.dataForm.classification = data.goods.classificationId
                this.dataForm.details = data.goods.details
              }
            })
          }
        })
      },
      handleAvatarSuccess(res, file) {
        console.log(res);
        this.imageUrl = res.img;
        console.log(this.imageUrl)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'|| file.type ==='image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式或者 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/mall/goods/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'goodsId': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'classificationId': this.dataForm.classification,
                'details': this.dataForm.details,
                'img':this.imageUrl,
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
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
