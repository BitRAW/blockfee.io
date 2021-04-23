<script lang="ts">
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { getDataURI } from "../../API/BitrawAPI";
  import { getStandardDeviation } from "../../API/VolatilityAPI";
  import Loader from "./Loader.svelte";
  import TimeFrameSelector from "./TimeFrameSelector.svelte";
  import Chart from "chart.js/auto";
  import dateFormat from "dateformat";
  import Bar from "./Bar.svelte";
  import { timeFrameMap } from "../../util/chartUtils";

  let data;
  let hasLoaded = false;
  var subsidyChart;

  const tweenedStd = tweened(0, {
    duration: 1000,
    easing: cubicOut,
  });

  async function loadData(uri) {
    const response = await fetch(uri);
    data = await response.json();
    let extractedData = data.dataset.map((datapoint) => {
      return datapoint[0];
    });
    hasLoaded = true;
    showBar(getStandardDeviation(extractedData));
    showChart(data.dataset);
  }

  function showBar(std) {
    $tweenedStd = std;
    let percentage = std >= 100 ? 100 : std;
    let bar = document.getElementById("colat-bar");
    bar.classList.remove("w-0");
    bar.style.width = percentage + "%";
  }

  function showChart(data) {
    let chartData = {
      labels: [],
      datasets: [],
    };

    let dataSet = {
      label: "Volatility",
      data: [],
      fill: true,
      backgroundColor: "rgb(75, 192, 192, 0.2)",
      borderColor: "rgb(75, 192, 192)",
      tension: 0.2,
    };

    let lookback = +(data.length / 4).toFixed(0);
    let c = 0;

    data.forEach((datapoint) => {
      if (c >= lookback) {
        chartData.labels.push(dateFormat(datapoint[1], "dd.mm.yyyy HH:MM"));
        let lookbackSet = data.slice(c - lookback, c);
        lookbackSet = lookbackSet.map((val) => {
          return val[0];
        });
        dataSet.data.push(getStandardDeviation(lookbackSet));
      }
      c++;
    });
    chartData.datasets.push(dataSet);

    if (hasLoaded === true) {
      createChart(chartData);
    }
  }

  async function createChart(data) {
    const config = {
      type: "line",
      data: data,
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              labelColor: function (context) {
                return {
                  borderColor: context.dataset.borderColor,
                  backgroundColor: context.dataset.borderColor,
                  borderWidth: 0,
                  borderRadius: 5,
                };
              },
            },
          },
        },
        scales: {
          y: {
            title: { text: "sat / vB", display: true },

            borderColor: "rgba(228, 228, 231,.2)",
            grid: {
              color: "rgba(228, 228, 231,.2)",
            },
            // max: 100,
            // min: 0,
          },
          x: {
            borderColor: "rgba(228, 228, 231,.2)",
            grid: {
              color: "rgba(228, 228, 231,.2)",
            },
            ticks: {
              callback: function (index, val) {
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
    var ctx = document.getElementById("volatility-chart");
    if (subsidyChart) {
      subsidyChart.destroy();
    }
    subsidyChart = new Chart(ctx, config);
  }

  function updateTimeFrame(e) {
    hasLoaded = false;
    const { format = "h", duration = 6, sample = "10m" } = timeFrameMap[
      e.detail
    ];

    // let query = `SELECT avg(val), ts FROM median_fee WHERE ts > dateadd('${format}', - ${duration}, now()) SAMPLE BY 1h;`;
    // let query = `SELECT avg(val), ts FROM median_fee WHERE ts > dateadd('${format}', -${duration},  to_timestamp('2016-03-29T09:23:19', 'yyyy-MM-ddTHH:mm:ss')) SAMPLE BY ${sample};`;
    let query = `SELECT avg(val), ts FROM median_fee WHERE ts > dateadd('${format}', -${duration},  to_timestamp('2013-08-13T09:23:19', 'yyyy-MM-ddTHH:mm:ss')) AND ts < to_timestamp('2013-08-13T09:23:19', 'yyyy-MM-ddTHH:mm:ss') SAMPLE BY ${sample};`;
    let uri = getDataURI(query);
    loadData(uri);
  }
</script>

<div
  class="bg-gray-900 w-full h-full flex flex-col p-4 rounded-md shadow-lg justify-start pb-10"
>
  <div class="flex-col lg:flex justify-between flex-grow w-full p-2 gap-2">
    <p class="text-lg font-bold flex gap-4 items-center w-full">
      Volatility
      {#if !hasLoaded}
        <Loader />
      {/if}
    </p>

    <div>
      <TimeFrameSelector on:selectTime={updateTimeFrame} />
    </div>
  </div>
  <Bar {tweenedStd} />
  <canvas class="w-full h-full" id="volatility-chart" />
</div>
