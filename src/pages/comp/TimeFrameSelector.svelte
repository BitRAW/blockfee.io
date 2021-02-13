<script>
  import { onMount } from "svelte";

  let activeElem;

  onMount(() => {
    if (!activeElem) {
      activeElem = "1 h";
    }
  });
  function setActiveElem(e) {
    activeElem = e.target.innerHTML;
    console.log(e);
  }
</script>

<div class="flex pr-2">
  <div
    class:bg-cyan-500={activeElem !== "1 h"}
    class:bg-cyan-600={activeElem === "1 h"}
    on:click={setActiveElem}
    class="bg-cyan-500 hover:bg-cyan-600 rounded-l-md p-2 transition ease-in-out cursor-pointer"
  >
    1 h
  </div>
  <div
    class:bg-cyan-500={activeElem !== "6 h"}
    class:bg-cyan-600={activeElem === "6 h"}
    on:click={setActiveElem}
    class="bg-cyan-500 hover:bg-cyan-600 p-2 transition ease-in-out cursor-pointer"
  >
    6 h
  </div>
  <div
    class:bg-cyan-500={activeElem !== "24 h"}
    class:bg-cyan-600={activeElem === "24 h"}
    on:click={setActiveElem}
    class="bg-cyan-500 hover:bg-cyan-600 p-2 transition ease-in-out cursor-pointer"
  >
    24 h
  </div>
  <div
    class:bg-cyan-500={activeElem !== "7 d"}
    class:bg-cyan-600={activeElem === "7 d"}
    on:click={setActiveElem}
    class="bg-cyan-500 hover:bg-cyan-600 p-2 transition ease-in-out cursor-pointer"
  >
    7 d
  </div>
  <div
    class:bg-cyan-500={activeElem !== "30 d"}
    class:bg-cyan-600={activeElem === "30 d"}
    on:click={setActiveElem}
    class="bg-cyan-500 hover:bg-cyan-600 p-2 transition ease-in-out cursor-pointer"
  >
    30 d
  </div>
  <div
    class:bg-cyan-500={activeElem !== "All"}
    class:bg-cyan-600={activeElem === "All"}
    on:click={setActiveElem}
    class="bg-cyan-500 hover:bg-cyan-600 rounded-r-md p-2 transition ease-in-out cursor-pointer"
  >
    All
  </div>
</div>
