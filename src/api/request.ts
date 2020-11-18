import axios, { AxiosRequestConfig } from 'axios';
import Cookie from '../utils/cookie';
import { message } from 'antd';

// methods
// creeate instance
const service = axios.create({
  baseURL: process.env.HOST,
  timeout: 10000
});

// request interceptors
let hideLoading:any = null;
service.interceptors.request.use(
  config => {
    hideLoading = message.loading('加载中，请稍后...')
    // config headers
    config.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookie.get('token')}`
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


// response interceptors
export interface AxiosResponse<T = any> {
  data: T; // 服务端返回的数据
  status: number; // HTTP 状态码
  statusText: string; // 状态消息
  headers: any; // 响应头
  config: AxiosRequestConfig; // 请求配置对象
  request: any; // 请求的 XMLHttpRequest 对象实例
}


service.interceptors.response.use(
  response => {
    hideLoading();
    if(response.status === 200) {
      if(response.data.status === 200) {
        return response.data;
      }else {
        message.error(response.data.msg);
        return Promise.reject('error');
      }
    }else {
      message.error('服务器异常，请稍后再试！');
      return Promise.reject();
    }
  },
  error => {
    hideLoading();
    /timeout/.test(error.message) && message.error('请求超时，请检查网络设置');
    return Promise.reject(error);
  }
);


export default service;



