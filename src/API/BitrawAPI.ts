import {addAlert} from '../alert';

const host = 'https://api.bitraw.io';

type BitrawApiQueryParameters = {
  timeframeUnit?: string;
  timeframe?: string | number;
  sampleUnit?: string;
  sample?: string | number;
}

function getDataURI(path) {
  const url = `${host}/${path}`;
  return encodeURI(url);
}

function buildUrl(resource: string, queryParams?: BitrawApiQueryParameters) {
  const urlSearchParams = new URLSearchParams();

  if (queryParams) {
    Object.keys(queryParams).forEach((q: string) => {
      if (queryParams[q] !== undefined) {
        urlSearchParams.append(q, queryParams[q]);
      }
    });
  }

  return getDataURI(`${resource}?${urlSearchParams.toString()}`);
}

async function fetchData(resource: string, queryParams?: BitrawApiQueryParameters) {
  const uri = buildUrl(resource, queryParams);
  try {
    const request = await fetch(uri);
    return await request.json();
  } catch (err) {
    addAlert({message: 'Error fetching data!', severity: 'error'});
    return [];
  }
}

function fetchBlocks(hours: number) {
  return fetchData('block/list', {timeframeUnit: 'h', timeframe: hours});
}

async function fetchBlock(id) {
  id= (id === undefined || id === null)? '': id;

  return fetchData( `block/${id}`);
}

export {buildUrl, fetchData, fetchBlocks, fetchBlock, getDataURI};
