<script lang="ts">
  import { link } from "svelte-spa-router";
  import { blockCache } from "../stores";
  import BlockBig from "./comp/BlockBig.svelte";

  export let params = {};
  let reload = true;
  $: block = getBlock(params.id);

  function getBlock(blockId) {
    reload = false;
    block = getBlockFromCache(blockId);
    if (!block) block = getBlockFromAPI(blockId);
    setTimeout(() => {
      reload = true;
    }, 0);
    return block;
  }

  function getBlockFromCache(id: number) {
    if (!id) {
      console.log();
      return $blockCache[0];
    } else {
      return $blockCache.filter((item) => {
        return item.block_nr == id;
      })[0];
    }
  }
  function getBlockFromAPI(id: number) {
    //TODO: load block from api for real
    return getBlockFromCache($blockCache[0].block_nr);
  }
</script>

<div class="h-full w-full flex justify-center start items-center">
  <div class="h-full w-6">
    {#if block.block_nr < $blockCache[0].block_nr}
      <a
        href="/block/{block.block_nr + 1}"
        use:link
        on:click={() => (block = getBlock(block.block_nr + 1))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 hover:text-cyan-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
          />
        </svg>
      </a>
    {/if}
  </div>
  <div
    class="m-2 w-full lg:w-1/3 border-gray-200 border-2 border-dashed rounded-lg flex-col justify-start h-72"
  >
    {#if reload}
      <BlockBig {block} />
    {/if}
  </div>

  <a
    href="/block/{block.block_nr - 1}"
    use:link
    on:click={() => (block = getBlock(block.block_nr - 1))}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 hover:text-cyan-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </a>
</div>
