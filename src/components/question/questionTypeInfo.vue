<template>
  <div class="mod-prod-info">
    <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
      <el-form-item  label="分类名称:"
                    prop="name"
                    >
        <el-col :span="8">
          <el-input v-model="dataForm.name"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>    
      <el-form-item label="排序:"
                    prop="sort">
        <el-col :span="8">
          <el-input v-model="dataForm.sort"
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
    saveQuestionTypeAPI,
    updateQuestionTypeAPI,
    getQuestionTypeDetailAPI 
} from '@/api/questionAPI.js'
export default {
   name:'editor',
  data () {
    return {
      // 规格列表
     
      dataForm:{
        name:'',
        sort:0
      }
    }
  },
  components: {

  },
  props: {
    updateId: {
      required: true,
    }
  },
  
  
  methods: {
   
    dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
                    const args = {
                        name:this.dataForm.name,
                        sort:this.dataForm.sort,
                    };
                    // console.log(this.prodchangeType)
                    if(this.updateId==0){
                      saveQuestionTypeAPI(args)
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
                      args.id=this.updateId
                      updateQuestionTypeAPI(args)
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
            getQuestionTypeDetailAPI(params)
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
      console.log(this.updateId)
      if(this.updateId>0){
         this.getProdTypeDetail(this.updateId)
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