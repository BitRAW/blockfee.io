<script lang="ts">
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let activeElem;

  onMount(() => {
    if (!activeElem) {
      activeElem = "4h";
      dispatch("selectTime", activeElem);
    }
  });
  function setActiveElem(e) {
    activeElem = e.target.innerHTML;
    dispatch("selectTime", activeElem);
  }
</script>

<div class="flex pr-2 text-xs font-bold">
  <div
    class:bg-cyan-500={activeElem !== "4h"}
    class:bg-cyan-600={activeElem === "4h"}
    on:click={setActiveElem}
    class="bg-cyan-500 hover:bg-cyan-600 rounded-l-sm p-2 transition ease-in-out cursor-pointer"
  >
    4h
  </div>
  <div
    class:bg-cyan-500={activeElem !== "24h"}
    class:bg-cyan-600={activeElem === "24h"}
    on:click={setActiveElem}
    class="bg-cyan-500 hover:bg-cyan-600 p-2 transition ease-in-out cursor-pointer"
  >
    24h
  </div>
  <div
    class:bg-cyan-500={activeElem !== "7d"}
    class:bg-cyan-600={activeElem === "7d"}
    on:click={setActiveElem}
    class="bg-cyan-500 hover:bg-cyan-600 p-2 transition ease-in-out cursor-pointer"
  >
    7d
  </div>
  <div
    class:bg-cyan-500={activeElem !== "30d"}
    class:bg-cyan-600={activeElem === "30d"}
    on:click={setActiveElem}
    class="bg-cyan-500 hover:bg-cyan-600 p-2 transition ease-in-out cursor-pointer"
  >
    30d
  </div>
  <div
    class:bg-cyan-500={activeElem !== "1y"}
    class:bg-cyan-600={activeElem === "1y"}
    on:click={setActiveElem}
    class="bg-cyan-500 hover:bg-cyan-600  p-2 transition ease-in-out cursor-pointer"
  >
    1y
  </div>
  <div
    class:bg-cyan-500={activeElem !== "all"}
    class:bg-cyan-600={activeElem === "all"}
    on:click={setActiveElem}
    class="bg-cyan-500 hover:bg-cyan-600 rounded-r-sm p-2 transition ease-in-out cursor-pointer"
  >
    all
  </div>
</div>
