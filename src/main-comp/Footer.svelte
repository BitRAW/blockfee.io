<script>
  import lottie from "lottie-web";
  import { onMount } from "svelte";
  let lightning;
  let isLottiePlayed = false;
  let online;

  onMount(() => {
    lightning = lottie.loadAnimation({
      container: document.getElementById("powered-lightning"),
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "../img/ui-lightning.json",
    });

    updateOnlineState();
  });

  function updateOnlineState() {
    online = navigator.onLine;
  }

  function playLightning() {
    if (!isLottiePlayed) {
      lightning.play();
    } else {
      lightning.stop();
    }
    isLottiePlayed = !isLottiePlayed;
    setTimeout(() => {
      Object.assign(document.createElement("a"), {
        target: "_blank",
        href: "https://bitraw.io",
      }).click();
      setTimeout(() => {
        lightning.stop();
        isLottiePlayed = false;
      }, 500);
    }, 800);
  }
</script>

<svelte:window on:online={updateOnlineState} on:offline={updateOnlineState}></svelte:window>

<div class="fixed bottom-0 w-full h-10 bg-gray-900 flex justify-center gap-8">
  <div
    on:click={playLightning}
    class="hover:text-amber-300 flex items-center justify-center cursor-pointer"
  >
    <div class="w-8 h-8" id="powered-lightning" />

    <p>by &nbsp;</p>
    <p class="underline font-bold ">BitRaw</p>
  </div>
  {#if !online}
  <div class="flex items-center gap-2 text-red-600">
    <svg class="inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 18c.714 0 1.37.25 1.886.666L12 21l-1.886-2.334A2.987 2.987 0 0 1 12 18zM2.808 1.393l17.677 17.678-1.414 1.414-5.18-5.18A5.994 5.994 0 0 0 12 15c-1.428 0-2.74.499-3.77 1.332l-1.256-1.556a7.963 7.963 0 0 1 4.622-1.766L9 10.414a10.969 10.969 0 0 0-3.912 2.029L3.83 10.887A12.984 12.984 0 0 1 7.416 8.83L5.132 6.545a16.009 16.009 0 0 0-3.185 2.007L.689 6.997c.915-.74 1.903-1.391 2.952-1.942L1.393 2.808l1.415-1.415zM14.5 10.285l-2.284-2.283L12 8c3.095 0 5.937 1.081 8.17 2.887l-1.258 1.556a10.96 10.96 0 0 0-4.412-2.158zM12 3c4.285 0 8.22 1.497 11.31 3.997l-1.257 1.555A15.933 15.933 0 0 0 12 5c-.878 0-1.74.07-2.58.207L7.725 3.51C9.094 3.177 10.527 3 12 3z"/></svg>
    You are offline!
  </div>
  {/if}
</div>
