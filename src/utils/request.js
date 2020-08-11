import fetch from 'dva/fetch';
import { notification } from 'antd';
import { baseUrl, noContextUrl } from '@common/config';
import store from '@/root';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};
function checkStatus(response) {
  const { status, statusText, url } = response;
  if (status >= 200 && status < 300) {
    return response;
  }
  const errorText = codeMessage[status] || statusText;
  notification.error({
    message: `请求错误 ${status}: ${url}`,
    description: errorText
  });
  const error = new Error(errorText);
  error.name = status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  let tempBaseUrl = '/';
  const defaultOptions = {
    credentials: 'include',
    headers: {
      Accept: 'application/json'
    }
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        'content-Type': 'multipart/form-data',
        ...newOptions.headers
      };
    }
  } else {
    newOptions.headers = {
      ...newOptions.headers
      // extra
    };
  }

  // 接口过滤
  if (noContextUrl.includes(url)) {
    tempBaseUrl = '/';
  } else {
    tempBaseUrl = baseUrl;
  }

  return fetch(baseUrl + tempBaseUrl, newOptions)
    .then(checkStatus)
    .then(response => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .catch(e => {
      const { dispatch } = store;
      const status = e.name;
      if (status === 401) {
        dispatch({
          type: 'loginModel/goToLoginPage'
        });
      }
    });
}
