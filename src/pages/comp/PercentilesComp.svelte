<script lang="ts">
  import { onMount } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { tweened } from "svelte/motion";

  let minVal = tweened(0, {
    duration: 800,
    easing: cubicOut,
  });
  let val25 = tweened(0, {
    duration: 800,
    easing: cubicOut,
  });
  let medianVal = tweened(0, {
    duration: 800,
    easing: cubicOut,
  });
  let val75 = tweened(0, {
    duration: 800,
    easing: cubicOut,
  });
  let maxVal = tweened(0, {
    duration: 800,
    easing: cubicOut,
  });

  onMount(() => {
    var blendInElements = Array.from(
      document.getElementsByClassName("blendin")
    );

    setTimeout(() => {
      let delay = 200;
      blendInElements.forEach((element) => {
        delay = delay + delay / 3;

        setTimeout(() => {
          element.classList.remove("opacity-0");
          element.classList.add("opacity-100");
        }, delay);
      });
      setTimeout(() => {
        $minVal = 49;
        $val25 = 79;
        $medianVal = 102;
        $val75 = 200;
        $maxVal = 1067;
      }, delay);
    }, 300);
  });
</script>

<div
  class="bg-gray-900 w-full h-full flex flex-wrap rounded-md shadow-lg justify-center pb-10 p-4"
>
  <label for="Percentiles" class="font-bold pt-2 w-full text-center"
    >Last Block</label
  >
  <ul class="flex gap-8 flex-wrap justify-around pt-4">
    <li class="blendin opacity-0 transition duration-400 ease-in-out">
      <div
        class="h-24 w-24 rounded-md  bg-stroke1 justify-center font-bold flex items-center"
      >
        {$minVal.toFixed(0)} Sat/vB
      </div>
      <p class="text-stroke1 text-center font-bold">Min</p>
    </li>
    <li class="blendin opacity-0 transition duration-400 ease-in-out">
      <div
        class="h-24 w-24 rounded bg-stroke2 justify-center font-bold flex items-center"
      >
        {$val25.toFixed(0)} Sat/vB
      </div>
      <p class="text-stroke2 font-bold text-center">25th</p>
    </li>
    <li class="blendin opacity-0 transition duration-400 ease-in-out">
      <div
        class="h-24 w-24 rounded-md bg-stroke3 justify-center font-bold flex items-center"
      >
        {$medianVal.toFixed(0)} Sat/vB
      </div>
      <p class="text-stroke3 font-bold text-center">Median</p>
    </li>
    <li class="blendin opacity-0 transition duration-600 ease-in-out">
      <div
        class="h-24 w-24 rounded-md bg-stroke4 justify-center font-bold flex items-center"
      >
        {$val75.toFixed(0)} Sat/vB
      </div>
      <p class="text-stroke4 font-bold text-center">75th</p>
    </li>
    <li class="blendin opacity-0 transition duration-700 ease-in-out">
      <div
        class="h-24 w-24 rounded-md bg-stroke5 justify-center font-bold flex items-center"
      >
        {$maxVal.toFixed(0)} Sat/vB
      </div>
      <p class="text-stroke5 font-bold text-center">Max</p>
    </li>
  </ul>
</div>
