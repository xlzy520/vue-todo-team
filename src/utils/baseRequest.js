import axios from 'axios'
import { message } from 'ant-design-vue'
import router from '@/router'
import { resetRouter } from '@/router'

const baseRequest = axios.create({
  baseURL: '',
  withCredentials: true,
  timeout: 20 * 1000
})

// response interceptor
baseRequest.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.success) {
      message.error(res.msg || 'error', 1.5)
      return Promise.reject(res)
    } else {
      return res.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default baseRequest
