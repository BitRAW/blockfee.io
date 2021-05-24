const timeFrameMap = {
  '4h': {format: 'h', duration: 4, sample: undefined},
  '24h': {format: 'd', duration: 1, sample: '2h'},
  '7d': {format: 'd', duration: 7, sample: '12h'},
  '30d': {format: 'd', duration: 30, sample: '2d'},
  '1y': {format: 'y', duration: 1, sample: '1M'},
  'all': {format: 'y', duration: 999, sample: '4M'},
};

const allCharts = ['blocks',
  'total_fee',
  'avg_fee',
  'min_fee',
  'perc_25',
  'median_fee',
  'perc_75',
  'max_fee'];

function getOpacityForColor(colorString, opacity) {
  colorString = colorString.substring(0, colorString.length - 2);
  colorString = `${colorString} ${opacity})`;
  return colorString;
}

export {timeFrameMap, allCharts, getOpacityForColor};
