/*
 * @Description: 帮助中心-问题列表
 * @Author: jian.weng
 * @Date: 2019-10-29 10:49:29
 */

<template>
    <div>
       <div class="header">
            <p>问题列表</p>
            <el-button type="primary" @click="addProtype">添加问题</el-button>
        </div>
        
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
                prop="title"
                label="问题"
                min-width="180">
                </el-table-column>   
                <el-table-column
                prop="name"
                label="所属分类"
                min-width="180">
                </el-table-column>
              
                <el-table-column
                prop="content"
                label="回答"
                min-width="360">
                </el-table-column>
             
               <el-table-column
                label="操作"
                min-width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleChange(scope.row.id)">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
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
            :title="this.isEdit ? '修改问题' : '添加问题'"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="60%">
                <second-index
                v-if="secondDepShow"
                :update-id="updateId"
                @finish-action="getList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./questionInfo.vue');

import {
     getQuestionListAPI,
     deleteQuestionAPI
} from '@/api/questionAPI.js'

export default {
    name:'prodList',
    data(){
        return{
            form:{
                size:10,
                current:1
                // statusType:'1'
            },
           
            tableData:[],
            totalCount:0,
            tableLoading:false,
            updateId:0,
            isEdit:false,//是否编辑
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
        addProtype(){
            this.handleAddType(0)
            // this.secondDepShow = true;
        },
        /**
         * @msg: 新增分类
         * @param {type} 
         * @return: 
         */
        handleAddType(typeids){
            console.log("handleAddType typeids:"+typeids);
            this.updateId = typeids;
            this.isEdit = false;
            this.secondDepShow = true;
        },
         /**
         * @msg: 修改分类
         * @param {type} 
         * @return: 
         */
        handleChange(typeids){
            console.log("handleChange typeids:"+typeids);
            this.updateId = typeids;
            this.isEdit = true;
            this.secondDepShow = true;
        },
        getList(){
            const params = {...this.form};
            this.tableLoading = true;
             getQuestionListAPI(params)
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
        
        deleteItem(id){
            console.log("deleteItem id:"+id);
            let delID = ''+id
            const params={
                ids:delID
            }
            deleteQuestionAPI(params)
                .then(res => {
                    const response = res.data;
                    let status = 'success';
                    if (response.code === 200) {
                        this.getList();
                    } else {
                        status = 'error';
                    }
                    this.$message({
                        type: status,
                        message: status === 'success' ? '删除成功！' : response.message,
                    })
                })
        }
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
.table_body{
        padding: 20px;
    }
</style>

