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
            <el-form-item label="最低进货金额:"
                            :rules="[{ required: true, message: '最低进货金额不能为空'}]">
                <el-col :span="8">
                <el-input v-model="item.minStock"
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
     getAgentLevelDetailAPI,
     updateAgentLevelAPI
} from '@/api/agentAPI.js'
export default {
    name:'prodList',
    data(){
        return{
            dataForm:{
                minStock:0,
                id:''
            },
            item:{},
            rules: {
                
            },
        }
    },
    components:{
        // AddDepModal,
    },
    props: {
        updateId: {
            required: true,
        },
    },
    methods:{
        
        /*
         * 获取代理等级详情
         */
        getDetail(id){
            this.tableLoading = true;
             getAgentLevelDetailAPI(id)
                .then(res => {
                    const orderdata=res.data.data
                    console.log(orderdata)
                    this.item=orderdata;
                    this.dataForm.minStock = item.minStock;
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
         // 表单提交
    dataFormSubmit () {
        console.log("minStock:"+this.item.minStock);
          let that=this;
            if(this.item.minStock=='')this.item.minStock = 0;
            const putdata={
            id: this.updateId,
            minStock: this.item.minStock
            }
            updateAgentLevelAPI(putdata)
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
        this.getDetail(this.updateId)
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

