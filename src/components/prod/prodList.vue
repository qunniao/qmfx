/*
 * @Description: 常规商品列表
 * @Author: jian.weng
 * @Date: 2019-10-24 18:21:00
 */

<template>
    <div>
        <div class="header">
            <p>产品列表</p>
            <el-button type="primary" @click="handleSecondDepShow">添加产品</el-button>
        </div>
                <div class="filter">
            <el-form class="fl-l" inline>
                <el-form-item label="商品信息">
                    <el-col :span="24">
                        <el-input v-model="form.search" placeholder="请输入商品名称和商品货号进行搜索" ></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="商品分类">
                    <el-select v-model="form.typeId"  placeholder="请选择">
                        <el-option
                            v-for="item in prodtypelist"
                            :key="item.tid"
                            :label="item.title"
                            :value="item.tid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getProdList">查找</el-button>
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
                label="价格"
                min-width="80">
                </el-table-column>
                <el-table-column
                prop="sales"
                label="销量"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="totalStock"
                label="库存"
                min-width="80">
                </el-table-column>
                <el-table-column
                prop="productNumber"
                label="货号"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="创建时间"
                min-width="180">
                </el-table-column>
                <el-table-column
                label="操作"
                min-width="300">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="handleCheck(scope.$index, scope.row)">修改</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            plain
                            @click="handleDel(scope.$index, scope.row)">删除</el-button>
                        <!-- <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="handleputAway(scope.$index, scope.row)">{{scope.row.status=='0'?'下':'上'}}架</el-button> -->
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
        </div>
        <div>
            <el-dialog
            :title="this.isEdit ? '修改产品' : '新增产品'"
            :append-to-body="true"
            :visible.sync="modalAddDepShow"
            width="40%">
                <add-dep-modal
                v-if="modalAddDepShow"
                :dep-id="depId"
                @finish-action="getProdList"
                @close-form="modalAddDepShow = false"
                ></add-dep-modal>
            </el-dialog>
            <el-dialog
            title="产品详情"
            :append-to-body="true"
            :visible.sync="secondDepShow"
            width="90%">
                <second-index
                :dep-id="depId"
                v-if="secondDepShow"
                @finish-action="getProdList"
                @close-form="secondDepShow = false"
                ></second-index>
            </el-dialog>
        </div>
    </div>
</template>

<script>
const SecondIndex = () => import('./prodInfo.vue');
import {
     getProductsDepListAPI,
     putProdShopAPI,
     deleteFirstDepAPI,
     getprodTypeListtAPI
} from '@/api/productApi.js'
import {
     timeStamp2String
} from '@/api/globalAPI.js'

export default {
    name:'prodList',
    data(){
        return{
            form:{
                current :1,
                size :10,
                typeId:"",
                search:''
                // productType: 0,
                // statusType:1,
                // sortType:1
            },
            prodtypelist:[],
            freightlist:[],
            value1:[, ],
            shoptype:1,
            shopClassification:'',
            ommodityType:'',
            searchshow:false,
            keyword:"",
            tableData:[],
            totalCount:0,
            tableLoading:false,
            modalAddDepShow:false,//新增科室弹窗
            isEdit:false,//是否编辑
            depId:0,//科室ID
            secondDepShow:false,//产品1弹窗
        };
    },
    components:{
        // AddDepModal,
        SecondIndex
    },
    methods:{
        /*
         * 获取产品列表
         */
        getProdList(){
            const params = {...this.form};
            this.tableLoading = true;
             getProductsDepListAPI(params)
                .then(res => {
                    console.log("getProductsDepListAPI res:");
                    console.log(res.data.data);
                    const data = res.data.data;
                    if(data!=null){
                        this.totalCount = data.total;
                        this.tableData = data.records;
                        this.tableLoading = false;
                        let nowprodnum =data.count;
                    }else{
                        this.tableData=[]
                        this.tableLoading = false;
                        this.totalCount = 0;
                    }
                })
                .catch(err => {
                    this.errorMsg(err)
                    this.tableLoading = false;
                })
        },
        changesearchtype(id){
            this.form.statusType=id
            this.getProdList()
        },
        changetable(e){
            if(e.prop=='price'&&e.order=='ascending'){
                this.form.sortType=1
            }else if(e.prop=='price'&&e.order=='descending'){
                this.form.sortType=2
            }
            this.getProdList()
        },
        /**
         * @msg: 翻页
         * @param {type} 
         * @return: 
         */
        handleSizeChange(cSize) {
            this.form.size = cSize;
            this.getProdList();
        },
        geprodTypelist(){
            const getTempParam = {
                current:1,
                size:100
            };
            getprodTypeListtAPI(getTempParam)
                .then(res => {
                    const response = res.data.data;
                    response.unshift({
                        tid:'',
                        title:"全部"
                    })
                    this.prodtypelist =response
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getProdList();
        },
        /**
         * @msg: 新增产品
         * @param {type} 
         * @return: 
         */
        handleAddDep(){
            this.depId = 0;
            this.isEdit = false;
            this.secondDepShow = true;
        },
        /**
         * @msg: 修改产品
         * @param {Number} row  修改产品的信息
         */
        handleCheck(index, row) {
            this.depId = row.pid;
            this.secondDepShow = true;
            this.isEdit = true;
        },
        /**
         * @msg: 删除产品
         * @param {Number} row  删除产品信息
         */
        handleDel(index, row){
            let delID = ''+row.pid
            const params={
                pids:delID
            }
            deleteFirstDepAPI(params)
                .then(res => {
                    const response = res.data;
                    let status = 'success';
                    if (response.code === 200) {
                        this.getProdList();
                    } else {
                        status = 'error';
                    }
                    this.$message({
                        type: status,
                        message: status === 'success' ? '删除成功！' : response.message,
                    })
                })
        },
        handleputAway(index, row){
            let putid = row.pid
            let putstatus =0
            if(row.status==0){
                putstatus=-1
            }
            const params={
                pid:putid,
                status:putstatus
            }
            putProdShopAPI(params)
                .then(res => {
                    const response = res.data;
                    let status = 'success';                    
                    if (response.code === 200) {
                        this.getProdList();
                    } else {
                        status = 'error';
                    }
                    this.$message({
                        type: status,
                        message: status === 'success' ? '操作成功！' : response.message,
                    })
                })
        },
        handleSecondDepShow(){
            this.secondDepShow = true;
            this.depId=0
            this.isEdit=false
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
        this.geprodTypelist()
        this.getProdList()
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

