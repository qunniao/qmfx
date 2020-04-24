/*
 * @Description: 订单管理
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
import http from '@/public/http';
export const getWalletHistoryListAPI = (args) =>{
    return http({
        url: '/walletHistorys/page',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
