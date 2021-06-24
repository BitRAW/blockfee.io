<script lang="ts">
  import {calculateBlockSubsidyRatio} from '../../API/BTCAPI';
  import ChartTemplate from './ChartTemplate.svelte';
  
  import type {BlockInfo} from '../../objects/BlockInfo';
  
  interface SubsidyBlockInfo extends BlockInfo {
    subsidy: string;
  }

  const lines = ['subsidy'];
  const hiddenLines = [];
  const resource = 'block/list';
  const labelsMap = {
    subsidy: 'Subsidy',
  };
  const colorMap = {
    subsidy: 'rgba(75, 192, 192, 1)',
  };

  const chartId = 'subsidy-chart';

  const chartUnit = '%';

  const chartTitle = 'Block Subsidy Percentage';
  const popupInfo =
    'Composition of block rewards for miners: Percentage of block subsidy (vs. transaction fees).';

  function dataManipulationFunction(data: Array<BlockInfo>) {
    return data.map((element: SubsidyBlockInfo) => {
      element.subsidy = (calculateBlockSubsidyRatio(element.block, element.total_fee) * 100).toFixed(2);
      return element;
    });
  }

  const isFill = true;
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
