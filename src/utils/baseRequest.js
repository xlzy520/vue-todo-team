import axios from 'axios'
import { message } from 'ant-design-vue'
import router from '../router'
import { resetRouter } from '@/router'

const token = localStorage.getItem('token')
const baseRequest = axios.create({
  baseURL: '',
  withCredentials: true,
  timeout: 20 * 1000,
  headers: {
    authorization: token? `Bearer ${token}` : ''
  }
})

// response interceptor
baseRequest.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.success) {
      message.error(res.msg || 'error', 1.5)
      if (res.code === 401) {
        removeFetchDefaultHeader()
        router.push('/login')
      }
      return Promise.reject(res)
    } else {
      return res.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export const setFetchDefaultHeader = (token) =>{
  localStorage.setItem('token', token)
  baseRequest.defaults.headers['authorization'] = 'Bearer ' + token
}

export const removeFetchDefaultHeader = () =>{
  localStorage.removeItem('token')
  baseRequest.defaults.headers['authorization'] = ''
}

export default baseRequest
