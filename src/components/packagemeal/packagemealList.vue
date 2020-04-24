<template>
  <div class="mod-prod-info" style="margin-top:20px">
    <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
      <el-form-item  label="组合套餐名称：">
         <el-input
            type="text"
            placeholder="请输入组合套餐名称"
            v-model="text"
            maxlength="10"
            show-word-limit
            >
         </el-input>
      </el-form-item>
      <el-form-item label="组合套餐图片:" prop="picfile">
        <el-upload
            class="avatar-uploader"
            action="http://admin.zhanchengwlkj.com:8080/derivative_system_backstage/file/addFile"
            :show-file-list="false"
            :auto-upload="true"
            name="files"
            :on-success="uploadImg"
            :before-upload="beforeAvatarUpload">
            <img v-if="dataForm.cover" :src="dataForm.cover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
        <el-form-item  label="组合套餐名称：">
         <el-input
            type="text"
            placeholder="请输入组合套餐名称"
            v-model="text"
            maxlength="10"
            show-word-limit
            >
         </el-input>
      </el-form-item>
      <el-form-item label='组合套餐运费:'>
            <el-radio v-model="radio" label="1">包邮</el-radio>
            <el-radio v-model="radio" label="2">按默认设置</el-radio>
            <el-radio v-model="radio" label="3">自定义</el-radio>
      </el-form-item>
      <el-form-item label='自定义折扣:'>
            <el-radio v-model="radio" label="1">默认折扣</el-radio>
            <el-radio v-model="radio" label="2">自定义</el-radio>
      </el-form-item>
        <el-form-item>
            <el-button type="primary">选择商品</el-button>
        </el-form-item>
        <el-form-item>
            <el-table
            :data="tableData"
            border
            size="medium "
            style="width: 100%">
                <el-table-column
                prop="departmentName"
                label="商品信息"
                min-width="360">
                </el-table-column>
                <el-table-column
                prop="price"
                label="状态"
                sortable='custom'
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="库存"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="subordinateDepartment"
                label="数量"
                sortable='custom'
                min-width="180">
                <template>
                    
                </template>
                </el-table-column>
            </el-table>
        </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="dataFormSubmit()">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
   name:'editor',
  data () {
    return {
      // 规格列表
      Stocktype:[{val:1,title:'增加库存'},{val:2,title:'减少库存'}],
      allnum:'0',
      radio:'0',
      prodName:'',
      cover:'',
      skuId:'',
      text:'',
      tableData:[],
      dataForm:{
        pid:'',
        changeType:1,
        userType:1,
        operatorId:1,
        remark:'',
        num:''
      },
      // resourcesUrl: window.SITE_CONFIG.resourcesUrl
    }
  },
  components: {

  },
  props: {
  },
  computed: {
    defalutSku () {
      return this.$store.state.prod.defalutSku
    }
  },
  methods: {
    dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if(valid){
            const params =this.dataForm
          }
        })
    },
    uploadImg(res){
      this.dataForm.cover = res.data;
      this.imageShowUrl=res.data
      this.rules.picfile = [{ required: true, message: '请上传图片' }] 
      if (this.dataForm.cover!='') {
        this.rules.picfile = []
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },   
    getProdDetail(id){
       
    },
    errorMsg (message) {
      this.$message({
        message: message,
        type: 'error',
        duration: 1500
      })
    },
    /*
      * 返回上层
      */
    backhtmls(){
        this.$emit('close-form')
    }    
  },
  mounted() {
    this.dataForm.pid=this.prodId
  }
}
</script>
<style scoped="scoped" lang="less">
.mbline{
  margin-top:24px;
  padding-left: 20px;
  line-height: 40px;
  background: rgb(249, 249, 249);
}
.prod-img{
  max-width: 64px;
    min-width: 64px;
    width: 64px;
    height: 64px;
    line-height: 64px;
    border-radius: 4px;
}
.prod-detail{
  display: inline-block;
  margin-left: 10px;
  line-height: 24px;
}
</style>