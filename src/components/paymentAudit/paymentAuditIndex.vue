/*
 * @Description: 打款审核
 * @Author: jian.weng
 * @Date: 2019-10-29 10:49:29
 */

<template>
    <div>
        <div class="header">
            <el-button type="primary">导出</el-button>
        </div>
        <div class="filter">
            <el-form class="fl-l" inline>
                <el-form-item label="订单号:">
                    <el-col :span="24">
                        <el-input v-model="keyword" placeholder="请输入订单号" ></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary">查找</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changeshow">展开</el-button>
                </el-form-item>
                <div v-if="searchshow" >
                    <el-form-item label="打款单号">
                        <el-input v-model="keyword" placeholder="请输入商品名称或者货号" ></el-input>
                    </el-form-item>
                </div>
                <div style="margin-bottom:10px">
                    <el-tag v-for="item in shoptypelist" @click='changesearchtype(item.val)' :key="item.val" :class="{'active':item.val==form.statusType}">{{item.name}}{{item.nownum!=''?item.nownum:'0'}}</el-tag>
                </div>
            </el-form>
        </div>        
        <div class="table_body">
            <el-table
            :data="tableData"
            border
            size="medium "
            style="width: 100%">
                <el-table-column
                prop="orderType"
                label="订单类型"
                min-width="360">
                    <template slot-scope="scope">
                    {{orderTypelist[scope.row.orderType]}}
                    </template>
                </el-table-column>
                <el-table-column
                prop="remitNumber"
                label="打款单号/订单号"
                min-width="180">
                    <template slot-scope="scope">
                        <div>{{scope.row.remitNumber}}</div>
                        <div>{{scope.row.orderNumber}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="remitterName"
                label="打款人"
                min-width="180">
                    <template slot-scope="scope">
                        <div>{{scope.row.remitterName}}</div>
                        <div>{{scope.row.remitterPhone}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="amount"
                label="打款金额"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="remitAccount"
                label="打款账户"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="payeeAccount"
                label="收款账户"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="reviewState"
                label="状态"
                min-width="180">
                    <template slot-scope="scope">
                    {{reviewStateList[scope.row.reviewState]}}
                    </template>
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="提交时间 "
                min-width="180">
                </el-table-column>
                <el-table-column
                label="操作"
                min-width="300">
                    <template slot-scope="scope">
                        <!-- <el-button
                            v-if="scope.row.reviewState==0"
                            size="mini"
                            type="primary"
                            @click="paymentAuditIsOk(scope.row.id,2)"
                            plain>驳回</el-button> -->
                        <el-button
                            v-if="scope.row.reviewState==0"
                            size="mini"
                            type="primary"
                            @click="paymentAuditIsOk(scope.row.id,1)"
                            plain>通过</el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleChangePatmentDetail(scope.row.id)"
                            plain>查看凭证</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-footer--APP" slot="append">
                <el-pagination
                :current-page="form.page"
                :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]"
                :page-size="form.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            <el-dialog
            title="审核打款凭证"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="60%">
                <second-index
                :payment-id="paymentId"
                v-if="secondDepShow"
                @finish-action="getStockList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./paymentAuditInfo.vue');
import {
     getPaymentListAPI,
     checkVoucherOkAPI,
     checkVoucherNoAPI
} from '@/api/paymentAuditAPI.js'
export default {
    name:'prodList',
    data(){
        return{
            form:{
                current:1,
                size:10,
            },
            paymentId:'',
            secondDepShow:false,
            orderTypelist:{
                1:"采购订单",
                2:"零售订单",
                3:"提货订单",
                4:"内购订单",
                5:"换货订单",
            },
            reviewStateList:{
                0:'待审核',
                1:'审核通过',
                2:'已拒绝'
            },
            shoptypelist:[{name:'全部',val:'1',nownum:''},{name:'待总部审核',val:'2',nownum:''},{name:'待代理审核',val:'3',nownum:''},{name:'已付款',val:'4',nownum:''},{name:'已失效',val:'5',nownum:''}],
            shoptype:1,
            searchshow:false,
            keyword:"",
            tableData:[],
            totalCount:0,
            tableLoading:false,
        };
    },
    components:{
        SecondIndex
    },
    methods:{
       
        /**
         * @msg: 翻页
         * @param {type} 
         * @return: 
         */
        handleSizeChange(cSize) {
            this.form.size = cSize;
            this.getStockList();
        },
        paymentAuditIsOk(id,type){
            const params={
                id:id,
                reviewState:type,
                auditorType:1
            }
            console.log(params)
            if(type==1){
                checkVoucherOkAPI(params)
                    .then(res => {
                        const response = res.data;
                        if(response.code==200){
                        this.$message({
                            type: 'success',
                            message: '通过审核成功',
                        });
                        this.$emit('close-form')
                        this.$emit('finish-action')
                        }else{
                        this.errorMsg(response.message)
                        }
                    })
                    .catch(err => {
                        this.tableLoading = false;
                    })
            }else{
                checkVoucherNoAPI(params)
                    .then(res => {
                        const response = res.data;
                        if(response.code==200){
                            this.$message({
                                type: 'success',
                                message: '驳回审核成功',
                            });
                            this.$emit('close-form')
                            this.$emit('finish-action')
                        }else{
                        this.errorMsg(response.message)
                        }
                    })
                    .catch(err => {
                        this.tableLoading = false;
                    })
            }
            console.log(params)
        },
        handleChangePatmentDetail(id){
            console.log(id)
            this.paymentId=id;
            this.secondDepShow=true
        },
        changeshow(){
            console.log(123)
            this.searchshow=!this.searchshow
        },
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getStockList();
        },
        getStockList(){
            const params = {...this.form};
            this.tableLoading = true;
             getPaymentListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    this.totalCount = data.totalCount;
                    this.tableData = data.records;
                    this.tableLoading = false;
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        }
    },
    created(){
        this.getStockList()
    }
}
</script>

<style scoped lang="less">
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

