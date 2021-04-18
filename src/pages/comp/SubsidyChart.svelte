<script lang="ts">
  import Chartist from "chartist";

  import TimeFrameSelector from "./TimeFrameSelector.svelte";
  import Loader from "./Loader.svelte";
  import { getDataURI } from "../../API/BitrawAPI";
  import { calculateBlockSubsidyRatio } from "../../API/BTCAPI";
  import { getLabelInterpolationFnc } from "../../util/chartUtil";

  let tables = ["total_fee"];

  let seriesOptions = {};
  let hasLoaded = 0;
  var chartData = {
    labels: [],
    series: [],
  };
  
  const timeFrameMap = {
    '1h': { sample: '0', limit: 6 },
    '6h': { sample: '0', limit: 36 },
    '24h': { sample: '0', limit: 144 },
    '7d': { sample: '12h', limit: 14 },
    '30d': { sample: '3d', limit: 10 },
    '1y': { sample: '1M', limit: 12 }
  }

  async function loadChartData(uri, table) {
    const response = await fetch(uri);
    const data = await response.json();
    hasLoaded++;

    let feeSet = [];

    data.dataset.reverse();

    data.dataset.forEach((element) => {
      if (table === "total_fee") {
        let date = new Date(element[1]);
        chartData.labels.push(date);
      }
      let blockreward =
        calculateBlockSubsidyRatio(element[2], element[0]) * 100;
      feeSet.push(blockreward);
    });
    chartData.series.forEach((e) => {
      if (e.name === table) {
        e.data = feeSet;
      }
    });

    if (hasLoaded >= tables.length) {
      createChart(chartData.labels.length);
    }
  }

  async function createChart(length) {
    var options = {
      series: seriesOptions,
      fullWidth: true,
      axisX: {
        labelInterpolationFnc: getLabelInterpolationFnc(length),
      },
    };

    setTimeout(() => {
      let chart = new Chartist.Line(".ct-chart-subsidy", chartData, options);
      chart.on("draw", function (chartData) {
        if (chartData.type === "line" || chartData.type === "area") {
          chartData.element.animate({
            d: {
              begin: 200 * chartData.index,
              dur: 1000,
              from: chartData.path
                .clone()
                .scale(1, 0)
                .translate(0, chartData.chartRect.height() + 15)
                .stringify(),
              to: chartData.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint,
            },
          });
        }
      });
    }, 30);
  }

  function updateTimeFrame(e) {
    hasLoaded = 0;
    chartData = {
      labels: [],
      series: [],
    };

    const { limit = 24, sample = '1h' } = timeFrameMap[e.detail];
    
    tables.forEach((table) => {
      chartData.series.push({ name: table, data: {} });
      let subQuerryAvg = sample !== "0" ? "avg(val)" : "val";
      let subQuerySample = sample !== "0" ? `SAMPLE BY ${sample}` : "";
      let subQueryLimit = limit !== "0" ? `LIMIT ${limit}` : "";
      let query = `SELECT  ${subQuerryAvg}, ${table}.ts as ts, blocks.block_nr FROM ${table} JOIN blocks on ts ${subQuerySample} ORDER BY ${table}.ts desc ${subQueryLimit};`;
      let uri = getDataURI(query);
      loadChartData(uri, table);
      seriesOptions[table] = { showPoint: false, showArea: true };
    });
  }
</script>

<div
  class=" bg-gray-900 rounded-md w-full h-full p-2 shadow-2xl items-center flex flex-col justify-center"
>
  <div class="p-2 flex justify-between w-full flex-wrap items-start gap-y-4">
    <p class="text-lg font-bold order-1">Block subsidy</p>

    <div class="order-2 lg:order-3">
      <TimeFrameSelector on:selectTime={updateTimeFrame} />
    </div>
  </div>
  {#if hasLoaded >= tables.length}
    <p class="self-start pl-5">% are subsidy</p>
    <div class=" w-full h-full flex items-center">
      <div class="ct-chart-subsidy w-full h-full" />
    </div>
  {:else}
    <div class="flex-grow place-items-center">
      <Loader />
    </div>
  {/if}
</div>

<style>
</style>
