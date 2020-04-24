/*
 * @Description: 订单详情
 * @Author: jian.weng
 * @Date: 2019-10-29 10:49:29
 */

<template>
    <div>
         <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
            <el-form-item label="选择代理等级:"
                            :rules="[{ required: true, message: '代理等级不能为空'}]">
                <el-select v-model="dataForm.agentLevel" clearable placeholder="全部等级" >
                    <el-option
                        v-for="item in agentLevelist"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
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
     updateUserAPI,
} from '@/api/userAPI.js'
export default {
    name:'membershipInfo',
    data(){
        return{
            dataForm:{
                agentLevel:'',
                id:''
            },
            agentLevelist:[{name:'普通会员',value:'0'},{name:'总代',value:'1'}]
        };
    },
    components:{
        // AddDepModal,
    },
    props: {
        usersId: {
            required: true,
        },
    },
    methods:{
       
           // 表单提交
        dataFormSubmit () {
            console.log("agentLevel:"+this.dataForm.agentLevel+" id:"+this.dataForm.id);
            let that=this;
                
                const putdata={
                    id: this.usersId,
                    agentLevel: this.dataForm.agentLevel
                }
                updateUserAPI(putdata)
                .then(res => {
                    console.log(res);
                    const sucresponse = res.data;
                    if(sucresponse.code==200){
                        this.$message({
                        type: 'success',
                        message: '修改成功',
                        });
                        this.$emit('close-form')
                        this.$emit('finish-action')
                    }else{
                        this.errorMsg(sucresponse.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.tableLoading = false;
                }) 
            
        
        },
    },
    mounted(){
        
    }
}
</script>

<style scoped lang="less">
.el-row{
    padding: 10px;
    border:1px solid #000;
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

