let host = 'https://35.238.39.189'
let path = 'exec'
let param = 'query'

function getDataURI(query) {
  let url = `${host}/${path}?${param}=${query}`
  return encodeURI(url)
}

export { getDataURI }
