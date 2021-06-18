<script lang="ts">
  import type {BlockInfo} from '../../objects/BlockInfo';

  import {blockCache} from '../../stores';
  import SimpleBlock from './SimpleBlock.svelte';
  import {onMount} from 'svelte';

  const currentScroll = 20;
  const items: Array<BlockInfo> = $blockCache.slice(0, currentScroll).reverse();

  onMount(() => {
    const elem = document.getElementById('blockchain-scroll');
    elem.scrollLeft = elem.scrollWidth;
  });
</script>

<div
  class="col-span-2 overflow-x-scroll blockchain-scroll"
  id="blockchain-scroll"
>
  <div class="flex py-2">
    <div />
    {#each items as item,i}
      <div class="pl-5 relative">
        {#if i === items.length-1}
        <div class="absolute bg-red-700 text-xs font-bold p-2 rounded-full right-0 z-10 shadow-md -mt-2 -mr-2">latest</div> 
        {/if}
        <SimpleBlock {item} />
      </div>
    {/each}
  </div>
</div>

<style>
  .blockchain-scroll::-webkit-scrollbar {
    height: 0.8em;
    padding: 1em;
  }

  .blockchain-scroll::-webkit-scrollbar-track {
    margin: 1em;
    border-radius: 1em;
    background: "transparent";
  }

  .blockchain-scroll::-webkit-scrollbar-thumb {
    background: rgba(24, 24, 27);
    border-radius: 1em;
  }

  .blockchain-scroll::-webkit-scrollbar-thumb:hover {
    background: rgb(26, 26, 26);
  }

  .blockchain-scroll::-webkit-scrollbar-thumb:active {
    background: rgb(31, 31, 31);
  }
</style>
