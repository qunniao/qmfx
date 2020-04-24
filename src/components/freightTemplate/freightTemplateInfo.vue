<template>
  <div class="mod-prod-info">
    <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
      <el-form-item label="模板名称:"
                    prop="title"
                    :rules="[{ required: true, message: '模板名称不能为空'}]">
        <el-col :span="10">
          <el-input
            type="text"
            placeholder="请输入模板名称"
            v-model="dataForm.title"
            maxlength="18"
            show-word-limit
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label-width="180px" label="计价方式：">
         <!-- <el-radio v-model="dataForm.valuationWay" label="1">按重量</el-radio>-->
          <el-radio v-model="dataForm.valuationWay" label="2" >按件数</el-radio>
      </el-form-item>
      <!--
      <el-form-item label-width="180px" label="设为默认">
          <el-checkbox-group v-model="checkList">
                <el-checkbox label="采购订单"></el-checkbox>
                <el-checkbox label="内购订单"></el-checkbox>
                <el-checkbox label="提货订单"></el-checkbox>
                <el-checkbox label="零售订单"></el-checkbox>
          </el-checkbox-group>
      </el-form-item>
      -->
      <el-form-item label="运送方式(默认):"
                    prop="transportWay"
                    :rules="[{ required: true, message: '运送方式名称不能为空'}]">
        <el-col :span="6">
          <el-input
            type="text"
            placeholder="例如顺丰快递、平邮"
            v-model="dataForm.transportWay"
            maxlength="18"
            show-word-limit
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <div class="mod-prod-sku-table">
          <el-form-item>
            <el-table
              :data="tableData"
              border
              style="width: 100%; margin-top: 20px"
              >
              <el-table-column
                label="配送区域">
                <template>
                  全部默认运费
                </template>
              </el-table-column>
              <el-table-column
                prop="firstNumber"
                :label="dataForm.valuationWay==1?'首重(g)':'首件(件)'">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.firstNumber" type="number"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="firstPrice"
                label="首费">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.firstPrice" type="number" ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="renewNumber"
                :label="dataForm.valuationWay==1?'续重(g)':'续件(件)'">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.renewNumber" type="number"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="renewPrice"
                label="续费">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.renewPrice" type="number" ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </div>
      </el-form-item>
<!--
      <el-form-item>
         <el-checkbox v-model="checked">大批量购买运费</el-checkbox>
         <div v-if="checked">
           <el-col :span="2">{{dataForm.valuationWay==1?'重量':'件数'}}满</el-col><el-col :span="8"><el-input v-model="tableDatatwo[0].isLarge"></el-input></el-col><label>{{dataForm.valuationWay==1?'kg':'件'}}时，按以下方式计算运费</label>
          <div class="mod-prod-sku-table" >
            <el-form-item>
              <el-table
                :data="tableDatatwo"
                border
                style="width: 100%; margin-top: 20px"
                >
                <el-table-column
                  label="配送区域">
                  <template>
                    全部默认运费
                  </template>
                </el-table-column>
                <el-table-column
                  prop="firstNumber"
                  :label="dataForm.valuationWay==1?'首重(g)':'首件(件)'">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.firstNumber" type="number"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="firstPrice"
                  label="首费">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.firstPrice" type="number" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="renewNumber"
                  :label="dataForm.valuationWay==1?'续重(g)':'续件(件)'">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.renewNumber" type="number"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="renewPrice"
                  label="续费">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.renewPrice" type="number" ></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </div>
        </div>
      </el-form-item>
