/*
 * @Description: 获取订单待退款列表
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
import http from '@/public/http';
export const getOrderRefundListAPI = (args) =>{
    return http({
        url: '/orderRefund/page',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
/**
 * 获取详情
 * @param {Object} args 
 */
 export const getOrderLogisticDetailAPI = (args) =>{
    return http({
        url: '/orderLogistic/info/'+args,
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
 }
 
 /*
 * @Description:删除
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const delorderLogisticAPI = (args) =>{
    return http({
        url: '/orderLogistic/delete',
        method: 'delete',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }

 //  添加
export const saveOrderLogisticAPI = (args) =>{
    return http({
        url: '/orderLogistic/save',
        method: 'post',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: JSON.stringify(args),
    });
 }

  /**
 * 修改
 * @param {Object} args 
 */
export const updateOrderLogisticAPI = (args) => {
    return http({
        url: '/orderLogistic/update',
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: JSON.stringify(args),
    });
};