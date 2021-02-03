<script>
  import Chartist from "chartist";
  import { onMount } from "svelte";
  import blockData from "../../public/dummy-block";
  import Block from "./comp/Block.svelte";

  let steps = 10;

  let lowest = 1000;

  let highest = 0;

  let series = new Array(steps).fill(0);

  let transactionCostPerB = blockData.map((transaction) => {
    if (transaction.fee !== 0) {
      let fee = transaction.fee / transaction.size;
      if (fee < lowest) {
        lowest = fee;
      }
      if (fee > highest) {
        highest = fee;
      }
      return fee;
    }
  });

  console.log(highest + "   " + lowest);

  let part = (highest - lowest) / steps;

  let labels = new Array(steps);

  for (let i = 0; i < labels.length; i++) {
    labels[i] = lowest + part * i;
  }

  transactionCostPerB.forEach((e) => {
    if (e != undefined) {
      for (let i = 0; i < series.length; i++) {
        if (e <= labels[i]) {
          console.log(e + "<" + labels[i]);
          series[i]++;
          break;
        } else if (e >= highest) {
          series[series.length - 1]++;
          break;
        }
      }
    }
  });

  console.log(series);

  onMount(() => {
    var data = {
      labels: labels.map((label) => {
        return "< " + label.toFixed(0) + " sat/B";
      }),
      series: series,
    };

    setTimeout(() => {
      new Chartist.Bar(".ct-chart", data, {
        distributeSeries: true,
      });
    }, 300);
  });
</script>

<div class="grid grid-cols-2 h-full w-full p-4 block-page-grid">
  <div class="col-span-2 pb-20 flex justify-center items-center">
    <Block />
    <div class="w-10 h-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  </div>
  <div
    class="flex lg:col-span-1 col-span-2 bg-gray-900 w-full h-full flex-wrap rounded-md shadow-lg justify-center pb-10"
  >
    <label
      for="transaction fees graph"
      class="font-bold pt-2 w-full text-center"
      >Transaction fee distribution</label
    >
    <div class="ct-chart w-full h-full" />
  </div>
</div>

<style>
  .block-page-grid {
    grid-template-rows: 1fr 2fr;
  }
</style>
