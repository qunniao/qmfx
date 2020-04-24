/*
 * @Description: 运费模板列表
 * @Author: jian.weng
 * @Date: 2018-11-01 10:49:29
 */

<template>
    <div>
        <div class="header">
            <p>运费模板列表</p>
            <el-button type="primary" @click="addProtype">添加运费模板</el-button>
        </div>
        <div class="table_body">
            <div v-for="(item,index) in tableData" :key="index" style="border:1px solid #000;margin-bottom:10px;">
                <div class="freightbox">
                    <label style="float:left;display:block">{{item.title}}({{item.freightNum}}个商品使用)</label>
                    <label style="float:right;display:block">
                        <span>最后展开时间:{{item.gmtModified}} </span>
                        <span style="margin-right:10px" @click="changeProtype(item.id)">编辑</span>
                        <el-dropdown @command="(value)=> handleCommand(item.id, value)">
                            <span class="el-dropdown-link">
                                更多<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  command="4" v-bind:disabled="item.freightNum>=1">删除模板</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <span style="margin-left:10px;" @click="changeform(index,item.id)">{{item.isshow?'关闭':'展开'}}</span>
                    </label>
                </div>
                <div v-if="item.isshow==true">
                    <el-table
                    :data="item.tableform"
                    row-key="id"
                    border
                    size="medium "
                    style="width: 100%">
                        <el-table-column
                        prop="title"
                        label="运送方式"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="title"
                        label="配送区域"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="firstNumber"
                        label="首件(件)"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="firstPrice"
                        label="首费"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="renewNumber"
                        label="续件(件)"
                        min-width="180">
                        </el-table-column>
                        <el-table-column
                        prop="renewPrice"
                        label="续费"
                        min-width="180">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
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
        </div>
        <div>
            <el-dialog
            :title="this.isEdit ? '修改运费模板' : '添加运费模板'"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="80%">
                <second-index
                v-if="secondDepShow"
                :prodgroup-id="groupId"
                @finish-action="getAllFrieghtList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./freightTemplateInfo.vue');
import {
    getFrieghtListAPI,
    getFrieghtBoxListAPI,
    deleteFreightAPI
} from '@/api/prodFreightAPI.js'

export default {
    name:'prodList',
    data(){
        return{
            form:{
                size:10,
                current:1,
            },
            formtwo:{
                size:10,
                current:1,
            },
            nowindex:'',
            tableData:[],
            totalCount:0,
            tableLoading:false,
            isEdit:false,//是否编辑
            groupId:0,//分类ID
            secondDepShow:false,//产品1弹窗
        };
    },
    components:{
        // AddDepModal,
        SecondIndex
    },
    methods:{
        changeform(index,id){
            // console.log(this.nowindex)
            if(index==this.nowindex&&this.nowindex!==''){               
                if(this.tableData[index].isshow){
                    this.getFrieghtList(index,id,1)
                }else{
                    this.tableData[index].isshow=!this.tableData[index].isshow
                }
            }else{
                for(let i=0;i<this.tableData.length;i++){
                    this.tableData[i].isshow=false
                }
                this.nowindex=index
                this.getFrieghtList(index,id,2)
            }
        },
        /*
         * 获取单个运费模板列表
         */
        getFrieghtList(index,id,type) {
            // console.log(id)
            const params = {...this.form};

            this.tableLoading = true;
            getFrieghtListAPI(id)
                .then(res => {
                    const data = res.data.data;
                    this.tableData[index].tableform=data.freightRegionList
                    if(type==1){
                        this.tableData[index].isshow=!this.tableData[index].isshow
                    }else{
                        this.tableData[index].isshow=true
                    }
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
        /*
         * 更多菜单操作
         */
        handleCommand(e,command){
            console.log(command)
            console.log(e)
            if(command==4){
                deleteFreightAPI(e)
                .then(res => {
                    const data = res.data.data;
                    this.$message({
                      type: 'success',
                      message: '删除成功',
                    });
                    this.getAllFrieghtList()
                })
                .catch(err => {
                    this.tableLoading = false;
                })
            }
        },
        /*
         * 获取所有运费模板列表
         */
        getAllFrieghtList() {
            const params = {...this.formtwo};

            this.tableLoading = true;
            getFrieghtBoxListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    let tableDatalist =data.records
                    for(let i=0;i<tableDatalist.length;i++){
                        tableDatalist[i].isshow=false
                    }
                    this.tableData=tableDatalist;
                    this.totalCount=data.total
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
        /**
         * @msg: 新增运费模板
         * @param {type} 
         * @return: 
         */
        handleAddType(){
            this.groupId = 0;
            this.isEdit = false;
            this.secondDepShow = true;
        },
        /**
         * @msg: 修改运费模板
         * @param {Number} row  修改运费模板
         */
        handleChange(changeid) {
            this.groupId = changeid;
            this.isEdit = false;
            this.secondDepShow = true;
        },
        /**
         * @msg: 删除运费模板
         * @param {Number} row  删除运费模板
         */
        handleDel(index){
            let delID = {
                pgids:index
            }
            deleteGroupAPI(delID)
                .then(res => {
                    const response = res.data;
                    let status = 'success';

                    if (response.code === 200) {
                        this.getGroupList();
                    } else {
                        status = 'error';
                    }
                    this.$message({
                        type: status,
                        message: status === 'success' ? '删除成功！' : response.msg,
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
            this.getAllFrieghtList();
        },
        
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getAllFrieghtList();
        },
         /**
         * @msg: 修改运费模板
         * @param {type} 
         * @return: 
         */
        changeProtype(index){
            this.handleChange(index)
        },
        addProtype(){
            this.handleAddType()
        }
    },
    created(){
        this.getAllFrieghtList()
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
.img-upload {
    cursor: pointer;
    
    &:not(:first-child) {
        margin-left: 8px;
    }
}
.img-enlarge-wrapper {
    width: 100%;
    max-height: 500px;
    text-align: center;
    overflow: auto;

    img {
        width: 100%;
    }
}
.freightbox{
    overflow: hidden;
    width:100%;
    padding:16px 24px;
}
</style>

