import http from '@/public/http';
/**
 * 获取属性组列表
 * @param {Object} args 
 */
export const getProdGroupsListAPI = (args) =>{
    return http({
        url: '/paramGroups/page',
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
 }
 /**
 * 获取属性组列表
 * @param {Object} args 
 */
export const getProdGroupsDetailAPI = (pgid) =>{
    return http({
        url: '/paramGroups/info/'+pgid,
        method: 'get',
        headers: {
            'token': localStorage.getItem('token')
        },
        // params: args,
    });
 }
 /**
 * 添加属性组
 * @param {Object} args 
 */
export const addProdGroupsDataAPI = (args) => {
    return http({
        url: '/paramGroups/save',
        method: 'post',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: args,
    });
};
 /**
 * 修改属性组
 * @param {Object} args 
 */
export const updateProdGroupsDataAPI = (args) => {
    return http({
        url: '/paramGroups/update',
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: args,
    });
};
 /**
 * 删除属性组
 * @param {Object} args 
 */
export const deleteGroupAPI = (args) => {
    return http({
        url: '/paramGroups/delete',
        method: 'DELETE',
        headers: {
            'token': localStorage.getItem('token')
        },
        params: args,
    });
};