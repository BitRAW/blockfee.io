<script>
  import { onMount } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  const tweenedPerc = tweened(10, {
    duration: 1000,
    easing: cubicOut,
  });
  const tweenedValue = tweened(0, {
    duration: 1000,
    easing: cubicOut,
  });
  export let percentage;
  export let colorClass;
  export let value;

  onMount(() => {
    $tweenedPerc = percentage + 10;
    $tweenedValue = value;
  });
</script>

<div class="w-full h-full flex">
  <div
    class="bg-{colorClass} h-5 rounded-md bg-opacity-80 text-center align-middle text-xs text-{colorClass} text-opacity-100"
    style="width:{$tweenedPerc}%;"
  >
    {$tweenedValue.toFixed(0)}
  </div>
  <p class="text-xs pl-2">sat/vB</p>
</div>
