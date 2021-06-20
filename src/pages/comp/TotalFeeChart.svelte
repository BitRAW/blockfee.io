<script lang="ts">
  import ChartTemplate from './ChartTemplate.svelte';

  import type {BlockInfo} from '../../objects/BlockInfo';

  interface TotalFeeBlockInfo extends BlockInfo {
    total_fee_btc: string;
  }

  const chartId = 'totalfee-chart';
  const resource = 'block/list';

  const lines = ['total_fee_btc'];

  const hiddenLines =[];
  const chartUnit = 'BTC';

  const chartTitle = 'Total Fees';
  const popupInfo = 'This chart shows the total fees per block.';

  const labelsMap = {
    total_fee_btc: 'Total Fees',
  };
  const colorMap = {
    total_fee_btc: 'rgba(75, 192, 192, 1)',
  };

  const isFill = false;

  function dataManipulationFunction(data: Array<BlockInfo>) {
    return data.map((block: TotalFeeBlockInfo)=> {
      block.total_fee_btc = (block.total_fee/100000000).toFixed(8);
      return block;
    });
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
