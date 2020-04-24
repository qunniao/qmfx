/*
 * @Description: 代理等级信息
 * @Author: jian.weng
 * @Date: 2019-10-29 10:49:29
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
                prop="level"
                label="代理等级"
                min-width="180">
                </el-table-column>
              
                <el-table-column
                prop="minStock"
                label="最低进货额（元）"
                min-width="180">
                </el-table-column>
             
               <el-table-column
                label="操作"
                min-width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="changeUpdateShow(scope.row.id)">修改最低进货额</el-button>
                        
                    </template>
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
           <el-dialog
            title="修改最低进货金额"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="50%">
                <second-index
                v-if="secondDepShow"
                :update-id='updateId'
                @finish-action="getList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./agentLevelSetUpInfo.vue');

import {
     getAgentLevelListAPI
} from '@/api/agentAPI.js'

export default {
    name:'prodList',
    data(){
        return{
            form:{
                size:10,
                current:1
                // statusType:'1'
            },
            agentLevelist:[{name:'普通会员',value:'0'},{name:'总代',value:'1'}],
        
            shopClassification:'',
          
            tableData:[],
            totalCount:0,
            tableLoading:false,
            updateId:0,
            secondDepShow:false,//产品1弹窗
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
            this.getList();
        },
       
       handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getList();
        },
        changeUpdateShow(currentId) {
            this.updateId = currentId;
            this.getList();
        },
        getList(){
            const params = {...this.form};
            this.tableLoading = true;
             getAgentLevelListAPI(params)
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
        changeUpdateShow(id){
            this.updateId=id
            console.log(id)
            console.log(this.updateId)
            this.secondDepShow=true
        },
    },
    created(){
        this.getList()
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

