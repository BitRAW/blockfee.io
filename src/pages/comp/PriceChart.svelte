<script>
  import Chartist from "chartist";
  import dateFormat from "dateformat";

  import TimeFrameSelector from "./TimeFrameSelector.svelte";
  import { getDataURI } from "../../API/BitrawAPI";
  let tables = ["perc_75", "median_fee", "perc_25", "min_fee"];

  let seriesOptions = {};
  let hasLoaded = 0;
  var chartData = {
    labels: [],
    series: [],
  };

  async function loadChartData(uri, table) {
    const response = await fetch(uri);
    const data = await response.json();
    hasLoaded++;

    let feeSet = [];

    data.dataset.reverse();

    data.dataset.forEach((element) => {
      if (table === "median_fee") {
        let date = new Date(element[1]);
        chartData.labels.push(date);
      }
      feeSet.push(element[0]);
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
        labelInterpolationFnc: function (value, index) {
          let labelSpace = (length / 4).toFixed(0);
          if (index % labelSpace === 0) {
            return dateFormat(value, "dd.mm.yyyy HH:MM");
          } else return null;
        },
      },
    };

    setTimeout(() => {
      let chart = new Chartist.Line(".ct-chart", chartData, options);
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
    let sample = "1h";
    let limit = "24";
    switch (e.detail) {
      case "1h":
        sample = "10m";
        limit = "6";
        break;
      case "6h":
        sample = "1h";
        limit = "6";
        break;
      case "24h":
        sample = "3h";
        limit = "8";
        break;
      case "7d":
        sample = "12h";
        limit = "14";
        break;
      case "30d":
        sample = "3d";
        limit = "10";
        break;
      case "1y":
        sample = "1M";
        limit = "12";
        break;

      default:
        break;
    }
    tables.forEach((table) => {
      chartData.series.push({ name: table, data: {} });
      let query = `SELECT avg(val), ${table}.ts FROM ${table} SAMPLE BY ${sample} ORDER BY ${table}.ts desc LIMIT ${limit};`;
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
    <p class="text-lg font-bold order-1">Fee Insight</p>

    <div class="order-2 lg:order-3">
      <TimeFrameSelector on:selectTime={updateTimeFrame} />
    </div>
  </div>
  {#if hasLoaded >= tables.length}
    <p class="self-start pl-5">sat/vB</p>
    <div class=" w-full h-full flex items-center">
      <div class="ct-chart w-full h-full" />
    </div>
  {:else}
    <div class="flex-grow place-items-center">
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  {/if}
</div>

<style>
</style>
