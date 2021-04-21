<script lang="ts">
  import Chart from "chart.js/auto";

  import TimeFrameSelector from "./TimeFrameSelector.svelte";
  import dateFormat from "dateformat";

  import Loader from "./Loader.svelte";
  import { getDataURI } from "../../API/BitrawAPI";
  import { calculateBlockSubsidyRatio } from "../../API/BTCAPI";
  import ChartCard from "./ChartCard.svelte";

  let tables = ["total_fee"];

  let hasLoaded = 0;
  var subsidyChart;

  const timeFrameMap = {
    "1h": { sample: "0", limit: 6 },
    "6h": { sample: "0", limit: 36 },
    "24h": { sample: "0", limit: 144 },
    "7d": { sample: "12h", limit: 14 },
    "30d": { sample: "3d", limit: 10 },
    "1y": { sample: "1M", limit: 12 },
  };

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

    const { limit = 24, sample = "1h" } = timeFrameMap[e.detail];

    tables.forEach((table) => {
      let subQuerryAvg = sample !== "0" ? "avg(val)" : "val";
      let subQuerySample = sample !== "0" ? `SAMPLE BY ${sample}` : "";
      let subQueryLimit = limit !== "0" ? `LIMIT ${limit}` : "";
      let query = `SELECT  ${subQuerryAvg}, ${table}.ts as ts, blocks.block_nr FROM ${table} JOIN blocks on ts ${subQuerySample} ORDER BY ${table}.ts desc ${subQueryLimit};`;
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
