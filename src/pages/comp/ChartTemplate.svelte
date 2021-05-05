<script lang="ts">
  import { buildQuery, getDataURI } from "../../API/BitrawAPI";
  import Chart from "chart.js/auto";
  import dateFormat from "dateformat";
  import ChartCard from "./ChartCard.svelte";
  import { getOpacityForColor, timeFrameMap } from "../../util/chartUtils";
  import { text4Hrs } from "../../util/infoTextUtils";
  import { blockCache } from "../../stores";
  import type { BlockInfo } from "../../objects/BlockInfo";

  export let tables;
  export let lines;
  export let labelsMap;
  export let chartId;
  export let colorMap;
  export let chartUnit;
  export let dataManipulationFunction;
  export let chartTitle;
  export let popupInfo;
  export let isFill;

  let hasLoaded = false;
  var feepriceChart;
  let isLive;

  let chartData = {
    labels: [],
    datasets: [],
  };

  async function loadChartData(uri) {
    const response = await fetch(uri);
    const data = await response.json();
    data.dataset.reverse();
    buildChartData(data.dataset);
  }

  function loadFromStore() {
    let data = $blockCache
      .slice(0, 24)
      .reverse()
      .map((item: BlockInfo) => {
        let values = [];
        values.push(item["ts"]);
        tables.forEach((element) => {
          if (element === "blocks") {
            element = "block_nr";
          }
          values.push(item[element]);
        });
        return values;
      });
    buildChartData(data);
  }

  function buildChartData(data) {
    hasLoaded = true;
    let hasSetTimestamps = false;
    data = dataManipulationFunction(data);

    for (let i = 1; i <= lines.length; i++) {
      const line = lines[i - 1];
      let dataSet = {
        label: labelsMap[line],
        data: [],
        fill: isFill,
        backgroundColor: getOpacityForColor(colorMap[line], "0.2"),
        borderColor: colorMap[line],
        tension: 0.2,
        borderDash: line === "avg_fee" ? [10, 10] : [0, 0],
        hidden: line === "max_fee" ? true : false,
      };
      data.forEach((element) => {
        if (!hasSetTimestamps) {
          let date = new Date(element[0]);
          chartData.labels.push(dateFormat(date, "dd.mm.yyyy HH:MM"));
        }
        dataSet.data.push(element[i]);
      });
      hasSetTimestamps = true;
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
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            align: "start",
            labels: {
              boxWidth: 25,
              boxHeight: 25,
            },
          },
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
                return `${context.dataset.label}: ${context.parsed.y}  ${chartUnit}`;
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
    var ctx = document.getElementById(chartId);
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

    const { format = "h", duration = 4, sample = undefined } = timeFrameMap[
      e.detail
    ];
    isLive = duration + format === "4h" ? true : false;
    let query = buildQuery(tables, format, duration, sample);
    let uri = getDataURI(query);
    if (isLive) {
      loadFromStore();
    } else {
      loadChartData(uri);
    }
  }
</script>

<ChartCard
  {chartTitle}
  {hasLoaded}
  {chartId}
  {updateTimeFrame}
  infoContent={popupInfo + text4Hrs}
  {isLive}
/>
