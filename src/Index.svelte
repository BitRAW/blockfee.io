<script>
  import Blockchain from "./pages/comp/Blockchain.svelte";
  import PriceChart from "./pages/comp/PriceChart.svelte";
</script>

<div class="grid grid-cols-2 w-full gap-4 chain-chart-grid">
  <div class="col-span-2 overflow-x-scroll blockchain-scroll">
    <Blockchain />
  </div>
  <div class="lg:col-span-1 col-span-2 p-4 pr-0">
    <PriceChart />
  </div>
  <div class="flex h-full flex-wrap gap-4 p-4 pl-0">
    <div
      class="bg-gray-900 flex-grow w-full rounded-md shadow-2xl p-2 flex justify-center"
    >
      <div class="text-lg"><p>Metric 1</p></div>
    </div>
    <div
      class="bg-gray-900 flex-grow w-full rounded-md shadow-2xl p-2 flex justify-center"
    >
      <div class="text-lg"><p>Metric 2</p></div>
    </div>
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
