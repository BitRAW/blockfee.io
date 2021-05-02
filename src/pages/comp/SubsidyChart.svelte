<script lang="ts">
  import Chart from "chart.js/auto";

  import dateFormat from "dateformat";

  import { getDataURI, buildQuery } from "../../API/BitrawAPI";
  import { calculateBlockSubsidyRatio } from "../../API/BTCAPI";
  import { timeFrameMap } from "../../util/chartUtils";
  import ChartCard from "./ChartCard.svelte";

  let tables = ["total_fee", "blocks"];

  let hasLoaded = false;
  var subsidyChart;

  async function loadChartData(uri, table) {
    let chartData = {
      labels: [],
      datasets: [],
    };
    const response = await fetch(uri);
    const data = await response.json();
    hasLoaded = true;

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
        let date = new Date(element[0]);
        chartData.labels.push(dateFormat(date, "dd.mm.yyyy HH:MM"));
      }
      let blockreward =
        calculateBlockSubsidyRatio(element[2], element[1]) * 100;
      dataSet.data.push(blockreward);
    });
    chartData.datasets.push(dataSet);
    if (hasLoaded) {
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
    hasLoaded = false;

    const { format = "h", duration = 6, sample = undefined } = timeFrameMap[
      e.detail
    ];
    let query = buildQuery(tables, format, duration, sample);
    let uri = getDataURI(query);
    loadChartData(uri, tables[0]);
  }
</script>

<ChartCard
  title={"Block Subsidy"}
  {hasLoaded}
  chartId={"subsidy-chart"}
  {updateTimeFrame}
/>
