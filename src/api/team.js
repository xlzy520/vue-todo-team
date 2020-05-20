import baseFetch from '../utils/fetch'
const fetch = (url, ...arg) => baseFetch('/team' + url, ...arg)

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
  myTeams(data) {
    return fetch('/myTeams', data)
  },
  search(data) {
    return fetch('/search', data)
  },
  join(data) {
    return fetch('/join', data)
  },
  teammates(data) {
    return fetch('/teammates', data)
  },
  getTeamInfo(data) {
    return fetch('/getTeamInfo', data)
  },
  
}
