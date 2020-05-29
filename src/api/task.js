import baseFetch from '../utils/fetch'
const fetch = (url, ...arg) => baseFetch('/task' + url, ...arg)

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
  list(data) {
    return fetch('/list', data)
  },
  getFourDay(data) {
    return fetch('/getFourDay', data)
  },
  get7Day(data) {
    return fetch('/get7Day', data)
  },
  search(data) {
    return fetch('/search', data)
  },
  statistics(data) {
    return fetch('/statistics', data)
  },
  
}
