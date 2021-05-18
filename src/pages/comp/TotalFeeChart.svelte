<script lang="ts">
  import ChartTemplate from './ChartTemplate.svelte';

  const chartId = 'totalfee-chart';
  const tables = ['total_fee'];

  const lines = tables;

  const chartUnit = 'sat';

  const chartTitle = 'Total Fees';
  const popupInfo = 'This chart shows the total fees per block.';

  const labelsMap = {
    total_fee: 'Total Fees',
  };
  const colorMap = {
    total_fee: 'rgba(75, 192, 192, 1)',
  };

  const isFill = false;

  function dataManipulationFunction(data) {
    return data;
  }
</script>

<ChartTemplate
  {tables}
  {lines}
  {labelsMap}
  {colorMap}
  {chartId}
  {chartUnit}
  {chartTitle}
  {popupInfo}
  {isFill}
  {dataManipulationFunction}
/>
