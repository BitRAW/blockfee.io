<script>
  import { onMount } from "svelte";

  import tippy from "tippy.js";
  import "tippy.js/dist/tippy.css";

  export let elementId;
  export let content;

  onMount(() => {
    tippy("#" + elementId, {
      content: content,
      placement: "bottom",
    });
  });
</script>
