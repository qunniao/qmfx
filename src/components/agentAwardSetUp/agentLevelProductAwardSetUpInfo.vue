/*
 * @Description: 订单详情
 * @Author: jian.weng
 * @Date: 2019-10-29 10:49:29
 */

<template>
    <div>
       
       <el-form
             ref="dataForm"
             label-width="150px">
            <el-form-item label="产品佣金金额:"
                            :rules="[{ required: true, message: '产品佣金金额不能为空'}]">
                <el-col :span="8">
                <el-input v-model="money"
                            placeholder="请输入"
                            maxlength="50"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="代理进货价格:"
                            :rules="[{ required: true, message: '代理进货价不能为空'}]">
                <el-col :span="8">
                <el-input v-model="price"
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
     updateAgentLevelProductAwardAPI
} from '@/api/agentAPI.js'
export default {
    name:'prodList',
    data(){
        return{
            money:0,
            price:'',
            rules: {
                
            },
        }
    },
    components:{
        // AddDepModal,
    },
    props: {
        awardMoney: {
            required: true,
        },
        levelId: {
            required: true,
        },
        productId: {
            required: true,
        },
        agentPrice: {
            required: true,
        },
    },
    methods:{
        
         // 表单提交
    dataFormSubmit () {
        console.log("awardMoney:"+this.money);
        console.log("agentLevelId:"+this.levelId);
        console.log("productId:"+this.productId);
        console.log("price:"+this.price);
          let that=this;
            if(this.money=='' || this.money==null)this.money = 0;
            const putdata={
                agentLevelId: this.levelId,
                productId: this.productId,
                awardMoney: this.money,
                agentPrice:this.price
            }
            updateAgentLevelProductAwardAPI(putdata)
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
        if(this.awardMoney=='' || this.awardMoney==null || this.awardMoney=='null'){
            this.money = 0;
            return;
        }    
       this.money = this.awardMoney;
       if(this.agentPrice=='' || this.agentPrice==null || this.agentPrice=='null'){
            return;
        } 
       this.price = this.agentPrice;
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

