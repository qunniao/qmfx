/*
 * @Description: 普通一次性奖励
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
                <el-form-item label="代理信息:">
                    <el-col :span="24">
                        <el-input v-model="keyword" placeholder="请输入代理姓名/手机号" ></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item>
                    <el-button @click="changeirdubary" type="primary">查找</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">展开</el-button>
                </el-form-item>
                <div v-if="searchshow" >
                </div>
                <div style="margin-bottom:10px">
                    <el-tag v-for="item in shoptypelist" :key="item.val" :class="{'active':item.val==form.statusType}">{{item.name}}{{item.nownum!=''?item.nownum:'0'}}</el-tag>
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
                label="奖励A"
                min-width="360">
                    <template slot-scope="scope">
                        <div>{{scope.row.nickname}}</div>
                        <div>{{scope.row.phone}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="orderType"
                label="奖励B"
                min-width="360">
                    <template slot-scope="scope">
                        <div>{{scope.row.nickname}}</div>
                        <div>{{scope.row.phone}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="applyInfo"
                label="奖励源"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="inviterNick"
                label="奖励场景"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="奖励人"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="remitAccount"
                label="奖励信息"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="payeeAccount"
                label="奖励金额"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="payeeAccount"
                label="状态"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="payeeAccount"
                label="创建时间"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="payeeAccount"
                label="更新时间"
                min-width="180">
                </el-table-column>
                <el-table-column
                label="操作"
                min-width="300">
                    <template>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="changedetailshow"
                            plain>查看详情</el-button>
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
            title="奖励详情一按固定金额"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="60%">
                <second-index
                v-if="secondDepShow"
                :ordinary-id='ordinaryId'
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./seniorRewardInfo.vue');
export default {
    name:'prodList',
    data(){
        return{
            form:{
                current:1,
                size:10,
            },
            ordinaryId:'',
            keyword:'',
            paymentId:'',
            shoptypelist:[{name:'全部',val:'1',nownum:''},{name:'待结算',val:'2',nownum:''},{name:'已完成',val:'3',nownum:''},{name:'已失效',val:'4',nownum:''}],
            keyword:"",
            tableData:[],
            totalCount:0,
            searchshow:false,
            secondDepShow:false,
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
            // this.getProdList();
        },
        
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            // this.getProdList();
        },
        changedetailshow(){
            this.secondDepShow=true
        },
        changeirdubary(){
            this.secondDepShow=true
        },
        errorMsg (message) {
            this.$message({
                message: message,
                type: 'error',
                duration: 1500
            })
        },
    },
    created(){
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

