<script type="ts">
import {onMount} from 'svelte';
import Tippy from '../helper-comp/Tippy.svelte';
import {generateId} from '../../util/randomUtils';
import {weekdaysMap} from '../../util/matrixUtils';

import type {MatrixDay} from '../../objects/MatrixDay';

export let day: MatrixDay;

const cellId = generateId(10);

onMount(()=>{
  const element = document.getElementById('fee-matrix-'+cellId);
  element.style.backgroundColor = percentageToHsl(day.value/100, 120, 0);
});

function percentageToHsl(percentage, hue0, hue1) {
  const hue = (percentage * (hue1 - hue0)) + hue0;
  const color = 'hsl(' + hue + ', 100%, 50%)';
  return color;
}

$: id = `fee-matrix-${cellId}`;
$: tooltip = `${weekdaysMap[day.weekday]}: ${day.hour}:00 - ${day.hour+1}:00`;
</script>
<div  class="flex justify-center items-center rounded-sm text-gray-700 hover:-m-1 hover:font-bold cursor-default transition-all ease-in-out" {id}>
  <Tippy content={tooltip} elementId={id}></Tippy>
  <p>
      {day.value}
  </p>
</div>