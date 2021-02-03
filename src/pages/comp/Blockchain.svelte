<script>
  import Block from "./Block.svelte";

  import lottie from "lottie-web";
  import { onMount } from "svelte";
  onMount(() => {
    lottie.loadAnimation({
      container: document.getElementById("block-loading"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "../trail-circle.json",
    });
  });
  let items = [1, 2, 4, 5, 11, 1, 1, 1, 1, 1];
</script>

<div class="flex py-10 mb-4">
  <div class="px-10">
    <Block isLastBlock={true} />
  </div>
  {#each items as item}
    <div class="px-10">
      <Block />
    </div>
  {/each}
  <div class="px-10">
    <Block isLastBlock={true} />
  </div>
</div>
