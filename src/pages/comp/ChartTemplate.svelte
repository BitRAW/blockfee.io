<script lang="ts">
  import {fetchData} from '../../API/BitrawAPI';
  import Chart from 'chart.js/auto';
  import {format} from 'date-fns';
  import ChartCard from './ChartCard.svelte';
  import {getOpacityForColor, timeFrameMap} from '../../util/chartUtils';
  import {text4Hrs, textIgnoredEmptyBlocks} from '../../util/infoTextUtils';
  import {blockCache, defaultTimeframe} from '../../stores';
  import {BlockInfo} from '../../objects/BlockInfo';
  
  import type {ChartConfiguration, LegendItem} from 'chart.js';
  import {onMount} from 'svelte';

  type ExtendedBlockInfo = BlockInfo & { [key: string]: any };

  export let resource: string;
  export let lines: Array<string>;
  export let labelsMap;
  export let chartId: string;
  export let colorMap;
  export let chartUnit: string;
  export let dataManipulationFunction: (data: Array<BlockInfo>) => Array<ExtendedBlockInfo>;
  export let chartTitle: string;
  export let popupInfo: string;
  export let isFill: boolean;
  export let hiddenLines: Array<string>;

  let hasLoaded = false;
  let feepriceChart: Chart;
  let isLive: boolean;
  let timeframeKey: string = defaultTimeframe;

  let chartData = {
    labels: [],
    datasets: [],
  };

  onMount(() => {
    buildChartData($blockCache[timeframeKey].slice(0, 24).reverse());
  });

  function buildChartData(data: Array<BlockInfo>) {
    hasLoaded = true;
    let hasSetTimestamps = false;
    data = dataManipulationFunction(data);
    chartData = {
      labels: [],
      datasets: [],
    };

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
        hidden: hiddenLines.includes(labelsMap[line]) ? true : false,
      };
      if (!hasSetTimestamps) {
        data.forEach((element) => {
          const date = new Date(element.ts);
          chartData.labels.push(format(date, 'dd.MM.yyyy HH:mm'));
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
    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            onClick: function(e, legendItem: LegendItem, legend: any) {
              const index = legendItem.datasetIndex;
              console.log('legend', legend, legendItem);
              const ci = legend.chart;
              if (ci.isDatasetVisible(index)) {
                ci.hide(index);
                legendItem.hidden = true;
              } else {
                ci.show(index);
                legendItem.hidden = false;
              }
              hiddenLines = legend.legendItems.filter((li)=>{
                return li.hidden;
              }).map((li)=>{
                return li.text;
              });
            },
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
                  borderColor: context.dataset.borderColor.toString(),
                  backgroundColor: context.dataset.borderColor.toString(),
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
            grid: {
              color: 'rgba(228, 228, 231,.2)',
            },
          },
          x: {
            grid: {
              color: 'rgba(228, 228, 231,.2)',
            },
            ticks: {
              callback: function(index: number, val) {
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

  async function updateTimeFrame(e) {
    hasLoaded = false;

    const {
      timeframeUnit = 'h',
      timeframe = 4,
      sampleUnit = undefined,
      sample = undefined,
    } = timeFrameMap[e.detail];
    timeframeKey = timeframe + timeframeUnit;
    isLive = timeframeKey === defaultTimeframe ? true : false;
    const sampled = isLive ? '' : '/sampled';

    let data: BlockInfo[] = [];
    if ($blockCache[timeframeKey]) {
      data = $blockCache[timeframeKey];
    } else {
      data = await fetchData<BlockInfo[]>(resource+sampled, {timeframeUnit, timeframe, sample, sampleUnit});
      data = data.map((datapoint) => {
        return new BlockInfo(datapoint);
      });
      blockCache.update((cache) => ({...cache, [timeframeKey]: data}));
    }
    buildChartData(data.slice(0, 24).reverse());
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
