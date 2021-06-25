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
import Tippy from './helper-comp/Tippy.svelte';


let matrix: Promise<Array<Array<MatrixDay>>> = null;
const infoElementId : string = 'feematrix-info';
const infoContent : string = 'Each block in the blockchain has a median fee rate. This matrix shows aggregates of these median fee rates. They are grouped according to when exactly a block was mined within a week, over the time span of a year. The averages of those values are what is displayed in the chart. They are denominated in satoshis/virtualByte. The data is continuously being updated and always represents the most recent 12 months.';


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
    <div class="flex justify-between w-full pb-2">
        <p class="text-lg font-bold">
            Median Fee Rate: Hourly Distribution over Weekdays
        </p>
        <div id="{infoElementId}">
            <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 hover:text-cyan-500 transition-colors ease-in-out cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <Tippy elementId={infoElementId} content={infoContent}></Tippy>
        </div>
    </div>
    <div class="flex justify-between w-full pb-4">
        <p>
            Measured in sat/vByte, averaged out over the past 12 months
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
