/*
 * @Description: 全部
 * @Author: jian.weng
 * @Date: 2019-10-24 18:21:00
 */

<template>
    <div>
       
                <div class="filter">
            <el-form class="fl-l" inline>
               
                <div style="margin-bottom:10px;margin-top:20px;">
                    <el-tag v-for="item in shoptypelist" @click='changesearchtype(item.val)' :key="item.val" :class="{'active':item.val==levelId}">{{item.name}}</el-tag>
                </div>
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
                prop="pid"
                label="产品编号"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="title"
                label="商品"
                min-width="360">
                 <template slot-scope="scope">
                        <img class="prod-img" :src="scope.row.cover">
                        <div class="prod-detail" :span="6">
                            <div>
                                {{scope.row.title}}
                            </div>
                            
                        </div>
                 </template>
                </el-table-column>
                <el-table-column
                prop="price"
                label="产品价格"
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="agentPrice"
                label="代理进货价格"
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="awardMoney"
                label="代理等级产品佣金(元)"
                min-width="180">
                </el-table-column>
               
                <el-table-column
                label="操作"
                min-width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="changeUpdateShow(scope.row.pid,scope.row.awardMoney,scope.row.agentPrice)">修改</el-button>
                    </template>
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
            <el-dialog
            title="修改代理等级对应的产品佣金金额"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="80%">
                <second-index
                v-if="secondDepShow"
                :product-id='productId'
                :level-id='levelId'
                :award-money='money'
                :agent-price='agentPrice'
                @finish-action="getList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
        </div>
        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./agentLevelProductAwardSetUpInfo.vue');
import {
     getAgentLevelProductAwardListAPI
} from '@/api/agentAPI.js'


export default {
    name:'prodList',
    data(){
        return{
           
            productId:'',
            levelId:0,
            money:'',
            agentPrice:'',
            form:{
                current :1,
                size :10
            },
           
            shoptypelist:[{name:'普通会员',val:'0'},{name:'总代',val:'1'}],
            shoptype:0,
           
            tableData:[],
            totalCount:0,
            tableLoading:false,
          
            secondDepShow:false,//产品1弹窗
        };
    },
    components:{
        // AddDepModal,
        SecondIndex
    },
    methods:{
        changeUpdateShow(id,money,price){
            this.productId=id
            this.money=money;
            this.agentPrice = price;
            console.log(id)
            console.log(this.productId)
            this.secondDepShow=true
        },
        /*
         * 获取列表
         */
        getList(){
            const params = {...this.form};
          
                params.agentLevelId=this.levelId
                
            this.tableLoading = true;
             getAgentLevelProductAwardListAPI(params)
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
      
        changesearchtype(id){
            this.levelId=id
            this.getList()
        },
        changetable(e){
            console.log(e)
            if(e.prop=='price'&&e.order=='ascending'){
                this.form.sortType=1
            }else if(e.prop=='price'&&e.order=='descending'){
                this.form.sortType=2
            }
            console.log(this.form)
            this.getList()
        },
        /**
         * @msg: 翻页
         * @param {type} 
         * @return: 
         */
        handleSizeChange(cSize) {
            this.form.size = cSize;
            this.getOrderList();
        },
        
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getOrderList();
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
.prod-img{
  max-width: 64px;
    min-width: 64px;
    width: 64px;
    height: 64px;
    line-height: 64px;
    border-radius: 4px;
}
</style>

