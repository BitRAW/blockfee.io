<script>
  import lottie from "lottie-web";
  import { onMount } from "svelte";
  onMount(() => {
    lottie.loadAnimation({
      container: document.getElementById("not-found-body"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "../turkey.json",
    });
  });
</script>

<div class="w-full h-full">
  <div class="h-52" id="not-found-body" />
</div>
