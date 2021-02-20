<script>
  import Chartist from "chartist";
  import { onMount } from "svelte";

  import { createPopper } from "@popperjs/core";
  import TimeFrameSelector from "./TimeFrameSelector.svelte";
  let showInfo = false;
  let hasLoaded = false;
  onMount(() => {
    setTimeout(() => {
      hasLoaded = true;
      setTimeout(() => {
        const button = document.querySelector("#chart-info");
        const tooltip = document.querySelector("#chart-info-popper");

        createPopper(button, tooltip, {
          placement: "bottom",
        });

        let chart = new Chartist.Line(".ct-chart", data, options);
        chart.on("draw", function (data) {
          if (data.type === "line" || data.type === "area") {
            data.element.animate({
              d: {
                begin: 200 * data.index,
                dur: 1000,
                from: data.path
                  .clone()
                  .scale(1, 0)
                  .translate(0, data.chartRect.height() + 15)
                  .stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint,
              },
            });
          }
        });
      }, 50);
    }, 2000);

    var data = {
      labels: ["698694", "698695", "698696", "698697", "698698", "698699"],
      series: [
        { name: "max", data: [303, 345, 600, 340, 200, 305] },
        { name: "75", data: [200, 250, 320, 210, 190, 205] },
        { name: "median", data: [100, 120, 104, 107, 99, 130] },
        { name: "25", data: [60, 40, 90, 95, 20, 50] },
        { name: "min", data: [40, 20, 60, 88, 8, 30] },
      ],
    };

    var options = {
      series: {
        median: {
          showPoint: false,
          showArea: true,
        },
        max: {
          showPoint: false,
          showArea: true,
        },
        min: {
          showPoint: false,
          showArea: true,
        },
        "75": {
          showPoint: false,
          showArea: true,
        },
        "25": {
          showPoint: false,
          showArea: true,
        },
      },
      fullWidth: true,
      axisX: {
        labelInterpolationFnc: function (value, index) {
          return index % 4 === 0 ? value : null;
        },
      },
    };
  });
</script>

<div
  class=" bg-gray-900 rounded-md w-full h-full p-2 shadow-2xl items-center flex flex-col justify-center"
>
  {#if hasLoaded}
    <div
      class=" p-2  flex justify-between flex-grow w-full flex-wrap items-center gap-y-4"
    >
      <p class="text-lg font-bold order-1">Price Distribution</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-9 p-2 cursor-pointer order-3 lg:order-2"
        id="chart-info"
        on:click={() => (showInfo = !showInfo)}
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div
        class:opacity-0={!showInfo}
        class:opacity-100={showInfo}
        class="bg-gray-800 p-4 rounded-lg block"
        role="tooltip"
        id="chart-info-popper"
      >
        <ul class="text-sm cursor-default">
          <li class="flex items-center gap-1">
            <div
              class="transition ease-in-out h-4 w-4 rounded-md bg bg-stroke1"
            />
            <p>Min</p>
          </li>
          <li class="flex items-center gap-1">
            <div class="h-4 w-4 rounded-md bg bg-stroke2" />
            <p>25th</p>
          </li>
          <li class="flex items-center gap-1">
            <div class="h-4 w-4 rounded-md bg bg-stroke3" />
            <p>Median</p>
          </li>
          <li class="flex items-center gap-1">
            <div class="h-4 w-4 rounded-md bg bg-stroke4" />
            <p>75th</p>
          </li>
          <li class="flex items-center gap-1">
            <div class="h-4 w-4 rounded-md bg bg-stroke5" />
            <p>Max</p>
          </li>
        </ul>
        <div id="arrow" data-popper-arrow />
      </div>
      <div class="order-2 lg:order-3">
        <TimeFrameSelector />
      </div>
    </div>
    <p class="self-start pl-5">sat/vB</p>
    <div class=" w-full h-full flex items-center">
      <div class="ct-chart w-full h-full" />
    </div>
  {:else}
    <div>
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  {/if}
</div>

<style>
  #arrow,
  #arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: -1;
  }

  #arrow::before {
    content: "";
    transform: rotate(45deg);
    background: rgb(39, 39, 42);
  }

  #chart-info-popper > #arrow {
    top: -4px;
  }
</style>
