<script>
  import Loader from "./Loader.svelte";
  import TimeFrameSelector from "./TimeFrameSelector.svelte";

  export let updateTimeFrame;
  export let title;
  export let hasLoaded;
  export let chartId;
</script>

<div
  class=" bg-gray-900 rounded-md w-full h-full p-2 shadow-2xl items-center flex flex-col justify-center"
>
  <div class="flex-col lg:flex justify-between flex-grow w-full p-2 gap-2">
    <p class="text-lg font-bold flex gap-4 items-center w-full">
      {title}
      {#if !hasLoaded}
        <Loader />
      {/if}
    </p>

    <div>
      <TimeFrameSelector on:selectTime={updateTimeFrame} />
    </div>
  </div>

  <div class=" w-full h-full flex items-center">
    <canvas class="w-full h-full" id={chartId} />
  </div>
</div>