-->
      <el-form-item>
        <el-button type="primary"
                   @click="pushGroupFormData()">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
    addFreightAPI,
    getFrieghtListAPI,
    putFreightAPI
} from '@/api/prodFreightAPI.js'
export default {
   name:'editor',
  data () {
    return {
      // 运费模板
      freightId:'0',
      checked:false,
      tableData:[{
        firstNumber:'',
        firstPrice:'',
        renewNumber:'',
        isLarge:0,
        type: 1,
        renewPrice:'',
      }],
      tableDatatwo:[{
        firstNumber:'',
        firstPrice:'',
        renewNumber:'',
        isLarge:'',
        type: 1,
        renewPrice:'',
      }],
      checkList:[],
      shopup:'',
      dataForm:{
        text:'',
        title:'',
        valuationWay:'2',
        transportWay:''
        // domains: [],
      },
      imageShowUrl:''
      // resourcesUrl: window.SITE_CONFIG.resourcesUrl
    }
  },
  components: {

  },
  props: {
    prodgroupId: {
      required: true,
    },
  },
  computed: {
  },
  methods: {
    /*
      * 获取添加运费模板
      */
    pushGroupFormData () {
        this.$refs['dataForm'].validate((valid) => {
          if(valid){
            let pushdata={
              title:this.dataForm.title,
              transportWay:this.dataForm.transportWay,
              valuationWay:Number(this.dataForm.valuationWay),
              defaultBuyins: 0,
              defaultRetail: 0,
              defaultStock: 0,
              defaultTake: 0,
              freightRegionList:[]
            }
            for(let i=0;i<this.checkList.length;i++){
              if(this.checkList[i]=="采购订单"){
                pushdata.defaultStock=1
              }else if(this.checkList[i]=="内购订单"){
                pushdata.defaultBuyins=1
              }else if(this.checkList[i]=="提货订单"){
                pushdata.defaultTake=1  
              }else{
                pushdata.defaultRetail=1
              }
            }
            pushdata.freightRegionList.push(this.tableData[0])
            if(this.checked){
              pushdata.freightRegionList.push(this.tableDatatwo[0])
            }
            if(this.freightId!=0){
              pushdata.id=this.freightId
              putFreightAPI(pushdata)
                .then(res => {
                    const response = res.data;
                    this.$message({
                      type: 'success',
                      message: '修改成功',
                    });
                    this.$emit('close-form')
                    this.$emit('finish-action')
                })
                .catch(err => {
                  console.log(err)
                    this.tableLoading = false;
                })
            }else{
              addFreightAPI(pushdata)
                .then(res => {
                    const response = res.data;
                    this.$message({
                      type: 'success',
                      message: '添加成功',
                    });
                    this.$emit('close-form')
                    this.$emit('finish-action')
                })
                .catch(err => {
                  console.log(err)
                    this.tableLoading = false;
                })
            }
          }
        })
    },
    getFreightDetail(id){
      getFrieghtListAPI(id)
         .then(res => {
            const response = res.data.data;
            this.dataForm.title=response.title
            this.dataForm.transportWay=response.transportWay
            this.dataForm.valuationWay=''+response.valuationWay
            if(response.defaultStock==1){
              this.checkList.push('采购订单')
            }
            if(response.defaultBuyins==1){
              this.checkList.push('内购订单')
            }
            if(response.defaultTake==1){
              this.checkList.push('提货订单')
            }
            if(response.defaultRetail==1){
              this.checkList.push('零售订单')
            }
            if(response.freightRegionList.length>1){
              this.tableData=[]
              this.tableData.push(response.freightRegionList[0])
              this.tableDatatwo=[]
              this.tableDatatwo.push(response.freightRegionList[1])
            }else{
              this.tableData=[]
              this.tableData.push(response.freightRegionList[0])
            }
          })
          .catch(err => {
            console.log(err)
            this.tableLoading = false;
          })
    },
    errorMsg (message) {
      this.$message({
        message: message,
        type: 'error',
        duration: 1500
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
    if(this.prodgroupId!=0){
      this.getFreightDetail(this.prodgroupId)
      this.freightId=this.prodgroupId
    }
    console.log(this.prodgroupId)
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
.mod-prod-sku-table{
    .pic-uploader-component .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      .pic-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
      }
      .pic {
        width: 120px;
        height: 120px;
        display: block;
      }
    }
    .pic-uploader-component .el-upload:hover {
      border-color: #409EFF;
    }
  }
</style>