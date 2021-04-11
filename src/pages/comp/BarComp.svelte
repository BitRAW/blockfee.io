<script>
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { getDataURI } from "../../API/BitrawAPI";
  import { getStandardDeviation } from "../../API/VolatilityAPI";

  let data;
  let hasLoaded = false;
  let query = `SELECT val FROM median_fee ORDER BY ts desc LIMIT 100;`;
  let uri = getDataURI(query);

  const tweenedStd = tweened(0, {
    duration: 1000,
    easing: cubicOut,
  });

  async function loadData(uri) {
    const response = await fetch(uri);
    data = await response.json();
    data = data.dataset.map((datapoint) => {
      return datapoint[0];
    });
    showBar(getStandardDeviation(data));
  }

  function showBar(std) {
    hasLoaded = true;
    $tweenedStd = std;
    let percentage = std >= 100 ? 100 : std;
    let bar = document.getElementById("colat-bar");
    bar.classList.remove("w-0");
    bar.style.width = percentage + "%";
  }
  onMount(() => {
    loadData(uri);
  });
</script>

<div
  class="bg-gray-900 w-full h-full flex flex-col rounded-md shadow-lg justify-start pb-10"
>
  <label for="transaction fees graph" class="font-bold pt-2 w-full text-center"
    >Volatility</label
  >
  <div class="flex justify-center justify-items-start pt-3">
    <div class="h-4 relative w-1/2 rounded-full overflow-hidden">
      <div class="w-full h-full bg-gray-200 absolute" />
      <div
        id="colat-bar"
        class="h-full w-0 absolute transition-all ease-out duration-1000  m-auto left-0 right-0"
        class:bg-stroke1={$tweenedStd > 0 && $tweenedStd <= 3}
        class:bg-stroke2={$tweenedStd > 3 && $tweenedStd <= 6}
        class:bg-stroke3={$tweenedStd > 6 && $tweenedStd <= 9}
        class:bg-stroke4={$tweenedStd > 9}
      />
      <div
        id="colat-bar"
        class="h-full w-1 bg-cyan-900 absolute m-auto left-0 right-0"
      />
    </div>
  </div>
  <div
    class="text-center text-5xl font-bold h-16 transition-colors duration-1000"
    class:text-stroke1={$tweenedStd > 0 && $tweenedStd <= 3}
    class:text-stroke2={$tweenedStd > 3 && $tweenedStd <= 6}
    class:text-stroke3={$tweenedStd > 6 && $tweenedStd <= 9}
    class:text-stroke4={$tweenedStd > 9}
  >
    <div class="flex items-center justify-center flex-grow h-full">
      {#if hasLoaded}
        <p>
          {$tweenedStd.toFixed(2)} sat/vB
        </p>
      {:else}
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
      {/if}
    </div>
  </div>
</div>
