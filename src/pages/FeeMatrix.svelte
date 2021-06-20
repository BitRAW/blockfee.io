<script>
import {
  getDataURI,
} from '../API/BitrawAPI';
import {weekdaysMap} from '../util/matrixUtils';
import MatrixCell from './comp/MatrixCell.svelte';
import Loader from './helper-comp/Loader.svelte';

const matrix = loadMatrix();

async function loadMatrix() {
  const uri = getDataURI('fees/matrix/weekhour');
  const request = await fetch(uri);
  return await request.json();
}
</script>

<div class="w-full h-full bg-gray-900 rounded-md shadow-mdm flex-col flex m-4 p-2 overflow-x-scroll lg:overflow-x-visible">
    <div class="flex pb-4">
        <p class="text-lg font-bold">
            Fee Price Matrix
        </p>
    </div>

    <div class="grid grid-cols-25 gap-1  w-max lg:w-full">
        {#await matrix}
        <Loader></Loader>
        {:then matrix}
        {#each matrix as weekday,i}
        {#if i===0}
        <div  class="bg-gray-800 rounded-sm text-center"></div>

        {#each weekday as feematrixElement,j}
        <div  class="bg-gray-700 rounded-sm text-center">{feematrixElement.hour}</div>

        {/each}
        {/if}

        {#each weekday as feematrixElement,j}
        {#if j===0}
        <div class="bg-gray-700 rounded-sm text-center">{weekdaysMap[`${feematrixElement.weekday}`]}</div>
        {/if}
        <MatrixCell value={feematrixElement.value}></MatrixCell>
        
        {/each}
        {/each}
        {/await}
    </div>
</div>
