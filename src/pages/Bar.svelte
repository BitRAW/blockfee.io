<script>
  export let tweenedStd;
</script>

<div class="flex justify-center justify-items-start pt-6">
  <div class="h-4 relative w-4/5 rounded-full overflow-hidden">
    <div class="w-full h-full bg-gray-200 absolute" />
    <div
      id="colat-bar"
      class="h-full w-0 absolute transition-all ease-out duration-1000  m-auto left-0 right-0"
      class:bg-stroke1={$tweenedStd > 0 && $tweenedStd <= 10}
      class:bg-stroke2={$tweenedStd > 10 && $tweenedStd <= 20}
      class:bg-stroke3={$tweenedStd > 20 && $tweenedStd <= 50}
      class:bg-stroke4={$tweenedStd > 50 && $tweenedStd <= 75}
      class:bg-stroke5={$tweenedStd > 75}
    />
    <div
      id="colat-bar"
      class="h-full w-1 bg-cyan-900 absolute m-auto left-0 right-0"
    />
  </div>
</div>
<div
  class="text-center text-5xl font-bold h-16 transition-colors duration-1000"
  class:text-stroke1={$tweenedStd > 0 && $tweenedStd <= 10}
  class:text-stroke2={$tweenedStd > 10 && $tweenedStd <= 20}
  class:text-stroke3={$tweenedStd > 20 && $tweenedStd <= 50}
  class:text-stroke4={$tweenedStd > 50 && $tweenedStd <= 75}
  class:text-stroke5={$tweenedStd > 75}
>
  <div class="flex items-center justify-center flex-grow h-full">
    <p>
      {$tweenedStd.toFixed(2)} sat/vB
    </p>
  </div>
</div>
