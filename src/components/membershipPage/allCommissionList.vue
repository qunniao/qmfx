/*
 * @Description: 全部
 * @Author: jian.weng
 * @Date: 2019-10-24 18:21:00
 */

<template>
    <div>
        <div class="header">
            <!-- <el-button @click="exportExcel" type="primary">导出</el-button> -->
            <!-- <el-button type="primary">待发货商品统计</el-button> -->
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
                label="购买人姓名"
                min-width="360">
                </el-table-column>
                 <el-table-column
                prop="productNum"
                label="商品数量"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="amount"
                label="佣金"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="gmtCreate"
                label="时间"
                min-width="180">
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
        </div>
        </div>
    </div>
</template>

<script>
import {
     getcommiseListAPI
} from '@/api/visitorsRecordAPI.js'
import {
     timeStamp2String
} from '@/api/globalAPI.js'
import FileSaver from 'file-saver'

import XLSX from 'xlsx'

export default {
    name:'prodList',
    data(){
        return{
            payfun:{
                1:"打款凭证",
                2:"线上支付"
            },
            orderstatelist:{
                "-1":"已删除",
                0:"已关闭",
                1:"待确认",
                2:"待付款",
                3:"待总部处理",
                4:"待发货",
                5:"待收货",
                6:"待评价",
                7:"已完成"
            },
            orderId:'',
            form:{
                current :1,
                size :10,
                orderState: '',
                // type:'',
                // search:'',
                // startTime:'',
                // endTime:'',
                // productNumber:'',
                // typeId:'',
                // minStore:'',
                // maxStore:'',
                // minPrice:'',
                // maxPrice:'',
                // minSales:'',
                // maxSales:'',
                // statusType:1,
                // sortType:1
                // freightId:''
            },
            freightlist:[],
            value1:[, ],
            shoptypelist:[{name:'全部',val:'',nownum:''},{name:'待付款',val:'1',nownum:''},{name:'待总部处理',val:'2',nownum:''},{name:'待发货',val:'3',nownum:''},{name:'待收货',val:'4',nownum:''},{name:'已完成',val:'5',nownum:''},{name:'已关闭',val:'6',nownum:''},{name:'已删除',val:'7',nownum:''}],
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
    props: {
        usersId: {
            required: true,
        },
    },
    components:{
        // AddDepModal,
    },
    methods:{
        changeOrderShow(id){
            this.orderId=id
            console.log(id)
            console.log(this.orderId)
            this.secondDepShow=true
        },
        /*
         * 获取订单列表
         */
        getcommiseList(){
            const params = {...this.form};
            // if(this.value1[0]!=''&&this.value1[0]!=undefined&&this.value1[0]!=null){
            //     params.endTime=timeStamp2String(this.value1[1],2)
            //     params.startTime=timeStamp2String(this.value1[0],2)
            // }
            this.tableLoading = true;
             getcommiseListAPI(params)
                .then(res => {
                    const data = res.data.data;
                    this.totalCount = data.total;
                    this.tableData = data.records;
                    this.tableLoading = false;
                    let nowprodnum =data.count
                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
        exportExcel () {
             /* generate workbook object from table */
            var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
            var wb = XLSX.utils.table_to_book(document.querySelector('#exportTab'), xlsxParam)

            /* get binary string as output */
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '订单信息表.xlsx')
            } catch (e) {
                if (typeof console !== 'undefined') {
                console.log(e, wbout)
                }
            }
            return wbout
        },
        changesearchtype(id){
            this.form.orderState=id
            this.getcommiseList()
        },
        changetable(e){
            console.log(e)
            if(e.prop=='price'&&e.order=='ascending'){
                this.form.sortType=1
            }else if(e.prop=='price'&&e.order=='descending'){
                this.form.sortType=2
            }
            console.log(this.form)
            this.getcommiseList()
        },
        /**
         * @msg: 翻页
         * @param {type} 
         * @return: 
         */
        handleSizeChange(cSize) {
            this.form.size = cSize;
            this.getcommiseList();
        },
        
        handleCurrentChange(currentPage) {
            this.form.current = currentPage;
            this.getcommiseList();
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
    },
    created(){
        this.form.userId =this.usersId
        this.getcommiseList()
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
</style>

