<script lang="ts">
  import { link } from "svelte-spa-router";
  import type { BlockInfo } from "../../objects/BlockInfo";
  import TinyBar from "./TinyBar.svelte";

  export let item: BlockInfo;
  export let maxFee: number;
  let percentage25 = (item.perc_25 / maxFee) * 100;
  let percentageMedian = (item.median_fee / maxFee) * 100;
  let percentage75 = (item.perc_75 / maxFee) * 100;
  let percentageAvg = (item.avg_fee / maxFee) * 100;
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
      />
      <TinyBar
        percentage={percentageMedian}
        colorClass={"stroke3"}
        value={item.median_fee}
      />
      <TinyBar
        percentage={percentage75}
        colorClass={"stroke4"}
        value={item.perc_75}
      />
      <TinyBar
        percentage={percentageAvg}
        colorClass={"cyan-500"}
        value={item.avg_fee}
      />
    </div>
  </div>
</div>
