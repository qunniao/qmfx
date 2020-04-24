/*
 * @Description: 订单物流列表
 * @Author: jian.weng
 * @Date: 2019-10-24 18:21:00
 */

<template>
    <div>
       <div class="header">
            <p>订单物流列表</p>
            <el-button type="primary" @click="handleAdd()">添加物流</el-button>
        </div>
        <div class="table_body">
            <el-table
            :data="tableData"
            border
            id="exportTab"
            size="medium "
            style="width: 100%">
                
                <el-table-column
                prop="logisticCode"
                label="快递单号"
                min-width="150">
                </el-table-column>
                <el-table-column
                prop="expressCompany"
                label="快递公司"
                min-width="80">
                </el-table-column>
                
                <el-table-column
                label="快递商品"
                min-width="150"
                >
                 <template slot-scope="scope">
                     <div v-for="item in scope.row.orderProductList" :key="item.val">
                        <img class="prod-img" :src="item.cover">
                        <div class="prod-detail" :span="6">
                            <div>
                                {{item.title}}
                            </div>
                            <div>
                                x{{item.productNum}}
                            </div>
                            <div>
                                ￥{{item.productPrice}}
                            </div>
                        </div>
                    </div>
                 </template>
                </el-table-column>
                <el-table-column
                label="物流跟踪"
                min-width="500">
                <template slot-scope="scope">
                     <div v-for="item in scope.row.logisticTraceList" :key="item.AcceptTime">
                        <div class="prod-detail" :span="6">
                            <div>
                                <font style="font-size:10px;">{{item.AcceptStation}}</font>
                            </div>
                            <div>
                                <font style="font-size:10px;">{{item.Remark}}</font>
                            </div>
                            <div>
                                <font style="font-size:10px;">{{item.AcceptTime}}</font>
                            </div>
                        </div>
                    </div>
                 </template>
                </el-table-column>
            
                <el-table-column
                prop="gmtCreate"
                label="物流状态"
                min-width="80">
                <template slot-scope="scope">
                  {{logisticStatelist[scope.row.logisticState]}}
                 </template>
                </el-table-column>
               
                <el-table-column
                prop="payTime"
                label="收件人"
                min-width="200">
                <template slot-scope="scope">
                        <div class="prod-detail" :span="6">
                            <div>
                                {{scope.row.contactName}}
                            </div>
                            <div>
                                {{scope.row.contactPhone}}
                            </div>
                            <div>
                                {{scope.row.contactAddress}}
                            </div>
                        </div>
                 </template>
                </el-table-column>
                <el-table-column
                label="操作"
                min-width="150">
                    <template slot-scope="scope">
                        
                        <el-button 
                            size="mini"
                            type="danger"
                            @click="handleDel(scope.row.id)">
                            删除
                        </el-button>
                       
                        <el-button size="mini" type="primary" @click="handleUpdate(scope.row.id)">修改</el-button>
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
            :title="this.isEdit ? '修改物流' : '新增物流'"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="80%">
                <second-index
                v-if="secondDepShow"
                :update-id='updateId'
                :order-id='orderId'
                :contact-name='contactName'
                :contact-phone='contactPhone'
                :contact-address='contactAddress'
                @finish-action="getList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
             
        </div>
        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./orderLogisticInfo.vue');
import {
     getOrderLogisticListAPI,
     delorderLogisticAPI
} from '@/api/prodOrderLogisticAPI.js'


export default {
    name:'prodList',
    data(){
        return{
            logisticStatelist:{
                0:"运输中",
                1:"已签收"
            },
            form:{
                current :1,
                size :10
            },
         
            tableData:[],
            totalCount:0,
            tableLoading:false,
            isEdit:false,//是否编辑
            updateId:0,//科室ID
            secondDepShow:false,//产品1弹窗
            contactName:'',
            contactPhone:'',
            contactAddress:''
        };
    },
     props: {
        orderId: {
            required: true,
        },
    },
    components:{
        // AddDepModal,
        SecondIndex
    },
    methods:{
        /*
         * 获取物流列表
         */
        getList(){
            const params = {orderId:this.orderId};
            // if(this.value1[0]!=''&&this.value1[0]!=undefined&&this.value1[0]!=null){
            //     params.endTime=timeStamp2String(this.value1[1],2)
            //     params.startTime=timeStamp2String(this.value1[0],2)
            // }
            this.tableLoading = true;
            //console.log(params);
             getOrderLogisticListAPI(params)
                .then(res => {
                    console.log(res);
                    const data = res.data.data;
                    
                    for(var i=0;i<data.length;i++){
                        if(data[i].logisticTrace==null || data[i].logisticTrace =='')continue;
                        var obj_trace = JSON.parse(data[i].logisticTrace);
                       // console.log("物流obj_trace");
                       // console.log(obj_trace);
                       // console.log(obj_trace.Traces);
                        data[i].logisticTraceList = obj_trace.Traces;
                    }
                    this.totalCount = data.total;
                    this.tableData = data;
                    this.tableLoading = false;
                    console.log(this.tableData);
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
        
        handleDel(id){
            console.log(id)
             this.$confirm('确定要删除该数据么？（此操作不可逆）', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    const params = {pids:id};
                    delorderLogisticAPI(params)
                    .then(res => {
                        if(res.data.code === 200){
                            this.$message({
                                type: 'success',
                                message: '删除成功',
                            });
                            this.getList()
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
            this.getList();
        },
        
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getList();
        },
        /**
         * @msg: 新增
         * @param {type} 
         * @return: 
         */
        handleAdd(){
            this.updateId = 0;
            this.isEdit = false;
            this.secondDepShow = true;
        },
        /**
         * @msg: 修改
         * @param {Number} row  修改产品的信息
         */
        handleUpdate(id) {
            this.updateId = id;
            this.secondDepShow = true;
            this.isEdit = true;
        },
        
    },
    created(){
        console.log("created: "+this.orderId);
        this.getList();
        
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
.prod-detail{
  display: inline-block;
  margin-left: 10px;
  line-height: 24px;
}
</style>

