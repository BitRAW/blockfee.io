<script lang="ts">
  import { blockCache } from "../../stores";
  import type { BlockInfo } from "../../objects/BlockInfo";
  import SimpleBlock from "./SimpleBlock.svelte";
import { onMount } from "svelte";

  let currentScroll = 10;
  let items: Array<BlockInfo> = $blockCache.slice(0, currentScroll).reverse();
  onMount(()=>{
    var elem = document.getElementById('blockchain-scroll');
    elem.scrollLeft = elem.scrollWidth;
  })
</script>

<div
  class="col-span-2 overflow-x-scroll blockchain-scroll"
  id="blockchain-scroll"
>
  <div class="flex py-10 mb-4">
    <div class="" />
    {#each items as item}
      <div class="px-10">
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
    background: rgb(59, 59, 59);
    border-radius: 1em;
  }

  .blockchain-scroll::-webkit-scrollbar-thumb:hover {
    background: rgb(46, 46, 46);
  }

  .blockchain-scroll::-webkit-scrollbar-thumb:active {
    background: rgb(41, 41, 41);
  }
</style>
