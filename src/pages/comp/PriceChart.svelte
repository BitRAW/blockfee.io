<script>
  import Chartist from "chartist";
  import { onMount } from "svelte";
  import { createPopper } from "@popperjs/core";
  import TimeFrameSelector from "./TimeFrameSelector.svelte";

  let showInfo = true;

  onMount(() => {
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
              dur: 2000,
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
    }, 400);
  });
</script>

<div
  class=" bg-gray-900 rounded-md w-full h-full p-2 shadow-2xl items-center flex flex-col justify-center"
>
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
      class:hidden={!showInfo}
      class:block={showInfo}
      class="bg-gray-800 p-4 rounded-lg mt-5 block"
      role="tooltip"
      id="chart-info-popper"
    >
      <ul class="text-sm">
        <li class="flex items-center gap-1">
          <div class="h-4 w-4 rounded-md bg bg-stroke1" />
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
  <div class=" w-full h-full flex items-center">
    <div class="ct-chart w-full h-full" />
  </div>
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
