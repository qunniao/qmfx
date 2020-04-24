/*
 * @Description: 订单管理
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
import http from '@/public/http';
export const getOrderDepListAPI = (args) =>{
    return http({
        url: '/orders/page',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
/**
 * 获取订单详情
 * @param {Object} args 
 */
 export const getOrderDetailAPI = (args) =>{
    return http({
        url: '/orders/info/'+args,
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
 }
 /**
 *发货
 * @param {Object} args 
 */
export const putDeliverGoodsAPI = (args) =>{
    return http({
        url: '/orders/shipments/'+args,
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
 }
 /*
 * @Description:删除订单
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const delorderdetailAPI = (args) =>{
    return http({
        url: '/orders/delete/'+args,
        method: 'delete',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
 }