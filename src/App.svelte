<script lang="ts">
  import Lottie from 'lottie-web';

  import {onMount} from 'svelte';

  import Router from 'svelte-spa-router';
  import {wrap} from 'svelte-spa-router/wrap';
  import {fetchBlocks} from './API/BitrawAPI';
  import Footer from './main-comp/Footer.svelte';
  import Header from './main-comp/Header.svelte';
  import Index from './pages/Index.svelte';
  import NotFound from './pages/NotFound.svelte';
  import {BlockInfo} from './objects/BlockInfo';
  import Alerts from './pages/helper-comp/Alerts.svelte';
  import {blockCache, highest75percVal} from './stores';

  const routes = {
    '/': Index,
    '/block/:id?': wrap({
      asyncComponent: () => import('./pages/Block.svelte'),
    }),
    '*': NotFound,
  };

  async function fetchBlockData() {
    const data = await fetchBlocks(4);

    blockCache.update(() => {
      return data.map((datapoint) => {
        return new BlockInfo(datapoint);
      });
    });

    $blockCache.forEach((item) => {
      $highest75percVal =
        $highest75percVal < item.perc_75 ? item.perc_75 : $highest75percVal;
    });
  }

  onMount(() => {
    fetchBlockData();
    Lottie.loadAnimation({
      container: document.getElementById('bitraw-loading'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../img/bitraw-glare.json',
    });
  });
</script>
<div class="hidden bg-stroke1 bg-stroke2 bg-stroke3 bg-stroke4 bg-gray1 bg-gray2 bg-stroke5 text-stroke1 text-stroke2 text-stroke3 text-stroke4 text-stroke5 text-gray1 text-gray2"></div>
<div class="">
  <Header />
  <div class="pt-24 flex bg-gray-800 pb-14">
    {#if $blockCache[0]}
      <Router {routes} />
    {:else}
      <div class="z-5 w-full opacity-30 flex items-center justify-center">
        <div class="w-24 h-24" id="bitraw-loading" />
      </div>
    {/if}
  </div>
  <Footer />
  <Alerts />
</div>
