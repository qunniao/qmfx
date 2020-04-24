/*
 * @Description: 订单详情
 * @Author: jian.weng
 * @Date: 2019-10-29 10:49:29
 */

<template>
    <div>
        <el-form :model="userdata"
             ref="userdata"
             label-width="150px">
            <el-form-item label="姓名:"
                            prop="nickname">
                            {{userdata.nickname}}
            </el-form-item>
             <el-form-item label="头像:"
                            prop="nickname">
                            <img style="width:150px;height:150px" :src="userdata.cover">
            </el-form-item>
            <el-form-item label="地区:"
                            prop="region">
                            {{userdata.region}}
            </el-form-item>
            <el-form-item label="性别:"
                            prop="gender">
                            {{sexlist[userdata.gender]}}
            </el-form-item>
            <el-form-item label="电话:"
                            prop="phone">
                            {{userdata.phone}}
            </el-form-item>
            <el-form-item label="出生年月:"
                            prop="birth">
                            {{userdata.birth}}
            </el-form-item>
        </el-form> 
    </div>
</template>

<script>
import {
     gethyuserInfoAPI,
} from '@/api/visitorsRecordAPI.js'
export default {
    name:'membershipInfo',
    data(){
        return{
            userdata:{},
            sexlist:{
              1:'男' ,
              0:'女' 
            }
        };
    },
    components:{
        // AddDepModal,
    },
    props: {
        usersId: {
            required: true,
        },
    },
    methods:{
         /*
         * 获取订单详情
         */
        gethyuserInfo(id){
            this.tableLoading = true;
             gethyuserInfoAPI(id)
                .then(res => {
                    const userInfoData=res.data.data
                    this.userdata =userInfoData
                    console.log(userInfoData)
                    // this.orderdetail=orderdata
                    // this.orderform=orderdata.orderProductBackList

                })
                .catch(err => {
                    this.tableLoading = false;
                })
        },
    },
    mounted(){
        this.gethyuserInfo(this.usersId)
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

