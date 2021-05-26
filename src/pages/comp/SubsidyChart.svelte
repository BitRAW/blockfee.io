<script lang="ts">
  import {calculateBlockSubsidyRatio} from '../../API/BTCAPI';
import {BlockInfo} from '../../objects/BlockInfo';
  import ChartTemplate from './ChartTemplate.svelte';

  const lines = ['subsidy'];
  const resource = 'block/list';
  const labelsMap = {
    subsidy: 'Subsidy',
  };
  const colorMap = {
    subsidy: 'rgba(75, 192, 192, 1)',
  };

  const chartId = 'subsidy-chart';

  const chartUnit = '%';

  const chartTitle = 'Block Subsidy';
  const popupInfo =
    'Composition of block rewards for miners: Percentage of block subsidy (vs. transaction fees).';

  function dataManipulationFunction(data) {
    const newData = data.map((element) => {
      element.subsidy = calculateBlockSubsidyRatio(element.block_nr, element.total_fee) * 100;
      return element;
    });
    return newData;
  }

  const isFill = true;
</script>

<ChartTemplate
  {resource}
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
