/*
 * @Description: 奖励
 * @Author: jian.weng
 * @Date: 2019-10-29 10:49:29
 */

<template>
    <div>
        <div class="header">
            <el-button type="primary" >导出</el-button>
        </div>
        <div class="filter">
            <el-form class="fl-l" inline>
                <el-form-item label="单笔奖励设置:">
                    <el-input v-model="oneprice"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="changeirdubary(1)" type="primary">保存</el-button>
                </el-form-item>
            </el-form>
            <el-form class="fl-l" inline>
                <el-form-item label="拼多奖一（件）:">
                    <el-input v-model="morenum"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="changeirdubary(2)" type="primary">保存</el-button>
                </el-form-item>
            </el-form>
            <el-form class="fl-l" inline>
                <el-form-item label="设置开始监管人数（人）:">
                    <el-input v-model="startnum"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="changeirdubary(3)" type="primary">保存</el-button>
                </el-form-item>
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
                min-width="360">
                </el-table-column>
                <el-table-column
                prop="inviters"
                label="下级人数"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="totalSales"
                label="下级总销量"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="monthSales"
                label="近30天销量"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="reward"
                label="应奖励"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="sceneType"
                label="注册时间"
                min-width="180">
                </el-table-column>
                <!-- <el-table-column
                prop="gmtCreate"
                label="创建时间"
                min-width="180">
                </el-table-column> -->
                <el-table-column
                label="操作"
                min-width="300">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="changedetailshow(scope.row.id)"
                            plain>查看下级</el-button>
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
            title="下级列表"
            :append-to-body="true"
            :visible.sync="fourDepShow"
            width="60%">
                <four-index
                v-if="fourDepShow"
                :user-id="userId"
                @close-form="fourDepShow = false"
                ></four-index>
            </el-dialog>
        </div>
    </div>
</template>

<script>
const FourIndex = () => import('./ordinaryRewarddetail.vue');
// const SecondIndex = () => import('./ordinaryRewardInfo.vue');
import {
     getordinaryRewardListAPI,
     getconfigInfosListAPI,
     changeirdubaryAPI
} from '@/api/ordinaryRewardAPI.js'
export default {
    name:'prodList',
    data(){
        return{
            form:{
                current:1,
                size:10,
            },
            amountTypeList:{
                1:"固定比例",
                2:"固定金额",
                3:"按单品设置"
            },
            sceneTypeList:{
                1:"代理加入",
                2:"代理升级"
            },
            rewardStateList:{
                1:"待结算",
                2:"待奖励",
                3:"已完成",
                4:"已失效"
            },
            oneprice:'',
            morenum:'',
            startnum:'',
            userId:'1',
            keyword:'',
            paymentId:'',
            shoptypelist:[{name:'全部',val:'1',nownum:''},{name:'待结算',val:'2',nownum:''},{name:'已完成',val:'3',nownum:''},{name:'已失效',val:'4',nownum:''}],
            keyword:"",
            tableData:[],
            totalCount:0,
            searchshow:false,
            fourDepShow:false,
            tableLoading:false,
        };
    },
    components:{
        FourIndex,
    },
    methods:{
        /**
         * @msg: 翻页
         * @param {type} 
         * @return: 
         */
        handleSizeChange(cSize) {
            this.form.size = cSize;
            this.getordinaryRewardList();
        },
        getordinaryRewardList(){
            const params = {...this.form};
            this.tableLoading = true;
             getordinaryRewardListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    console.log(data)
                    this.totalCount = data.length;
                    this.tableData = data;
                    this.tableLoading = false;
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
        getconfigInfosList(){
            // const params = {...this.form};
            // this.tableLoading = true;
            const that =this
             getconfigInfosListAPI()
                .then(res => {
                    const data = res.data.data;
                    console.log(data[0])
                    that.oneprice=data[0].value
                    that.morenum=data[1].value
                    that.startnum=data[2].value
                })
                .catch(err => {
                })
        },
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getordinaryRewardList();
        },
        changedetailshow(){
            this.fourDepShow=true
            this.userId=1
        },
        changeirdubary(type){
            const that =this;
            let changenum =that.oneprice
            if(type==2){
                changenum=that.morenum
            }
            if(type==3){
                changenum=that.startnum
            }
            const params ={
                id:type,
                value:changenum
            }
            changeirdubaryAPI(params)
                .then(res => {
                    const sucresponse = res.data;
                    if(sucresponse.code==200){
                      this.$message({
                        type: 'success',
                        message: '修改设置',
                      });
                      this.getconfigInfosList()
                    }else{
                      this.errorMsg(sucresponse.message)
                    }
                })
                .catch(err => {
                })
            // console.log(changenum)
            // this.secondDepShow=true
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
        this.getordinaryRewardList()
        this.getconfigInfosList()
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

