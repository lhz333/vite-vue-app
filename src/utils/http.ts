import { useRouter } from 'vue-router'
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import { ResponseData } from '@/types/ResponseData'

const router = useRouter()

// 创建 axios 实例
const axios = Axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // 请求超时时间
  timeout: 20000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// 前置拦截器 发起请求之前的拦截
axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => config,
  (error) => Promise.reject(error)
)

/**
 * 异常拦截处理器
 * @param {*} error
 */
const errorHandler = (error: AxiosError) => {
  // 判断是否是响应错误信息
  if (error.response) {
    if (error.response.status === 401) {
      ElMessage.error('登录已过期，请您重新登录！')
      localStorage.clear()
      router.push('/login')
    } else if (error.response.status === 405) {
      ElMessage.error('您没有此功能的操作权限！')
    }
  }
  return Promise.reject(error)
}

// 后置拦截器 获取到响应时的拦截
axios.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => response.data,
  errorHandler
)

export default axios

/**
 * GET 请求
 * @param url
 * @param config
 * @returns
 */
export const get = <T = any, R = ResponseData<T>>(
  url: string,
  config?: AxiosRequestConfig
): Promise<R> => axios.get(url, config)

/**
 * POST 请求
 * @param url
 * @param data
 * @param config
 * @returns
 */
export const post = <T = any, R = ResponseData<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<R> => axios.post(url, data, config)

/**
 * delete 删除
 * @param url
 * @param config
 * @returns
 */
export const deleteHttp = <T = any, R = ResponseData<T>>(
  url: string,
  config?: AxiosRequestConfig
): Promise<R> => axios.delete(url, config)

/**
 * put
 * @param url
 * @param data
 * @param config
 * @returns
 */
export const put = <T = any, R = ResponseData<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<R> => axios.put(url, data, config)
