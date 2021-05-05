<script lang="ts">
  import { onMount } from "svelte";

  import type { BlockInfo } from "../objects/BlockInfo";
  import { blockCache } from "../stores";

  export let params = {};
  let block: BlockInfo;
  getBlock();
  function getBlock() {
    block = getBlockFromCache(params.id);
    console.log(block);
    if (!block) block = getBlockFromAPI(params.id);
  }

  function getBlockFromCache(id: number) {
    return $blockCache.filter((item) => {
      return item.block_nr == id;
    })[0];
  }
  function getBlockFromAPI(id: number) {
    return getBlockFromCache(id);
  }
</script>

<div class="h-full w-full flex justify-center start">
  <div
    class="w-1/3 border-gray-200 border-2 border-dashed rounded-lg flex-col justify-start"
  >
    <div
      class="p-2 border-b border-dashed font-bold text-lg w-full text-center"
    >
      #{block.block_nr}
    </div>
    <div>content</div>
  </div>
</div>
