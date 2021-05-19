<script lang="ts">
  import Lottie from 'lottie-web';

  import {onMount} from 'svelte';

  import Router from 'svelte-spa-router';
  import {wrap} from 'svelte-spa-router/wrap';
  import {fetchBlocks} from './API/BitrawAPI';
  import Index from './Index.svelte';
  import Footer from './main-comp/Footer.svelte';
  import Header from './main-comp/Header.svelte';
  import NotFound from './NotFound.svelte';
  import {BlockInfo} from './objects/BlockInfo';
  import {blockCache, highest75percVal} from './stores';

  const routes = {
    '/': Index,
    '/block/:id?': wrap({
      asyncComponent: () => import('./pages/Block.svelte'),
    }),
    '*': NotFound,
  };
  fetchBlockData();
  async function fetchBlockData() {
    const data = await fetchBlocks(4);
    blockCache.update(() => {
      return data.dataset.map((datapoint) => {
        return new BlockInfo(datapoint);
      });
    });
    $blockCache.forEach((item) => {
      $highest75percVal =
        $highest75percVal < item.perc_75 ? item.perc_75 : $highest75percVal;
    });
    console.log($highest75percVal);
  }
  onMount(() => {
    Lottie.loadAnimation({
      container: document.getElementById('bitraw-loading'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../img/bitraw-glare.json',
    });
  });
</script>

<div class="">
  <Header />
  <div class="pt-24 flex bg-gray-800 pb-14">
    {#if $blockCache[0]}
      <Router {routes} />
    {:else}
      <div class="w-full h-full flex items-center justify-center">
        <div class="w-50 h-50" id="bitraw-loading" />
      </div>
    {/if}
  </div>
  <Footer />
</div>
