/*
 * @Description: 待退款订单
 * @Author: jian.weng
 * @Date: 2019-10-24 18:21:00
 */

<template>
    <div>
             
        <div class="table_body">
            <el-table
            :data="tableData"
            border
            id="exportTab"
            size="medium "
            style="width: 100%">
                
                <el-table-column
                prop="nickname"
                label="退款用户"
                min-width="100">
                </el-table-column>

                <el-table-column
                label="退款商品"
                min-width="180"
                >
                 <template slot-scope="scope">
                    
                        <img class="prod-img" :src="scope.row.orderProductVO.cover">
                        <div class="prod-detail" :span="6">
                            <div>
                                {{scope.row.orderProductVO.title}}
                            </div>
                            <div>
                                x{{scope.row.orderProductVO.productNum}}
                            </div>
                            <div>
                                ￥{{scope.row.orderProductVO.productPrice}}
                            </div>
                        </div>
                  
                 </template>
                </el-table-column>
                <el-table-column
                prop="refundMoney"
                label="申请退款金额"
                min-width="80">
                </el-table-column>
                <el-table-column
                label="订单信息"
                min-width="180"
                >
                 <template slot-scope="scope">
                        <div class="prod-detail" :span="6">
                            <div>
                                总金额：{{scope.row.orderVO.totalPrice}}
                            </div>
                            <div>
                                优惠：{{scope.row.orderVO.discount}}
                            </div>
                            <div>
                                运费：{{scope.row.orderVO.freight}}
                            </div>
                            <div>
                                支付金额：{{scope.row.orderVO.payMoney}}
                            </div>
                            <div>
                                订单号：{{scope.row.orderVO.orderNumber}}
                            </div>
                            <div>
                                退款前状态：{{orderstatelist[scope.row.orderState]}}
                            </div>
                        </div>
                  
                 </template>
                </el-table-column>
                 <el-table-column
                label="退款类型"
                min-width="160">
                <template slot-scope="scope">
                  {{refundTypelist[scope.row.refundType]}}
                 </template>
                </el-table-column>
                <el-table-column
                label="货物状态"
                min-width="100">
                <template slot-scope="scope">
                  {{productstatelist[scope.row.productState]}}
                 </template>
                </el-table-column>
                 <el-table-column
                prop="refundWhy"
                label="退款原因"
                min-width="160">
                </el-table-column>
                <el-table-column
                prop="note"
                label="退款说明"
                min-width="160">
                </el-table-column>
                <el-table-column
                label="退款状态"
                min-width="80">
                <template slot-scope="scope">
                  {{refundstatelist[scope.row.refundState]}}
                 </template>
                </el-table-column>
                 <el-table-column
                prop="gmtCreate"
                label="创建时间"
                min-width="160">
                </el-table-column>
               
                <el-table-column
                label="操作"
                min-width="300">
                    <template slot-scope="scope">
                        
                        <el-button 
                            size="mini"
                            type="danger"
                            @click="refuseRefund(scope.row.id)">
                            拒绝退款
                        </el-button>
                       
                        <el-button size="mini" type="warning" @click="agreeRefund(scope.row.id)">同意退款</el-button>
                        <el-button size="mini" type="primary" >查看订单</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-footer--APP" slot="append">
                <el-pagination
                :current-page="form.page"
                :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]"
                :page-size="form.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            <div>
           
        </div>
        </div>
    </div>
</template>

<script>

import {
     getOrderRefundListAPI
} from '@/api/prodOrderRefundAPI.js'

export default {
    name:'prodList',
    data(){
        return{
            refundstatelist:{
                0:"退款失败",
                1:"等待商家回应",
                2:"正在退款中",
                3:"正在退货中",
                4:"退款成功",
                5:"用户已撤销退款"
            },
            refundTypelist:{
                1:"只退款无需退货",
                2:"退货退款",
                3:"换货"
            },
            productstatelist:{
                0:"未收到货",
                1:"已收到货"
            },
            orderstatelist:{
                "-1":"已删除",
                0:"已关闭",
                1:"待付款",
                2:"待发货",
                3:"待收货",
                4:"已完成",
                5:"退款中",
                6:"退款完成",
            },
            orderId:'',
            form:{
                current :1,
                size :10
            },
           
            tableData:[],
            totalCount:0,
            tableLoading:false,
           
        };
    },
    components:{
        // AddDepModal,
   
    },
    methods:{
        
        /*
         * 获取列表
         */
        getList(){
            const params = {...this.form};
            // if(this.value1[0]!=''&&this.value1[0]!=undefined&&this.value1[0]!=null){
            //     params.endTime=timeStamp2String(this.value1[1],2)
            //     params.startTime=timeStamp2String(this.value1[0],2)
            // }
            this.tableLoading = true;
            console.log("getList")
             getOrderRefundListAPI(params)
                .then(res => {
                    console.log(res)
                    
                    const data = res.data.data;
                    this.totalCount = data.total;
                    this.tableData = data.records;
                    this.tableLoading = false;
                    console.log(data.records)
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
        refuseRefund(id){
            console.log(id)
             this.$confirm('确定拒绝退款吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$message.error('该功能优化中，暂无法使用');
                   
                    return;
                    delorderdetailAPI(id)
                    .then(res => {
                        if(res.data.code === 200){
                            
                            this.$message({
                                type: 'fail',
                                message: '该订单已经删除',
                            });
                            this.getOrderList()
                        }else{
                            this.$message.error(res.data.msg)
                        }                   
                    })
                    .catch(err => {
                    })
                })
        },
        agreeRefund(id){
            console.log(id)
             this.$confirm('确定同意退款吗？确定后按申请退款金额将钱退回到用户钱包中', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$message.error('该功能优化中，暂无法使用');
                    return;
                    delorderdetailAPI(id)
                    .then(res => {
                        if(res.data.code === 200){
                            this.$message({
                                type: 'success',
                                message: '该订单已经删除',
                            });
                            this.getOrderList()
                        }else{
                            this.$message.error(res.data.msg)
                        }                   
                    })
                    .catch(err => {
                    })
                })
        },
        
       
       
        /**
         * @msg: 翻页
         * @param {type} 
         * @return: 
         */
        handleSizeChange(cSize) {
            this.form.size = cSize;
            this.getOrderList();
        },
        
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getOrderList();
        },
        /**
         * @msg: 新增产品
         * @param {type} 
         * @return: 
         */
        handleAddDep(){
            this.depId = 0;
            this.isEdit = false;
            this.secondDepShow = true;
        },
        /**
         * @msg: 修改产品
         * @param {Number} row  修改产品的信息
         */
        handleCheck(index, row) {
            this.depId = row.pid;
            this.secondDepShow = true;
            this.isEdit = true;
        },
       
      
    },
    created(){
        this.getList()
    }
}
</script>

<style scoped lang="less">
    .header{
        display: flex;
        justify-content: space-between;
    }
    .header p{
        margin:20px;
    }
    .header button{
        margin: 10px
    }
    .table_body{
        padding: 20px;
    }
    .addDep{
        margin-top: 20px;
    }
    .filter {
    padding-right: 130px;
    position: relative;
    margin-left: 20px;
    .action-export {
        position: absolute;
        top: 0;
        right: 0;
    }
}
.active{
    background: #409EFF;
    color: #fff;
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

