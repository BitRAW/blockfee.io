import { allCharts } from '../util/chartUtils'

let host = 'https://backend-5.bitraw.io'
let path = 'exec'
let param = 'query'

function getDataURI(query) {
  let url = `${host}/${path}?${param}=${query}`
  return encodeURI(url)
}

function buildQuery(tablesOrig, timeUnit, timeFrame, sample) {
  let tables = [...tablesOrig]
  let firstTable = tables[0]

  let query = 'select '
  query += firstTable + '.ts, '
  if (sample) {
    query += tables
      .map((table) =>
        table === 'blocks'
          ? `max(${table}.block_nr)`
          : `avg(${table}.val) as ${table}`,
      )
      .join(', ')
  } else {
    query += tables
      .map((table) =>
        table === 'blocks' ? `${table}.block_nr` : `${table}.val as ${table}`,
      )
      .join(', ')
  }
  query += ' from '
  query += firstTable
  tables.shift() //remove first table of array
  query += tables
    .map((table) => {
      return ` join ${table} on ts`
    })
    .join('')
  query += ` where ${firstTable}.ts > dateadd('${timeUnit}',-${timeFrame}, to_timestamp('2020-09-28T09:40:01', 'yyyy-MM-ddTHH:mm:ss'))`
  query += sample ? ' sample by ' + sample : ''
  query += ` order by ${firstTable}.ts desc`
  query += ';'
  return query
}

async function fetchData(query) {
  let uri = getDataURI(query)
  let request = await fetch(uri)
  let data = await request.json()
  return data
}

function fetchBlocks(days) {
  let query = buildQuery(allCharts, 'h', days)
  return fetchfromJson()
  return fetchData(query)
}

async function fetchfromJson() {
  let request = await fetch('/data.json')
  let data = await request.json()
  return data
}

export { getDataURI, fetchData, fetchBlocks, buildQuery }
