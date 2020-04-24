/*
 * @Description: 佣金记录
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
                prop="id"
                label="编号"
                min-width="100">
                </el-table-column>
                 <el-table-column
                prop="shareName"
                label="奖励人"
                min-width="200">
                </el-table-column>
                <el-table-column
                prop="awardMoney"
                label="奖励佣金(元)"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="userListVO.nickname"
                label="来源"
                min-width="200">
                </el-table-column>
                <el-table-column
                prop="productListVO.title"
                label="产品标题"
                min-width="200">
                </el-table-column>
                 <el-table-column
                prop="orderProductVO.productNum"
                label="产品数量"
                min-width="100">
                </el-table-column>
                 <el-table-column
                prop="orderProductVO.productPrice"
                label="产品价格"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="awardState"
                label="奖励状态"
                min-width="180">
                <template slot-scope="scope">
                  {{statelist[scope.row.awardState]}}
                 </template>
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="奖励时间"
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
            <div>
           
        </div>
        </div>
    </div>
</template>

<script>

import {
     getAwardListAPI
} from '@/api/awardAPI.js'
import {
     timeStamp2String
} from '@/api/globalAPI.js'

export default {
    name:'prodList',
    data(){
        return{
            statelist:{
                1:"待结算",
                2:"待奖励",
                3:"已完成",
                4:"已失效"
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
             getAwardListAPI(params)
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
        }
       
       
       
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

