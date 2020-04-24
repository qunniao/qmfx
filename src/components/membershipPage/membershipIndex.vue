/*
 * @Description: 会员列表
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
                <!-- <el-form-item label="访客信息">
                    <el-col :span="24">
                        <el-input v-model="form.name" placeholder="请输入商品名称或者货号" ></el-input>
                    </el-col>
                </el-form-item>
                 <el-form-item label="访问时间">
                        <el-date-picker
                        v-model="value1"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getVisitorsRecordList">查找</el-button>
                </el-form-item> -->
            </el-form>
        </div>        
        <div class="table_body">
            <el-table
            :data="tableData"
            border
            size="medium "
            style="width: 100%">
                <el-table-column
                prop="nickname"
                label="姓名"
                min-width="300">
                </el-table-column>
                 <el-table-column
                prop="level"
                label="代理等级"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="inviterName"
                label="邀请人"
                min-width="180">
               
                </el-table-column>
                <el-table-column
                prop="orderNum"
                label="订单数量"
                min-width="100">
                <template slot-scope="scope">
                   <div @click="goorder(scope.row.id)" style="cursor: pointer;">{{scope.row.orderNum}}</div>
                </template>
                </el-table-column>
                <el-table-column
                prop="balance"
                label="钱包余额"
                min-width="100">
                <template slot-scope="scope">
                   <div @click="gocomlist(scope.row.id)" style="cursor: pointer;">{{scope.row.balance}}</div>
                </template>
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="注册时间"
                min-width="180">
                </el-table-column>
                 <el-table-column
                prop="gmtLogin"
                label="最近访问时间"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="num"
                label="操作"
                min-width="360">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="gouserdetail(scope.row.id)">
                        查看详情
                    </el-button>
                    <el-button 
                        size="mini"
                        type="default"
                         @click="handleAgent(scope.row.id)">
                        设置代理
                    </el-button>
                    <el-button 
                        size="mini"
                        type="danger"
                         @click="deluserdetail(scope.row.id)">
                        删除
                    </el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="table-footer--APP" slot="append">
                <el-pagination
                :current-page="form.current"
                :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90]"
                :page-size="form.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
                </el-pagination>
            </div>
            <el-dialog
            title="订单列表"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="80%">
                <second-index
                v-if="secondDepShow"
                :user-id='userId'
                @finish-action="gethyuserList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
            <el-dialog
            title="佣金列表"
            :append-to-body="true"
            :visible.sync="threeDepShow"
            width="80%">
                <three-index
                v-if="threeDepShow"
                :users-id='usersId'
                @finish-action="gethyuserList"
                @close-form="threeDepShow = false"
                ></three-index>
            </el-dialog>
            <el-dialog
            title="个人信息"
            :append-to-body="true"
            :visible.sync="fourDepShow"
            width="80%">
                <four-index
                v-if="fourDepShow"
                :users-id='usersId'
                @finish-action="gethyuserList"
                @close-form="fourDepShow = false"
                ></four-index>
            </el-dialog>
            <el-dialog
            title="设置代理等级"
            :append-to-body="true"
            :visible.sync="fiveDepShow"
            width="50%">
                <five-index
                v-if="fiveDepShow"
                :users-id='usersId'
                @finish-action="gethyuserList"
                @close-form="fiveDepShow = false"
                ></five-index>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {
     timeStamp2String
} from '@/api/globalAPI.js'
const SecondIndex = () => import('./allOrderList.vue');
const ThreeIndex = () => import('./allCommissionList.vue');
const FourIndex = () => import('./membershipInfo.vue');
const FiveIndex = () => import('./membershipSetAgent.vue');
import {
     gethyuserListAPI,
     delUserdetailAPI
} from '@/api/visitorsRecordAPI.js'
export default {
    name:'prodList',
    data(){
        return{
            form:{
                size:10,
                current:1,
                // name:'',
                // startTime:'',
                // endTime:'',
            },
            fiveDepShow:false,
            fourDepShow:false,
            threeDepShow:false,
            value1:[, ],
            userId:'',
            usersId:'',
            tableData:[],
            totalCount:0,
            tableLoading:false,
            secondDepShow:false
        };
    },
    components:{
        SecondIndex,
        ThreeIndex,
        FourIndex,
        FiveIndex
    },
    methods:{
        /**
         * @msg: 时间处理
         * @param {type} 
         * @return: 
         */
        timechange(time,type){
            return timeStamp2String(time,type)
        },
        goorder(id){
            console.log('执行')
            this.userId=id
            this.secondDepShow=true
        },
        gocomlist(id){
            this.usersId=id
            this.threeDepShow=true
        },
        gouserdetail(id){
            this.usersId=id
            this.fourDepShow=true
        },
       handleAgent(id){
            this.usersId=id
            this.fiveDepShow=true
        },
        deluserdetail(id){
             this.$confirm('确定要删除该用户么？（此操作不可逆）', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    delUserdetailAPI(id)
                    .then(res => {
                        if(res.data.code === 200){
                            this.$message({
                                type: 'success',
                                message: '该用户已经删除',
                            });
                            this.gethyuserList()
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
            this.gethyuserList();
        },
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.gethyuserList();
        },
        showVisitorsDetail(id,phone,nickname,storeName){
            this.id=id;
            this.phone=phone
            this.nickname=nickname
            this.storeName=storeName
            this.secondDepShow=true
        },
        gethyuserList(){
            const params = {...this.form};
            // if(this.value1[0]!=''&&this.value1[0]!=undefined&&this.value1[0]!=null){
            //     params.endTime=timeStamp2String(this.value1[1],2)
            //     params.startTime=timeStamp2String(this.value1[0],2)
            // }
            this.tableLoading = true;
             gethyuserListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    console.log(data.records)
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
        this.gethyuserList()
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

