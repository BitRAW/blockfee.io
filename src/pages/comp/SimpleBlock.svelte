<script lang="ts">
  import type {BlockInfo} from '../../objects/BlockInfo';
  import {highest75percVal} from '../../stores';
  import TinyBar from './TinyBar.svelte';

  export let item: BlockInfo;

  const percentage25 = (item.perc_25 / $highest75percVal) * 100;
  const percentageMedian = (item.median_fee / $highest75percVal) * 100;
  const percentage75 = (item.perc_75 / $highest75percVal) * 100;
  const percentageAvg = (item.avg_fee / $highest75percVal) * 100;

  const unit = 'sat/vB';
</script>

<div 
class="bg-gray-900 rounded-md w-40 h-40 p-2 shadow-md"

>
  <div class="w-full h-full flex-col items-center">
    <div class="w-full flex justify-center pb-2">
      <a href="#/block/{item.block}" class="font-bold underline"
        >#{item.block}</a
      >
    </div>
    <div class="grid grid-cols-1 gap-1 flex-grow pt-1">
      <TinyBar
        percentage={percentage75}
        colorClass={'stroke4'}
        value={item.perc_75}
        tooltip={'75th Percentile'}
        {unit}
      />
      <TinyBar
        percentage={percentageMedian}
        colorClass={'stroke3'}
        value={item.median_fee}
        tooltip={'Median Fee'}
        {unit}
      />
      <TinyBar
        percentage={percentage25}
        colorClass={'stroke2'}
        value={item.perc_25}
        tooltip={'25th Percentile'}
        {unit}
      />
      <TinyBar
        percentage={percentageAvg}
        colorClass={'cyan-500'}
        value={item.avg_fee}
        tooltip={'Average Fee'}
        {unit}
      />
    </div>
  </div>
</div>
