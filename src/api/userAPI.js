import http from '@/public/http';
/*
 * @Description: 修改用户代理等级
 * @Author: jian.weng
 * @Date: 2019-10-22 10:10
 */
export const updateUserAPI = (args) =>{
    return http({
        url: '/users/update',
        method: 'put',
        headers: {
            'token': localStorage.getItem('token')
        },
        data: JSON.stringify(args),
    });
 }


