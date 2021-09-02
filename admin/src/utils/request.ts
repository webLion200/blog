/**
 * 网络层封装
 *
 */

import { message } from 'antd';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const TIMEOUT = 10; // 超时时间,单位 s

export interface IPageInfoRequest {
  pageNum?: number;
  pageSize?: number;
}

export interface IPageInfoResponse<T> {
  dataList: T[];
  totalCount: number;
  pageNum: number;
  pageSize: number;
}

export type ErrorWrap<T> = { res: T; err: Error };

export interface IResponse<T> {
  data: T;
  status: number;
  message: string;
  sessionId?: string;
}

const instance = axios.create({
  timeout: TIMEOUT * 1000,
  validateStatus: (status) => status < 500, // 默认是 [200,300)
});

/** 设置默认的host */
const setDefaultHost = (host: string) => (instance.defaults.baseURL = host);

/** 设置公共 header */
const setCommonHeader = (headers: any) => {
  Object.keys(headers).forEach((key) => {
    instance.defaults.headers.common[key] = headers[key];
  });
};

/** 错误处理 */
instance.interceptors.response.use(
  // status < 500
  (response) => {
    const { data, status } = response;

    if (status !== 200) {
      const err = Error(data?.message);
      // @ts-ignore
      err.response = response;
      throw err;
    }

    if (data.status !== 200) throw Error(data?.message);

    return response;
  },
  // status >= 500
  (error: AxiosError) => {
    debugger
    // 有返回data,但不是 200
    if (error.response) {
      const { data } = error.response;
      throw Error(data?.message);
    }

    // 断网
    if (!window.navigator.onLine) {
      throw Error('网络异常，请检查网络是否正常连接');
    }

    // 超时
    if (error.message?.includes('timeout')) {
      throw Error('请求超时，请重新尝试');
    }

    return Promise.reject(error);
  },
);

/**
 * 封装业务request
 */
async function request<T>(url: string, config: AxiosRequestConfig): Promise<ErrorWrap<T>> {
  const { method = 'POST', headers, data: requestData, ...restConfig } = config;
  try {
    const params = {
      url,
      method,
      headers,
      [method === 'GET' ? 'params' : 'data']: requestData,
      ...restConfig,
      withCredentials: config.withCredentials ?? !instance.defaults.headers.common['Authorization'],
    };

    const { data } = await instance.request<IResponse<T>>(params);
    return { res: data.data } as ErrorWrap<T>; 
  } catch (error) {
    return { err: error } as ErrorWrap<T>;
  }
}

function Post<T>(uri: string, data?: object, config?: AxiosRequestConfig) {
  return request<T>(uri, { method: 'POST', data, ...config });
}

function Get<T>(uri: string, data?: object, config?: AxiosRequestConfig) {
  return request<T>(uri, { method: 'GET', data, ...config });
}

/** 注册http状态码对应的handler */
const registerHander = (status: number, handler: (data?: any) => void) => {
  if (!status) return console.warn('注册状态码不能为空!');

  instance.interceptors.response.use(
    (response) => {
      if (response.status === status) handler?.();
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === status) handler?.();
      return Promise.reject(error);
    },
  );
};

request.register = registerHander;
request.setDefaultHost = setDefaultHost;
request.setCommonHeader = setCommonHeader;
request.instance = instance;

export { Post, Get };
export default request;
