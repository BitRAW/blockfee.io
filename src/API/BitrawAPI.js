import {allCharts} from '../util/chartUtils';

const host = 'https://backend.bitraw.io';
const path = 'exec';
const param = 'query';

function getDataURI(query) {
  const url = `${host}/${path}?${param}=${query}`;
  return encodeURI(url);
}

function buildQuery(tablesOrig, timeUnit, timeFrame, sample) {
  const tables = [...tablesOrig];
  const firstTable = tables[0];

  let query = 'select ';
  query += firstTable + '.ts, ';
  if (sample) {
    query += tables
        .map((table) =>
        table === 'blocks' ?
          `max(${table}.val)` :
          `avg(${table}.val) as ${table}`,
        )
        .join(', ');
  } else {
    query += tables
        .map((table) => `${table}.val as ${table}`)
        .join(', ');
  }
  query += ' from ';
  query += firstTable;
  tables.shift(); // remove first table of array
  query += tables
      .map((table) => {
        return ` join ${table} on ts`;
      })
      .join('');
  query += ` where ${firstTable}.ts > dateadd('${timeUnit}',-${timeFrame}, now())`;
  query += sample ? ' sample by ' + sample : '';
  query += ` order by ${firstTable}.ts desc`;
  query += ';';
  return query;
}

async function fetchData(query) {
  const uri = getDataURI(query);
  const request = await fetch(uri);
  const data = await request.json();
  return data;
}

function fetchBlocks(hours) {
  const query = buildQuery(allCharts, 'h', hours);
  return fetchData(query);
}

export {getDataURI, fetchData, fetchBlocks, buildQuery};
