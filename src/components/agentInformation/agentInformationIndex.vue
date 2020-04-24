/*
 * @Description: 代理信息
 * @Author: jian.weng
 * @Date: 2019-10-29 10:49:29
 */

<template>
    <div>
       
        <div class="filter">
            <el-form class="fl-l" inline>
                 <el-form-item label="代理等级:">
                        <el-select v-model="shopClassification" clearable placeholder="全部等级" >
                            <el-option
                                v-for="item in agentLevelist"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                <el-form-item>
                    <el-button @click="getList" type="primary">查找</el-button>
                </el-form-item>
               
                <!-- <div style="margin-bottom:10px">
                    <el-tag v-for="item in shoptypelist" @click='changesearchtype(item.val)' :key="item.val" :class="{'active':item.val==form.statusType}">{{item.name}}{{item.nownum!=''?item.nownum:'0'}}</el-tag>
                </div> -->
            </el-form>
        </div>        
        <div class="table_body">
            <el-table
            :data="tableData"
            border
            id="exportTab"
            size="medium "
            style="width: 100%">
                <el-table-column
                prop="nickname"
                label="个人信息"
                min-width="360">
                    <template slot-scope="scope">
                        <div @click="changeagentdetail(scope.row.id)">{{scope.row.nickname}}</div>
                        <div>{{scope.row.phone}}</div>
                        <div>{{scope.row.gmtCreate}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="level"
                label="代理等级"
                min-width="180">
                </el-table-column>
             
                <el-table-column
                prop="balance"
                label="钱包余额"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="inviterCount"
                label="总邀请人数"
                min-width="180">
                   
                </el-table-column>
                <el-table-column
                prop="awardMoney"
                label="总奖励金额"
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
           
        </div>
    </div>
</template>

<script>


import {
     getAgentInfoListAPI
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
            tableLoading:false
        };
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
        getList(){
            const params = {...this.form};
            this.tableLoading = true;
             getAgentInfoListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    this.totalCount = data.total;
                    this.tableData = data.records;
                    this.tableLoading = false;
                })
                .catch(err => {
                    this.tableLoading = false;
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
</style>

