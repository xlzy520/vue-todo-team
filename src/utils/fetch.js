import baseRequest from './baseRequest'

export default function fetch(url, value, method = 'post', options = {}) {
  if (method === 'post') {
    return baseRequest.post(url, value, options)
  } else if (method === 'get') {
    return baseRequest.get(url, { params: value }, options)
  } else if (method === 'formdata') {
    return baseRequest({
      method: 'post',
      url: url,
      data: value,
      // 转换数据的方法
      transformRequest: [
        function(data) {
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          ret = ret.substring(0, ret.length - 1)
          return ret
        }
      ],
      // 设置请求头
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}
