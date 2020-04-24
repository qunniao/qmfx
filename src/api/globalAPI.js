/**
 * 全局公用接口
 * @author weichaozhan
 */
import http from '@/public/http';
import { BASE_URL } from '@/public/constant.js';

/**
 * 上传图片
 */
export const imgUploadAPI = `${BASE_URL}/upload`;


/**
 * 登录接口
 * @param {Object} data 登录参数
 */
export const loginAPI = (data) => {
    return http({
        url: '/admins/login',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    });
};

/**
 * 修改密码
 * @param {Object} data 修改密码
 */
export const modifyPasswordAPI = (data) => {
    return http({
        url: '/users/modifyPassword',
        method: 'post',
        data: data,
    });
};
// 日期处理
export const timeStamp2String = (time, type) => {
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    if (type == '1') {
        return year + "年" + month + "月" + date + "日";
    }
    if (type == '2') {
        return year + "-" + month + "-" + date;
    }
    if (type == '3') {
        return month + "-" + date;
    }
    if(type == '4'){
        return month;
    }
    if(type == '5'){
        return date;
    }
    if(type == '6'){
        return year + "." + month + "." + date + " " + hour + ":" + minute + ":" + second;
    }
    if(type == '7'){
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }
    if(type == '8'){
        return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    }
    if(type == '9'){
        return month + "-" + date + " " + hour + ":" + minute;
    }
};
