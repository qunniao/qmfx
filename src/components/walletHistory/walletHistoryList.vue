/*
 * @Description: 全部
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
                prop="userId"
                label="用户编号"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="nickname"
                label="钱包所属用户名称"
                min-width="180">
                </el-table-column>
                 <el-table-column
                prop="amount"
                label="交易金额"
                min-width="100">
                </el-table-column>
                 <el-table-column
                prop="balance"
                label="交易后余额"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="tradeDesc"
                label="备注信息"
                min-width="360">
                </el-table-column>
                <el-table-column
                prop="inOut"
                label="收入还是支出"
                min-width="100">
                <template slot-scope="scope">
                  {{statelist[scope.row.inOut]}}
                 </template>
                </el-table-column>
                 <el-table-column
                prop="gmtCreate"
                label="创建时间"
                min-width="180">
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
       
        </div>
    </div>
</template>

<script>

import {
     getWalletHistoryListAPI
} from '@/api/walletHistoryAPI.js'
import {
     timeStamp2String
} from '@/api/globalAPI.js'
import FileSaver from 'file-saver'


export default {
    name:'walletHistoryList',
    data(){
        return{
            payfun:{
                1:"打款凭证",
                2:"线上支付"
            },
            statelist:{
                0:"支出",
                1:"收入"
            },
 
            form:{
                current :1,
                size :10
            },
           
            tableData:[],
            totalCount:0,
            tableLoading:false
        };
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
             getWalletHistoryListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    this.totalCount = data.total;
                    this.tableData = data.records;
                    this.tableLoading = false;
                
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
        
        
        /**
         * @msg: 翻页
         * @param {type} 
         * @return: 
         */
        handleSizeChange(cSize) {
            this.form.size = cSize;
            this.getList();
        },
        
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getList();
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
</style>

