<script>
  import Chartist from "chartist";
  import { onMount } from "svelte";

  onMount(() => {
    var data = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      series: [{ name: "1", data: [5, 2, 4, 2, 0] }],
    };

    var options = {
      series: {
        "1": {
          showPoint: false,
        },
      },
    };

    setTimeout(() => {
      new Chartist.Line(".ct-chart", data, options);
    }, 300);
  });
</script>

<div
  class=" bg-gray-900 rounded-md w-full h-full shadow-2xl items-center flex flex-col justify-center"
>
  <div class="text-lg p-2"><p>Price Distribution</p></div>
  <div class="ct-chart p-2 w-full h-full" />
</div>
