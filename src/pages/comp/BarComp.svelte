<script>
  import Chartist from "chartist";
  import dateFormat from "dateformat";

  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { getDataURI } from "../../API/BitrawAPI";
  import { getStandardDeviation } from "../../API/VolatilityAPI";
  import Loader from "./Loader.svelte";
  import TimeFrameSelector from "./TimeFrameSelector.svelte";

  let data;
  let hasLoaded = false;

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
      series: [{ name: "volatility", data: [] }],
    };
    let lookback = (data.length / 4).toFixed(0);
    let c = 0;
    data.forEach((datapoint) => {
      if (c >= lookback) {
        chartData.labels.push(datapoint[1]);
        let lookbackSet = data.slice(c - lookback, c);
        lookbackSet = lookbackSet.map((val) => {
          return val[0];
        });
        chartData.series[0].data.push(getStandardDeviation(lookbackSet));
      }
      c++;
    });
    let seriesOptions = {};
    seriesOptions["volatility"] = { showPoint: false, showArea: true };
    var options = {
      series: seriesOptions,
      fullWidth: true,
      axisX: {
        labelInterpolationFnc: function (value, index) {
          let labelSpace = (data.length / 4).toFixed(0);
          if (index % labelSpace === 0) {
            return dateFormat(value, "dd.mm.yyyy HH:MM");
          } else return null;
        },
      },
    };

    setTimeout(() => {
      let chart = new Chartist.Line(".ct-chart-volatility", chartData, options);
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
    let format = "h";
    let duration = "6";
    let sample = "10m";
    switch (e.detail) {
      case "1h":
        format = "h";
        duration = "1";
        sample = "10m";
        break;
      case "6h":
        format = "h";
        duration = "6";
        sample = "10m";
        break;
      case "24h":
        format = "d";
        duration = "1";
        sample = "10m";
        break;
      case "7d":
        format = "d";
        duration = "7";
        sample = "1h";
        break;
      case "30d":
        format = "d";
        duration = "30";
        sample = "1h";
        break;
      case "1y":
        format = "y";
        duration = "1";
        sample = "1d";
        break;

      default:
        break;
    }
    // let query = `SELECT avg(val), ts FROM median_fee WHERE ts > dateadd('${format}', - ${duration}, now()) SAMPLE BY 1h;`;
    // let query = `SELECT avg(val), ts FROM median_fee WHERE ts > dateadd('${format}', -${duration},  to_timestamp('2016-03-29T09:23:19', 'yyyy-MM-ddTHH:mm:ss')) SAMPLE BY ${sample};`;
    let query = `SELECT avg(val), ts FROM median_fee WHERE ts > dateadd('${format}', -${duration},  to_timestamp('2017-08-13T09:23:19', 'yyyy-MM-ddTHH:mm:ss')) AND ts < to_timestamp('2017-08-13T09:23:19', 'yyyy-MM-ddTHH:mm:ss') SAMPLE BY ${sample};`;

    let uri = getDataURI(query);
    loadData(uri);
  }
</script>

<div
  class="bg-gray-900 w-full h-full flex flex-col p-4 rounded-md shadow-lg justify-start pb-10"
>
  <div class="flex">
    <label for="transaction fees graph" class="font-bold w-full text-lg"
      >Volatility</label
    >
    <div class="">
      <TimeFrameSelector on:selectTime={updateTimeFrame} />
    </div>
  </div>
  <div class="flex justify-center justify-items-start pt-6">
    <div class="h-4 relative w-4/5 rounded-full overflow-hidden">
      <div class="w-full h-full bg-gray-200 absolute" />
      <div
        id="colat-bar"
        class="h-full w-0 absolute transition-all ease-out duration-1000  m-auto left-0 right-0"
        class:bg-stroke1={$tweenedStd > 0 && $tweenedStd <= 10}
        class:bg-stroke2={$tweenedStd > 10 && $tweenedStd <= 20}
        class:bg-stroke3={$tweenedStd > 20 && $tweenedStd <= 50}
        class:bg-stroke4={$tweenedStd > 50 && $tweenedStd <= 75}
        class:bg-stroke5={$tweenedStd > 75}
      />
      <div
        id="colat-bar"
        class="h-full w-1 bg-cyan-900 absolute m-auto left-0 right-0"
      />
    </div>
  </div>
  <div
    class="text-center text-5xl font-bold h-16 transition-colors duration-1000"
    class:text-stroke1={$tweenedStd > 0 && $tweenedStd <= 10}
    class:text-stroke2={$tweenedStd > 10 && $tweenedStd <= 20}
    class:text-stroke3={$tweenedStd > 20 && $tweenedStd <= 50}
    class:text-stroke4={$tweenedStd > 50 && $tweenedStd <= 75}
    class:text-stroke5={$tweenedStd > 75}
  >
    <div class="flex items-center justify-center flex-grow h-full">
      {#if hasLoaded}
        <p>
          {$tweenedStd.toFixed(2)} sat/vB
        </p>
      {:else}
        <Loader />
      {/if}
    </div>
  </div>
  <div class="ct-chart-volatility w-full h-full" />
</div>
