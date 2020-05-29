import baseFetch from '../utils/fetch'
const fetch = (url, ...arg) => baseFetch('/attendance' + url, ...arg)

export default {
  add(data) {
    return fetch('/add', data)
  },
  update(data) {
    return fetch('/update', data)
  },
  delete(data) {
    return fetch('/delete', data)
  },
  todayCheck(data) {
    return fetch('/todayCheck', data)
  },
}
