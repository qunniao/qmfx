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
            <el-form-item label="快递公司选择">
                <el-select v-model="expressCompany"   placeholder="请选择">
                    <el-option
                        v-for="item in expressCompanyList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="快递单号:"
                            :rules="[{ required: true, message: '快递单号不能为空'}]">
                <el-col :span="8">
                <el-input v-model="logisticCode"
                            placeholder="请输入"
                            maxlength="50"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="联系人:"
                            :rules="[{ required: true, message: '联系人不能为空'}]">
                <el-col :span="8">
                <el-input v-model="name"
                            placeholder="请输入"
                            maxlength="50"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="联系电话:"
                            :rules="[{ required: true, message: '联系电话不能为空'}]">
                <el-col :span="8">
                <el-input v-model="phone"
                            placeholder="请输入"
                            maxlength="50"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="收货地址:"
                            :rules="[{ required: true, message: '收货地址不能为空'}]">
                <el-col :span="8">
                <el-input v-model="address"
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
     getOrderLogisticDetailAPI,
     saveOrderLogisticAPI,
     updateOrderLogisticAPI
} from '@/api/prodOrderLogisticAPI.js'
import {
     getOrderDetailAPI,
} from '@/api/prodOrderAPI.js'
export default {
    name:'prodList',
    data(){
        return{
            dataForm:{
    
            },
            expressCompanyList:[
                {id:0,name:"圆通速递",number:"YTO"},
                {id:1,name:"申通快递",number:"STO"},
                {id:2,name:"中通快递",number:"ZTO"}
            ]
            ,
            sendway:{
                1:"快递",
                2:"自提",
                3:"无需物流"
            },
            expressCompany:'',
            expressNumber:'',
            logisticCode:'',
            name:'',
            phone:'',
            address:'',
            item:{},
            order:{}
        };
    },
    components:{
        // AddDepModal,
    },
    props: {
        updateId: {
            required: true,
        },
        orderId: {
            required: true,
        }
    },
    methods:{
        /**
         * @msg: 时间处理
         * @param {type} 
         * @return: 
         */
        timechange(time,type){
            return timeStamp2String(time,type)
        },
        /*
         * 获取详情
         */
        getDetail(id){
            this.tableLoading = true;
             getOrderLogisticDetailAPI(id)
                .then(res => {
                    const orderdata=res.data.data
                    console.log(orderdata)
                    this.item = orderdata;
                    this.expressCompany = orderdata.expressCompany;
                    this.expressNumber = orderdata.expressNumber;
                    this.logisticCode = orderdata.logisticCode;
                    this.name = orderdata.contactName;
                    this.phone = orderdata.contactPhone;
                    this.address = orderdata.contactAddress;
                    console.log(this.dataForm.expressCompany)
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
        dataFormSubmit () {
          
            for(var i=0;i<this.expressCompanyList.length;i++){
                if(this.expressCompanyList[i].name == this.expressCompany){
                    this.expressNumber = this.expressCompanyList[i].number;
                }
            }
            console.log("快递公司："+this.expressCompany+" 快递公司编号："+this.expressNumber);
            //累加订单产品id
            console.log(this.order);
            var opid = "";
            for(var i=0;i<this.order.orderProductVOList.length;i++){
                if(i==this.order.orderProductVOList.length-1){
                    opid+=this.order.orderProductVOList[i].id;
                }else{
                    opid+=this.order.orderProductVOList[i].id+",";
                }
               
            }
            console.log("opid"+opid);
        this.$refs['dataForm'].validate((valid) => {
                    const args = {
                        orderId:this.orderId,
                        orderProductId:opid,
                        expressCompany:this.expressCompany,
                        expressNumber:this.expressNumber,
                        logisticCode:this.logisticCode,
                        contactName:this.name,
                        contactPhone:this.phone,
                        contactAddress:this.address
                    };
                    console.log(args);
                 
                    if(this.updateId==0){
                      saveOrderLogisticAPI(args)
                        .then(res => {
                            const data = res.data;
                            if (data.code === 200) {
                                    this.$message({
                                        type: 'success',
                                        message: '添加成功',
                                    });
                                this.$emit('close-form')
                                this.$emit('finish-action')
                            }else{
                                this.$message.error(res.data.msg)
                            }
                        })
                        .catch(err => {
                        });
                    }else{
                      args.id=this.item.id
                      updateOrderLogisticAPI(args)
                        .then(res => {
                            const data = res.data;
                            if (data.code === 200) {
                                    this.$message({
                                        type: 'success',
                                        message: '修改成功',
                                    });
                                this.$emit('close-form')
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
    /*
         * 获取订单详情
         */
        getOrderDetail(id){
            this.tableLoading = true;
             getOrderDetailAPI(id)
                .then(res => {
                    console.log(res);
                    this.order=res.data.data;
               
                    this.name = this.order.contactName;
                    this.phone = this.order.contactPhone;
                    this.address = this.order.contactAddress;
                })
                .catch(err => {
                    
                })
        },
        
    },
    mounted(){
        if(this.updateId>0){
            this.getDetail(this.updateId)
        }

        this.getOrderDetail(this.orderId);
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

