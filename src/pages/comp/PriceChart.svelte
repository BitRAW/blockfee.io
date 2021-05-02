<script lang="ts">
  import { buildQuery, getDataURI } from "../../API/BitrawAPI";
  import Chart from "chart.js/auto";
  import dateFormat from "dateformat";
  import ChartCard from "./ChartCard.svelte";
  import { timeFrameMap } from "../../util/chartUtils";
  import { text6Hrs } from "../../util/infoTextUtils";

  let tables = [
    "avg_fee",
    "max_fee",
    "perc_75",
    "median_fee",
    "perc_25",
    "min_fee",
  ];

  let hasLoaded = false;
  var feepriceChart;
  let isLive;

  const labelsMap = {
    max_fee: "Max Fee",
    perc_75: "75th Percentile",
    median_fee: "Median Fee",
    perc_25: "25th Percentile",
    min_fee: "Min Fee",
    avg_fee: "Average Fee",
  };
  const colorMap = {
    max_fee: "rgba(193, 69, 12, 1)",
    perc_75: "rgba(193, 175, 12, 1)",
    median_fee: "rgba(166, 193, 12, 1)",
    perc_25: "rgba(63, 193, 12, 1)",
    min_fee: "rgba(12, 193, 98, 1)",
    avg_fee: "rgba(75, 192, 192, 1)",
  };

  let chartData = {
    labels: [],
    datasets: [],
  };

  async function loadChartData(uri, tables) {
    const response = await fetch(uri);
    const data = await response.json();
    hasLoaded = true;
    data.dataset.reverse();

    for (let i = 1; i <= tables.length; i++) {
      const table = tables[i - 1];
      let dataSet = {
        label: labelsMap[table],
        data: [],
        fill: false,
        borderColor: colorMap[table],
        tension: 0.2,
        borderDash: table === "avg_fee" ? [10, 10] : [0, 0],
        hidden: table === "max_fee" ? true : false,
      };
      data.dataset.forEach((element) => {
        if (table === "median_fee") {
          let date = new Date(element[0]);
          chartData.labels.push(dateFormat(date, "dd.mm.yyyy HH:MM"));
        }
        dataSet.data.push(element[i]);
      });
      chartData.datasets.push(dataSet);
    }
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
    hasLoaded = false;
    chartData = {
      labels: [],
      datasets: [],
    };

    const { format = "h", duration = 6, sample = undefined } = timeFrameMap[
      e.detail
    ];
    isLive = duration + format === "6h" ? true : false;

    let query = buildQuery(tables, format, duration, sample);

    let uri = getDataURI(query);
    loadChartData(uri, tables);
  }
</script>

<ChartCard
  title={"Fee Insight"}
  {hasLoaded}
  chartId={"feeprice-chart"}
  {updateTimeFrame}
  infoContent={"This chart shows various percentiles of the fees paid in blocks. " +
    text6Hrs}
  {isLive}
/>
