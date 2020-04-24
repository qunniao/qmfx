/*
 * @Description: 问题列表
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
import http from '@/public/http';
export const getQuestionListAPI = (args) =>{
    return http({
        url: '/question/page',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }

 // 删除问题
export const deleteQuestionAPI = (args) =>{
    return http({
        url: '/question/delete',
        method: 'DELETE',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }

  /*
 * @Description: 问题详情
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const getQuestionDetailAPI = (args) =>{
    return http({
        url: '/question/info/'+args,
        method: 'get',
    });
 }

 /*
 * @Description: 修改问题
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const  updateQuestionAPI = (args) =>{
    return http({
        url: '/question/update',
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: JSON.stringify(args),
    });
 }

  /*
 * @Description: 添加问题
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const  saveQuestionAPI = (args) =>{
    return http({
        url: '/question/save',
        method: 'post',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: JSON.stringify(args),
    });
 }




 /*
 * @Description: 问题分类列表
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const getQuestionTypeListAPI = (args) =>{
    return http({
        url: '/questionTypes/list',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }

  // 删除问题分类
export const deleteQuestionTypeAPI = (args) =>{
    return http({
        url: '/questionTypes/delete/'+args,
        method: 'DELETE',
        headers: {
            'token': localStorage.getItem('token')
        },
   
    });
 }

 /*
 * @Description: 修改问题分类
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const  updateQuestionTypeAPI = (args) =>{
    return http({
        url: '/questionTypes/update',
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: JSON.stringify(args),
    });
 }

 /*
 * @Description: 添加问题分类
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const  saveQuestionTypeAPI = (args) =>{
    return http({
        url: '/questionTypes/save',
        method: 'post',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: JSON.stringify(args),
    });
 }

 
  /*
 * @Description: 问题分类详情
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const getQuestionTypeDetailAPI = (args) =>{
    return http({
        url: '/questionTypes/info/'+args,
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        }
    });
 }

