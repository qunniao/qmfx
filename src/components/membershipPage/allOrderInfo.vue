/*
 * @Description: 订单详情
 * @Author: jian.weng
 * @Date: 2019-10-29 10:49:29
 */

<template>
    <div>
        <el-button @click="getPdf()" type="primary">导出</el-button>
        <div id="pdfDom" class="table_body">
            <el-row>
                    <el-col :span="16">
                        <div>订单号:{{orderdetail.orderNumber}}</div>
                        <div>{{orderstate[orderdetail.orderState]}}</div>
                        <!-- <el-button>查看凭证</el-button><el-button>卖家备注</el-button> -->
                    </el-col>
                    <!-- <el-col :span="16">
                        123
                    </el-col> -->
            </el-row>
            <el-row>
                    <el-col :span="16">
                        <div>订单信息</div>
                            <div style="padding-left:20px">
                                <div>下单人：{{orderdetail.nickname}}</div>
                                <div>配送方式：{{sendway[orderdetail.deliveryWay]}}</div>
                                <div>收货信息：{{orderdetail.contactAddress}}</div>
                            </div>                            
                    </el-col>
                    <!-- <el-col :span="16">
                        <div>订单号:454154212</div>
                        <div>交易完成</div>
                        <el-button>查看凭证</el-button><el-button>卖家备注</el-button>
                    </el-col> -->
            </el-row>
            <el-row>
                    <el-col :span="16">
                        <div>付款方式：{{paywaylist[orderdetail.payway]}}</div>
                        <div>付款时间：{{orderdetail.payTime}}</div>
                        <div>订单金额：{{orderdetail.totalPrice}}</div> 
                        <!-- <div>发货仓库：默认仓库</div>                            -->
                    </el-col>
                    <!-- <el-col :span="16">
                       步骤时间
                    </el-col> -->
            </el-row>
            <el-table
                :data="orderform"
                row-key="id"
                border
                size="medium "
                style="width: 100%">
                    <el-table-column
                    prop="cover"
                    label="商品"
                    min-width="180">
                        <template slot-scope="scope">
                            <!-- <img crossorigin='anonymous'  class="prod-img" :src="scope.row.cover"> -->
                            <div class="prod-detail" :span="6">
                                <div>{{scope.row.productName}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="productNumber"
                    label="商品货号"
                    min-width="180">
                    </el-table-column>
                    <el-table-column
                    prop="productPrice"
                    label="单价"
                    min-width="180">
                    </el-table-column>
                    <el-table-column
                    prop="productNum"
                    label="数量"
                    min-width="180">
                    <template slot-scope="scope">
                        {{(Number(scope.row.productNum)/Number(scope.row.weight))}}
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="renewNumber"
                    label="小计"
                    min-width="180">
                    <template slot-scope="scope">
                        ￥{{(Number(scope.row.productNum)*Number(scope.row.productPrice)).toFixed(2)}}
                    </template>
                    </el-table-column>
                    <!-- <el-table-column
                    prop="renewPrice"
                    label="运费"
                    min-width="180">
                    </el-table-column> -->
                </el-table>
                <el-row>
                    <el-col :span="18">
                                              
                    </el-col>
                    <el-col :span="6">
                        <div>商品合计： ¥{{orderdetail.totalPrice}}</div>
                        <!-- <div>优惠：{{orderdetail.discount}}</div> -->
                        <div>运费：{{orderdetail.freight}}</div>
                        <div>实付款： ¥{{orderdetail.payMoney}}</div>
                    </el-col>
                </el-row>
        </div>
    </div>
</template>

<script>
import JsPDF from 'jspdf'
import {
     timeStamp2String
} from '@/api/globalAPI.js'
import {
     getOrderDetailAPI,
} from '@/api/prodOrderAPI.js'
export default {
    name:'prodList',
    data(){
        return{
            form:{
                size:10,
                current:1,
                id:''
            },
            htmlTitle:'订单信息',
            orderstate:{
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
            paywaylist:{
                1:"打款凭证",
                2:"线上支付"
            },
            sendway:{
                1:"快递",
                2:"自提",
                3:"无需物流"
            },
            orderdetail:{},
            orderform:[]
        };
    },
    components:{
        // AddDepModal,
    },
    props: {
        orderId: {
            required: true,
        },
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
        /*
         * 获取订单详情
         */
        getOrderDetail(id){
            this.tableLoading = true;
             getOrderDetailAPI(id)
                .then(res => {
                    const orderdata=res.data.data
                    console.log(orderdata)
                    this.orderdetail=orderdata
                    this.orderform=orderdata.orderProductBackList

                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
        printOut(name) {
            let shareContent = document.body,//需要截图的包裹的（原生的）DOM 对象
            width = shareContent.clientWidth, //获取dom 宽度
            height = shareContent.clientHeight, //获取dom 高度
            canvas = document.createElement("canvas"), //创建一个canvas节点
            scale = 2; //定义任意放大倍数 支持小数
                canvas.width = width * scale; //定义canvas 宽度 * 缩放
                canvas.height = height * scale; //定义canvas高度 *缩放
                canvas.style.width = shareContent.clientWidth * scale + "px";
                canvas.style.height = shareContent.clientHeight * scale + "px";
                canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
                let opts = {
                scale: scale, // 添加的scale 参数
                canvas: canvas, //自定义 canvas
                logging: false, //日志开关，便于查看html2canvas的内部执行流程
                width: width, //dom 原始宽度
                height: height,
                useCORS: true, // 【重要】开启跨域配置
                };

            html2Canvas(shareContent, opts).then(() => {
            var contentWidth = canvas.width;
            var contentHeight = canvas.height;
            //一页pdf显示html页面生成的canvas高度;
            var pageHeight = (contentWidth / 592.28) * 841.89;
            //未生成pdf的html页面高度
            var leftHeight = contentHeight;
            //页面偏移
            var position = 0;
            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            var imgWidth = 595.28;
            var imgHeight = (592.28 / contentWidth) * contentHeight;
            var pageData = canvas.toDataURL("image/jpeg", 1.0);
            var PDF = new JsPDF("", "pt", "a4");
            if (leftHeight < pageHeight) {
                PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
            } else {
                while (leftHeight > 0) {
                PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
                leftHeight -= pageHeight;
                position -= 841.89;
                if (leftHeight > 0) {
                    PDF.addPage();
                }
                }
            }
            PDF.save(name + ".pdf"); // 这里是导出的文件名
            });
        },
    },
    mounted(){
        this.getOrderDetail(this.orderId)
    }
}
</script>

<style scoped lang="less">
.el-row{
    padding: 10px;
    border:1px solid #000;
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

