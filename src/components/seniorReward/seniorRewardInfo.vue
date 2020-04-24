<template>
  <div class="mod-prod-info">
    <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
      <el-form-item prop="amount">
        邀请沈建[VIP399套餐]加入，万章燕[VIP399套餐]/饶龙辉[VIP399套餐]获得奖励，由徐建军[董事]进行奖励
      </el-form-item>
      <el-form-item style="overflow:hidden">
        <div v-for="(item,index) in userlist" :key="index" class="userdetilbox">
          <div class='userdetiltwobox'>
            <img class="userheaderimg">
            <div>xxxx</div>
          </div>
          <div class="letbtn" v-if="index<(userlist.length-1)">
            ->
          </div>
        </div>
      </el-form-item>
      <el-form-item label="订单号:"
                    prop="amount">
        {{dataForm.amount}}
      </el-form-item>
      <el-form-item label="代理A:"
                    prop="amount">
        {{dataForm.amount}}
      </el-form-item>
      <el-form-item label="奖励金额:"
                    prop="amount">
        {{dataForm.amount}}
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
   name:'editor',
  data () {
    return {
      // 规格列表
      pgid:'',
      userlist:[{},{},{}],
      dataForm:{
        
      },
      imageShowUrl:''
      // resourcesUrl: window.SITE_CONFIG.resourcesUrl
    }
  },
  components: {

  },
  props: {
    ordinaryId: {
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
    // 获取代理详细详情
    getAgentInfomationDetail(){
            this.wholeLoding = true;
            // getPaymentInfoAPI(paymentId)
            //     .then(res => {
            //         this.dataForm=res.data.data
            //         this.dataForm.piclist=[]
            //         this.dataForm.piclist= this.dataForm.paymentVoucher.split(',')
            //         console.log(this.dataForm)
            //     })
            //     .catch(err => {
            //         this.wholeLoding = false;
            //     })
    },
    /*
      * 返回上层
      */
    backhtmls(){
        this.$emit('close-form')
    }    
  },
  mounted() {
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
.userheaderimg{
  width: 100px;
  height: 100px;
}
.userdetilbox{
  width: 140px;
  display: block;
  overflow: hidden;
  float: left;
  margin-left: 10px;
}
.userdetiltwobox{
  width: 100px;
  float: left;
}
.userdetilbox{
  div{
    text-align: center
  }
}
.letbtn{
  width: 40px;
  text-align: center;
  line-height: 100px;
  float: left;
}
</style>