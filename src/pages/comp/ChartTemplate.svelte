<script lang="ts">
  import {buildUrl} from '../../API/BitrawAPI';
  import Chart from 'chart.js/auto';
  import dateFormat from 'dateformat';
  import ChartCard from './ChartCard.svelte';
  import {getOpacityForColor, timeFrameMap} from '../../util/chartUtils';
  import {text4Hrs, textIgnoredEmptyBlocks} from '../../util/infoTextUtils';
  import {blockCache} from '../../stores';
  import {BlockInfo} from '../../objects/BlockInfo';

  export let resource;
  export let lines;
  export let labelsMap;
  export let chartId;
  export let colorMap;
  export let chartUnit;
  export let dataManipulationFunction;
  export let chartTitle;
  export let popupInfo;
  export let isFill;

  let hasLoaded = false;
  let feepriceChart;
  let isLive;

  let chartData = {
    labels: [],
    datasets: [],
  };

  async function loadChartData(uri) {
    const response = await fetch(uri);
    let data = await response.json();
    data = data.reverse().map((datapoint) => {
      return new BlockInfo(datapoint);
    });
    buildChartData(data);
  }

  function loadFromStore() {
    const data = $blockCache
        .slice(0, 24)
        .reverse();
    buildChartData(data);
  }

  function buildChartData(data) {
    hasLoaded = true;
    let hasSetTimestamps = false;
    data = dataManipulationFunction(data);

    for (let i = 1; i <= lines.length; i++) {
      const line = lines[i - 1];
      const dataSet = {
        label: labelsMap[line],
        data: data.map((blockInfo) => {
          return blockInfo[line];
        }),
        fill: isFill,
        backgroundColor: getOpacityForColor(colorMap[line], '0.2'),
        borderColor: colorMap[line],
        tension: 0.2,
        borderDash: line === 'avg_fee' ? [10, 10] : [0, 0],
        hidden: line === 'max_fee' || line === 'perc_90'|| line === 'perc_10' ? true : false,
      };
      if (!hasSetTimestamps) {
        data.forEach((element) => {
          const date = new Date(element.ts);
          chartData.labels.push(dateFormat(date, 'dd.mm.yyyy HH:MM'));
        });
      }
      hasSetTimestamps = true;
      chartData.datasets.push(dataSet);
    }
    if (hasLoaded) {
      createChart(chartData);
    }
  }

  async function createChart(data) {
    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            align: 'start',
            labels: {
              boxWidth: 20,
              boxHeight: 20,
            },
          },
          tooltip: {
            callbacks: {
              labelColor: function(context) {
                return {
                  borderColor: context.dataset.borderColor,
                  backgroundColor: context.dataset.borderColor,
                  borderWidth: 0,
                  borderRadius: 5,
                };
              },
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.y}  ${chartUnit}`;
              },
            },
          },
        },
        scales: {
          y: {
            borderColor: 'rgba(228, 228, 231,.2)',
            grid: {
              color: 'rgba(228, 228, 231,.2)',
            },
          },
          x: {
            borderColor: 'rgba(228, 228, 231,.2)',
            grid: {
              color: 'rgba(228, 228, 231,.2)',
            },
            ticks: {
              callback: function(index, val) {
                const labelSpace = +(data.labels.length / 3).toFixed(0);

                if (index % labelSpace === 0) {
                  return this.getLabelForValue(val);
                } else return null;
              },
            },
          },
        },
      },
    };
    const ctx = document.getElementById(chartId);
    if (feepriceChart) {
      feepriceChart.destroy();
    }
    feepriceChart = new Chart(ctx, config);
  }

  function updateTimeFrame(e) {
    hasLoaded = false;
    chartData = {
      labels: [],
      datasets: [],
    };

    const {timeframeUnit = 'h', timeframe = 4, sampleUnit= undefined, sample = undefined} = timeFrameMap[
        e.detail
    ];
    isLive = timeframe+ timeframeUnit === '4h' ? true : false;
    const sampled = isLive?'':'/sampled';
    const uri = buildUrl(resource+sampled, timeframeUnit, timeframe, sampleUnit, sample);
    if (isLive) {
      loadFromStore();
    } else {
      loadChartData(uri);
    }
  }
</script>

<ChartCard
  {chartTitle}
  {hasLoaded}
  {chartId}
  {updateTimeFrame}
  infoContent={popupInfo + ' ' + text4Hrs + ' ' + textIgnoredEmptyBlocks}
  {isLive}
/>
