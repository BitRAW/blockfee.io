<script lang="ts">
  import {generateId} from '../../util/randomUtils';

  import Loader from './Loader.svelte';
  import TimeFrameSelector from './TimeFrameSelector.svelte';
  import Tippy from '../helper-comp/Tippy.svelte';

  const infoId = 'info-' + generateId(10);

  export let updateTimeFrame;
  export let chartTitle;
  export let hasLoaded;
  export let chartId;
  export let infoContent;
  export let isLive;
</script>

<div
  class=" bg-gray-900 rounded-md w-full h-full p-2 shadow-2xl items-center flex flex-col justify-center"
>
  <div class="flex justify-between w-full items-start">
    <div class="flex-col lg:flex justify-between flex-grow w-full p-2">
      <p class="text-lg font-bold flex gap-4 items-center w-full">
        {chartTitle}
        {#if !hasLoaded}
          <Loader />
        {/if}
      </p>

      <div>
        <TimeFrameSelector on:selectTime={updateTimeFrame} />
      </div>
    </div>
    <div class="w-full font-bold text-red-600 pt-2">
      {#if isLive}
        <div class="flex items-center gap-2">
          <div class="inline-flex absolute w-2 h-2 rounded-full bg-red-600" />
          <div
            class="inline-flex w-2 h-2 rounded-full animate-ping bg-red-600"
          />
          <p>Live</p>
        </div>
      {/if}
    </div>
    <div class="pr-10 pt-2">
      <div id={infoId}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 hover:text-cyan-500 transition-colors ease-in-out cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  </div>

  <Tippy elementId={infoId} content={infoContent} />

  <div class=" w-full lg:h-full  h-72 flex items-center">
    <canvas class="w-full lg:h-full  h-72" id={chartId} />
  </div>
</div>
