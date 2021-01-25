webpackJsonp([1,11],{XcSE:function(t,e){},"kw/B":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("E4LH"),s={data:function(){var t=this;return{visible:!1,dataForm:{id:0,userName:"",password:"",comfirmPassword:"",salt:"",mobile:""},dataRule:{userName:[{required:!0,message:"用户名不能为空",trigger:"blur"}],password:[{validator:function(e,a,r){t.dataForm.id||/\S/.test(a)?r():r(new Error("密码不能为空"))},trigger:"blur"}],comfirmPassword:[{validator:function(e,a,r){t.dataForm.id||/\S/.test(a)?t.dataForm.password!==a?r(new Error("确认密码与密码输入不一致")):r():r(new Error("确认密码不能为空"))},trigger:"blur"}],mobile:[{required:!0,message:"手机号不能为空",trigger:"blur"},{validator:function(t,e,a){Object(r.b)(e)?a():a(new Error("手机号格式错误"))},trigger:"blur"}]}}},methods:{init:function(t){var e=this;this.dataForm.id=t||0,this.visible=!0,this.$nextTick(function(){e.$refs.dataForm.resetFields()}),this.dataForm.id&&this.$http({url:this.$http.adornUrl("/mall/user/info/"+this.dataForm.id),method:"get",params:this.$http.adornParams()}).then(function(t){var a=t.data;a&&0===a.code&&(e.dataForm.userName=a.user.username,e.dataForm.salt=a.user.salt,e.dataForm.email=a.user.email,e.dataForm.mobile=a.user.mobile,e.dataForm.roleIdList=a.user.roleIdList,e.dataForm.status=a.user.status)})},dataFormSubmit:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&t.$http({url:t.$http.adornUrl("/mall/user/"+(t.dataForm.id?"update":"save")),method:"post",data:t.$http.adornData({userId:t.dataForm.id||void 0,username:t.dataForm.userName,password:t.dataForm.password,salt:t.dataForm.salt,email:t.dataForm.email,mobile:t.dataForm.mobile,status:t.dataForm.status,roleIdList:t.dataForm.roleIdList})}).then(function(e){var a=e.data;a&&0===a.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.visible=!1,t.$emit("refreshDataList")}}):t.$message.error(a.msg)})})}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:t.dataForm.id?"修改":"新增","close-on-click-modal":!1,visible:t.visible},on:{"update:visible":function(e){t.visible=e}}},[a("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"80px"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"用户名",prop:"userName"}},[a("el-input",{attrs:{placeholder:"登录帐号"},model:{value:t.dataForm.userName,callback:function(e){t.$set(t.dataForm,"userName",e)},expression:"dataForm.userName"}})],1),t._v(" "),a("el-form-item",{class:{"is-required":!t.dataForm.id},attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{type:"password",placeholder:"密码"},model:{value:t.dataForm.password,callback:function(e){t.$set(t.dataForm,"password",e)},expression:"dataForm.password"}})],1),t._v(" "),a("el-form-item",{class:{"is-required":!t.dataForm.id},attrs:{label:"确认密码",prop:"comfirmPassword"}},[a("el-input",{attrs:{type:"password",placeholder:"确认密码"},model:{value:t.dataForm.comfirmPassword,callback:function(e){t.$set(t.dataForm,"comfirmPassword",e)},expression:"dataForm.comfirmPassword"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"手机号",prop:"mobile"}},[a("el-input",{attrs:{placeholder:"手机号"},model:{value:t.dataForm.mobile,callback:function(e){t.$set(t.dataForm,"mobile",e)},expression:"dataForm.mobile"}})],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.visible=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.dataFormSubmit()}}},[t._v("确定")])],1)],1)},staticRenderFns:[]},o=a("VU/8")(s,i,!1,null,null,null);e.default=o.exports},vUho:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={data:function(){return{dataForm:{userName:""},dataList:[],pageIndex:1,pageSize:10,totalPage:0,dataListLoading:!1,dataListSelections:[],addOrUpdateVisible:!1}},components:{AddOrUpdate:a("kw/B").default},activated:function(){this.getDataList()},methods:{getDataList:function(){var t=this;this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/mall/user/list"),method:"get",params:this.$http.adornParams({page:this.pageIndex,limit:this.pageSize,username:this.dataForm.userName})}).then(function(e){var a=e.data;a&&0===a.code?(t.dataList=a.page.list,t.totalPage=a.page.totalCount):(t.dataList=[],t.totalPage=0),t.dataListLoading=!1})},sizeChangeHandle:function(t){this.pageSize=t,this.pageIndex=1,this.getDataList()},currentChangeHandle:function(t){this.pageIndex=t,this.getDataList()},selectionChangeHandle:function(t){this.dataListSelections=t},addOrUpdateHandle:function(t){var e=this;this.addOrUpdateVisible=!0,this.$nextTick(function(){e.$refs.addOrUpdate.init(t)})},deleteHandle:function(t){var e=this,a=t?[t]:this.dataListSelections.map(function(t){return t.userId});this.$confirm("确定对[id="+a.join(",")+"]进行["+(t?"删除":"批量删除")+"]操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http({url:e.$http.adornUrl("/mall/user/delete"),method:"post",data:e.$http.adornData(a,!1)}).then(function(t){var a=t.data;a&&0===a.code?e.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){e.getDataList()}}):e.$message.error(a.msg)})}).catch(function(){})}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mod-user"},[a("el-form",{attrs:{inline:!0,model:t.dataForm},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getDataList()}}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"用户名",clearable:""},model:{value:t.dataForm.userName,callback:function(e){t.$set(t.dataForm,"userName",e)},expression:"dataForm.userName"}})],1),t._v(" "),a("el-form-item",[a("el-button",{on:{click:function(e){return t.getDataList()}}},[t._v("查询")]),t._v(" "),t.isAuth("sys:user:save")?a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addOrUpdateHandle()}}},[t._v("新增")]):t._e(),t._v(" "),t.isAuth("sys:user:delete")?a("el-button",{attrs:{type:"danger",disabled:t.dataListSelections.length<=0},on:{click:function(e){return t.deleteHandle()}}},[t._v("批量删除")]):t._e()],1)],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.dataListLoading,expression:"dataListLoading"}],staticStyle:{width:"100%"},attrs:{data:t.dataList,border:""},on:{"selection-change":t.selectionChangeHandle}},[a("el-table-column",{attrs:{type:"selection","header-align":"center",align:"center",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"userId","header-align":"center",align:"center",width:"80",label:"ID"}}),t._v(" "),a("el-table-column",{attrs:{prop:"username","header-align":"center",align:"center",label:"用户名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"mobile","header-align":"center",align:"center",label:"手机号"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right","header-align":"center",align:"center",width:"150",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.isAuth("sys:user:update")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.addOrUpdateHandle(e.row.userId)}}},[t._v("修改")]):t._e(),t._v(" "),t.isAuth("sys:user:delete")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.deleteHandle(e.row.userId)}}},[t._v("删除")]):t._e()]}}])})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.pageIndex,"page-sizes":[10,20,50,100],"page-size":t.pageSize,total:t.totalPage,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.sizeChangeHandle,"current-change":t.currentChangeHandle}}),t._v(" "),t.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:t.getDataList}}):t._e()],1)},staticRenderFns:[]};var i=a("VU/8")(r,s,!1,function(t){a("XcSE")},null,null);e.default=i.exports}});
//# sourceMappingURL=1.a5d7e3cd086bc4653337.js.map