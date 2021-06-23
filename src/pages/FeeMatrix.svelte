<script lang="ts">
import {onMount} from 'svelte';
import {setDay, setHours, setMinutes, subMinutes, getDay, getHours, subSeconds, setSeconds} from 'date-fns';

import {
  fetchData,
} from '../API/BitrawAPI';
import {weekdaysMap} from '../util/matrixUtils';
import MatrixCell from './comp/MatrixCell.svelte';
import Loader from './helper-comp/Loader.svelte';
import type {MatrixDay} from '../objects/MatrixDay';


let matrix: Promise<Array<Array<MatrixDay>>> = null;

onMount(() => {
  let date = new Date();
  const offsetMin = date.getTimezoneOffset();
  matrix = fetchData<Array<Array<MatrixDay>>>('fees/matrix/weekhour')
      .then((data) => {
        return data.flatMap((day) => day.map((hour) => {
          date = setDay(date, hour.weekday);
          date = setHours(date, hour.hour);
          date = setMinutes(date, 0);
          date = setSeconds(date, 0);
          date = subMinutes(date, offsetMin);
          hour.hour = getHours(date);
          hour.weekday = getDay(date);

          // our weekday starts with 1 (monday) and sunday is 7
          hour.weekday = hour.weekday === 0 ? 7 : hour.weekday;

          return hour;
        }),
        ).sort((a, b) => a.weekday === b.weekday ?
          a.hour - b.hour : a.weekday - b.weekday,
        ).reduce((acc, value) => {
          const dayIndex = value.weekday - 1;
          if (!acc[dayIndex]) {
            acc[dayIndex] = [];
          }
          acc[dayIndex].push(value);
          return acc;
        }, []);
      });
});

</script>

<div class="w-full h-full bg-gray-900 rounded-md shadow-mdm flex-col flex m-4 p-2 overflow-x-scroll lg:overflow-x-visible">
    <div class="flex pb-4">
        <p class="text-lg font-bold">
            Fee Price Matrix
        </p>
    </div>
    {#if matrix}
      <div class="grid grid-cols-25 gap-1  w-max lg:w-full">
          {#await matrix}
            <Loader></Loader>
          {:then matrix}
          {#each matrix as weekday,i}
            {#if i===0}
              <div  class="bg-gray-800 rounded-sm text-center"></div>
              {#each weekday as feematrixElement}
                <div  class="bg-gray-700 rounded-sm text-center">{feematrixElement.hour}</div>
              {/each}
            {/if}

            {#each weekday as feematrixElement,j}
              {#if j===0}
                <div class="bg-gray-700 rounded-sm text-center">{weekdaysMap[`${feematrixElement.weekday}`]}</div>
              {/if}
              <MatrixCell day={feematrixElement}></MatrixCell>
            {/each}
          {/each}
          {/await}
      </div>
    {/if}
</div>
