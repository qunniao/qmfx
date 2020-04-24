<template>
  <div class="mod-prod-info">
    <el-form :model="dataForm"
             ref="dataForm"
             :rules="rules"
             label-width="150px">
      <el-form-item label="商品名称:"
                    prop="title"
                    :rules="[{ required: true, message: '商品名称不能为空'}]">
        <el-col :span="8">
          <el-input v-model="dataForm.title"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品视频:">
      <el-upload
                    class="avatar-uploader"
                    action="http://admin.zhanchengwlkj.com:8080/distribution_backstage/file/addFile"
                    accept='.mp4,.qlv,.qsv,.ogg,.flv,.avi,.wmv,.rmvb'  
                    :data="video"                              
                    :show-file-list="false"
                    name='files'
                    :before-upload="beforeUploadVideo"   
                    :on-success="handleVideoSuccess"                   
                    :on-progress="uploadVideoProcess">                 
                    <video
                      v-if="dataForm.video !='' && videoFlag == false"
                      :src="dataForm.video"
                      width="350"
                      height="180"
                      controls="controls"
                    >您的浏览器不支持视频播放</video>    
                    <i
                      v-else-if="dataForm.video =='' && videoFlag == false"
                      class="el-icon-plus avatar-uploader-icon"
                    ></i>            
                    <el-progress
                      v-if="videoFlag == true"
                      type="circle"
                      :percentage="videoUploadPercent"
                      style="margin-top:30px"
                    ></el-progress>    
                  </el-upload>
        <el-button @click="delvidio">删除</el-button>
      </el-form-item>
      <el-form-item label="商品主图:" prop="picfile">
        <el-upload
            class="avatar-uploader"
            action="http://admin.zhanchengwlkj.com:8080/distribution_backstage/file/addFile"
            :show-file-list="false"
            :auto-upload="true"
            name="files"
            :on-success="uploadImg"
            :before-upload="beforeAvatarUpload">
            <img v-if="dataForm.cover" :src="dataForm.cover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品图片:">
       <el-upload
        action="http://admin.zhanchengwlkj.com:8080/distribution_backstage/file/addFile"
        list-type="picture-card"
        name='files'
        :file-list="dataForm.productImageList"
        :auto-upload="true"
        :on-success="uploadImgTwo"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      </el-form-item>
       <el-form-item style="margin-top:10px"  label="商品分类(必选)">
            <el-select  v-model="dataForm.typeId"  placeholder="请选择">
               <el-option
                v-for="item in prodtypelist"
                :key="item.tid"
                :label="item.title"
                :value="item.tid">
              </el-option>
            </el-select>
      </el-form-item> 
      <el-form-item label="商品货号:"
                    prop="productNumber"
                    :rules="[{ required: true, message: '商品货号不能为空'}]">
        <el-col :span="8">
          <el-input v-model="dataForm.productNumber"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="库存:"
                    prop="totalStock"
                    :rules="[{ required: true, message: '库存不能为空'}]">
        <el-col :span="8">
          <el-input v-model="dataForm.totalStock"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品零售价:"
                    prop="price"
                    :rules="[{ required: true, message: '商品零售价不能为空'}]">
        <el-col :span="8">
          <el-input v-model="dataForm.price"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>

       
     
        
      <el-form-item  label="运费模板：">
        <el-select v-model="dataForm.retailFreightId"   placeholder="请选择">
          <el-option
            v-for="item in freightlist"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      

      <el-form-item label="简介:"
                    prop="productIntro"
                   >
        <el-col :span="8">
          <el-input v-model="dataForm.productIntro"
                    placeholder="请输入"
                    maxlength="50"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item  label="商品详情：">
          <div id="editorElem"  style="text-align:left"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="dataFormSubmit()">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getProdDetailAPI,
  getprodTypeListtAPI,
  pushProdDataAPI,
  putProdDataAPI,
  getTemplateListAPI
}from '@/api/productApi.js'
import axios from 'axios';
import { treeDataTranslate, idList } from '@/utils'
import E from 'wangeditor';
export default {
   name:'editor',
  data () {
    return {
      // 分类树展示与回显
       videoFlag:false,      //刚开始的时候显示为flase
      videoUploadPercent: '0%',  //进度条刚开始的时候为0%
      transportId: null,
      shopid:0,
      video:{},
      shopup:'1',
      shopdown:'1',
      value1:'',
      attrtext:'',
      attributeDepList:[],
      category: {
        list: [],
        selected: [],
        props: {
          value: 'categoryId',
          label: 'categoryName'
        }
      },
      rules: {
        checkList: [
                { type: 'array', required: true, message: '请选择代理购买方式', trigger: 'change' }
              ],
        picfile: [ 
            { required: true, message: '请上传图片' }          
          ]
      },
      showvidio:'',
      fileList:[],
      prodtypelist:[],
      allfreight:'',
      AttributeDepShow:false,
      secondDepShow:false,
      imageShowUrl:'',
      // 规格列表
      shoptypelist:[],
      skuList:[],
      prodName:'',
      dialogImageUrl: '',
      dialogVisible: false,
      dataForm: {
        cover:'',
        typeId:'',
        productImageList:[]
      },
      tags: [],
      retailFreightId:'',
      freightlist:[]
      // resourcesUrl: window.SITE_CONFIG.resourcesUrl
    }
  },
  components: {
  },
  props: {
    depId: {
      required: true,
    },
  },
  computed: {
    defalutSku () {
      return this.$store.state.prod.defalutSku
    }
  },
  activated () {
    this.dataForm.prodId = this.$route.query.prodId
    this.getDataList()
  },
  methods: {
    // 获取分类数据
    getDataList () {
     
    },
    delvidio(){
      this.dataForm.video =''
    },
    handleRemove(file, fileList) {
      // let this.dataForm.productImageDtos
      for(let i=0;i<this.dataForm.productImageList.length;i++){
        if(file.url==this.dataForm.productImageList[i].url){
          this.dataForm.productImageList.splice(i,1)
        }
      }
    },
    uploadImgTwo(res){
      this.dataForm.productImageList.push({
        sort:0,
        url:res.data
      })
    },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    removeDomain(item) {
        for(let j=0;j<this.attributeDepList.length;j++){
          if(this.attributeDepList[j].name==item.name){
            this.attributeDepList.splice(j,1)
          }
        }
      },
    delshoptype(deltid){
     for(let i=0;i<this.shoptypelist.length;i++){
       if(this.shoptypelist[i].tid==deltid){
         this.shoptypelist.splice(i,1)
       }
     }
    },
    uploadImg(res){
      this.dataForm.cover = res.data;
      this.imageShowUrl=res.data
      this.rules.picfile = [{ required: true, message: '请上传图片' }] 
      if (this.dataForm.cover!='') {
        this.rules.picfile = []
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 视频上传
     beforeUploadVideo(file) {          //视频上传之前判断他的大小
      const isLt10M = file.size / 1024 / 1024  < 2000;
      if (!isLt10M) {
        this.$message.error('上传视频大小不能超过2000MB哦!');
        return false;
      }
    },
    uploadVideoProcess(event, file, fileList){    //视频上传的时候获取上传进度传给进度条
      this.videoFlag = true;
      this.videoUploadPercent = parseInt(file.percentage);
      // console.log(this.videoUploadPercent)
    },
    handleVideoSuccess(res, file) {           //视频上传成功之后返回视频地址
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      // console.log(res)
      this.dataForm.video=''
      console.log(this.dataForm.video)
      this.dataForm.video = res.data;
    },
    // 表单提交
    dataFormSubmit () {
          let that=this;
        this.$refs['dataForm'].validate((valid) => {
          if(valid){
            if(this.shopid!=0){
              const putdata={
                cover: this.dataForm.cover,
                detailMobile: this.dataForm.detailMobile,
                price: this.dataForm.price,
                typeId:this.dataForm.typeId,
                productImageList:this.dataForm.productImageList,
                productIntro: this.dataForm.productIntro,
                productNumber: this.dataForm.productNumber,
                sales: this.dataForm.sales,
                title: this.dataForm.title,
                totalStock: this.dataForm.totalStock,
                video: this.dataForm.video,
                pid:this.shopid,
                retailFreightId:this.dataForm.retailFreightId
              }
              putProdDataAPI(putdata)
                .then(res => {
                    const sucresponse = res.data;
                    if(sucresponse.code==200){
                      this.$message({
                        type: 'success',
                        message: '修改产品成功',
                      });
                      this.$emit('close-form')
                      this.$emit('finish-action')
                    }else{
                      this.errorMsg(sucresponse.message)
                    }
                })
                .catch(err => {
                  console.log(err)
                    this.tableLoading = false;
                }) 
            }else{
              const pushdata={
                cover: this.dataForm.cover,
                detailMobile: this.dataForm.detailMobile,
                price: this.dataForm.price,
                typeId:this.dataForm.typeId,
                productImageList:this.dataForm.productImageList,
                productIntro: this.dataForm.productIntro,
                productNumber: this.dataForm.productNumber,
                sales: this.dataForm.sales,
                title: this.dataForm.title,
                totalStock: this.dataForm.totalStock,
                video: this.dataForm.video,
                retailFreightId:this.dataForm.retailFreightId
              }
              pushProdDataAPI(pushdata)
                .then(res => {
                    const response = res.data;
                    if(response.code==200){
                      this.$message({
                        type: 'success',
                        message: '添加产品成功',
                      });
                      this.$emit('close-form')
                      this.$emit('finish-action')
                    }else{
                      this.errorMsg(response.message)
                    }
                })
                .catch(err => {
                  console.log(err)
                    this.tableLoading = false;
                })            
            }
          }
         
        })
    },
    getproddetail(id){
      getProdDetailAPI(id)
        .then(res => {
          const data = res.data.data;
          console.log(data)
          this.dataForm=data
            var editor = new E('#editorElem')
            editor.customConfig.onchange = (html) => {
              this.dataForm.detailMobile = html
            }
            this.rules.picfile = [{ required: true, message: '请上传图片' }] 
            if (this.dataForm.cover!='') {
              this.rules.picfile = []
            }
            editor.customConfig.customUploadImg = (files, insert) => {
              const formData = new FormData();
              formData.append('files', files[0]);
               axios.post("http://admin.zhanchengwlkj.com:8080/distribution_backstage/file/addFile", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                }).then(res => {
                  let { data } = res
                  insert(data.data)  
                  // 插入图片到editor
                });
              // formData.append('path', 'files/ne-icev3-dashboard/content/content/');
              
            };
            editor.customConfig.uploadImgShowBase64 = true //图片以base64形式保存
            editor.create()
            editor.txt.html(this.dataForm.detailMobile)
        })
        .catch(err => {
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
    getfreightlist(){
        const getTempParam = {
          current:1,
          size:100
        };
        getTemplateListAPI(getTempParam)
            .then(res => {
                const response = res.data.data.records;
                this.freightlist =response
            })
            .catch(err => {
                this.tableLoading = false;
            })
    },
  
    geprodTypelist(){
        const getTempParam = {
          current:1,
          size:100
        };
        getprodTypeListtAPI(getTempParam)
            .then(res => {
                const response = res.data.data;
                this.prodtypelist =response
            })
            .catch(err => {
                this.tableLoading = false;
            })
    }
  },
  mounted() {
        //wangEditor自带方法
        if(this.depId!=0){
          this.shopid=this.depId
          this.getproddetail(this.depId)
        }else{
            var editor = new E('#editorElem')
            editor.customConfig.uploadImgShowBase64 = true //图片以base64形式保存
            editor.customConfig.onchange = (html) => {
              this.dataForm.detailMobile = html
            }
            editor.customConfig.customUploadImg = (files, insert) => {
              const formData = new FormData();
              formData.append('files', files[0]);
               axios.post("http://admin.zhanchengwlkj.com:8080/distribution_backstage/file/addFile", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data"
                  }
                }).then(res => {
                  let { data } = res
                  insert(data.data)  
                  // 插入图片到editor
                });
              // formData.append('path', 'files/ne-icev3-dashboard/content/content/');
              
            };
            editor.customConfig.uploadImgShowBase64 = true //图片以base64形式保存
            editor.create();
            
        }
        this.geprodTypelist();
        this.getfreightlist();
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

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>