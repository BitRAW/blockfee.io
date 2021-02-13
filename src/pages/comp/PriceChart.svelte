<script>
  import Chartist from "chartist";
  import { onMount } from "svelte";
  import TimeFrameSelector from "./TimeFrameSelector.svelte";

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
    class="text-lg p-2 font-bold flex justify-between flex-grow w-full flex-wrap"
  >
    <p>Price Distribution</p>
    <div>
      <TimeFrameSelector />
    </div>
  </div>
  <div class=" w-full h-full flex  items-center">
    <div class="flex-col flex pl-2 ">
      <ul>
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
    </div>
    <div class="ct-chart w-full h-full" />
  </div>
</div>
