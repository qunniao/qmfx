/*
 * @Description: 店铺访客记录
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
import http from '@/public/http';
export const getVistitorsListAPI = (args) =>{
    return http({
        url: '/visitors/page',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
 /*
 * @Description: 删除记录
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const delteRecordAPI = (args) =>{
    return http({
        url: '/visitors/delete/'+args,
        method: 'delete',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
 }
  /*
 * @Description:获取会员列表
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const gethyuserListAPI = (args) =>{
    return http({
        url: '/users/page',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
   /*
 * @Description:获取佣金列表
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const getcommiseListAPI = (args) =>{
    return http({
        url: '/transfers/page/commission',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
    /*
 * @Description:获取佣金列表
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const gethyuserInfoAPI = (args) =>{
    return http({
        url: '/users/info/'+args,
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
 }
    /*
 * @Description:获取佣金列表
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const delUserdetailAPI = (args) =>{
    return http({
        url: '/users/delete/'+args,
        method: 'delete',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
 }