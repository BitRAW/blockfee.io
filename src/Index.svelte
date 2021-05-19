<script lang="ts">
  import Blockchain from './pages/comp/Blockchain.svelte';
  import PriceChart from './pages/comp/PriceChart.svelte';
  import SubsidyChart from './pages/comp/SubsidyChart.svelte';
  import TotalFeeChart from './pages/comp/TotalFeeChart.svelte';
</script>

<div class="grid grid-cols-2 w-full gap-4 chain-chart-grid p-4">
  <Blockchain />
  <div class="lg:col-span-1 col-span-2 lg:pr-0 h-full">
    <PriceChart />
  </div>
  <div class="lg:col-span-1 col-span-2 lg:pr-0 h-full">
    <SubsidyChart />
  </div>
  <div class="lg:col-span-1 col-span-2 flex h-full flex-col">
    <!-- <VolatilityChart /> -->
    <TotalFeeChart />
  </div>
</div>

<style>
  .chain-chart-grid {
    grid-template-rows: 1fr;
  }
</style>
