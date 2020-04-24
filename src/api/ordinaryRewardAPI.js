import http from '@/public/http';
/**
 * 获取奖励列表
 * @param {Object} args 
 */
export const getordinaryRewardListAPI = (args) =>{
    return http({
        url: '/users/getInviteInfo',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
 /**
 * 获取分类列表
 * @param {Object} args 
 */
export const getordinaryInfoListAPI = (args) =>{
    return http({
        url: '/rewards/page',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
  /**
 * 获取奖励设置列表
 * @param {Object} args 
 */
export const getconfigInfosListAPI = (args) =>{
    return http({
        url: '/configInfos/list',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
 }
   /**
 * 修改奖励设置
 * @param {Object} args 
 */
export const changeirdubaryAPI = (args) =>{
    return http({
        url: '/configInfos/update',
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
/**
 * 获取下级列表
 * @param {Object} args 
 */
export const getTwoMoneyListAPI = (args) =>{
    return http({
        url: '/rewards/list',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }