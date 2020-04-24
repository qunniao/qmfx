/*
 * @Description: 选择商品列表
 * @Author: jian.weng
 * @Date: 2019-10-24 18:21:00
 */

<template>
    <div>
        <div class="filter">
            <el-form class="fl-l" inline>
                <el-form-item label="商品信息">
                    <el-col :span="24">
                        <el-input v-model="form.search" placeholder="请输入商品名称和商品货号进行搜索" ></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
        </div>       
        <div class="table_body">
            <el-table
            :data="tableData"
            border
            @sort-change='changetable'
            size="medium "
            :default-sort = "{prop: 'price', order: 'descending'}"
            style="width: 100%">
                <el-table-column
                prop="departmentName"
                label="商品"
                min-width="360">
                 <template slot-scope="scope">
                        <img class="prod-img" :src="scope.row.cover">
                        <div class="prod-detail" :span="6">
                            <div>
                                {{scope.row.productName}}
                            </div>
                            <div>
                                货号:{{scope.row.productNumber}}
                            </div>
                            <div>
                                分类:缺少参数
                            </div>
                            <div>
                             规格:缺少参数
                            </div>
                        </div>
                 </template>
                </el-table-column>
                <el-table-column
                label="操作"
                min-width="300">
                    <template>
                        <el-button
                            size="mini"
                            type="primary"
                            plain
                           >设置</el-button>
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
    </div>
</template>

<script>
import {
     getProductsDepListAPI,
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
                statusType:1,
                sortType:1
            },
            keyword:"",
            tableData:[],
            totalCount:0,
            tableLoading:false,
            isEdit:false,//是否编辑
        };
    },
    components:{
        // AddDepModal,
    },
    methods:{
        /*
         * 获取产品列表
         */
        getProdList(){
            console.log('执行了')
            const params = {...this.form};
            if(this.value1[0]!=''&&this.value1[0]!=undefined&&this.value1[0]!=null){
                params.endTime=timeStamp2String(this.value1[1],2)
                params.startTime=timeStamp2String(this.value1[0],2)
            }
            this.tableLoading = true;
             getProductsDepListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    this.totalCount = data.page.total;
                    this.tableData = data.page.records;
                    this.tableLoading = false;
                    let nowprodnum =data.count;
                })
                .catch(err => {
                    this.tableLoading = false;
                })
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
        
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getProdList();
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
    },
    created(){
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

