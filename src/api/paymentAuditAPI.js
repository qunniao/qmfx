import http from '@/public/http';
/**
 * 获取打款审核列表
 * @param {Object} args 
 */
export const getPaymentListAPI = (args) =>{
    return http({
        url: '/remits/list',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
}
/**
 * 获取单个打款审核详情
 * @param {Object} args 
 */
export const getPaymentInfoAPI = (args) =>{
    return http({
        url: '/remits/info/'+args,
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
}
/**
 * 通过审核
 * @param {Object} args 
 */
export const checkVoucherOkAPI = (args) =>{
    return http({
        url: '/remits/ratifyVoucher',
        method: 'post',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: args,
    });
}
/**
 * 驳回审核
 * @param {Object} args 
 */
export const checkVoucherNoAPI = (args) =>{
    return http({
        url: '/remits/rejectVoucher',
        method: 'post',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: args,
    });
}