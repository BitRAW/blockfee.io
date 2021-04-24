<script lang="ts">
  import LastBlock from "./LastBlock.svelte";
  export let item = {};
  export let isLastBlock = false;
</script>

<div class="stage p-8">
  <div class="cube" class:animate-pulse={isLastBlock}>
    <figure
      class="left bg-gradient-to-tl from-cyan-900 to-gray-900 opacity-50"
    />
    <figure
      class="top bg-gradient-to-t from-cyan-800 to-gray-900  opacity-50"
    />
    <figure
      class="front bg-gradient-to-b from-cyan-400 to-cyan-600 truncate overflow-ellipsis"
    >
      <div class="m-2 flex-col flex items-center">
        {#if isLastBlock}
          <LastBlock />
        {:else}
          <div class="flex-col gap-y-2 items-center justify-center flex">
            <p class="font-bold text-sm text-gray-700">
              # <a class="underline" href="#/block/{item[1]}">{item[1]}</a>
            </p>
            <p class="text-xs font-bold">Median Fee: {item[4]} sat/vB</p>
          </div>
        {/if}
      </div>
    </figure>
  </div>
</div>

<style>
  .stage {
    width: 10em;
    height: 10em;
    -webkit-perspective: 1600px;
    perspective: 1600px;
    -webkit-perspective-origin: 50% -240px;
    perspective-origin: 50% -240px;
    transform: translateX(-2em) translateY(-2em);
  }
  figure {
    display: block;
    position: absolute;
  }

  .front {
    width: 10em;
    height: 10em;
  }

  .top {
    height: 2em;
    width: 10em;
    transform: skewX(45deg) translateY(-2em) translateX(1em);
  }

  .left {
    height: 10em;
    width: 2em;
    transform: translateX(-2em) skewY(45deg) translateY(-1em);
  }
</style>
