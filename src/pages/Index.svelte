<script lang="ts">
  import Blockchain from './comp/Blockchain.svelte';
  import PriceChart from './comp/PriceChart.svelte';
  import SubsidyChart from './comp/SubsidyChart.svelte';
  import TotalFeeChart from './comp/TotalFeeChart.svelte';
</script>

<div class="grid grid-cols-2 w-full gap-4 chain-chart-grid p-4">
  <Blockchain />
  <div class="col-span-2 lg:pr-0">
    <PriceChart />
  </div>
  <div class="lg:col-span-1 col-span-2 lg:pr-0 h-full">
    <SubsidyChart />
  </div>
  <div class="lg:col-span-1 col-span-2 flex h-full">
    <TotalFeeChart />
  </div>
</div>

<style>
  .chain-chart-grid {
    grid-template-rows: 1fr,1fr,1fr,1fr;
  }
</style>
