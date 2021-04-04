let host = 'https://backend.bitraw.io'
let path = 'exec'
let param = 'query'

function getDataURI(query) {
  let url = `${host}/${path}?${param}=${query}`
  return encodeURI(url)
}

export { getDataURI }
