<script lang="ts">
  import Chart from "chart.js/auto";

  import dateFormat from "dateformat";

  import { getDataURI } from "../../API/BitrawAPI";
  import { calculateBlockSubsidyRatio } from "../../API/BTCAPI";
  import { timeFrameMap } from "../../util/chartUtils";
  import ChartCard from "./ChartCard.svelte";

  let tables = ["total_fee"];

  let hasLoaded = 0;
  var subsidyChart;

  async function loadChartData(uri, table) {
    let chartData = {
      labels: [],
      datasets: [],
    };
    const response = await fetch(uri);
    const data = await response.json();
    hasLoaded++;

    let dataSet = {
      label: table,
      data: [],
      fill: true,
      backgroundColor: "rgb(75, 192, 192, 0.2)",
      borderColor: "rgb(75, 192, 192)",
      tension: 0.2,
    };

    data.dataset.reverse();

    data.dataset.forEach((element) => {
      if (table === "total_fee") {
        let date = new Date(element[1]);
        chartData.labels.push(dateFormat(date, "dd.mm.yyyy HH:MM"));
      }
      let blockreward =
        calculateBlockSubsidyRatio(element[2], element[0]) * 100;
      dataSet.data.push(blockreward);
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
            },
          },
        },
        scales: {
          y: {
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
    var ctx = document.getElementById("subsidy-chart");
    if (subsidyChart) {
      subsidyChart.destroy();
    }
    subsidyChart = new Chart(ctx, config);
  }

  function updateTimeFrame(e) {
    hasLoaded = 0;

    const { format = "h", duration = 6, sample = "10m" } = timeFrameMap[
      e.detail
    ];
    tables.forEach((table) => {
      let query = `SELECT avg(val), ${table}.ts, blocks.block_nr FROM ${table} join blocks on ts WHERE ${table}.ts > dateadd('${format}', -${duration},  to_timestamp('2013-06-24T09:23:19', 'yyyy-MM-ddTHH:mm:ss')) AND ${table}.ts < to_timestamp('2013-06-24T09:23:19', 'yyyy-MM-ddTHH:mm:ss') SAMPLE BY ${sample} ORDER BY ${table}.ts DESC;`;
      let uri = getDataURI(query);
      loadChartData(uri, table);
    });
  }
</script>

<ChartCard
  title={"Block Subsidy"}
  hasLoaded={hasLoaded >= tables.length}
  chartId={"subsidy-chart"}
  {updateTimeFrame}
/>
