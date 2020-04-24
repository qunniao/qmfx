<template>
  <div class="mod-prod-info">
    <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
      <el-form-item  label="分类名称:"
                    prop="title"
                    :rules="[{ required: true, message: '分类名称不能为空'}]">
        <el-col :span="8">
          <el-input v-model="dataForm.title"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>    
      <el-form-item label="描述:"
                    prop="remark">
        <el-col :span="8">
          <el-input v-model="dataForm.remark"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="dataFormSubmit()">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
    addProdTypeAPI,
    PutProdTypeAPI,
    getProdTypeDetailAPI 
} from '@/api/inventoryRecordAPI.js'
export default {
   name:'editor',
  data () {
    return {
      // 规格列表
      level:'1',
      typeSearch:[],
      pgIdList:[],
      onetypeidlist:[],
      dataForm:{
        title:'',
        remark:''
      },
      imageShowUrl:''
      // resourcesUrl: window.SITE_CONFIG.resourcesUrl
    }
  },
  components: {

  },
  props: {
    prodtypeId: {
      required: true,
    }
  },
  
  
  methods: {
   
    dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
                    const args = {
                        title:this.dataForm.title,
                        remark:this.dataForm.remark,
                    };
                    // console.log(this.prodchangeType)
                    if(this.prodtypeId==0){
                      addProdTypeAPI(args)
                        .then(res => {
                            const data = res.data;
                            if (data.code === 200) {
                                    this.$message({
                                        type: 'success',
                                        message: '添加分类成功',
                                    });
                                this.backhtmls()
                                    this.$emit('finish-action')
                            }else{
                                this.$message.error(res.data.msg)
                            }
                        })
                        .catch(err => {
                        });
                    }else{
                      args.tid=this.dataForm.tid
                      PutProdTypeAPI(args)
                        .then(res => {
                            const data = res.data;
                            if (data.code === 200) {
                                    this.$message({
                                        type: 'success',
                                        message: '修改分类成功',
                                    });
                                this.backhtmls()
                                    this.$emit('finish-action')
                            }else{
                                this.$message.error(res.data.msg)
                            }
                        })
                        .catch(err => {
                        });
                    }
        })
    },
  
    getProdTypeDetail(id){
      console.log("getProdTypeDetail");
      const params =id
            getProdTypeDetailAPI(params)
                .then(res => {
                  console.log("getProdTypeDetailAPI data");
                    let prodtypeform= res.data.data
                    this.dataForm=prodtypeform
                    console.log(this.dataForm);
                })
                .catch(err => {
                    //this.tableLoading = false;
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
      console.log(this.prodtypeId)
      if(this.prodtypeId>0){
         this.getProdTypeDetail(this.prodtypeId)
      }
  },
}
</script>
<style scoped="scoped" lang="less">
.mbline{
  margin-top:24px;
  padding-left: 20px;
  line-height: 40px;
  background: rgb(249, 249, 249);
}
</style>