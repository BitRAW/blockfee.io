<script lang="ts">
  import { getDataURI } from "../../API/BitrawAPI";
  import Chart from "chart.js/auto";
  import dateFormat from "dateformat";
  import ChartCard from "./ChartCard.svelte";
  import { timeFrameMap } from "../../util/chartUtils";

  let tables = ["max_fee", "perc_75", "median_fee", "perc_25", "min_fee"];

  let hasLoaded = 0;
  var feepriceChart;

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

    const { format = "h", duration = 6, sample = "10m" } = timeFrameMap[
      e.detail
    ];

    tables.forEach((table) => {
      let query = `SELECT avg(val), ts FROM ${table} WHERE ts > dateadd('${format}', -${duration},  to_timestamp('2013-08-13T09:23:19', 'yyyy-MM-ddTHH:mm:ss')) AND ts < to_timestamp('2013-08-13T09:23:19', 'yyyy-MM-ddTHH:mm:ss') SAMPLE BY ${sample};`;

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
