<script lang="ts">
  import BarComp from "./pages/comp/BarComp.svelte";
  import Blockchain from "./pages/comp/Blockchain.svelte";
  import PriceChart from "./pages/comp/PriceChart.svelte";
  import SubsidyChart from "./pages/comp/SubsidyChart.svelte";
</script>

<div class="grid grid-cols-2 w-full gap-4 chain-chart-grid p-4">
  <div class="col-span-2 overflow-x-scroll blockchain-scroll">
    <!-- <Blockchain /> -->
  </div>
  <div class="lg:col-span-1 col-span-2 lg:pr-0 h-full">
    <PriceChart />
  </div>
  <div class="lg:col-span-1 col-span-2 lg:pr-0 h-full">
    <!-- <SubsidyChart /> -->
  </div>
  <div class="lg:col-span-1 col-span-2 flex h-full flex-col">
    <BarComp />
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

  .chain-chart-grid {
    grid-template-rows: 1fr 2fr;
  }
</style>
