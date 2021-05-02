<script lang="ts">
  import Block from "./Block.svelte";
  import { blockCache } from "../../stores";

  let items = [];

  fetchBlocks();
  async function fetchBlocks() {
    let items = $blockCache;
  }
</script>

<div class="flex py-10 mb-4">
  <div class="px-10">
    <Block isLastBlock={true} item={{}} />
  </div>
  {#each items as item}
    <div class="px-10">
      <Block {item} />
    </div>
  {/each}
  <div class="px-10">
    <Block isLastBlock={true} item={{}} />
  </div>
</div>
