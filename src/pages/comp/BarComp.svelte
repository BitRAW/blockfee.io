<script>
  import { onMount } from "svelte";

  onMount(() => {
    setTimeout(() => {
      let bar = document.getElementById("colat-bar");
      bar.classList.remove("w-0");
      bar.style.width = 100 + "%";
    }, 300);
  });
</script>

<div
  class="bg-gray-900 w-full h-full flex flex-col rounded-md shadow-lg justify-start pb-10"
>
  <label for="transaction fees graph" class="font-bold pt-2 w-full text-center"
    >Last Block compared to:</label
  >
  <div class="flex justify-center justify-items-start pt-3">
    <div class="h-4 relative w-1/2 rounded-full overflow-hidden">
      <div class="w-full h-full bg-gray-200 absolute" />
      <div
        id="colat-bar"
        class="h-full w-0 bg-stroke1 absolute transition-all ease-out duration-1000  m-auto left-0 right-0"
      />
      <div
        id="colat-bar"
        class="h-full w-1 bg-cyan-900 absolute m-auto left-0 right-0"
      />
    </div>
  </div>
</div>
