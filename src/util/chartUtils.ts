const timeFrameMap = {
  '4h': {timeframeUnit: 'h', timeframe: 4, sampleUnit: undefined, sample: undefined},
  '24h': {timeframeUnit: 'd', timeframe: 1, sampleUnit: 'h', sample: 2},
  '7d': {timeframeUnit: 'd', timeframe: 7, sampleUnit: 'h', sample: 12},
  '30d': {timeframeUnit: 'd', timeframe: 30, sampleUnit: 'd', sample: 2},
  '1y': {timeframeUnit: 'y', timeframe: 1, sampleUnit: 'M', sample: 1},
  'all': {timeframeUnit: 'y', timeframe: 999, sampleUnit: 'M', sample: 4},
};

function getOpacityForColor(colorString, opacity) {
  colorString = colorString.substring(0, colorString.length - 2);
  colorString = `${colorString} ${opacity})`;
  return colorString;
}

export {timeFrameMap, getOpacityForColor};
