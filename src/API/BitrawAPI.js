import {allCharts} from '../util/chartUtils';

const host = 'https://api.bitraw.io';

function getDataURI(path) {
  const url = `${host}/${path}`;
  return encodeURI(url);
}

function buildUrl(resource, timeframeUnit, timeframe, sampleUnit, sample) {
  let path = resource;
  if (timeframeUnit === undefined || timeframe === undefined) {
    return getDataURI(path);
  }
  path+=`?timeframeUnit=${timeframeUnit}`;
  path+=`&timeframe=${timeframe}`;

  if (sampleUnit === undefined || sample === undefined) {
    return getDataURI(path);
  }
  path+=`&sampleUnit=${sampleUnit}`;
  path+=`&sample=${sample}`;

  return getDataURI(path);
}

async function fetchData(resource, timeframeUnit, timeframe, sampleUnit, sample) {
  const uri = buildUrl(resource, timeframeUnit, timeframe, sampleUnit, sample);
  const request = await fetch(uri);
  const data = await request.json();
  return data;
}

function fetchBlocks(hours) {
  return fetchData('block/list', 'h', hours);
}

export {buildUrl, fetchData, fetchBlocks};
