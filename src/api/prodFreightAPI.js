import http from '@/public/http';
/**
 * 获取单个运费模板详情
 * @param {Object} args 
 */
export const getFrieghtListAPI = (args) =>{
    return http({
        url: '/freights/info/'+args,
        method: 'get',
        // params: args,
    });
 }
 /**
 * 获取所有运费模板列表
 * @param {Object} args 
 */
export const getFrieghtBoxListAPI = (args) =>{
    return http({
        url: '/freights/list',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
          },
        params: args,
    });
 }
 /**
 * 添加运费模板
 * @param {Object} args 
 */
export const addFreightAPI = (args) => {
    return http({
        url: '/freights/save',
        method: 'post',
        headers: {
            'token': localStorage.getItem('token')
          },
        data: args,
    });
};
 /**
 * 修改运费模板
 * @param {Object} args 
 */
export const putFreightAPI = (args) => {
    return http({
        url: '/freights/update',
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
          },
        data: args,
    });
};
 /**
 * 删除运费模板
 * @param {Object} args 
 */
export const deleteFreightAPI = (args) => {
    return http({
        url: '/freights/delete/'+args,
        method: 'DELETE',
        headers: {
            'token': localStorage.getItem('token')
          },
        // params: args,
    });
};