<script>
  import {onMount} from 'svelte';
  import {cubicOut} from 'svelte/easing';
  import {tweened} from 'svelte/motion';
  import {generateId} from '../../util/randomUtils';
  import Tippy from '../helper-comp/Tippy.svelte';
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
  export let tooltip;
  export let unit;

  onMount(() => {
    $tweenedPerc = percentage + 10;
    $tweenedValue = value;
  });
  const id = 'tinybar' + generateId(8);
</script>

<div class="w-full h-full flex align-middle">
  <div
    {id}
    class="bg-{colorClass} h-5 rounded-md bg-opacity-80 text-xs text-{colorClass} text-opacity-100 flex justify-items-center"
    style="width:{$tweenedPerc}%;"
  >
    <span
      class="inline-block text-center w-full align-text-middle cursor-default"
    >
      {$tweenedValue.toFixed(0)}
    </span>
  </div>
  <p class="text-xs pl-2 align-middle">{unit}</p>
  <Tippy elementId={id} content={tooltip} />
</div>
