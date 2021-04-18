<script lang="ts">
  import lottie from "lottie-web";
  import { onMount } from "svelte";
  onMount(() => {
    lottie.loadAnimation({
      container: document.getElementById("not-found-body"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "../img/turkey.json",
    });
  });
</script>

<div class="w-full h-full flex-col flex items-center">
  <div class="h-52" id="not-found-body" />
  <p>There is nothing here...</p>
</div>
