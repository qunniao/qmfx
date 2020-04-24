import http from '@/public/http';
/**
 * 获取账户列表
 * @param {Object} args 
 */
export const getPayeeAccountsListAPI = (args) =>{
    return http({
        url: '/payeeAccounts/list',
        method: 'get',
        params: args,
    });
 }
 /**
 * 获取账户信息
 * @param {Object} args 
 */
export const getPayeeAccountsInfoAPI = (args) =>{
    return http({
        url: '/payeeAccounts/info/'+args,
        method: 'get',
        // params: args,
    });
 }

  /**
 * 修改账户信息
 * @param {Object} args 
 */
export const updatePayeeAccountsInfoAPI = (args) => {
    return http({
        url: '/payeeAccounts/update',
        method: 'put',
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // },
        params: args,
    });
};
/**
 * 获取转账记录列表
 * @param {Object} args 
 */
export const getPayRecordListAPI = (args) =>{
    return http({
        url: '/transfers/page',
        method: 'get',
        params: args,
    });
 }