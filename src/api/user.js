import baseFetch from '../utils/fetch'
const fetch = (url, ...arg) => baseFetch('/user' + url, ...arg)

export default {
  login(data) {
    return fetch('/login', data)
  },
  register(data) {
    return fetch('/register', data)
  },
  getInfo() {
    return fetch('/info', null, 'get')
  },
  logout() {
    return fetch('/logout')
  }
}
