webpackJsonp([11],{"kw/B":function(a,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=r("E4LH"),o={data:function(){var a=this;return{visible:!1,dataForm:{id:0,userName:"",password:"",comfirmPassword:"",salt:"",mobile:""},dataRule:{userName:[{required:!0,message:"用户名不能为空",trigger:"blur"}],password:[{validator:function(t,r,e){a.dataForm.id||/\S/.test(r)?e():e(new Error("密码不能为空"))},trigger:"blur"}],comfirmPassword:[{validator:function(t,r,e){a.dataForm.id||/\S/.test(r)?a.dataForm.password!==r?e(new Error("确认密码与密码输入不一致")):e():e(new Error("确认密码不能为空"))},trigger:"blur"}],mobile:[{required:!0,message:"手机号不能为空",trigger:"blur"},{validator:function(a,t,r){Object(e.b)(t)?r():r(new Error("手机号格式错误"))},trigger:"blur"}]}}},methods:{init:function(a){var t=this;this.dataForm.id=a||0,this.visible=!0,this.$nextTick(function(){t.$refs.dataForm.resetFields()}),this.dataForm.id&&this.$http({url:this.$http.adornUrl("/mall/user/info/"+this.dataForm.id),method:"get",params:this.$http.adornParams()}).then(function(a){var r=a.data;r&&0===r.code&&(t.dataForm.userName=r.user.username,t.dataForm.salt=r.user.salt,t.dataForm.email=r.user.email,t.dataForm.mobile=r.user.mobile,t.dataForm.roleIdList=r.user.roleIdList,t.dataForm.status=r.user.status)})},dataFormSubmit:function(){var a=this;this.$refs.dataForm.validate(function(t){t&&a.$http({url:a.$http.adornUrl("/mall/user/"+(a.dataForm.id?"update":"save")),method:"post",data:a.$http.adornData({userId:a.dataForm.id||void 0,username:a.dataForm.userName,password:a.dataForm.password,salt:a.dataForm.salt,email:a.dataForm.email,mobile:a.dataForm.mobile,status:a.dataForm.status,roleIdList:a.dataForm.roleIdList})}).then(function(t){var r=t.data;r&&0===r.code?a.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){a.visible=!1,a.$emit("refreshDataList")}}):a.$message.error(r.msg)})})}}},s={render:function(){var a=this,t=a.$createElement,r=a._self._c||t;return r("el-dialog",{attrs:{title:a.dataForm.id?"修改":"新增","close-on-click-modal":!1,visible:a.visible},on:{"update:visible":function(t){a.visible=t}}},[r("el-form",{ref:"dataForm",attrs:{model:a.dataForm,rules:a.dataRule,"label-width":"80px"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&a._k(t.keyCode,"enter",13,t.key,"Enter")?null:a.dataFormSubmit()}}},[r("el-form-item",{attrs:{label:"用户名",prop:"userName"}},[r("el-input",{attrs:{placeholder:"登录帐号"},model:{value:a.dataForm.userName,callback:function(t){a.$set(a.dataForm,"userName",t)},expression:"dataForm.userName"}})],1),a._v(" "),r("el-form-item",{class:{"is-required":!a.dataForm.id},attrs:{label:"密码",prop:"password"}},[r("el-input",{attrs:{type:"password",placeholder:"密码"},model:{value:a.dataForm.password,callback:function(t){a.$set(a.dataForm,"password",t)},expression:"dataForm.password"}})],1),a._v(" "),r("el-form-item",{class:{"is-required":!a.dataForm.id},attrs:{label:"确认密码",prop:"comfirmPassword"}},[r("el-input",{attrs:{type:"password",placeholder:"确认密码"},model:{value:a.dataForm.comfirmPassword,callback:function(t){a.$set(a.dataForm,"comfirmPassword",t)},expression:"dataForm.comfirmPassword"}})],1),a._v(" "),r("el-form-item",{attrs:{label:"手机号",prop:"mobile"}},[r("el-input",{attrs:{placeholder:"手机号"},model:{value:a.dataForm.mobile,callback:function(t){a.$set(a.dataForm,"mobile",t)},expression:"dataForm.mobile"}})],1)],1),a._v(" "),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){a.visible=!1}}},[a._v("取消")]),a._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return a.dataFormSubmit()}}},[a._v("确定")])],1)],1)},staticRenderFns:[]},i=r("VU/8")(o,s,!1,null,null,null);t.default=i.exports}});
//# sourceMappingURL=11.672f9ec59bcf09c170ec.js.map