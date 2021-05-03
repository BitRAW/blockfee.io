<script lang="ts">
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { getDataURI, buildQuery } from "../../API/BitrawAPI";
  import { getStandardDeviation } from "../../API/VolatilityAPI";
  import Chart from "chart.js/auto";
  import dateFormat from "dateformat";
  import { timeFrameMap } from "../../util/chartUtils";
  import ChartCard from "./ChartCard.svelte";
  import { text6Hrs } from "../../util/infoTextUtils";

  let data;
  let hasLoaded = false;
  var subsidyChart;
  let isLive;

  const tweenedStd = tweened(0, {
    duration: 1000,
    easing: cubicOut,
  });

  async function loadData(uri) {
    const response = await fetch(uri);
    data = await response.json();
    // let extractedData = data.dataset.map((datapoint) => {
    //   return datapoint[1];
    // });
    hasLoaded = true;
    // showBar(getStandardDeviation(extractedData));
    showChart(data.dataset);
  }

  // function showBar(std) {
  //   $tweenedStd = std;
  //   let percentage = std >= 100 ? 100 : std;
  //   let bar = document.getElementById("colat-bar");
  //   bar.classList.remove("w-0");
  //   bar.style.width = percentage + "%";
  // }

  function showChart(data) {
    let chartData = {
      labels: [],
      datasets: [],
    };

    let dataSet = {
      label: "Volatility",
      data: [],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.2,
    };

    let lookback = +(data.length / 4).toFixed(0);
    let c = 0;

    data.forEach((datapoint) => {
      if (c >= lookback) {
        chartData.labels.push(dateFormat(datapoint[0], "dd.mm.yyyy HH:MM"));
        let lookbackSet = data.slice(c - lookback, c);
        lookbackSet = lookbackSet.map((val) => {
          return val[1];
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
        responsive: true,
        maintainAspectRatio: false,
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
    const { format = "h", duration = 6, sample = undefined } = timeFrameMap[
      e.detail
    ];

    isLive = duration + format === "6h" ? true : false;
    let query = buildQuery(["median_fee"], format, duration, sample);
    let uri = getDataURI(query);
    loadData(uri);
  }
</script>

<ChartCard
  title={"Volatility"}
  {hasLoaded}
  chartId={"volatility-chart"}
  {updateTimeFrame}
  infoContent={"This chart shows the volatility of the median fees over time. " +
    text6Hrs}
  {isLive}
/>
