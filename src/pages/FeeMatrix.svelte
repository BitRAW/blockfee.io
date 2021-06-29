<script lang="ts">
import {onMount} from 'svelte';
import {setDay, setHours, setMinutes, subMinutes, getDay, getHours, setSeconds} from 'date-fns';

import {
  fetchData,
} from '../API/BitrawAPI';
import {weekdaysMap} from '../util/matrixUtils';
import MatrixCell from './comp/MatrixCell.svelte';
import Loader from './helper-comp/Loader.svelte';
import TimeFrameSelector from './comp/TimeFrameSelector.svelte';

import type {MatrixDay} from '../objects/MatrixDay';
import Tippy from './helper-comp/Tippy.svelte';

let data: Promise<Array<Array<MatrixDay>>> = null;
let timeframe = 'Yearly lookback';
let maxValue: number = 100;

const infoElementId : string = 'feematrix-info';
const infoContent : string = 'Each block in the blockchain has a median fee rate. This matrix shows aggregates of these median fee rates. They are grouped according to when exactly a block was mined within a week, over the time span of a year. The averages of those values are what is displayed in the chart. They are denominated in satoshis/virtualByte. The data is continuously being updated and always represents the most recent month or 12 months, depending on the selected matrix.';

const timeframeMap = {
  'Yearly lookback': 'y',
  'Monthly lookback': 'M',
};

async function fetchMatrix(_timeframe = 'Yearly lookback') {
  timeframe = _timeframe;
  data = fetchData<Array<Array<MatrixDay>>>('fees/matrix/weekhour', {timeframe: timeframeMap[timeframe]})
      .then((data) => {
        let date = new Date();
        const offsetMin = date.getTimezoneOffset();
        const flatData = data.flatMap((day) => day.map((hour) => {
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
        }));

        maxValue = Math.max(...flatData.map((d) => d.value));

        return flatData.sort((a, b) => a.weekday === b.weekday ?
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
}

onMount(() => {
  fetchMatrix();
});
</script>

<div class="w-full h-full bg-gray-900 rounded-md shadow-mdm flex-col flex m-4 p-2 space-y-2 overflow-x-scroll lg:overflow-x-visible">
    <div class="flex justify-between w-full">
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
    <div class="flex justify-between w-full">
        <p>
            Measured in sat/vByte, averaged out over the past month or the past 12 months
        </p>
    </div>
    <div class="w-full pb-4">
      <TimeFrameSelector options={Object.keys(timeframeMap)} activeOption={timeframe} on:selectTime={(e) => fetchMatrix(e.detail)} />
    </div>
    <div class="grid grid-cols-25 gap-1 w-max lg:w-full">
        {#if data}
        {#await data}
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
              <MatrixCell maxValue={maxValue} day={feematrixElement}></MatrixCell>
            {/each}
          {/each}
        {/await}
        {/if}
    </div>
</div>
