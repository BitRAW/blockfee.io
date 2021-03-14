<script>
  import lottie from "lottie-web";
  import { onMount } from "svelte";
  onMount(() => {
    lottie.loadAnimation({
      container: document.getElementById("last-block"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "../img/trail-circle.json",
    });
  });
</script>

<div id="last-block" />
