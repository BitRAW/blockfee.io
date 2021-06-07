<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
  import { alerts } from "../../alert";
</script>

{#if $alerts.length !== 0}
  <div class="fixed bottom-4 space-y-2 left-0 w-full">
    {#each $alerts as alert}
      <div class="p-3 w-96 m-auto bg-gray-900 text-white rounded-md shadow-md flex justify-between items-center"  
        class:bg-red-500={alert.severity === 'error'}  
        class:bg-yellow-600={alert.severity === 'warning'} 
        transition:fly="{{ duration: 300, x: 0, y: 50, easing: quintOut }}"
      >
        { alert.message }
        {#if alert.action }
          <button class="font-semibold uppercase px-3 py-1 hover:bg-blue-50 hover:bg-opacity-10 rounded-md"
            on:click={alert.action.callback}
          >
            {alert.action.label}
          </button>
        {/if}
      </div>
    {/each}
  </div>
{/if}