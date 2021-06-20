<script type="ts">
import {onMount} from 'svelte';
import {generateId} from '../../util/randomUtils';


export let value;

const cellId = generateId(10);

onMount(()=>{
  const element = document.getElementById('fee-matrix-'+cellId);
  element.style.backgroundColor = percentageToHsl(value/100, 120, 0);
});

function percentageToHsl(percentage, hue0, hue1) {
  const hue = (percentage * (hue1 - hue0)) + hue0;
  const color = 'hsl(' + hue + ', 100%, 50%)';
  console.log(color);
  return color;
}
</script>
<div  class="flex justify-center items-center rounded-sm text-gray-600 hover:-m-1 hover:font-bold cursor-default transition-all ease-in-out" id="fee-matrix-{cellId}">
  <p>
      {value}
  </p>
</div>