/*
 * @Description: 全部
 * @Author: jian.weng
 * @Date: 2019-10-24 18:21:00
 */

<template>
    <div>
        <!-- <div class="header">
            <el-button @click="exportExcel" type="primary">导出</el-button>
        </div> -->
        <div class="table_body">
            <el-table
            :data="tableData"
            border
            id="exportTab"
            size="medium "
            style="width: 100%">
                <el-table-column
                prop="nickname"
                label="姓名"
                min-width="360">
                </el-table-column>
                 <el-table-column
                prop="lowerTotalSales"
                label="总销量"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="lowerRecentlySales"
                label="近30天销量"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="注册时间"
                min-width="180">
                </el-table-column>
            </el-table>
            <div class="table-footer--APP" slot="append">
                <el-pagination
                :current-page="form.current"
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
     getTwoMoneyListAPI,
} from '@/api/ordinaryRewardAPI.js'

export default {
    name:'ordinaryList',
    data(){
        return{
            orderId:'',
            tableData:[],
            totalCount:0,
            tableLoading:false,
            form:{
                current :1,
                size :10,
                // orderState: '',
                inviterId:''
            },
        };
    },
    props: {
        userId: {
            required: true,
        },
    },
    components:{
        // AddDepModal,
        // SecondIndex
    },
    methods:{
        /*
         * 获取下级列表
         */
         getordinaryInfoList(){
            const params = {...this.form};
            this.tableLoading = true;
             getTwoMoneyListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    console.log(data)
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
            this.getordinaryInfoList();
        },
        
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getordinaryInfoList();
        },
    },
    created(){
        this.form.inviterId =this.userId
        // this.form.inviterId=0
        this.getordinaryInfoList()
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

