/*
 * @Description: 问题详情
 * @Author: jian.weng
 * @Date: 2019-10-29 10:49:29
 */

<template>
    <div>
       
       <el-form :model="dataForm"
             ref="dataForm"
             label-width="150px">
            <el-form-item label="问题标题:"
                            :rules="[{ required: true, message: '标题不能为空'}]">
                <el-col :span="8">
                <el-input v-model="dataForm.title"
                            placeholder="请输入"
                            maxlength="50"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item style="margin-top:10px"  label="问题分类">
                    <el-select  v-model="dataForm.typeId"  placeholder="请选择">
                    <el-option
                        v-for="item in typelist"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                    </el-select>
            </el-form-item> 
            <el-form-item label="问题回答:">
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
     getQuestionDetailAPI,
     updateQuestionAPI,
     saveQuestionAPI,
     getQuestionTypeListAPI
} from '@/api/questionAPI.js';
import axios from 'axios';
import E from 'wangeditor';
export default {
    name:'prodList',
    data(){
        return{
            dataForm:{
                title:'',
                content:'',
                typeId:''
            },
            form:{
                size:50,
                current:1
                // statusType:'1'
            },
            item:{},
            typelist:[],
            rules: {
                
            },
        }
    },
    components:{
        // AddDepModal,
    },
    props: {
        updateId: {
            required: true,
        },
    },
    methods:{
        
        /*
         * 获取代理等级详情
         */
        getDetail(id){
            this.tableLoading = true;
             getQuestionDetailAPI(id)
                .then(res => {
                    const orderdata=res.data.data
                    console.log(orderdata)
                    this.item=orderdata;
                    this.dataForm=this.item;
                       
                    var editor = new E('#editorElem')
                    editor.customConfig.uploadImgShowBase64 = true //图片以base64形式保存
                    editor.customConfig.onchange = (html) => {
                        this.dataForm.content = html
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
                        editor.txt.html(this.dataForm.content)
                    })
                    .catch(err => {
                        
                    })
        },
        getQuestionTypeList(){
            const params = {...this.form};
             getQuestionTypeListAPI(params)
                .then(res => {
                    console.log(res.data.data);
                    const data = res.data.data;
                    this.typelist = data;
                })
                .catch(err => {
                   
                })
        },
         // 表单提交
        dataFormSubmit () {
            console.log("title:"+this.dataForm.title+" id:"+this.updateId+" content:"+this.dataForm.content);
            let that=this;
                
                const putdata={
                    title: this.dataForm.title,
                    content:this.dataForm.content,
                    typeId:this.dataForm.typeId
                }
                if(this.updateId==0){
                    saveQuestionAPI(putdata)
                            .then(res => {
                                const data = res.data;
                                if (data.code === 200) {
                                        this.$message({
                                            type: 'success',
                                            message: '添加成功',
                                        });
                                    this.backhtmls()
                                        this.$emit('finish-action')
                                }else{
                                    this.$message.error(res.data.msg)
                                }
                            })
                            .catch(err => {
                            });
                }else{
                    putdata.id=this.updateId
                    updateQuestionAPI(putdata)
                                    .then(res => {
                                        console.log(res);
                                        const sucresponse = res.data;
                                        if(sucresponse.code==200){
                                            this.$message({
                                            type: 'success',
                                            message: '修改成功',
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
                }
            
        
        },
        /*
        * 返回上层
        */
        backhtmls(){
            this.$emit('close-form')
        }    
    },
    mounted(){
        if(this.updateId==0){
            var editor = new E('#editorElem')
            editor.customConfig.uploadImgShowBase64 = true //图片以base64形式保存
            editor.customConfig.onchange = (html) => {
            this.dataForm.content = html
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
        }else{
            this.getDetail(this.updateId)
        }
         
        
        this.getQuestionTypeList();
        
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

