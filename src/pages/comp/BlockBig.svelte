<script lang="ts">
  import type {BlockInfo} from '../../objects/BlockInfo';

  import {highest75percVal} from '../../stores';
  import TinyBar from './TinyBar.svelte';

  export let block: BlockInfo;
  $: percentageMin = (block.min_fee / $highest75percVal) * 100;
  $: percentage10 = (block.perc_10 / $highest75percVal) * 100;
  $: percentage25 = (block.perc_25 / $highest75percVal) * 100;
  $: percentageMedian = (block.median_fee / $highest75percVal) * 100;
  $: percentage75 = (block.perc_75 / $highest75percVal) * 100;
  $: percentage90 = (block.perc_90 / $highest75percVal) * 100;
  $: percentageAvg = (block.avg_fee / $highest75percVal) * 100;
  $: percentageMax = 100;
  $: unit = 'sat/vB';
</script>

<div 
class="bg-gray-900 rounded-md w-full h-full p-2 shadow-2xl"
>
  <p class="text-center font-bold text-lg">
    #{block.block}
  </p>
  <p class="font-bold">Fee percentiles:</p>
  <div class="grid grid-cols-4 gap-2 items-center">
    <div>Max Fee</div>
    <div class="col-span-3">
      <TinyBar
        percentage={percentageMax}
        colorClass={'stroke5'}
        value={block.max_fee}
        tooltip={'Max Fee'}
        {unit}
      />
    </div>
    
    <div>90th Percentile</div>
    <div class="col-span-3">
      <TinyBar
        percentage={percentage90}
        colorClass={'gray2'}
        value={block.perc_90}
        tooltip={'90th Percentile'}
        {unit}
      />
    </div>
    <div>75th Percentile</div>
    <div class="col-span-3">
      <TinyBar
        percentage={percentage75}
        colorClass={'stroke4'}
        value={block.perc_75}
        tooltip={'75th Percentile'}
        {unit}
      />
    </div>
    <div>Median Fee</div>
    <div class="col-span-3">
      <TinyBar
        percentage={percentageMedian}
        colorClass={'stroke3'}
        value={block.median_fee}
        tooltip={'Median Fee'}
        {unit}
      />
    </div>
    <div>25th Percentile</div>
    <div class="col-span-3">
      <TinyBar
        percentage={percentage25}
        colorClass={'stroke2'}
        value={block.perc_25}
        tooltip={'25th Percentile'}
        {unit}
      />
    </div>
    <div>10th Percentile</div>
    <div class="col-span-3">
      <TinyBar
        percentage={percentage10}
        colorClass={'gray2'}
        value={block.perc_10}
        tooltip={'10th Percentile'}
        {unit}
      />
    </div>
    <div>Min Fee</div>
    <div class="col-span-3">
      <TinyBar
        percentage={percentageMin}
        colorClass={'stroke2'}
        value={block.min_fee}
        tooltip={'Min Fee'}
        {unit}
      />
    </div>

    <div>Average Fee</div>
    <div class="col-span-3">
      <TinyBar
        percentage={percentageAvg}
        colorClass={'cyan-500'}
        value={block.avg_fee}
        tooltip={'Average Fee'}
        {unit}
      />
    </div>
  </div>
</div>
