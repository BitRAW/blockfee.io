<script lang="ts">
  import { blockCache } from "../../stores";
  import type { BlockInfo } from "../../objects/BlockInfo";
  import SimpleBlock from "./SimpleBlock.svelte";

  let items: Array<BlockInfo> = $blockCache;
  $: maxFee = 0;
  $: items.forEach((item) => {
    maxFee = maxFee < item.perc_75 ? item.perc_75 : maxFee;
  });
</script>

<div class="flex py-10 mb-4">
  <div class="">
    <!-- <Block isLastBlock={true} item={{}} /> -->
  </div>
  {#each items as item}
    <div class="px-10">
      <SimpleBlock {item} {maxFee} />
      <!-- <Block {item} /> -->
    </div>
  {/each}
  <div class="px-10">
    <!-- <Block isLastBlock={true} item={{}} /> -->
  </div>
</div>
