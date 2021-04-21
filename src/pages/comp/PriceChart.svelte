<script lang="ts">
  import TimeFrameSelector from "./TimeFrameSelector.svelte";
  import Loader from "./Loader.svelte";
  import { getDataURI } from "../../API/BitrawAPI";
  import Chart from "chart.js/auto";
  import dateFormat from "dateformat";
  import ChartCard from "./ChartCard.svelte";

  let tables = ["max_fee", "perc_75", "median_fee", "perc_25", "min_fee"];

  let hasLoaded = 0;
  var feepriceChart;

  const timeFrameMap = {
    "1h": { sample: "10m", limit: 6 },
    "6h": { sample: "1h", limit: 6 },
    "24h": { sample: "3h", limit: 8 },
    "7d": { sample: "12h", limit: 14 },
    "30d": { sample: "3d", limit: 10 },
    "1y": { sample: "1M", limit: 12 },
  };

  const labelsMap = {
    max_fee: "Max Fee",
    perc_75: "75th Percentile",
    median_fee: "Median Fee",
    perc_25: "25th Percentile",
    min_fee: "min Fee",
  };
  const colorMap = {
    max_fee: "rgba(193, 69, 12, 1)",
    perc_75: "rgba(193, 175, 12, 1)",
    median_fee: "rgba(166, 193, 12, 1)",
    perc_25: "rgba(63, 193, 12, 1)",
    min_fee: "rgba(12, 193, 98, 1)",
  };
  const colorBGMap = {
    max_fee: "rgba(193, 69, 12, .2)",
    perc_75: "rgba(193, 175, 12, .2)",
    median_fee: "rgba(166, 193, 12, .2)",
    perc_25: "rgba(63, 193, 12, .2)",
    min_fee: "rgba(12, 193, 98, .2)",
  };
  let chartData = {
    labels: [],
    datasets: [],
  };

  async function loadChartData(uri, table) {
    const response = await fetch(uri);
    const data = await response.json();
    hasLoaded++;

    let dataSet = {
      label: labelsMap[table],
      data: [],
      fill: true,
      backgroundColor: colorBGMap[table],
      borderColor: colorMap[table],
      tension: 0.2,
      hidden: table === "max_fee" ? true : false,
    };

    data.dataset.reverse();

    data.dataset.forEach((element) => {
      if (table === "median_fee") {
        let date = new Date(element[1]);
        chartData.labels.push(dateFormat(date, "dd.mm.yyyy HH:MM"));
      }
      dataSet.data.push(element[0]);
    });

    chartData.datasets.push(dataSet);

    if (hasLoaded >= tables.length) {
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
              label: function (context) {
                return `${context.dataset.label}: ${context.parsed.y}  sat / vB`;
              },
            },
          },
        },
        scales: {
          y: {
            title: { text: "Fee price in: sat / vB", display: true },
            borderColor: "rgba(228, 228, 231,.2)",
            grid: {
              color: "rgba(228, 228, 231,.2)",
            },
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (value, index, values) {
                return `${value} sat/vB`;
              },
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
    var ctx = document.getElementById("feeprice-chart");
    if (feepriceChart) {
      feepriceChart.destroy();
    }
    feepriceChart = new Chart(ctx, config);
  }

  function updateTimeFrame(e) {
    hasLoaded = 0;
    chartData = {
      labels: [],
      datasets: [],
    };

    const { sample = "1h", limit = 24 } = timeFrameMap[e.detail];

    tables.forEach((table) => {
      let query = `SELECT avg(val), ${table}.ts FROM ${table} SAMPLE BY ${sample} ORDER BY ${table}.ts desc LIMIT ${limit};`;
      let uri = getDataURI(query);
      loadChartData(uri, table);
    });
  }
</script>

<ChartCard
  title={"Fee Insight"}
  hasLoaded={hasLoaded >= tables.length}
  chartId={"feeprice-chart"}
  {updateTimeFrame}
/>
