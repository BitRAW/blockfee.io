<script lang="ts">
  import type { BlockInfo } from "../../objects/BlockInfo";
  import { highest75percVal } from "../../stores";
  import TinyBar from "./TinyBar.svelte";

  export let item: BlockInfo;

  let percentage25 = (item.perc_25 / $highest75percVal) * 100;
  let percentageMedian = (item.median_fee / $highest75percVal) * 100;
  let percentage75 = (item.perc_75 / $highest75percVal) * 100;
  let percentageAvg = (item.avg_fee / $highest75percVal) * 100;
</script>

<div class="p-1 w-40 h-40 rounded-lg border-dashed border-gray-200 border-2">
  <div class="w-full h-full flex-col items-center">
    <div class="w-full flex justify-center">
      <a href="#/block/{item.block_nr}" class="font-bold underline"
        >#{item.block_nr}</a
      >
    </div>
    <div class="grid grid-cols-1 gap-1 flex-grow pt-1">
      <TinyBar
        percentage={percentage25}
        colorClass={"stroke2"}
        value={item.perc_25}
        tooltip={"25th Percentile"}
      />
      <TinyBar
        percentage={percentageMedian}
        colorClass={"stroke3"}
        value={item.median_fee}
        tooltip={"Median Fee"}
      />
      <TinyBar
        percentage={percentage75}
        colorClass={"stroke4"}
        value={item.perc_75}
        tooltip={"75th Percentile"}
      />
      <TinyBar
        percentage={percentageAvg}
        colorClass={"cyan-500"}
        value={item.avg_fee}
        tooltip={"Average Fee"}
      />
    </div>
  </div>
</div>
