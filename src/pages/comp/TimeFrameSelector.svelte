<script lang="ts">
  import {createEventDispatcher, onMount} from 'svelte';

  const dispatch = createEventDispatcher();

  onMount(() => {
    setActiveElem(activeOption);
  });

  function setActiveElem(option: string) {
    activeOption = option;
    dispatch('selectTime', option);
  }

  export let options: string[];
  export let activeOption;
</script>

<div class="flex pr-2 text-xs font-bold">
  {#each options as option}
    <div
      class:bg-cyan-500={activeOption !== option}
      class:bg-cyan-600={activeOption === option}
      on:click={() => setActiveElem(option)}
      class="bg-cyan-500 hover:bg-cyan-600 first:rounded-l-sm last:rounded-r-sm p-2 transition ease-in-out cursor-pointer"
    >
      {option}
    </div>
  {/each}
</div>
