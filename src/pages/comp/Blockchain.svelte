<script>
  import Block from "./Block.svelte";
  import { getDataURI } from "../../API/BitrawAPI";
  import lottie from "lottie-web";
  import { onMount } from "svelte";

  onMount(() => {
    lottie.loadAnimation({
      container: document.getElementById("block-loading"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "../img/trail-circle.json",
    });
  });
  let items = [];

  fetchBlocks();
  async function fetchBlocks() {
    let uri = getDataURI(
      "SELECT blocks.ts as ts, block_nr, max_fee.val as max_fee, perc_75.val as perc_75, median_fee.val as median_fee, perc_25.val as perc_25, min_fee.val as min_fee FROM blocks JOIN max_fee ON (ts) JOIN perc_75 ON (ts) JOIN median_fee ON (ts) JOIN perc_25 ON (ts) JOIN min_fee ON (ts) order By ts desc limit 20"
    );
    let request = await fetch(uri);
    let data = await request.json();
    items = data.dataset;
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
