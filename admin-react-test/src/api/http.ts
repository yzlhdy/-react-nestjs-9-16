import AxiosInstance, {
  AxiosStatic,
  AxiosPromise,
  AxiosError,
  AxiosRequestConfig
} from "axios";
import { message } from 'antd';
// import { setRetryTip } from '../redux/saga/actions/common';
// import store from '../redux';
import isRetryAllowed from './isRetryAllowed';

// 定义一个请求的参数类型声明
type requestFn = (url: string, params?: Object, data?: Object | null) => AxiosPromise;

class Http {



  // 请求对象
  private axios: AxiosStatic | any = AxiosInstance;
  // 请求失败时的 重试请求的间隔时间
  private retryDelay: number = 1000;
  // 重试的次数 t
  // 一般来说，生产环境10次  开发环境4次 （但不是绝对，根据自己需要）
  private retry: number = Number(process.env.REACT_APP_RETRY) || 4;

  // 在constructor里面进行初始化设置
  constructor() {
    const { axios } = this;
    axios.defaults.timeout = 10000;
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
    axios.defaults.headers = {
      "Content-Type": 'application/json;charset=UTF-8',
    }

    // 去执行 请求拦截器 和 响应拦截器
    this.useInterceptResponse();
    this.useInterceptRequest();
  }


  useInterceptResponse() {
    this.axios.interceptors.response.use(
      (res: any) => {
        // 处理逻辑
        // errorCode, errMsg 这些字段,也是后端返回的,有可能是 status  有可能是success
        if (res.data.errorCode === '101010500') {
          message.error('服务器错误,请联系管理员');
          return Promise.reject(res.data);
        }

        // token 过期了,
        if (res.data.errorCode === '401') {
          message.error('未授权');
          // 还需要跳转到 login页面 这个逻辑,但不在这里处理,
        }
        // 然后就是别的情况
        if (res.data.errorCode === 500) {
          message.error(res.data.errMsg || '服务器异常');
          return Promise.reject(res.data);
        }

        // 如果还有别的逻辑 就在这里加就行了

        return Promise.resolve(res);
      },
      (error: AxiosError) => {
        if (!isRetryAllowed(error)) {
          // 请求出错,走到这里的话,多半是服务器的问题
          // 先来处理多次请求失败的情况,
          const { config } = error;
          let retryCont = config.headers['axios-retry'] || 0;
          if (retryCont >= this.retry) {
            // 告诉redux 重试次数已超过指定次数,应该修改状态, 然后组件里自动感应,变为true过后,就会提示用户
            // 提示方式有很多种,就看大家怎么定义 可以用 notification 也可以用ant-design 提供的 Alert组件
            // store.dispatch(setRetryTip(true));
            return Promise.reject(error);
          }
          retryCont += 1;
          const backoff = new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, this.retryDelay || 1);
          });

          // 修改重试次数
          config.headers['axios-retry'] = retryCont;

          // 必须要在 error中的 config 中去显示绑定才会触发执行
          return backoff.then(() => this.axios(config));
        }

        if (error.response) {
          // http的状态码 非200的时候
          if (error.response.status >= 500) message.error('服务器错误');
        } else if (error.request) {
          // ...
        } else {
          // 其他错误
          message.error(error.message);
        }

        return Promise.reject(error);
      }

    );
  }

  // 请求拦截器
  useInterceptRequest() {

    this.axios.interceptors.request.use(

      async (config: AxiosRequestConfig) => {

        const newConfig = config;

        const token = localStorage.getItem('token')
        if (token) newConfig.headers.authorization = 'Bearer ' + token;

        // 如果还有别的需求要处理,就在这里面去写就ok了

        return newConfig;
      },
      (error: AxiosError) => Promise.reject(error)
    )

  }


  private fetchData(type: string, url: string, options?: Object, isComplex?: boolean) {
    if (isComplex) {


      return this.axios[type](url, options);
    }

    return this.axios[type](url, options);
  }


  /*
  * get请求封装
  * url --- 请求地址
  * params --- 请求的参数
  * */
  public get: requestFn = (url, params) => {
    // get 可以不传参数
    if (!params) return this.fetchData('get', url);
    // 因为get请求，很有可能会被缓存，所以我们需要给它加一个随机参数，
    // 实现： 因为params 是已经存在的， 我们只需要给它扩展一个随机数的变量即可
    const newParams = Object.assign(params, {
      [`dmx${new Date().getTime()}`]: 1,
    });

    return this.fetchData('get', url, { params: newParams });
  }


  /*
  * 因为post put patch delete 逻辑处理其实都一样，所以直接可以把底层函数封装出来们直接调用
  * */
  private commonRequest(
    type: string,
    url: string,
    params?: Object,
    data?: Object | null,
  ): AxiosPromise {
    // 合并一下参数
    let options: Object = {

    }

    if (params && data === undefined) {
      options = params
    }

    return this.fetchData(type, url, options, true);
  }


  // 抽离公共逻辑，可能会存在一些问题，咱们再实际运用这个请求的时候，在处理。（不一定有问题，只是可能）

  /*
  * post请求
  * url --- 地址
  * params --- 请求的url上加参数 比如?action=123
  * data --- 请求体 body 内的数据
  * {a, b}
  * */
  public post: requestFn = (url, params, data) => {


    return this.commonRequest('post', url, params, data);
  }

  /*
  * put 请求
  * params --- 请求的url上加参数 比如?action=123
  * data --- 请求体 body 内的数据
  * */
  public put: requestFn = (url, params, data) => {
    return this.commonRequest('put', url, params, data);
  }

  // patch
  public patch: requestFn = (url, params, data) => {
    return this.commonRequest('patch', url, params, data);
  }

  // delete
  public delete: requestFn = (url, params, data) => {
    return this.commonRequest('delete', url, params, data);
  }
}

export default new Http();