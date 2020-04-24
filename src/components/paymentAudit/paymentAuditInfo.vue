<template>
  <div class="mod-prod-info">
    <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
      <el-form-item label="打款金额:"
                    prop="amount">
        {{dataForm.amount}}
      </el-form-item>
      <el-form-item label="订单金额:"
                    prop="amount">
        {{dataForm.amount}}
      </el-form-item>
      <el-form-item label="代理收款账户:"
                    prop="payeeAccount">
        {{dataForm.payeeAccount}}
      </el-form-item>
      <el-form-item label="打款人账户:"
                    prop="remitAccount">
        {{dataForm.amount}}
      </el-form-item>
      <el-form-item label="备注信息:"
                    prop="remark">
        {{dataForm.remark}}
      </el-form-item>
      <el-form-item label="打款凭证:"
                    prop="piclist">
        <div v-for="(item,index) in dataForm.piclist" :key="index" style="display:inline-block">
            <img :src="item" class='paymentpic'>
        </div>
        <img >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
     getPaymentInfoAPI,
} from '@/api/paymentAuditAPI.js'
export default {
   name:'editor',
  data () {
    return {
      // 规格列表
      pgid:'',
      dataForm:{
        
      },
      imageShowUrl:''
      // resourcesUrl: window.SITE_CONFIG.resourcesUrl
    }
  },
  components: {

  },
  props: {
    paymentId: {
      required: true,
    },
  },
  computed: {
  },
  methods: {    
    errorMsg (message) {
      this.$message({
        message: message,
        type: 'error',
        duration: 1500
      })
    },
    // 获取打款详情
    getPaymentDetail(paymentId){
            this.wholeLoding = true;
            getPaymentInfoAPI(paymentId)
                .then(res => {
                    this.dataForm=res.data.data
                    this.dataForm.piclist=[]
                    this.dataForm.piclist= this.dataForm.paymentVoucher.split(',')
                    console.log(this.dataForm)
                })
                .catch(err => {
                    this.wholeLoding = false;
                })
    },
    /*
      * 返回上层
      */
    backhtmls(){
        this.$emit('close-form')
    }    
  },
  mounted() {
   this.getPaymentDetail(this.paymentId)
   console.log(this.paymentId)
  },
}
</script>
<style scoped="scoped" lang="less">
.mbline{
  margin-top:24px;
  padding-left: 20px;
  line-height: 40px;
  background: rgb(249, 249, 249);
}
.paymentpic{
  width: 100px;
  height: 100px;
}
</style>