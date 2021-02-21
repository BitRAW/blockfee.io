<script>
  import lottie from "lottie-web";
  import { onMount } from "svelte";
  let lightning;
  let isLottiePlayed = false;
  onMount(() => {
    lightning = lottie.loadAnimation({
      container: document.getElementById("powered-lightning"),
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "../ui-lightning.json",
    });
  });

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

<div class="fixed bottom-0 w-full h-10 bg-gray-900 flex justify-center">
  <div
    on:click={playLightning}
    class="hover:text-amber-300 flex items-center justify-center cursor-pointer"
  >
    <div class="w-8 h-8" id="powered-lightning" />

    <p>by &nbsp;</p>
    <p class="underline font-bold ">BitRaw</p>
  </div>
</div>
