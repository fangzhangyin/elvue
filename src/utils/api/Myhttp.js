import axios from 'axios';
import {Message} from "element-ui";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://fzy.xiaomy.net';


//http request 拦截器
axios.interceptors.request.use(
    config => {
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/json'
        }
        // if(token){
        //  config.params = {'token':token}
        // }
        return config;
    }, error => {
        return Promise.reject(error);
    }
);


/**
 * 封装同步get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

const SyncGET = function (option) {
    return new Promise((resolve, reject) => {
        axios.get(option.url, option.data)
            .then(response => {
                if(response.data.code!=0){
                    showtoast(response.data.message)
                }
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装同步post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

const SyncPOST = function (option) {
    return new Promise((resolve, reject) => {
        axios.post(option.url, option.data)
            .then(response => {
                if(response.data.code!=0){
                    showtoast(response.data.message)
                }
                resolve(response.data);
            }, err => {
                console.log(err)
                Message({
                    message: '请求失败',
                    type: 'error',
                    center: true,
                })
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

const Syncpatch = function (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

const Syncput = function (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

//异步操作
const get = function (option) {
    axios.get(option.url, option.data,)
        .then(response => {
            console.log(response)
            return response.data;
        }, err => {
            console.log(err)
            return null;
        })
}

const post = function (option) {
    axios.post(option.url, option.data)
        .then(response => {
            console.log(response)
            if(response.data.code!=0){
                showtoast(response.data.message)
            }
            return response.data;
        }, err => {
            console.log(err)
            return null;
        })
}

function showtoast(msg){
    Message({
        message: msg,
        type: 'warning',
        center: true,
    })
}

export default {
    Syncpatch, Syncput, SyncPOST, SyncGET, post, get
}
