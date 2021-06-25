<script lang="ts">
  import ChartTemplate from './ChartTemplate.svelte';

  const chartId = 'feeprice-chart';
  const resource = 'block/list';
  const lines = [
    'avg_fee',
    'max_fee',
    'perc_90',
    'perc_75',
    'median_fee',
    'perc_25',
    'perc_10',
    'min_fee',
  ];

  const hiddenLines = [
    'Max Fee',
    '90th Percentile',
    '10th Percentile',
  ];

  const chartUnit = 'sat/vB';

  const chartTitle = 'Fee Insight';
  const popupInfo =
    'Per-block distribution of transaction fee rates in sat/vByte.';

  const labelsMap = {
    avg_fee: 'Average Fee',
    max_fee: 'Max Fee',
    perc_90: '90th Percentile',
    perc_75: '75th Percentile',
    median_fee: 'Median Fee',
    perc_25: '25th Percentile',
    perc_10: '10th Percentile',
    min_fee: 'Min Fee',
  };
  const colorMap = {
    avg_fee: 'rgba(75, 192, 192, 1)',
    max_fee: 'rgba(193, 69, 12, 1)',
    perc_90: 'rgba(228, 233, 237, 1)',
    perc_75: 'rgba(193, 175, 12, 1)',
    median_fee: 'rgba(166, 193, 12, 1)',
    perc_25: 'rgba(63, 193, 12, 1)',
    perc_10: 'rgba(171, 183, 183, 1)',
    min_fee: 'rgba(12, 193, 98, 1)',
  };

  const isFill = false;

  function dataManipulationFunction(data) {
    return data;
  }
</script>

<ChartTemplate
  {resource}
  {lines}
  {hiddenLines}
  {labelsMap}
  {colorMap}
  {chartId}
  {chartUnit}
  {chartTitle}
  {popupInfo}
  {isFill}
  {dataManipulationFunction}
/>
