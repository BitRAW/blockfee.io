<script lang="ts">
  import lottie from "lottie-web";
  import { onMount } from "svelte";

  import Blockchain from "./pages/comp/Blockchain.svelte";
  import PriceChart from "./pages/comp/PriceChart.svelte";
  import SubsidyChart from "./pages/comp/SubsidyChart.svelte";
  import VolatilityChart from "./pages/comp/VolatilityChart.svelte";
  import { blockCache } from "./stores";

  let rainbow;
  onMount(() => {
    rainbow = lottie.loadAnimation({
      container: document.getElementById("rainbow-loading"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "../img/leftright-rainbow.json",
    });
  });
</script>

{#if $blockCache.length > 0}
  <div class="grid grid-cols-2 w-full gap-4 chain-chart-grid p-4">
    <Blockchain />
    <div class="lg:col-span-1 col-span-2 lg:pr-0 h-full">
      <PriceChart />
    </div>
    <div class="lg:col-span-1 col-span-2 lg:pr-0 h-full">
      <SubsidyChart />
    </div>
    <div class="lg:col-span-1 col-span-2 flex h-full flex-col">
      <VolatilityChart />
    </div>
  </div>
{:else}
  <div class="w-full h-full flex items-center justify-center">
    <div class="w-50 h-50" id="rainbow-loading" />
  </div>
{/if}

<style>
  .chain-chart-grid {
    grid-template-rows: 1fr;
  }
</style>
