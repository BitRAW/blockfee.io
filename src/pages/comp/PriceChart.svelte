<script lang="ts">
  import ChartTemplate from './ChartTemplate.svelte';

  const chartId = 'feeprice-chart';
  const tables = [
    'avg_fee',
    'max_fee',
    'perc_75',
    'median_fee',
    'perc_25',
    'min_fee',
  ];

  const lines = tables;

  const chartUnit = 'sat/vB';

  const chartTitle = 'Fee Insight';
  const popupInfo =
    'Per-block distribution of transaction fee rates in sat/vbyte.';

  const labelsMap = {
    avg_fee: 'Average Fee',
    max_fee: 'Max Fee',
    perc_75: '75th Percentile',
    median_fee: 'Median Fee',
    perc_25: '25th Percentile',
    min_fee: 'Min Fee',
  };
  const colorMap = {
    avg_fee: 'rgba(75, 192, 192, 1)',
    max_fee: 'rgba(193, 69, 12, 1)',
    perc_75: 'rgba(193, 175, 12, 1)',
    median_fee: 'rgba(166, 193, 12, 1)',
    perc_25: 'rgba(63, 193, 12, 1)',
    min_fee: 'rgba(12, 193, 98, 1)',
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
